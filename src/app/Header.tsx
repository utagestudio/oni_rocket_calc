import './Header.sass'
import styles from '@/app/page.module.sass'
type Props = {}

// if it uses 'slot', you need to specify {children}: React.PropsWithChildren<Props>
function Header({}: Props) {
  // ... some codes

  return <>
    <h1 className="Header">
      <div className="Header_name">Oxygen Not Included</div>
      <div className="Header_title">Rocket Fuel Calculator</div>
      <div className="Header_version">Ver.gamma</div>
      <div className="Header_usage">Usage:
        <img className="Header_mouse -left" src={`/assets/images/ico_left_click.svg`} alt="left click" />
        Add Module
        <img className="Header_mouse -right" src={`/assets/images/ico_right_click.svg`} alt="right click" />
        Remove Module
      </div>
    </h1>
  </>
}

export default Header
