"use client"

import './Rocket.sass'
import useModules from '@/hooks/useModules'
import ModuleImage from '@/components/ModuleImage'
type Props = {}

function Rocket({}: Props) {
  const modules = useModules()

  return <>
    <div className="Rocket">
      <div className="Rocket_wrap">
        <ul className="Rocket_modules">
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
      </div>
    </div>
  </>
}

export default Rocket
