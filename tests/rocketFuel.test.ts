import assert from 'node:assert/strict'
import test from 'node:test'

import {calculateRocketFuel, type RocketFuelResult} from '../src/domain/rocketFuel'

const commandCapsule: tItem = {
  type: 'head',
  name: 'Command Capsule',
  image: '',
  image2x: '',
  mass: 200,
}

const researchModule: tItem = {
  type: 'modules',
  name: 'Research Module',
  image: '',
  image2x: '',
  mass: 200,
}

const solidFuelThruster: tThruster = {
  type: 'thruster',
  name: 'Solid Fuel Thruster',
  image: '',
  image2x: '',
  mass: 200,
  baseRange: 12_000,
}

const fuelTankMassKg = 100

function engine(name: string, mass: number, efficiency: number): tEngine {
  return {
    type: 'engine',
    name,
    image: '',
    image2x: '',
    mass,
    efficiency,
  }
}

function calculate({
  rocketEngine,
  distanceKm = 10_000,
  oxidizerType = 'solid',
  thrusters = [],
}: {
  rocketEngine: tEngine
  distanceKm?: number
  oxidizerType?: 'solid' | 'liquid'
  thrusters?: tThruster[]
}) {
  return calculateRocketFuel({
    head: commandCapsule,
    engine: rocketEngine,
    modules: [researchModule],
    thrusters,
    distanceKm,
    oxidizerType,
    fuelTankMassKg,
  })
}

test('Steam Engine does not require oxidizer tanks', () => {
  const expected: RocketFuelResult = {
    feasible: true,
    fuelKg: 653,
    fuelTankCount: 1,
    oxidizerTankCount: 0,
  }

  assert.deepEqual(calculate({rocketEngine: engine('Steam Engine', 2000, 20)}), expected)
  assert.deepEqual(
    calculate({
      rocketEngine: engine('Steam Engine', 2000, 20),
      oxidizerType: 'liquid',
    }),
    expected,
  )
})

test('non-Steam engines calculate current solid oxidizer fuel amounts', () => {
  const cases: Array<[tEngine, RocketFuelResult]> = [
    [
      engine('Petroleum Engine', 200, 40),
      {feasible: true, fuelKg: 285, fuelTankCount: 1, oxidizerTankCount: 1},
    ],
    [
      engine('Biodiesel Engine', 200, 50),
      {feasible: true, fuelKg: 226, fuelTankCount: 1, oxidizerTankCount: 1},
    ],
    [
      engine('Hydrogen Engine', 500, 60),
      {feasible: true, fuelKg: 192, fuelTankCount: 1, oxidizerTankCount: 1},
    ],
  ]

  for (const [rocketEngine, expected] of cases) {
    assert.deepEqual(calculate({rocketEngine}), expected)
  }
})

test('liquid oxidizer applies the current efficiency multiplier', () => {
  const cases: Array<[tEngine, RocketFuelResult]> = [
    [
      engine('Petroleum Engine', 200, 40),
      {feasible: true, fuelKg: 211, fuelTankCount: 1, oxidizerTankCount: 1},
    ],
    [
      engine('Biodiesel Engine', 200, 50),
      {feasible: true, fuelKg: 168, fuelTankCount: 1, oxidizerTankCount: 1},
    ],
    [
      engine('Hydrogen Engine', 500, 60),
      {feasible: true, fuelKg: 143, fuelTankCount: 1, oxidizerTankCount: 1},
    ],
  ]

  for (const [rocketEngine, expected] of cases) {
    assert.deepEqual(calculate({rocketEngine, oxidizerType: 'liquid'}), expected)
  }
})

test('Solid Fuel Thruster range bonus is included in reachability', () => {
  assert.deepEqual(
    calculate({
      rocketEngine: engine('Petroleum Engine', 200, 40),
      distanceKm: 22_000,
      thrusters: [solidFuelThruster],
    }),
    {feasible: true, fuelKg: 311, fuelTankCount: 1, oxidizerTankCount: 1},
  )
})

test('unreachable routes return a failed result shape', () => {
  assert.deepEqual(
    calculate({
      rocketEngine: engine('Steam Engine', 2000, 20),
      distanceKm: 180_000,
    }),
    {
      feasible: false,
      reason: '探索上限を超過（パラメータ異常の可能性）',
      fuelKg: -1,
      fuelTankCount: 0,
      oxidizerTankCount: 0,
    },
  )
})
