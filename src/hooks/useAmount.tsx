import {useContext} from 'react'
import {AmountContext} from '@/provider/AmountProvider'

function useAmount() {
  const amount = useContext<tAmountContext>(AmountContext)

  const amountCalculate = ({head, engine, thruster, modules, fuelTanks, oxidizerTanks}:tModuleState) => {
    amount.methods.setFuelAmount(Math.random() * 3000 << 0)
    amount.methods.setOxidizerAmount(Math.random() * 3000 << 0)
  }

  return {
    fuelAmount: amount.fuelAmount,
    oxidizerAmount: amount.oxidizerAmount,
    amountCalculate
  }
}

export default useAmount
