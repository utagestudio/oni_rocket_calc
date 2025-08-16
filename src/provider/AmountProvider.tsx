"use client"
import {createContext, PropsWithChildren, useState} from 'react'

export const AmountContext = createContext<tAmountContext>({} as tAmountContext)

type Props = {
  children: any
}

function AmountProvider({children}: PropsWithChildren<Props>) {
  const [amount, setAmount] = useState<number>(0)

  return <>
    <AmountContext.Provider value={{amount, methods: {setAmount}}}>
      {children}
    </AmountContext.Provider>
  </>
}

export default AmountProvider