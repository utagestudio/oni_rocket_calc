import './ForThruster.sass'
import useModules from '@/hooks/useModules'
import AssetImage from '@/components/AssetImage'
type Props = {}

function ForThruster({}: Props) {
  const {thruster} = useModules()
  const required = 400 * thruster.length
  return <>
    <div className="ForThruster">
      <ul className="ForThruster_list">
        <li className="ForThruster_item">
          <div className="ForThruster_image">
            <AssetImage className="ForThruster_img" imageName="img_oxylite.webp" alt="Oxylite" />
          </div>
          <div className="ForThruster_name">Oxylite</div>
          <div className="ForThruster_required">{required.toLocaleString()}kg</div>
        </li>
        <li className="ForThruster_item">
          <div className="ForThruster_image">
            <AssetImage className="ForThruster_img" imageName="img_iron.webp" alt="Iron" />
          </div>
          <div className="ForThruster_name">Iron</div>
          <div className="ForThruster_required">{required.toLocaleString()}kg</div>
        </li>
      </ul>
    </div>
  </>
}

export default ForThruster
