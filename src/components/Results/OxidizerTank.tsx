import './OxidizerTank.sass'
import useModules from '@/hooks/useModules'
import Tank from '@/components/Results/Tank'
import AssetImage from '@/components/AssetImage'
type Props = {
  required: number
}

function OxidizerTank({required}: Props) {
  const {oxidizerTanks, oxidizerType, setOxidizerType} = useModules()

  return <>
    <Tank required={required} limitAmountPerTank={2700} numberOfTanks={oxidizerTanks.length} image={oxidizerType === 'solid' ? 'img_solid_oxidizer_tank' : 'img_liquid_oxidizer_tank'} >
      <div className="OxidizerTank">
        <ul className="OxidizerTank_selector">
          <li className={`OxidizerTank_type -solid ${oxidizerType === 'solid' ? '-selected' : ''}`} onClick={() => setOxidizerType('solid')}>
            <AssetImage className="OxidizerTank_typeImg" imageName="img_oxylite.webp" alt="Oxylite" />
            Oxylite
          </li>
          <li className={`OxidizerTank_type -liquid ${oxidizerType === 'liquid' ? '-selected' : ''}`} onClick={() => setOxidizerType('liquid')}>
            <AssetImage className="OxidizerTank_typeImg" imageName="img_liquid_oxygen.webp" alt="Liquid Oxygen" />
            Liquid Oxygen
          </li>
        </ul>
      </div>
    </Tank>
  </>
}

export default OxidizerTank
