import './SelectedModules.sass'
import useModules from '@/hooks/useModules'
type Props = {
  isShown: boolean,
  onToggle: () => void
}

type GroupedModule = {
  key: string
  name: string
  count: number
}

function SelectedModules({isShown, onToggle}: Props) {
  const modules = useModules()

  const groupModulesModule = (modules: tItem[]) => {
    const grouped: Record<string, GroupedModule> = {}
    modules.forEach((module) => {
      // 表示名が同じでも種類が違う可能性を避けるため、集計キーにはtypeも含める。
      const key = `${module.type}:${module.name}`

      if( grouped[key] ) {
        grouped[key].count++
      } else {
        grouped[key] = {key, name: module.name, count: 1}
      }
    })
    return Object.values(grouped)
  }

  const groupedModules = groupModulesModule(modules.modules)

  return <>
    <div className="SelectedModules">
      <ul className="SelectedModules_list">
        <li className="SelectedModules_item">
          <div className="SelectedModules_name">{modules.head.name}</div>
          <div className="SelectedModules_number">x1</div>
        </li>
        { groupedModules.length > 0 && <>
          { groupedModules.map(((m) => {return <li className="SelectedModules_item" key={m.key}>
            <div className="SelectedModules_name">{m.name}</div>
            <div className="SelectedModules_number">x{m.count}</div>
          </li>})) }
        </>}
        { modules.thruster.length > 0 && <><li className="SelectedModules_item">
          <div className="SelectedModules_name">{modules.thruster[0].name}</div>
          <div className="SelectedModules_number">x{modules.thruster.length}</div>
        </li></>}
        <li className="SelectedModules_item">
          <div className="SelectedModules_name">{modules.engine.name}</div>
          <div className="SelectedModules_number">x1</div>
        </li>
      </ul>
   </div>
  </>
}

export default SelectedModules
