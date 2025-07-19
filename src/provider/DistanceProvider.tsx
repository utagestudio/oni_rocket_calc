"use client"
import React, {useState, createContext} from 'react'

export const DistanceContext = createContext<tDistanceContext>({} as tDistanceContext)

type Props = {
  children: any
}

function DistanceProvider({children}: React.PropsWithChildren<Props>) {
  const [distance, setDistance] = useState<number>(0)

  return <>
    <DistanceContext.Provider value={{distance, methods: {setDistance}}}>
      {children}
    </DistanceContext.Provider>
  </>
}

export default DistanceProvider
