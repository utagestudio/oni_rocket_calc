import './OxidizerTank.sass'
import useModules from '@/hooks/useModules'
import {useEffect} from 'react'
import Tank from '@/components/Results/Tank'
import Image from 'next/image'
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
            <Image className="OxidizerTank_typeImg" src="/assets/images/img_oxylite.webp" width={25} height={28} alt="Oxylite" />
            Oxylite
          </li>
          <li className={`OxidizerTank_type -liquid ${oxidizerType === 'liquid' ? '-selected' : ''}`} onClick={() => setOxidizerType('liquid')}>
            <Image className="OxidizerTank_typeImg" src="/assets/images/img_liquid_oxygen.webp" width={25} height={28} alt="Liquid Oxygen" />
            Liquid Oxygen
          </li>
        </ul>
      </div>
    </Tank>
  </>
}

export default OxidizerTank
