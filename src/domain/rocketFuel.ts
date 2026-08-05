export type RocketFuelInput = {
  head: tItem
  engine: tEngine
  modules: tItem[]
  thrusters: tThruster[]
  distanceKm: number
  oxidizerType: 'solid' | 'liquid' | string
  fuelTankMassKg: number
}

export type RocketFuelResult =
  | {
      feasible: true
      fuelKg: number
      fuelTankCount: number
      oxidizerTankCount: number
    }
  | {
      feasible: false
      reason: string
      fuelKg: -1
      fuelTankCount: 0
      oxidizerTankCount: 0
    }

const FUEL_PER_TANK_KG = 900
const THRUSTER_RANGE_KM = 12_000
const THRUSTER_WET_MASS_KG = 800
const OXIDIZER_TANK_MASS_KG = 100

type FeasibleSearchResult =
  | { feasible: true; fuelKg: number; fuelTankCount: number; oxidizerTankCount: number }
  | { feasible: false; reason: string }

type SearchValues = {
  baseMassKg: number
  massIncreasePerFuelTankKg: number
  efficiencyKmPerKg: number
  targetRangeKm: number
  isSteam: boolean
  thrusterCount: number
}

export function calculateRocketFuel(input: RocketFuelInput): RocketFuelResult {
  const isSteam = input.engine.name === 'Steam Engine'
  const dryMassKg =
    input.head.mass +
    input.engine.mass +
    input.thrusters.reduce((mass, thruster) => mass + thruster.mass, 0) +
    input.modules.reduce((mass, module) => mass + module.mass, 0)

  const efficiencyKmPerKg =
    input.engine.efficiency * (isSteam || input.oxidizerType === 'solid' ? 1 : 1.33)

  const result = findMinimalFuel({
    targetRangeKm: input.distanceKm,
    dryMassKg,
    efficiencyKmPerKg,
    isSteam,
    fuelTankMassKg: input.fuelTankMassKg,
    thrusterCount: input.thrusters.length,
  })

  if (!result.feasible) {
    return {
      feasible: false,
      reason: result.reason,
      fuelKg: -1,
      fuelTankCount: 0,
      oxidizerTankCount: 0,
    }
  }

  return result
}

function findMinimalFuel({
  targetRangeKm,
  dryMassKg,
  efficiencyKmPerKg,
  isSteam,
  fuelTankMassKg,
  thrusterCount,
}: {
  targetRangeKm: number
  dryMassKg: number
  efficiencyKmPerKg: number
  isSteam: boolean
  fuelTankMassKg: number
  thrusterCount: number
}): FeasibleSearchResult {
  const oxidizerTankMassKg = isSteam ? 0 : OXIDIZER_TANK_MASS_KG
  const targetRange = Math.max(0, targetRangeKm)
  const baseMassKg = Math.max(0, dryMassKg + oxidizerTankMassKg)
  const efficiency = Math.max(0, efficiencyKmPerKg)
  const massIncreasePerFuelTankKg = isSteam ? 0 : Math.max(0, fuelTankMassKg)
  const fuelPerTankKg = Math.max(1, Math.floor(FUEL_PER_TANK_KG))

  const values = {
    baseMassKg,
    massIncreasePerFuelTankKg,
    efficiencyKmPerKg: efficiency,
    targetRangeKm: targetRange,
    isSteam,
    thrusterCount,
  }

  // Keep the current model unchanged: Steam searches one fuel segment,
  // non-Steam engines search up to three fuel tank segments.
  const penaltyDerivativeCoeff = isSteam ? 3.2 : 6.4
  const peakConstant = Math.pow((efficiency * 300) / penaltyDerivativeCoeff, 1 / 2.2)
  const maxFuelTankCount = isSteam ? 1 : 3

  for (let fuelTankCount = 1; fuelTankCount <= maxFuelTankCount; fuelTankCount++) {
    const start = (fuelTankCount - 1) * fuelPerTankKg + 1
    const end = fuelTankCount * fuelPerTankKg

    const segmentMassKg =
      baseMassKg + massIncreasePerFuelTankKg * fuelTankCount + oxidizerTankMassKg
    const effectiveFuelMassMultiplier = isSteam ? 1 : 2
    const continuousFuelPeak =
      (300 * peakConstant - segmentMassKg) / effectiveFuelMassMultiplier

    let mayHavePositive = false
    if (continuousFuelPeak < start) {
      if (canReach(start, values)) {
        mayHavePositive = true
      } else {
        return { feasible: false, reason: '全セグメントで到達不可（ピーク通過済み）' }
      }
    } else if (continuousFuelPeak > end) {
      if (canReach(end, values)) mayHavePositive = true
    } else {
      const lowerCandidate = Math.max(start, Math.floor(continuousFuelPeak))
      const upperCandidate = Math.min(end, Math.ceil(continuousFuelPeak))
      if (canReach(lowerCandidate, values) || canReach(upperCandidate, values)) {
        mayHavePositive = true
      }
    }

    if (!mayHavePositive) continue

    const rightMono = Math.min(
      end,
      Math.floor(Math.max(start, Math.min(continuousFuelPeak, end))),
    )
    let lo = start - 1
    let hi: number

    if (continuousFuelPeak <= start) {
      hi = start
    } else if (continuousFuelPeak >= end) {
      hi = end
    } else {
      hi = rightMono
      if (!canReach(hi, values)) {
        let h = hi + 1
        while (h <= end && !canReach(h, values)) h++
        if (h > end) continue
        hi = h
      }
    }

    while (lo + 1 < hi) {
      const mid = Math.floor((lo + hi) >> 1)
      if (canReach(mid, values)) hi = mid
      else lo = mid
    }

    if (canReach(lo, values)) hi = lo
    let fuelKg = hi
    while (fuelKg - 1 >= start && canReach(fuelKg - 1, values)) fuelKg--

    return {
      feasible: true,
      fuelKg,
      fuelTankCount,
      oxidizerTankCount: isSteam ? 0 : 1,
    }
  }

  return { feasible: false, reason: '探索上限を超過（パラメータ異常の可能性）' }
}

function fuelTankCountForFuel(fuelKg: number) {
  return fuelKg <= 0 ? 0 : Math.ceil(fuelKg / FUEL_PER_TANK_KG)
}

function canReach(fuelKg: number, values: SearchValues) {
  const {
    baseMassKg,
    massIncreasePerFuelTankKg,
    efficiencyKmPerKg,
    targetRangeKm,
    isSteam,
    thrusterCount,
  } = values

  const fuelTankCount = fuelTankCountForFuel(fuelKg)
  const massByFuelTanksKg = baseMassKg + massIncreasePerFuelTankKg * fuelTankCount
  const fuelAndOxidizerMassKg = isSteam ? fuelKg : fuelKg * 2
  const thrusterWetMassKg = thrusterCount * THRUSTER_WET_MASS_KG
  const totalMassKg = massByFuelTanksKg + fuelAndOxidizerMassKg + thrusterWetMassKg
  const penalty = Math.max(totalMassKg, Math.pow(totalMassKg / 300, 3.2))

  return efficiencyKmPerKg * fuelKg - penalty > targetRangeKm - THRUSTER_RANGE_KM * thrusterCount
}
