"use client"
import styles from './ModuleSelector.module.sass'
import data from '@/contents/data.json'
import Group from '@/components/Group'
import useModules from '@/hooks/useModules'
type Props = {}

function ModuleSelector({}: Props) {
  const modules = useModules()
  return <>
    <div className={styles.ModuleSelector}>
      {data && data.map((group) => <Group group={group} key={group.title} />)}
    </div>
    <div style={{'color': 'white'}}>{modules.head.name}</div>
    <div style={{'color': 'white'}}>{modules.engine.name}</div>
    <div style={{'color': 'white'}}>Thruster: {modules.thruster.length}</div>
    <div style={{'color': 'white'}}>{modules.modules.map(m => {return <p>{m.name}</p>})}</div>
  </>
}

export default ModuleSelector
