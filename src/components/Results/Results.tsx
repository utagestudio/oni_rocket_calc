"use client"

import './Results.sass'
import SelectedModules from '@/components/Results/SelectedModules'
import FuelTank from '@/components/Results/FuelTank'
import OxidizerTank from '@/components/Results/OxidizerTank'
import useModules from '@/hooks/useModules'
import ForThruster from '@/components/Results/ForThruster'
import useAmount from '@/hooks/useAmount'
import {useContext, useMemo} from 'react'
import {useThrottleFn} from 'react-use'
import {DistanceContext} from '@/provider/DistanceProvider'
type Props = {}

function Results({}: Props) {
  const {head, engine, thruster, modules, fuelTanks,oxidizerTanks,oxidizerType} = useModules()
  const {amount, amountCalculate} = useAmount()
  const {distance} = useContext<tDistanceContext>(DistanceContext)

  // 依存値を1つのオブジェクトにまとめてメモ化
  const params = useMemo(() => ({
    head, engine, thruster, modules, fuelTanks, oxidizerTanks, oxidizerType, distance
  }), [head, engine, thruster, modules, fuelTanks, oxidizerTanks, oxidizerType, distance])

  // amountCalculate をスロットル（第三引数に依存配列が必要）
  useThrottleFn((p: typeof params) => {
    amountCalculate(p)
  }, 1000, [params])

  return <>
    <div className="Results">
      <div className="Results_wrap">
        <div className="Results_cell -selected">
          <div className="Results_title">Selected Modules</div>
          <div className="Results_content"><SelectedModules /></div>
        </div>
        <div className="Results_cell -fuel">
          <div className="Results_title">FUEL TANKS<div className="Results_total">REQUIRED: {amount.toLocaleString()}kg</div></div>
          <div className="Results_content">
            <FuelTank required={amount} />
          </div>
        </div>
        <div className="Results_cell -oxidizer">
          <div className="Results_title">OXIDIZER TANKS<div className="Results_total">REQUIRED: {amount.toLocaleString()}kg</div></div>
          <div className="Results_content">
            <OxidizerTank required={amount} />
          </div>
        </div>
        {thruster.length > 0 && <>
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
