import {ImgHTMLAttributes} from 'react'
import {getImageDimensions, getImageSourceSet, getStandardImagePath} from '@/lib/imageDimensions'

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet' | 'width' | 'height'> & {
  imageName: string
}

function AssetImage({imageName, alt, ...props}: Props) {
  const dimensions = getImageDimensions(imageName)

  return (
    <img
      {...props}
      src={getStandardImagePath(imageName)}
      srcSet={getImageSourceSet(imageName)}
      width={dimensions.width}
      height={dimensions.height}
      alt={alt}
    />
  )
}

export default AssetImage
