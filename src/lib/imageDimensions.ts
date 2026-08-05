type ImageDimensions = {
  width: number
  height: number
}

const imageDimensions: Record<string, ImageDimensions> = {
  img_biodiesel_engine: {width: 120, height: 93},
  img_biological_cargo_bay: {width: 81, height: 79},
  img_cargo_bay: {width: 99, height: 80},
  img_command_capsule: {width: 76, height: 67},
  img_fuel_tank: {width: 94, height: 85},
  img_gas_cargo_canister: {width: 98, height: 79},
  img_hydrogen_engine: {width: 110, height: 94},
  img_iron: {width: 25, height: 29},
  img_liquid_cargo_tank: {width: 91, height: 84},
  img_liquid_oxidizer_tank: {width: 82, height: 86},
  img_liquid_oxygen: {width: 25, height: 28},
  img_oxylite: {width: 25, height: 28},
  img_petroleum_engine: {width: 119, height: 96},
  img_research_module: {width: 101, height: 80},
  img_robo_pilot_capsule: {width: 77, height: 75},
  img_rocket: {width: 32, height: 32},
  img_sight_seeing_module: {width: 91, height: 83},
  img_solid_oxidizer_tank: {width: 82, height: 86},
  img_steam_engine: {width: 111, height: 85},
  img_temporal_tear: {width: 44, height: 44},
  img_terra_asteroid: {width: 44, height: 44},
  img_thruster: {width: 137, height: 92},
}

// data.json 由来の画像名でも next/image に必須の寸法を渡せるよう、拡張子を除いたキーで管理する。
export function getImageDimensions(imageName: string): ImageDimensions {
  const key = imageName.replace(/@2x|\.[^.]+$/g, '')
  const dimensions = imageDimensions[key]
  if (!dimensions) throw new Error(`image dimensions are not registered: ${imageName}`)
  return dimensions
}

function getImagePath(imageName: string) {
  return `/assets/images/${imageName}`
}

function getHighResolutionImageName(imageName: string) {
  return imageName.includes('@2x') ? imageName : imageName.replace(/(\.[^.]+)$/, '@2x$1')
}

// 公開版と同じく、ブラウザにDPI別の元画像を選ばせて小さい表示時のにじみを防ぐ。
export function getImageSourceSet(imageName: string) {
  return `${getImagePath(getHighResolutionImageName(imageName))} 2x, ${getImagePath(imageName)} 1x`
}

export function getStandardImagePath(imageName: string) {
  return getImagePath(imageName)
}
