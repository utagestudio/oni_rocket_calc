import './Header.sass'
import Image from 'next/image'
import {PRODUCT_NAME, PRODUCT_VERSION} from '@/lib/product'
type Props = {}

// if it uses 'slot', you need to specify {children}: React.PropsWithChildren<Props>
function Header({}: Props) {
  // ... some codes

  return <>
    <header className="Header">
      <h1 className="Header_heading">
      <span className="Header_name">Oxygen Not Included</span>
      <span className="Header_title">{PRODUCT_NAME}</span>
      </h1>
      <div className="Header_version">Ver.{PRODUCT_VERSION}</div>
      <div className="Header_usage">Usage:
        <Image className="Header_mouse -left" src="/assets/images/ico_left_click.svg" alt="left click" width={13} height={18} unoptimized />
        Add Module
        <Image className="Header_mouse -right" src="/assets/images/ico_right_click.svg" alt="right click" width={13} height={18} unoptimized />
        Remove Module
      </div>
    </header>
  </>
}

export default Header
