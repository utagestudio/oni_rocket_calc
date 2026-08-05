"use client"
import React, {createContext, useEffect, useMemo, useReducer, useState} from 'react'
import data from '@/contents/data.json'
import {
  loadPersistedModuleState,
  savePersistedModuleState,
  type PersistedModuleState,
} from '@/lib/rocketPersistence'

export const ModuleContext = createContext<tModuleContext | undefined>(undefined)
const moduleGroups = data as tGroup[]

type Props = {
  children: React.ReactNode
}

type ModuleAction =
  | {type: 'SET_HEAD'; value: React.SetStateAction<tItem>}
  | {type: 'SET_ENGINE'; value: React.SetStateAction<tEngine>}
  | {type: 'SET_THRUSTER'; value: React.SetStateAction<tThruster[]>}
  | {type: 'SET_MODULES'; value: React.SetStateAction<tItem[]>}
  | {type: 'SET_FUEL_TANKS'; value: React.SetStateAction<tItem[]>}
  | {type: 'SET_OXIDIZER_TANKS'; value: React.SetStateAction<tItem[]>}
  | {type: 'SET_OXIDIZER_TYPE'; value: React.SetStateAction<tOxidizerType>}
  | {type: 'HYDRATE'; value: PersistedModuleState}
  | {type: 'RESTORE_INITIAL'}
  | {type: 'RESET'}

type ModuleState = Omit<tModuleContext, 'methods'>

function resolveStateAction<T>(currentValue: T, value: React.SetStateAction<T>) {
  return typeof value === 'function' ? (value as (prevValue: T) => T)(currentValue) : value
}

// data.json の selected フラグから、初回描画時点で選択済みになる単一パーツを取得する。
function findSelectedItem<T extends tModuleType>(type: T) {
  for (const group of moduleGroups) {
    const selectedItem = group.items.find(
      (item): item is Extract<tItem, {type: T}> => item.type === type && Boolean(item.selected),
    )
    if (selectedItem) return selectedItem
  }
  throw new Error(`selected item is not found: ${type}`)
}

function findItem<T extends tModuleType>(type: T, name: string) {
  for (const group of moduleGroups) {
    const item = group.items.find(
      (candidate): candidate is Extract<tItem, {type: T}> =>
        candidate.type === type && candidate.name === name,
    )
    if (item) return item
  }
  return undefined
}

// 複数積める通常モジュールは、ロケット表示順に合わせて order で並べておく。
function findSelectedModules() {
  return moduleGroups
    .flatMap((group) => group.items)
    .filter((item) => item.type === 'modules' && item.selected)
    .sort((a, b) => (a.order || 0) - (b.order || 0))
}

function createStateFromPersistedState(persistedState: PersistedModuleState): ModuleState {
  const initialState = createInitialState()
  const restoredModules = persistedState.moduleNames
    .map((name) => findItem('modules', name))
    .filter((item): item is tRocketModule => Boolean(item))
    .sort((a, b) => (a.order || 0) - (b.order || 0))

  return {
    ...initialState,
    head: findItem('head', persistedState.headName) || initialState.head,
    engine: findItem('engine', persistedState.engineName) || initialState.engine,
    thruster: persistedState.thrusterNames
      .map((name) => findItem('thruster', name))
      .filter((item): item is tThruster => Boolean(item)),
    modules: restoredModules,
    oxidizerType: persistedState.oxidizerType,
  }
}

function serializeModuleState(state: ModuleState): PersistedModuleState {
  return {
    headName: state.head.name,
    engineName: state.engine.name,
    thrusterNames: state.thruster.map((item) => item.name),
    moduleNames: state.modules.map((item) => item.name),
    oxidizerType: state.oxidizerType,
  }
}

function createInitialState(): ModuleState {
  return {
    head: findSelectedItem('head'),
    engine: findSelectedItem('engine'),
    thruster: [],
    modules: findSelectedModules(),
    fuelTanks: [],
    oxidizerTanks: [],
    oxidizerType: 'solid',
  }
}

function moduleReducer(state: ModuleState, action: ModuleAction): ModuleState {
  switch (action.type) {
    case 'SET_HEAD':
      return {...state, head: resolveStateAction(state.head, action.value)}
    case 'SET_ENGINE':
      return {...state, engine: resolveStateAction(state.engine, action.value)}
    case 'SET_THRUSTER':
      return {...state, thruster: resolveStateAction(state.thruster, action.value)}
    case 'SET_MODULES':
      return {...state, modules: resolveStateAction(state.modules, action.value)}
    case 'SET_FUEL_TANKS':
      return {...state, fuelTanks: resolveStateAction(state.fuelTanks, action.value)}
    case 'SET_OXIDIZER_TANKS':
      return {...state, oxidizerTanks: resolveStateAction(state.oxidizerTanks, action.value)}
    case 'SET_OXIDIZER_TYPE':
      return {...state, oxidizerType: resolveStateAction(state.oxidizerType, action.value)}
    case 'HYDRATE':
      return createStateFromPersistedState(action.value)
    case 'RESTORE_INITIAL':
      return createInitialState()
    case 'RESET':
      // エンジン選定は試行錯誤の前提として維持し、積載して試す部分だけを空に戻す。
      // タンク数はResults側で描画前に再計算されるため、古い構成由来の本数は持ち越さない。
      return {
        ...state,
        thruster: [],
        modules: [],
        fuelTanks: [],
        oxidizerTanks: [],
      }
    default:
      return state
  }
}

function ModulesProvider({children}: React.PropsWithChildren<Props>) {
  const [state, dispatch] = useReducer(moduleReducer, undefined, createInitialState)
  const [isPersistenceLoaded, setIsPersistenceLoaded] = useState(false)

  useEffect(() => {
    const persistedState = loadPersistedModuleState()
    if (persistedState) dispatch({type: 'HYDRATE', value: persistedState})
    setIsPersistenceLoaded(true)
  }, [])

  useEffect(() => {
    if (!isPersistenceLoaded) return
    savePersistedModuleState(serializeModuleState(state))
  }, [isPersistenceLoaded, state])

  // 既存の useModules 側の呼び出しを壊さないよう、React の setState と同じ形の関数を reducer action に変換する。
  const methods = useMemo(
    () => ({
      setHead: (value: React.SetStateAction<tItem>) => dispatch({type: 'SET_HEAD', value}),
      setEngine: (value: React.SetStateAction<tEngine>) => dispatch({type: 'SET_ENGINE', value}),
      setThruster: (value: React.SetStateAction<tThruster[]>) => dispatch({type: 'SET_THRUSTER', value}),
      setModules: (value: React.SetStateAction<tItem[]>) => dispatch({type: 'SET_MODULES', value}),
      setFuelTanks: (value: React.SetStateAction<tItem[]>) => dispatch({type: 'SET_FUEL_TANKS', value}),
      setOxidizerTanks: (value: React.SetStateAction<tItem[]>) =>
        dispatch({type: 'SET_OXIDIZER_TANKS', value}),
      setOxidizerType: (value: React.SetStateAction<tOxidizerType>) =>
        dispatch({type: 'SET_OXIDIZER_TYPE', value}),
      restorePersistedState: (value: PersistedModuleState | undefined) =>
        value ? dispatch({type: 'HYDRATE', value}) : dispatch({type: 'RESTORE_INITIAL'}),
      reset: () => dispatch({type: 'RESET'}),
    }),
    [],
  )

  const value = useMemo(
    () => ({
      ...state,
      methods,
    }),
    [state, methods],
  )

  return <>
    <ModuleContext.Provider value={value}>
      {children}
    </ModuleContext.Provider>
  </>
}

export default ModulesProvider
