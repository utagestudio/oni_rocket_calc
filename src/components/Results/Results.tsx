import './Results.sass'
import SelectedModules from '@/components/Results/SelectedModules'
type Props = {}

function Results({}: Props) {
  return <>
    <div className="Results">
      <div className="Results_wrap">
        <div className="Results_selected">
          <div className="Results_title">Selected Modules</div>
          <SelectedModules />
        </div>
        <div className="Results_fuel">
          <div className="Results_title">FUEL TANKS<div className="Results_total">1,000kg</div></div>
        </div>
        <div className="Results_oxidizer">
          <div className="Results_title">OXIDIZER TANKS<div className="Results_total">1,000kg</div></div>
        </div>
        <div className="Results_thruster">
          <div className="Results_title">For THRUSTER</div>
        </div>
      </div>
    </div>
  </>
}

export default Results
