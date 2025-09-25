import {useEffect} from 'react'
import useModules from '@/hooks/useModules'
import Tank from '@/components/Results/Tank'
type Props = {
  required: number
}

function FuelTank({required}: Props) {
  const {fuelTanks} = useModules()
  return <>
    <Tank required={required} limitAmountPerTank={900} numberOfTanks={fuelTanks.length} image='img_fuel_tank'></Tank>
  </>
}

export default FuelTank
