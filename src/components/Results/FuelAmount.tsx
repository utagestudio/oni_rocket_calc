import './FuelAmount.sass'
import useAmount from '@/hooks/useAmount'
type Props = {}

function FuelAmount({}: Props) {
  const {amount, isCalculating} = useAmount()
  return <>
    <div className="FuelAmount">
      {isCalculating && <>
        <div className="FuelAmount_value">---</div>
        <div className="FuelAmount_unit">kg</div>
      </>}
      {!isCalculating && amount <= 0 && <>
        <div className="FuelAmount_value">Unreached</div>
      </>}
      {!isCalculating && amount > 0 && <>
        <div className="FuelAmount_value">{amount.toLocaleString()}</div>
        <div className="FuelAmount_unit">kg</div>
      </>}
    </div>
  </>
}

export default FuelAmount
