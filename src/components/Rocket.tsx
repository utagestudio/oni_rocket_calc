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
        <ModuleImage module={modules.head} />
        { modules.modules.length > 0 && <>
          { modules.modules.map(m => {return <ModuleImage module={m} />}) }
        </>}
        { modules.thruster.length > 0 && <>
          { modules.thruster.map(m => {return <ModuleImage module={m} />}) }
        </>}
        <ModuleImage module={modules.engine} />
      </div>
    </div>
  </>
}

export default Rocket
