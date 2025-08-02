import './ForThruster.sass'
import useModules from '@/hooks/useModules'
type Props = {}

function ForThruster({}: Props) {
  const {thruster} = useModules()
  const required = 400 * thruster.length
  return <>
    <div className="ForThruster">
      <ul className="ForThruster_list">
        <li className="ForThruster_item">
          <div className="ForThruster_image"><img className="ForThruster_img" src={`/assets/images/img_oxylite.webp`}
               srcSet={`/assets/images/img_oxylite.webp 1x, /assets/images/img_oxylite@2x.webp 2x`}
               alt="Oxylite"/></div>
          <div className="ForThruster_name">Oxylite</div>
          <div className="ForThruster_required">{required.toLocaleString()}kg</div>
        </li>
        <li className="ForThruster_item">
          <div className="ForThruster_image"><img className="ForThruster_img" src={`/assets/images/img_iron.webp`}
                                                  srcSet={`/assets/images/img_iron.webp 1x, /assets/images/img_iron@2x.webp 2x`}
                                                  alt="Iron"/></div>
          <div className="ForThruster_name">Iron</div>
          <div className="ForThruster_required">{required.toLocaleString()}kg</div>
        </li>
      </ul>
    </div>
  </>
}

export default ForThruster
