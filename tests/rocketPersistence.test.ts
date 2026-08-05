import assert from 'node:assert/strict'
import test, {beforeEach} from 'node:test'

import {
  loadActiveRocketMemorySlotIndex,
  loadPersistedDistance,
  loadPersistedModuleState,
  loadRocketMemorySlot,
  saveActiveRocketMemorySlotIndex,
  savePersistedDistance,
  savePersistedModuleState,
  clearRocketMemorySlot,
} from '../src/lib/rocketPersistence'

const moduleState: tPersistedModuleState = {
  headName: 'Command Capsule',
  engineName: 'Petroleum Engine',
  thrusterNames: ['Solid Fuel Thruster'],
  moduleNames: ['Cargo Bay', 'Research Module'],
  oxidizerType: 'liquid',
}

beforeEach(() => {
  const values = new Map<string, string>()

  Object.defineProperty(globalThis, 'window', {
    configurable: true,
    value: {
      localStorage: {
        getItem: (key: string) => values.get(key) || null,
        setItem: (key: string, value: string) => values.set(key, value),
        removeItem: (key: string) => values.delete(key),
      },
    },
  })
})

test('persists rocket state in the active memory slot', () => {
  saveActiveRocketMemorySlotIndex(2)
  savePersistedModuleState(moduleState)
  savePersistedDistance(40_000)

  assert.equal(loadActiveRocketMemorySlotIndex(), 2)
  assert.deepEqual(loadPersistedModuleState(), moduleState)
  assert.equal(loadPersistedDistance(), 40_000)
  assert.deepEqual(loadRocketMemorySlot(2), {
    moduleState,
    distance: 40_000,
  })
})

test('ignores invalid memory slot indexes', () => {
  saveActiveRocketMemorySlotIndex(99)

  assert.equal(loadActiveRocketMemorySlotIndex(), 0)
})

test('clears a rocket memory slot', () => {
  saveActiveRocketMemorySlotIndex(1)
  savePersistedModuleState(moduleState)
  savePersistedDistance(30_000)

  clearRocketMemorySlot(1)

  assert.equal(loadRocketMemorySlot(1), undefined)
})
