import './ForThruster.sass'
import useModules from '@/hooks/useModules'
import Image from 'next/image'
type Props = {}

function ForThruster({}: Props) {
  const {thruster} = useModules()
  const required = 400 * thruster.length
  return <>
    <div className="ForThruster">
      <ul className="ForThruster_list">
        <li className="ForThruster_item">
          <div className="ForThruster_image">
            <Image className="ForThruster_img" src="/assets/images/img_oxylite.webp" width={25} height={28} alt="Oxylite" unoptimized />
          </div>
          <div className="ForThruster_name">Oxylite</div>
          <div className="ForThruster_required">{required.toLocaleString()}kg</div>
        </li>
        <li className="ForThruster_item">
          <div className="ForThruster_image">
            <Image className="ForThruster_img" src="/assets/images/img_iron.webp" width={25} height={29} alt="Iron" unoptimized />
          </div>
          <div className="ForThruster_name">Iron</div>
          <div className="ForThruster_required">{required.toLocaleString()}kg</div>
        </li>
      </ul>
    </div>
  </>
}

export default ForThruster
