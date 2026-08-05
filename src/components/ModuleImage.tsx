import "./ModuleImage.sass"
import useModules from '@/hooks/useModules'
import AssetImage from '@/components/AssetImage'

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
        <AssetImage
          className="ModuleImage_image"
          imageName={module.image}
          alt={module.name}
        />
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
