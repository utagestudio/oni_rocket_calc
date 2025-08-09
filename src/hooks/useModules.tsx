import {useContext} from 'react'
import {ModuleContext} from '@/provider/ModulesProvider'
import data from '@/contents/data.json'

function useModules() {
  const modules = useContext<tModuleContext>(ModuleContext)

  const findItem = (itemName:string) => {
    let foundItem:tItem | undefined = undefined
    for(let i = 0; i < data.length; i++) {
      const group = data[i]
      foundItem = group.items.find((i) => i.name === itemName)
      if(foundItem) break
    }
    return foundItem
  }

  const addModule = (item:tItem) => {
    let foundItem:tItem | undefined = undefined
    foundItem = findItem(item.name)
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
        const new_modules = modules.modules.concat(foundItem)
        new_modules.sort((a, b) => (a.order || 0) - (b.order || 0))
        modules.methods.setModules(new_modules)
        break
      case 'fuel':
        modules.methods.setFuelTanks(modules.fuelTanks.concat(foundItem))
        break
      case 'oxidizer':
        modules.methods.setOxidizerTanks(modules.oxidizerTanks.concat(foundItem))
        break
    }
  }

  const removeModule = (item:tItem) => {
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

  const reset = () => {
    modules.methods.setThruster([])
    modules.methods.setModules([])
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
    reset,
    includes
  }

}

export default useModules
