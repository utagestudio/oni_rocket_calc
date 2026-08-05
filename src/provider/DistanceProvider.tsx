"use client"
import React, {useEffect, useState, createContext, useContext} from 'react'
import {loadPersistedDistance, savePersistedDistance} from '@/lib/rocketPersistence'

export const DistanceContext = createContext<tDistanceContext | undefined>(undefined)

type Props = {
  children: React.ReactNode
}

function DistanceProvider({children}: React.PropsWithChildren<Props>) {
  const [distance, setDistance] = useState<number>(10000)
  const [isPersistenceLoaded, setIsPersistenceLoaded] = useState(false)

  useEffect(() => {
    // 距離もアクティブなロケットスロットに紐づくため、初回 mount 後に保存値を読む。
    const persistedDistance = loadPersistedDistance()
    if (persistedDistance) setDistance(persistedDistance)
    setIsPersistenceLoaded(true)
  }, [])

  useEffect(() => {
    // 復元前にデフォルト距離を書き込まないよう、読み込み完了後だけ保存する。
    if (!isPersistenceLoaded) return
    savePersistedDistance(distance)
  }, [distance, isPersistenceLoaded])

  return <>
    <DistanceContext.Provider value={{distance, methods: {setDistance}}}>
      {children}
    </DistanceContext.Provider>
  </>
}

// Provider 外で使われた場合に、距離状態が未初期化であることを明示する。
export function useDistanceContext() {
  const context = useContext(DistanceContext)
  if (!context) {
    throw new Error('useDistanceContext must be used within DistanceProvider')
  }
  return context
}

export default DistanceProvider
