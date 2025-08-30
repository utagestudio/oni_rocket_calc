type tModuleState = {
  head: tItem
  engine: tEngine
  thruster: tThruster[]
  modules: tItem[]
  oxidizerType: string
}

type tModuleContext = tModuleState & {
  fuelTanks: tItem[]
  oxidizerTanks: tItem[]
  methods: {
    setHead:  React.Dispatch<React.SetStateAction<tItem>>
    setEngine:   React.Dispatch<React.SetStateAction<tEngine>>
    setThruster:  React.Dispatch<React.SetStateAction<tThruster[]>>
    setModules:  React.Dispatch<React.SetStateAction<tItem[]>>
    setFuelTanks:  React.Dispatch<React.SetStateAction<tItem[]>>
    setOxidizerTanks:  React.Dispatch<React.SetStateAction<tItem[]>>
    setOxidizerType: React.Dispatch<React.SetStateAction<string>>
  }
}