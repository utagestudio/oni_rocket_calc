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
          <button type="button" className="ModuleImage_button -plus" aria-label={`Add another ${module.name}`} onClick={build}>+</button>
          <button type="button" className="ModuleImage_button -minus" aria-label={`Remove one ${module.name}`} onClick={destroy}>-</button>
        </>}
      </div>
    </div>
  </>
}

export default ModuleImage
