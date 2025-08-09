type tAmountContext = {
  fuelAmount: number,
  oxidizerAmount: number,
  methods: {
    setFuelAmount: React.Dispatch<React.SetStateAction<number>>,
    setOxidizerAmount: React.Dispatch<React.SetStateAction<number>>,
  }
}