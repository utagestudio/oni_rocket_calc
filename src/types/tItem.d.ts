type tItem = {
  type: string
  name: string
  order?: number
  selected?: boolean
  image: string
  image2x: string
  options?: boolean
  multiple?: boolean
  mass: number
};

type tEngine = tItem & {
  efficiency: number
};

type tThruster = tItem & {
  baseRange: number
};