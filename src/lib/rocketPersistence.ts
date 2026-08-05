const MODULE_STORAGE_KEY = 'oniRocketCalc.modules.v1'
const DISTANCE_STORAGE_KEY = 'oniRocketCalc.distance.v1'
const ACTIVE_MEMORY_SLOT_KEY = 'oniRocketCalc.activeMemorySlot.v1'
const MEMORY_SLOT_KEY_PREFIX = 'oniRocketCalc.memorySlot'

export const ROCKET_MEMORY_SLOT_COUNT = 5

export type PersistedModuleState = tPersistedModuleState

export type RocketMemorySlot = {
  moduleState?: PersistedModuleState
  distance?: number
}

export function loadPersistedModuleState(): PersistedModuleState | undefined {
  const storage = getLocalStorage()
  if (!storage) return undefined

  try {
    const memorySlot = loadRocketMemorySlot(loadActiveRocketMemorySlotIndex())
    if (memorySlot?.moduleState) return memorySlot.moduleState

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
    saveRocketMemorySlot(loadActiveRocketMemorySlotIndex(), {moduleState: value})
    storage.setItem(MODULE_STORAGE_KEY, JSON.stringify(value))
  } catch {
    // Storage can be unavailable or full. In that case the app should keep working without persistence.
  }
}

export function loadPersistedDistance(): number | undefined {
  const storage = getLocalStorage()
  if (!storage) return undefined

  try {
    const memorySlot = loadRocketMemorySlot(loadActiveRocketMemorySlotIndex())
    if (isValidDistance(memorySlot?.distance)) return memorySlot.distance

    const rawValue = storage.getItem(DISTANCE_STORAGE_KEY)
    if (!rawValue) return undefined

    const value: unknown = JSON.parse(rawValue)
    if (!isValidDistance(value)) return undefined

    return value
  } catch {
    return undefined
  }
}

export function savePersistedDistance(value: number) {
  const storage = getLocalStorage()
  if (!storage) return

  try {
    saveRocketMemorySlot(loadActiveRocketMemorySlotIndex(), {distance: value})
    storage.setItem(DISTANCE_STORAGE_KEY, JSON.stringify(value))
  } catch {
    // Storage can be unavailable or full. In that case the app should keep working without persistence.
  }
}

export function loadActiveRocketMemorySlotIndex() {
  const storage = getLocalStorage()
  if (!storage) return 0

  try {
    const rawValue = storage.getItem(ACTIVE_MEMORY_SLOT_KEY)
    if (!rawValue) return 0

    const value: unknown = JSON.parse(rawValue)
    if (!isValidSlotIndex(value)) return 0

    return value
  } catch {
    return 0
  }
}

export function saveActiveRocketMemorySlotIndex(value: number) {
  const storage = getLocalStorage()
  if (!storage || !isValidSlotIndex(value)) return

  try {
    storage.setItem(ACTIVE_MEMORY_SLOT_KEY, JSON.stringify(value))
  } catch {
    // Storage can be unavailable or full. In that case the app should keep working without persistence.
  }
}

export function loadRocketMemorySlot(slotIndex: number): RocketMemorySlot | undefined {
  const storage = getLocalStorage()
  if (!storage || !isValidSlotIndex(slotIndex)) return undefined

  try {
    const rawValue = storage.getItem(createMemorySlotKey(slotIndex))
    if (!rawValue) return undefined

    const value: unknown = JSON.parse(rawValue)
    if (!isRocketMemorySlot(value)) return undefined

    return value
  } catch {
    return undefined
  }
}

export function saveRocketMemorySlot(slotIndex: number, value: RocketMemorySlot) {
  const storage = getLocalStorage()
  if (!storage || !isValidSlotIndex(slotIndex)) return

  try {
    const currentSlot = loadRocketMemorySlot(slotIndex) || {}
    storage.setItem(createMemorySlotKey(slotIndex), JSON.stringify({...currentSlot, ...value}))
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

function createMemorySlotKey(slotIndex: number) {
  return `${MEMORY_SLOT_KEY_PREFIX}.${slotIndex + 1}.v1`
}

function isValidSlotIndex(value: unknown): value is number {
  return (
    typeof value === 'number' &&
    Number.isInteger(value) &&
    value >= 0 &&
    value < ROCKET_MEMORY_SLOT_COUNT
  )
}

function isValidDistance(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value) && value > 0
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

function isRocketMemorySlot(value: unknown): value is RocketMemorySlot {
  if (!value || typeof value !== 'object') return false

  const candidate = value as Partial<RocketMemorySlot>
  return (
    (candidate.moduleState === undefined || isPersistedModuleState(candidate.moduleState)) &&
    (candidate.distance === undefined || isValidDistance(candidate.distance))
  )
}
