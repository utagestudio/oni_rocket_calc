"use client"
import React, {useState, createContext} from 'react'
import data from '@/contents/data.json'

export const ModuleContext = createContext<tModuleContext>({} as tModuleContext)
const moduleGroups = data as tGroup[]

type Props = {
  children: any
}

// data.json の selected フラグから、初回描画時点で選択済みになる単一パーツを取得する。
function findSelectedItem(type: string) {
  for (const group of moduleGroups) {
    const selectedItem = group.items.find((item) => item.type === type && item.selected)
    if (selectedItem) return selectedItem
  }
  return {} as tItem
}

// 複数積める通常モジュールは、ロケット表示順に合わせて order で並べておく。
function findSelectedModules() {
  return moduleGroups
    .flatMap((group) => group.items)
    .filter((item) => item.type === 'modules' && item.selected)
    .sort((a, b) => (a.order || 0) - (b.order || 0))
}

function ModulesProvider({children}: React.PropsWithChildren<Props>) {
  const [head, setHead] = useState<tItem>(() => findSelectedItem('head'))
  const [engine, setEngine] = useState<tEngine>(() => findSelectedItem('engine') as tEngine)
  const [thruster, setThruster] = useState<tThruster[]>([] as tThruster[])
  const [modules, setModules] = useState<tItem[]>(() => findSelectedModules())
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
