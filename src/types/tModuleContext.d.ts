type tModuleState = {
  head: tItem
  engine: tItem
  thruster: tItem[]
  modules: tItem[]
  fuelTanks: tItem[]
  oxidizerTanks: tItem[]
}

type tModuleContext = tModuleState & {
  oxidizerType: string
  methods: {
    setHead:  React.Dispatch<React.SetStateAction<tItem>>
    setEngine:   React.Dispatch<React.SetStateAction<tItem>>
    setThruster:  React.Dispatch<React.SetStateAction<tItem[]>>
    setModules:  React.Dispatch<React.SetStateAction<tItem[]>>
    setFuelTanks:  React.Dispatch<React.SetStateAction<tItem[]>>
    setOxidizerTanks:  React.Dispatch<React.SetStateAction<tItem[]>>
    setOxidizerType: React.Dispatch<React.SetStateAction<string>>
  }
}