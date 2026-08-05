import "./ModuleImage.sass"
import useModules from '@/hooks/useModules'
import Image from 'next/image'
import {getImageDimensions} from '@/lib/imageDimensions'

type Props = {
  module: tItem
}

function ModuleImage({module}: Props) {
  const {addModule, removeModule} = useModules()
  const dimensions = getImageDimensions(module.image)

  const build = () => {
    addModule(module)
  }

  const destroy = () => {
    removeModule(module)
  }

  return <>
    <div className="ModuleImage">
      <div className="ModuleImage_imageWrap">
        <Image
          className="ModuleImage_image"
          src={`/assets/images/${module.image}`}
          width={dimensions.width}
          height={dimensions.height}
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
