"use client"

import './Results.sass'
import SelectedModules from '@/components/Results/SelectedModules'
import FuelTank from '@/components/Results/FuelTank'
import OxidizerTank from '@/components/Results/OxidizerTank'
import useModules from '@/hooks/useModules'
import ForThruster from '@/components/Results/ForThruster'
import useAmount from '@/hooks/useAmount'
import {useCallback, useContext, useEffect, useMemo, useState} from 'react'
import {useDebounce} from 'react-use'
import {DistanceContext} from '@/provider/DistanceProvider'
import SteamTank from '@/components/Results/SteamTank'
type Props = {}

function Results({}: Props) {
  const {head, engine, thruster, modules, fuelTanks,oxidizerTanks,oxidizerType} = useModules()
  const {amount, isCalculating, amountCalculate, setIsCalculating} = useAmount()
  const {distance} = useContext<tDistanceContext>(DistanceContext)
  const [isShowSelectedModuleArea, setIsShowSelectedModuleArea] = useState(false)

  // 依存値を1つのオブジェクトにまとめてメモ化
  const params = useMemo(() => ({
    head, engine, thruster, modules, oxidizerType, distance
  }), [head, engine, thruster, modules, oxidizerType, distance])

  // amountCalculate をDebounce
  useDebounce(() => {
    amountCalculate(params)
  }, 1000, [params])

  // paramsに変更があった時点で、loadingにする
  useEffect(() => {
    setIsCalculating(true)
  }, [params]);

  const toggleSelectedModuleArea = useCallback(() => {
    setIsShowSelectedModuleArea(prev => !prev)
  }, [])

  return <>
    <div className="Results">
      <div className="Results_wrap">
        <div className={`Results_cell -selected ${isShowSelectedModuleArea ? '-show' : ''}`}>
          <div className="Results_title">Selected Modules</div>
          <div className="Results_content"><SelectedModules isShown={isShowSelectedModuleArea} onToggle={toggleSelectedModuleArea} /></div>
        </div>

        {amount < 0 &&
          <div className="Results_cell -unreached">
            <div className="Results_content -unreached">
              {isCalculating ? '---' : 'Unreached'}
            </div>
          </div>
        }
        {amount >= 0 && <>
          {engine.name === "Steam Engine" &&
            <div className="Results_cell -steam">
              <div className="Results_title">Steam</div>
              <div className="Results_content">
                <SteamTank required={amount} />
              </div>
            </div>
          }

          {engine.name !== "Steam Engine" && <>
            <div className="Results_cell -fuel">
              <div className="Results_title">Fuel Tanks</div>
              <div className="Results_content">
                <FuelTank required={amount} />
              </div>
            </div>
            <div className="Results_cell -oxidizer">
              <div className="Results_title">Oxidizer Tanks</div>
              <div className="Results_content">
                <OxidizerTank required={amount} />
              </div>
            </div>
          </>}

          {thruster.length > 0 && <>
            <div className="Results_cell -thruster">
              <div className="Results_title">For Thruster</div>
              <div className="Results_content">
                <ForThruster />
              </div>
            </div>
          </>}
          <div className="Results_cell -amount">
            <div className="Results_title">Fuel Amount</div>
            <div className="Results_content -amount">
              <div className="Results_total">{isCalculating ? '---' :amount.toLocaleString()}</div>kg
            </div>
          </div>
        </>}

      </div>
    </div>
  </>
}

export default Results
