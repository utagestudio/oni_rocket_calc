"use client"
import {createContext, PropsWithChildren, useState} from 'react'

export const AmountContext = createContext<tAmountContext>({} as tAmountContext)

type Props = {
  children: any
}

function AmountProvider({children}: PropsWithChildren<Props>) {
  const [fuelAmount, setFuelAmount] = useState<number>(0)
  const [oxidizerAmount, setOxidizerAmount] = useState<number>(0)

  return <>
    <AmountContext.Provider value={{fuelAmount, oxidizerAmount, methods: {setFuelAmount, setOxidizerAmount}}}>
      {children}
    </AmountContext.Provider>
  </>
}

export default AmountProvider