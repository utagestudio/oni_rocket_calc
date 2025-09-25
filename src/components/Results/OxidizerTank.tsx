import './OxidizerTank.sass'
import useModules from '@/hooks/useModules'
import {useEffect} from 'react'
import Tank from '@/components/Results/Tank'
type Props = {
  required: number
}

function OxidizerTank({required}: Props) {
  const {oxidizerTanks, oxidizerType, setOxidizerType, changeOxidizerTankByType} = useModules()

  useEffect(() => {
    changeOxidizerTankByType()
  }, [oxidizerType]);



  return <>
    <Tank required={required} limitAmountPerTank={2700} numberOfTanks={oxidizerTanks.length} image={oxidizerType === 'solid' ? 'img_solid_oxidizer_tank' : 'img_liquid_oxidizer_tank'} >
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
      </div>
    </Tank>
  </>
}

export default OxidizerTank
