import "./ModuleImage.sass"

type Props = {
  module: tItem
}

function ModuleImage({module}: Props) {
  return <>
    <div className="ModuleImage">
      <img className="ModuleImage_img" src={`/assets/images/${module.image}`} srcSet={`/assets/images/${module.image2x} 2x, /assets/images/${module.image} 1x`} alt={module.name} />
    </div>
  </>
}

export default ModuleImage
