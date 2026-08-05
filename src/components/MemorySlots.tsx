"use client"

import './MemorySlots.sass'
import useModules from '@/hooks/useModules'
import {useDistanceContext} from '@/provider/DistanceProvider'
import {
  loadActiveRocketMemorySlotIndex,
  loadRocketMemorySlot,
  ROCKET_MEMORY_SLOT_COUNT,
  saveActiveRocketMemorySlotIndex,
  saveRocketMemorySlot,
} from '@/lib/rocketPersistence'
import {useCallback, useState} from 'react'

type Props = {}

const DEFAULT_DISTANCE = 10000

function MemorySlots({}: Props) {
  const {head, engine, thruster, modules, oxidizerType, restorePersistedState} = useModules()
  const {distance, methods: {setDistance}} = useDistanceContext()
  const [activeSlotIndex, setActiveSlotIndex] = useState(loadActiveRocketMemorySlotIndex)

  const selectSlot = useCallback((slotIndex: number) => {
    saveRocketMemorySlot(activeSlotIndex, {
      moduleState: {
        headName: head.name,
        engineName: engine.name,
        thrusterNames: thruster.map((item) => item.name),
        moduleNames: modules.map((item) => item.name),
        oxidizerType,
      },
      distance,
    })

    saveActiveRocketMemorySlotIndex(slotIndex)
    setActiveSlotIndex(slotIndex)

    const memorySlot = loadRocketMemorySlot(slotIndex)
    restorePersistedState(memorySlot?.moduleState)
    setDistance(memorySlot?.distance || DEFAULT_DISTANCE)
  }, [activeSlotIndex, distance, engine, head, modules, oxidizerType, restorePersistedState, setDistance, thruster])

  return (
    <div className="MemorySlots" aria-label="Rocket memory slots">
      {Array.from({length: ROCKET_MEMORY_SLOT_COUNT}, (_, slotIndex) => (
        <button
          type="button"
          className={`MemorySlots_button ${activeSlotIndex === slotIndex ? '-active' : ''}`}
          onClick={() => selectSlot(slotIndex)}
          aria-pressed={activeSlotIndex === slotIndex}
          key={`memory-slot-${slotIndex}`}
        >
          Slot {slotIndex + 1}
        </button>
      ))}
    </div>
  )
}

export default MemorySlots
