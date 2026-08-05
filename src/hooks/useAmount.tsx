import {useContext} from 'react'
import {AmountContext} from '@/provider/AmountProvider'
import useModules from '@/hooks/useModules'
import {DistanceContext} from '@/provider/DistanceProvider'
import {calculateRocketFuel} from '@/domain/rocketFuel'

function useAmount() {
  const {head, engine, modules, oxidizerType, thruster, findItem} = useModules()
  const {distance} = useContext<tDistanceContext>(DistanceContext)
  const amount = useContext<tAmountContext>(AmountContext)
  const fuelTank = findItem("Fuel Tank")

  const amountCalculate = () => {
    amount.methods.setAmount(0)
    const res = calculateRocketFuel({
      head,
      engine,
      modules,
      thrusters: thruster,
      distanceKm: distance,
      oxidizerType,
      fuelTankMassKg: fuelTank!.mass,
    })

    if (res.feasible) {
      amount.methods.setAmount(res.fuelKg)
      console.log(`必要最小燃料: ${res.fuelKg} kg（k=${res.fuelTankCount}）`);
    } else {
      amount.methods.setAmount(-1)
      console.log(`到達不可: ${res.reason}`);
    }
    return res
  }

  return {
    amount: amount.amount,
    isCalculating: amount.isCalculating,
    amountCalculate,
    setIsCalculating: amount.methods.setIsCalculating
  }
}

export default useAmount
