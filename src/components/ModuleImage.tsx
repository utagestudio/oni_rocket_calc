import "./ModuleImage.sass"
import useModules from '@/hooks/useModules'

type Props = {
  module: tItem
}

function ModuleImage({module}: Props) {
  const {addModule, removeModule} = useModules()

  const build = () => {
    addModule(module)
  }

  const destroy = () => {
    removeModule(module)
  }

  return <>
    <div className="ModuleImage">
      <div className="ModuleImage_imageWrap">
        <img className="ModuleImage_image" src={`/assets/images/${module.image}`} srcSet={`/assets/images/${module.image2x} 2x, /assets/images/${module.image} 1x`} alt={module.name} />
      </div>
      <div className="ModuleImage_buttons">
        {module.multiple && <>
          <button className="ModuleImage_button -plus" onClick={build}>+</button>
          <button className="ModuleImage_button -minus" onClick={destroy}>-</button>
        </>}
      </div>
    </div>
  </>
}

export default ModuleImage
