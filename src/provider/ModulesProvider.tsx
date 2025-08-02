"use client"
import React, {useState, createContext} from 'react'

export const ModuleContext = createContext<tModuleContext>({} as tModuleContext)

type Props = {
  children: any
}

function ModulesProvider({children}: React.PropsWithChildren<Props>) {
  const [head, setHead] = useState<tItem>({} as tItem)
  const [engine, setEngine] = useState<tItem>({} as tItem)
  const [thruster, setThruster] = useState<tItem[]>([] as tItem[])
  const [modules, setModules] = useState<tItem[]>([] as tItem[])
  const [fuelTanks, setFuelTanks] = useState<tItem[]>([] as tItem[])
  const [oxidizerTanks, setOxidizerTanks] = useState<tItem[]>([] as tItem[])

  return <>
    <ModuleContext.Provider value={{head, engine, thruster, modules, methods: {setHead, setEngine, setThruster, setModules}}}>
      {children}
    </ModuleContext.Provider>
  </>
}

export default ModulesProvider
