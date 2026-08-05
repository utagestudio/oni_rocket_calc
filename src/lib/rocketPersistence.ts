const MODULE_STORAGE_KEY = 'oniRocketCalc.modules.v1'
const DISTANCE_STORAGE_KEY = 'oniRocketCalc.distance.v1'

export type PersistedModuleState = {
  headName: string
  engineName: string
  thrusterNames: string[]
  moduleNames: string[]
  oxidizerType: tOxidizerType
}

export function loadPersistedModuleState(): PersistedModuleState | undefined {
  const storage = getLocalStorage()
  if (!storage) return undefined

  try {
    const rawValue = storage.getItem(MODULE_STORAGE_KEY)
    if (!rawValue) return undefined

    const value: unknown = JSON.parse(rawValue)
    if (!isPersistedModuleState(value)) return undefined

    return value
  } catch {
    return undefined
  }
}

export function savePersistedModuleState(value: PersistedModuleState) {
  const storage = getLocalStorage()
  if (!storage) return

  try {
    storage.setItem(MODULE_STORAGE_KEY, JSON.stringify(value))
  } catch {
    // Storage can be unavailable or full. In that case the app should keep working without persistence.
  }
}

export function loadPersistedDistance(): number | undefined {
  const storage = getLocalStorage()
  if (!storage) return undefined

  try {
    const rawValue = storage.getItem(DISTANCE_STORAGE_KEY)
    if (!rawValue) return undefined

    const value: unknown = JSON.parse(rawValue)
    if (typeof value !== 'number' || !Number.isFinite(value) || value <= 0) return undefined

    return value
  } catch {
    return undefined
  }
}

export function savePersistedDistance(value: number) {
  const storage = getLocalStorage()
  if (!storage) return

  try {
    storage.setItem(DISTANCE_STORAGE_KEY, JSON.stringify(value))
  } catch {
    // Storage can be unavailable or full. In that case the app should keep working without persistence.
  }
}

function getLocalStorage() {
  if (typeof window === 'undefined') return undefined

  try {
    if (typeof window.localStorage?.getItem !== 'function') return undefined
    if (typeof window.localStorage?.setItem !== 'function') return undefined
    return window.localStorage
  } catch {
    return undefined
  }
}

function isPersistedModuleState(value: unknown): value is PersistedModuleState {
  if (!value || typeof value !== 'object') return false

  const candidate = value as Partial<PersistedModuleState>
  return (
    typeof candidate.headName === 'string' &&
    typeof candidate.engineName === 'string' &&
    Array.isArray(candidate.thrusterNames) &&
    candidate.thrusterNames.every((name) => typeof name === 'string') &&
    Array.isArray(candidate.moduleNames) &&
    candidate.moduleNames.every((name) => typeof name === 'string') &&
    (candidate.oxidizerType === 'solid' || candidate.oxidizerType === 'liquid')
  )
}
