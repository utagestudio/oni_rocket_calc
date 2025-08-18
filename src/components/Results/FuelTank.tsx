import './FuelTank.sass'
import {useEffect} from 'react'
import useModules from '@/hooks/useModules'
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
    <div className="FuelTank">
      <ul className="FuelTank_list">
        {Array.from({length: requiredTanks}, (_, i) => {
          const capacity = requiredTanks === i + 1 ? (required % 900) : 900

          return <li className="FuelTank_item" key={i}>
            <div className="FuelTank_image"><img className="FuelTank_img" src="/assets/images/img_fuel_tank.webp" srcSet="/assets/images/img_fuel_tank.webp 1x, /assets/images/img_fuel_tank@2x.webp 2x" alt="" /></div>
            <div className="FuelTank_capacity">
              <div className="FuelTank_value">{capacity}</div>
              <div className="FuelTank_unit">kg</div>
            </div>
          </li>
        })}
      </ul>
    </div>
  </>
}

export default FuelTank
