"use client"
import {createContext, PropsWithChildren, ReactNode, useContext, useState} from 'react'

export const AmountContext = createContext<tAmountContext | undefined>(undefined)

type Props = {
  children: ReactNode
}

function AmountProvider({children}: PropsWithChildren<Props>) {
  const [amount, setAmount] = useState<number>(0)
  const [isCalculating, setIsCalculating] = useState<boolean>(false)

  return <>
    <AmountContext.Provider value={{amount, isCalculating, methods: {setAmount, setIsCalculating}}}>
      {children}
    </AmountContext.Provider>
  </>
}

// Provider 外で使われた場合に、空オブジェクト由来の実行時エラーではなく原因が分かる例外を出す。
export function useAmountContext() {
  const context = useContext(AmountContext)
  if (!context) {
    throw new Error('useAmountContext must be used within AmountProvider')
  }
  return context
}

export default AmountProvider
