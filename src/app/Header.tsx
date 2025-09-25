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
    </h1>
  </>
}

export default Header
