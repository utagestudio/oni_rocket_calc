"use client"

import './Rocket.sass'
import useModules from '@/hooks/useModules'
import ModuleImage from '@/components/ModuleImage'
import SelectedModules from '@/components/Rocket/SelectedModules'
import {useCallback, useState} from 'react'
type Props = {}

function Rocket({}: Props) {
  const modules = useModules()
  const [isShowSelectedModuleArea, setIsShowSelectedModuleArea] = useState(false)

  const toggleSelectedModuleArea = useCallback(() => {
    setIsShowSelectedModuleArea(prev => !prev)
  }, [])

  return <>
    <div className="Rocket">
      <div className="Rocket_wrap">
        <div className={`Rocket_names ${isShowSelectedModuleArea ? '-show' : ''}`} ><SelectedModules isShown={isShowSelectedModuleArea} onToggle={toggleSelectedModuleArea} /></div>
        <ul className={`Rocket_modules ${isShowSelectedModuleArea ? '' : '-show'}`}>
          <li className="Rocket_module"><ModuleImage module={modules.head} /></li>
          { modules.modules.length > 0 && <>
            { modules.modules.map(((m, i) => {return <li className="Rocket_module" key={i}><ModuleImage module={m} /></li>})) }
          </>}
          { modules.fuelTanks.length > 0 && <>
            { modules.fuelTanks.map(((m, i) => {return <li className="Rocket_module" key={i}><ModuleImage module={m} /></li>})) }
          </>}
          { modules.oxidizerTanks.length > 0 && <>
            { modules.oxidizerTanks.map(((m, i) => {return <li className="Rocket_module" key={i}><ModuleImage module={m} /></li>})) }
          </>}
          { modules.thruster.length > 0 && <>
            { modules.thruster.map(((m, i) => {return <li className="Rocket_module" key={i}><ModuleImage module={m} /></li>})) }
          </>}
          <li className="Rocket_module"><ModuleImage module={modules.engine} /></li>
        </ul>
        <button className="Rocket_change" onClick={toggleSelectedModuleArea}>CHANGE</button>
      </div>
    </div>
  </>
}

export default Rocket
