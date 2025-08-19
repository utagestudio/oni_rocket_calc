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
        modules.methods.setEngine(foundItem as tEngine)
        setupTanks(foundItem.name)
        break
      case 'thruster':
        modules.methods.setThruster(preValue => preValue.concat(foundItem as tThruster))
        break
      case 'modules':
        const new_modules = modules.modules.concat(foundItem)
        new_modules.sort((a, b) => (a.order || 0) - (b.order || 0))
        modules.methods.setModules(new_modules)
        break
      case 'fuel':
        modules.methods.setFuelTanks(preValue => preValue.concat(foundItem))
        break
      case 'oxidizer':
        modules.methods.setOxidizerTanks(preValue => preValue.concat(foundItem))
        break
    }
  }

  const setNumberOfFuelTank = (num:number) => {
    if(modules.engine.name === "Steam Engine") return
    const tanks = [] as tItem[]
    for(let i = 0; i < num; i++) {
      const tank = findItem("Fuel Tank")
      if(tank) tanks.push(tank)
    }
    modules.methods.setFuelTanks(tanks)
  }
  const setNumberOfOxidizerTank = (num:number) => {
    if(modules.engine.name === "Steam Engine") return
    const tanks = [] as tItem[]
    for(let i = 0; i < num; i++) {
      let tank: tItem | undefined = undefined
      if( modules.oxidizerType === 'solid') {
        tank = findItem("Solid Oxidizer Tank") as tItem
      } else {
        tank = findItem("Liquid Oxidizer Tank") as tItem
      }
      if(tank) tanks.push(tank)
    }
    modules.methods.setOxidizerTanks(tanks)
  }

  const addOxidizerTank = () => {
    if( modules.oxidizerType === 'solid') {
      addModule(findItem("Solid Oxidizer Tank") as tItem)
    } else {
      addModule(findItem("Liquid Oxidizer Tank") as tItem)
    }
  }

  const changeOxidizerTankByType = () => {
    const length = modules.oxidizerTanks.length
    modules.methods.setOxidizerTanks([])
    for(let i = 0; i < length; i++) {
      addOxidizerTank()
    }
  }

  const removeModule = (item:tItem) => {
    if (item.type === 'thruster') {
      modules.methods.setThruster(preValue => preValue.slice(0, modules.thruster.length - 1))
    } else if (item.type === 'fuel') {
      modules.methods.setFuelTanks(preValue => preValue.slice(0, modules.fuelTanks.length - 1))
    } else if (item.type === 'oxidizer') {
      modules.methods.setOxidizerTanks(preValue => preValue.slice(0, modules.oxidizerTanks.length - 1))
    } else if (item.type === 'modules') {
      modules.methods.setModules(preValue => {
        const index = preValue.findIndex(m => m.name === item.name)
        if(index === -1) return preValue
        const copiedModules = [...preValue]
        copiedModules.splice(index, 1)
        return copiedModules
      })
    }
  }

  const reset = () => {
    modules.methods.setThruster([])
    modules.methods.setModules([])
    setupTanks(modules.engine.name)
  }

  /**
   * Set the initial state of fuel tanks and oxidizer tanks
   * @param engineName {string} "Steam Engine" or others
   */
  const setupTanks = (engineName:string) => {
    if(engineName === "Steam Engine"){
      modules.methods.setFuelTanks([])
      modules.methods.setOxidizerTanks([])
    } else {
      if( modules.fuelTanks.length === 0 ){
        addModule(findItem("Fuel Tank") as tItem)
      }
      if( modules.oxidizerTanks.length === 0 ){
        addOxidizerTank()
      }
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
    fuelTanks: modules.fuelTanks,
    oxidizerTanks: modules.oxidizerTanks,
    oxidizerType: modules.oxidizerType,
    addModule,
    removeModule,
    addOxidizerTank,
    changeOxidizerTankByType,
    setNumberOfFuelTank,
    setNumberOfOxidizerTank,
    reset,
    includes,
    setOxidizerType: modules.methods.setOxidizerType,
  }

}

export default useModules
