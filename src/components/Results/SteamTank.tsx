import './SteamTank.sass'
import useAmount from '@/hooks/useAmount'
type Props = {
  required: number
}

function SteamTank({required}: Props) {
  const {isCalculating} = useAmount()

  return <>
    <div className="SteamTank">
      <ul className="SteamTank_list">
        <li className="SteamTank_item">
          <div className="SteamTank_image"><img className="SteamTank_img" src="/assets/images/img_steam_engine.webp" srcSet="/assets/images/img_steam_engine@2x.webp 1x, /assets/images/img_fuel_tank@2x.webp 2x" alt="" /></div>
          <div className="SteamTank_capacity">
            <div className="SteamTank_value">{isCalculating ? '---' : required.toLocaleString()}</div>
            <div className="SteamTank_unit">kg</div>
          </div>
        </li>
      </ul>
    </div>
  </>
}

export default SteamTank
