"use client"
import React, {useState, createContext, useEffect} from 'react'
import useAmount from '@/hooks/useAmount'

export const ModuleContext = createContext<tModuleContext>({} as tModuleContext)

type Props = {
  children: any
}

function ModulesProvider({children}: React.PropsWithChildren<Props>) {
  const {amountCalculate} = useAmount()
  const [head, setHead] = useState<tItem>({} as tItem)
  const [engine, setEngine] = useState<tItem>({} as tItem)
  const [thruster, setThruster] = useState<tItem[]>([] as tItem[])
  const [modules, setModules] = useState<tItem[]>([] as tItem[])
  const [fuelTanks, setFuelTanks] = useState<tItem[]>([] as tItem[])
  const [oxidizerTanks, setOxidizerTanks] = useState<tItem[]>([] as tItem[])
  const [oxidizerType, setOxidizerType] = useState<string>('solid')

  useEffect(() => {
    amountCalculate({head, engine, thruster, modules, fuelTanks, oxidizerTanks})
  }, [head, engine, thruster, modules, fuelTanks, oxidizerTanks])

  return <>
    <ModuleContext.Provider value={{head, engine, thruster, modules, fuelTanks, oxidizerTanks, oxidizerType, methods: {setHead, setEngine, setThruster, setModules, setFuelTanks, setOxidizerTanks, setOxidizerType}}}>
      {children}
    </ModuleContext.Provider>
  </>
}

export default ModulesProvider
