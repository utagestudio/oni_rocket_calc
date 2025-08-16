import {useContext} from 'react'
import {AmountContext} from '@/provider/AmountProvider'

function useAmount() {
  const amount = useContext<tAmountContext>(AmountContext)

  const amountCalculate = ({head, engine, thruster, modules, fuelTanks, oxidizerTanks}:tModuleState) => {
    const resultAmount = Math.random() * 2700 << 0
    amount.methods.setAmount(resultAmount)
  }

  return {
    amount: amount.amount,
    amountCalculate
  }
}

export default useAmount
