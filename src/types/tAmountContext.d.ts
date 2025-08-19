type tAmountContext = {
  amount: number,
  isCalculating: boolean,
  methods: {
    setAmount: React.Dispatch<React.SetStateAction<number>>,
    setIsCalculating: React.Dispatch<React.SetStateAction<boolean>>
  }
}