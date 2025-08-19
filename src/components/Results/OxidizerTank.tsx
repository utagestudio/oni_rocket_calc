"use client"
import './OxidizerTank.sass'
import useModules from '@/hooks/useModules'
import {useEffect} from 'react'
import useAmount from '@/hooks/useAmount'
type Props = {
  required: number
}

function OxidizerTank({required}: Props) {
  const requiredTanks = Math.ceil(required / 2700)
  const {oxidizerType, setOxidizerType, changeOxidizerTankByType, setNumberOfOxidizerTank} = useModules()
  const {isCalculating} = useAmount()

  useEffect(() => {
    changeOxidizerTankByType()
  }, [oxidizerType]);

  useEffect(() => {
    setNumberOfOxidizerTank(requiredTanks)
  }, [requiredTanks]);


  return <>
    <div className="OxidizerTank">
      <ul className="OxidizerTank_selector">
        <li className={`OxidizerTank_type -solid ${oxidizerType === 'solid' ? '-selected' : ''}`} onClick={() => setOxidizerType('solid')}>
          <img className="OxidizerTank_typeImg" src={`/assets/images/img_oxylite.webp`}
               srcSet={`/assets/images/img_oxylite.webp 1x, /assets/images/img_oxylite@2x.webp 2x`}
               alt="Oxylite"/>
          Oxylite
        </li>
        <li className={`OxidizerTank_type -liquid ${oxidizerType === 'liquid' ? '-selected' : ''}`} onClick={() => setOxidizerType('liquid')}>
          <img className="OxidizerTank_typeImg" src={`/assets/images/img_liquid_oxygen.webp`}
               srcSet={`/assets/images/img_liquid_oxygen.webp 1x, /assets/images/img_liquid_oxygen@2x.webp 2x`}
               alt="Oxylite"/>
          Liquid Oxygen
        </li>
      </ul>
      <ul className="OxidizerTank_list">
        {Array.from({length: requiredTanks}, (_, i) => {
          const capacity = requiredTanks === i + 1 ? (required % 2700) : 2700

          return <li className="OxidizerTank_item" key={i}>
            <div className="OxidizerTank_image"><img className="OxidizerTank_img" src={`/assets/images/img_${oxidizerType}_oxidizer_tank.webp`}
                                                 srcSet={`/assets/images/img_${oxidizerType}_oxidizer_tank.webp 1x, /assets/images/img_${oxidizerType}_oxidizer_tank@2x.webp 2x`}
                                                 alt=""/></div>

            <div className="OxidizerTank_capacity">
              <div className="OxidizerTank_value">{isCalculating ? '---' : capacity.toLocaleString()}</div>
              <div className="OxidizerTank_unit">kg</div>
            </div>
          </li>
        })}
      </ul>

    </div>
  </>
}

export default OxidizerTank
