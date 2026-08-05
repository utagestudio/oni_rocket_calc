"use client"
import React, {useState, createContext, useContext} from 'react'

export const DistanceContext = createContext<tDistanceContext | undefined>(undefined)

type Props = {
  children: React.ReactNode
}

function DistanceProvider({children}: React.PropsWithChildren<Props>) {
  const [distance, setDistance] = useState<number>(10000)

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
