type tModuleContext = {
  head: tItem
  engine: tItem
  thruster: tItem[]
  modules: tItem[]
  methods: {
    setHead:  React.Dispatch<React.SetStateAction<tItem>>
    setEngine:   React.Dispatch<React.SetStateAction<tItem>>
    setThruster:  React.Dispatch<React.SetStateAction<tItem[]>>
    setModules:  React.Dispatch<React.SetStateAction<tItem[]>>
  }
}