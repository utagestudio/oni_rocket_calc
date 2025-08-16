import {useContext} from 'react'
import {AmountContext} from '@/provider/AmountProvider'

function useAmount() {
  const amount = useContext<tAmountContext>(AmountContext)

  const amountCalculate = ({head, engine, thruster, modules, fuelTanks, oxidizerTanks, oxidizerType, distance}:tModuleState) => {
    // 不変のロケット質量
    const fixedDryMass = head.mass + engine.mass + thruster.reduce((mass, t) => { return mass + t.mass}, 0) + modules.reduce((mass, t) => { return mass + t.mass}, 0)
    // 不変の距離バフ（スラスター分） 12,000km x スラスター台数
    const fixedThrusterDistance = thruster.length > 0 ? thruster.length * thruster[0].baseRange : 0
    // 不変の燃料量
    const fixedWetMass = thruster.length * 800 // 鉄 400kg, オキシライト 400kg

    // 可変のロケット質量
    let additionalDryMass = fuelTanks.reduce((mass, t) => { return mass + t.mass}, 0) + oxidizerTanks.reduce((mass, t) => { return mass + t.mass}, 0)
    // 可変の燃料量
    let additionalWetMass = 0

    // 定義
    let reachDistance = 0
    let efficiency = 0
    let baseReachDistance = 0
    let totalWetMass = 0
    let totalMass = 0
    let reachPenalty = 0
    let isAtLimit = false

    do {
      additionalWetMass += 1 // 1kgずつ足して、確認する
      efficiency = engine.efficiency * (engine.name === "Steam Engine" || oxidizerType === "solid" ? 1 : 1.33)
      baseReachDistance = additionalWetMass * efficiency
      totalWetMass = fixedWetMass + additionalWetMass * (engine.name === "Steam Engine" ? 1 : 2)
      totalMass = (fixedDryMass + additionalDryMass) + totalWetMass
      reachPenalty = Math.max(totalMass, Math.pow(totalMass / 300, 3.2))
      reachDistance = baseReachDistance + fixedThrusterDistance - reachPenalty

      if(engine.name === "Steam Engine") {
        isAtLimit = additionalWetMass >= 900
      } else {
        isAtLimit = additionalWetMass >= 3600
      }


    } while(reachDistance < distance && !isAtLimit)

    const resultAmount = isAtLimit ? -1 : additionalWetMass
    amount.methods.setAmount(resultAmount)
  }

  return {
    amount: amount.amount,
    amountCalculate
  }
}

export default useAmount
