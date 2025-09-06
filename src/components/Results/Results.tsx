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
import FuelAmount from '@/components/Results/FuelAmount'
type Props = {}

function Results({}: Props) {
  const {head, engine, thruster, modules, oxidizerType} = useModules()
  const {amount,  amountCalculate, setIsCalculating} = useAmount()
  const {distance} = useContext<tDistanceContext>(DistanceContext)
  const [isShowSelectedModuleArea, setIsShowSelectedModuleArea] = useState(false)
  const [numberOfFuelTanks, setNumberOfFuelTanks] = useState(0)
  const [numberOfOxidizerTanks, setNumberOfOxidizerTanks] = useState(0)

  // 依存値を1つのオブジェクトにまとめてメモ化
  const params = useMemo(() => ({
    head, engine, thruster, modules, oxidizerType, distance
  }), [head, engine, thruster, modules, oxidizerType, distance])

  // amountCalculate をDebounce
  useDebounce(() => {
    const feasible = amountCalculate()
    if(feasible.feasible) {
      setNumberOfFuelTanks(feasible.fSegment)
      setNumberOfOxidizerTanks(feasible.oSegment)
    } else {
      setNumberOfFuelTanks(0)
      setNumberOfOxidizerTanks(0)
    }
    setIsCalculating(false)
  }, 200, [params])

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
        {<>
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
                <FuelTank required={amount} numberOfTanks={numberOfFuelTanks} />
              </div>
            </div>
            <div className="Results_cell -oxidizer">
              <div className="Results_title">Oxidizer Tanks</div>
              <div className="Results_content">
                <OxidizerTank required={amount} numberOfTanks={numberOfOxidizerTanks} />
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
              <FuelAmount />
            </div>
          </div>

        </>}

      </div>
    </div>
  </>
}

export default Results
