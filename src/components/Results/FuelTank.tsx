import {useEffect} from 'react'
import useModules from '@/hooks/useModules'
import Tank from '@/components/Results/Tank'
type Props = {
  required: number
}

function FuelTank({required}: Props) {
  const requiredTanks = Math.ceil(required / 900)
  const {setNumberOfFuelTank} = useModules()

  useEffect(() => {
    setNumberOfFuelTank(requiredTanks)
  }, [requiredTanks]);


  return <>
    <Tank required={required} limitAmountPerTank={900} numberOfTanks={requiredTanks} image='img_fuel_tank'></Tank>
  </>
}

export default FuelTank
