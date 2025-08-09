"use client"

import './Results.sass'
import SelectedModules from '@/components/Results/SelectedModules'
import FuelTank from '@/components/Results/FuelTank'
import OxidizerTank from '@/components/Results/OxidizerTank'
import useModules from '@/hooks/useModules'
import ForThruster from '@/components/Results/ForThruster'
import useAmount from '@/hooks/useAmount'
type Props = {}

function Results({}: Props) {
  const modules = useModules()
  const amount = useAmount()

  return <>
    <div className="Results">
      <div className="Results_wrap">
        <div className="Results_cell -selected">
          <div className="Results_title">Selected Modules</div>
          <div className="Results_content"><SelectedModules /></div>
        </div>
        <div className="Results_cell -fuel">
          <div className="Results_title">FUEL TANKS<div className="Results_total">REQUIRED: {amount.fuelAmount.toLocaleString()}kg</div></div>
          <div className="Results_content">
            <FuelTank required={amount.fuelAmount} />
          </div>
        </div>
        <div className="Results_cell -oxidizer">
          <div className="Results_title">OXIDIZER TANKS<div className="Results_total">REQUIRED: {amount.oxidizerAmount.toLocaleString()}kg</div></div>
          <div className="Results_content">
            <OxidizerTank required={amount.oxidizerAmount} />
          </div>
        </div>
        {modules.thruster.length > 0 && <>
          <div className="Results_cell -thruster">
            <div className="Results_title">For THRUSTER</div>
            <div className="Results_content">
              <ForThruster />
            </div>
          </div>
        </>}
      </div>
    </div>
  </>
}

export default Results
