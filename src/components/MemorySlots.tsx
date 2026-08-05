"use client"

import './MemorySlots.sass'
import useModules from '@/hooks/useModules'
import {useDistanceContext} from '@/provider/DistanceProvider'
import {
  clearRocketMemorySlot,
  loadActiveRocketMemorySlotIndex,
  loadRocketMemorySlot,
  ROCKET_MEMORY_SLOT_COUNT,
  saveActiveRocketMemorySlotIndex,
  saveRocketMemorySlot,
} from '@/lib/rocketPersistence'
import {useCallback, useEffect, useState} from 'react'
import Image from 'next/image'

type Props = {}

const DEFAULT_DISTANCE = 10000

function MemorySlots({}: Props) {
  const {head, engine, thruster, modules, oxidizerType, restorePersistedState} = useModules()
  const {distance, methods: {setDistance}} = useDistanceContext()
  const [activeSlotIndex, setActiveSlotIndex] = useState(0)

  useEffect(() => {
    // 初回 SSR 時は localStorage を読めないため、mount 後に表示上の選択スロットを実データへ同期する。
    setActiveSlotIndex(loadActiveRocketMemorySlotIndex())
  }, [])

  const resetSlot = useCallback((slotIndex: number) => {
    const shouldReset = window.confirm(`Rocket ${slotIndex + 1} を初期状態に戻しますか？`)
    if (!shouldReset) return

    clearRocketMemorySlot(slotIndex)

    if (activeSlotIndex === slotIndex) {
      // 表示中のスロットを初期化した場合だけ、画面のロケット構成も即座に初期状態へ戻す。
      restorePersistedState(undefined)
      setDistance(DEFAULT_DISTANCE)
    }
  }, [activeSlotIndex, restorePersistedState, setDistance])

  const selectSlot = useCallback((slotIndex: number) => {
    // スロット切り替え直前に現在の構成を明示保存し、effect の非同期保存待ちで取りこぼさないようにする。
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

    // 空スロットなら undefined を渡し、Provider 側で初期状態へフォールバックする。
    const memorySlot = loadRocketMemorySlot(slotIndex)
    restorePersistedState(memorySlot?.moduleState)
    setDistance(memorySlot?.distance || DEFAULT_DISTANCE)
  }, [activeSlotIndex, distance, engine, head, modules, oxidizerType, restorePersistedState, setDistance, thruster])

  return (
    <div className="MemorySlots" aria-label="Rocket memory slots">
      {Array.from({length: ROCKET_MEMORY_SLOT_COUNT}, (_, slotIndex) => (
        <div className={`MemorySlots_item ${activeSlotIndex === slotIndex ? '-active' : ''}`} key={`memory-slot-${slotIndex}`}>
          <button
            type="button"
            className="MemorySlots_button"
            onClick={() => selectSlot(slotIndex)}
            aria-pressed={activeSlotIndex === slotIndex}
          >
            Rocket {slotIndex + 1}
          </button>
          <button
            type="button"
            className="MemorySlots_reset"
            onClick={() => resetSlot(slotIndex)}
            aria-label={`Reset Rocket ${slotIndex + 1}`}
          >
            <Image
              className="MemorySlots_resetIcon"
              src="/assets/images/ico_reset.svg"
              alt=""
              width={14}
              height={14}
              unoptimized
            />
          </button>
        </div>
      ))}
    </div>
  )
}

export default MemorySlots
