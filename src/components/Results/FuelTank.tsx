import {useEffect} from 'react'
import useModules from '@/hooks/useModules'
import Tank from '@/components/Results/Tank'
type Props = {
  required: number
  numberOfTanks: number
}

function FuelTank({required, numberOfTanks}: Props) {

  return <>
    <Tank required={required} limitAmountPerTank={900} numberOfTanks={numberOfTanks} image='img_fuel_tank'></Tank>
  </>
}

export default FuelTank
