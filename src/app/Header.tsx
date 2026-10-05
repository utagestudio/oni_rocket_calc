import './Header.sass'
import Image from 'next/image'
import {PRODUCT_NAME, PRODUCT_VERSION} from '@/lib/product'
import CalculatorHelp from '@/components/CalculatorHelp'
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
      <span className="Header_version">Ver.{PRODUCT_VERSION}</span>
      <div className="Header_usage"><span className="Header_desktopUsage">Usage:
        <Image className="Header_mouse -left" src="/assets/images/ico_left_click.svg" alt="left click" width={13} height={18} unoptimized />
        Add Module
        <Image className="Header_mouse -right" src="/assets/images/ico_right_click.svg" alt="right click" width={13} height={18} unoptimized />
        Remove Module
        </span>
        <span className="Header_touchUsage">Tap to select / add · − to remove</span>
        <CalculatorHelp />
      </div>
    </header>
  </>
}

export default Header
