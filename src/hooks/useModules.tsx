import {useContext} from 'react'
import {ModuleContext} from '@/provider/ModulesProvider'
import data from '@/contents/data.json'

function useModules() {
  const modules = useContext<tModuleContext>(ModuleContext)

  const addModule = (item:tItem) => {
    console.log('add', item.name)
    let foundItem:tItem | undefined = undefined
    for(let i = 0; i < data.length; i++) {
      const group = data[i]
      foundItem = group.items.find((i) => i.name === item.name)
      if(foundItem) break
    }
    switch(foundItem?.type){
      case 'head':
        modules.methods.setHead(foundItem)
        break
      case 'engine':
        modules.methods.setEngine(foundItem)
        break
      case 'thruster':
        modules.methods.setThruster(modules.thruster.concat(foundItem))
        break
      case 'modules':
        modules.methods.setModules(modules.modules.concat(foundItem))
        break
    }
  }

  const removeModule = (item:tItem) => {
    console.log('remove', item.name)
    if (item.type === 'thruster') {
      modules.methods.setThruster(modules.thruster.slice(0, modules.thruster.length - 1))
    } else if (item.type === 'modules') {
      const index = modules.modules.findIndex(m => m.name === item.name)
      if(index === -1) return
      const copiedModules = [...modules.modules]
      copiedModules.splice(index, 1)
      modules.methods.setModules(copiedModules)
    }
  }

  const includes = (item:tItem) => {
    if(item.type === 'head') return modules.head.name === item.name
    else if (item.type === 'engine') return modules.engine.name === item.name
    else if (item.type === 'thruster') return modules.thruster.length > 0
    else if (item.type === 'modules') return modules.modules.some( m => m.name === item.name)
  }

  return {
    head: modules.head,
    engine: modules.engine,
    thruster: modules.thruster,
    modules: modules.modules,
    addModule,
    removeModule,
    includes
  }

}

export default useModules
