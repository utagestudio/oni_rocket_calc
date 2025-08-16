"use client"
import React, {useState, createContext} from 'react'

export const ModuleContext = createContext<tModuleContext>({} as tModuleContext)

type Props = {
  children: any
}

function ModulesProvider({children}: React.PropsWithChildren<Props>) {
  const [head, setHead] = useState<tItem>({} as tItem)
  const [engine, setEngine] = useState<tEngine>({} as tEngine)
  const [thruster, setThruster] = useState<tThruster[]>([] as tThruster[])
  const [modules, setModules] = useState<tItem[]>([] as tItem[])
  const [fuelTanks, setFuelTanks] = useState<tItem[]>([] as tItem[])
  const [oxidizerTanks, setOxidizerTanks] = useState<tItem[]>([] as tItem[])
  const [oxidizerType, setOxidizerType] = useState<string>('solid')

  return <>
    <ModuleContext.Provider value={{head, engine, thruster, modules, fuelTanks, oxidizerTanks, oxidizerType, methods: {setHead, setEngine, setThruster, setModules, setFuelTanks, setOxidizerTanks, setOxidizerType}}}>
      {children}
    </ModuleContext.Provider>
  </>
}

export default ModulesProvider
