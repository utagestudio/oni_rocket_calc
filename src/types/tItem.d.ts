type tModuleType = 'head' | 'engine' | 'thruster' | 'modules' | 'fuel' | 'oxidizer'
type tOxidizerType = 'solid' | 'liquid'

type tBaseItem<T extends tModuleType = tModuleType> = {
  type: T
  name: string
  order?: number
  selected?: boolean
  image: string
  image2x: string
  options?: boolean
  multiple?: boolean
  mass: number
};

type tHead = tBaseItem<'head'>
type tRocketModule = tBaseItem<'modules'>
type tFuelTank = tBaseItem<'fuel'>
type tOxidizerTank = tBaseItem<'oxidizer'>

type tEngine = tBaseItem<'engine'> & {
  efficiency: number
};

type tThruster = tBaseItem<'thruster'> & {
  efficiency?: number
  baseRange: number
};

type tItem = tHead | tEngine | tThruster | tRocketModule | tFuelTank | tOxidizerTank
