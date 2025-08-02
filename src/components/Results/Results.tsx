import './Results.sass'
import SelectedModules from '@/components/Results/SelectedModules'
import FuelTank from '@/components/Results/FuelTank'
import OxidizerTank from '@/components/Results/OxidizerTank'
type Props = {}

function Results({}: Props) {

  const fuel_required = 1234
  const oxidizer_required = 1234

  return <>
    <div className="Results">
      <div className="Results_wrap">
        <div className="Results_cell -selected">
          <div className="Results_title">Selected Modules</div>
          <div className="Results_content"><SelectedModules /></div>
        </div>
        <div className="Results_cell -fuel">
          <div className="Results_title">FUEL TANKS<div className="Results_total">REQUIRED: {fuel_required.toLocaleString()}kg</div></div>
          <div className="Results_content">
            <FuelTank required={fuel_required} />
          </div>
        </div>
        <div className="Results_cell -oxidizer">
          <div className="Results_title">OXIDIZER TANKS<div className="Results_total">REQUIRED: {oxidizer_required.toLocaleString()}kg</div></div>
          <div className="Results_content">
            <OxidizerTank required={oxidizer_required} />
          </div>
        </div>
        <div className="Results_cell -thruster">
          <div className="Results_title">For THRUSTER</div>
          <div className="Results_content"></div>
        </div>
      </div>
    </div>
  </>
}

export default Results
