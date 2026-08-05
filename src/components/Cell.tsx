import styles from './Cell.module.sass'
import useModules from '@/hooks/useModules'
import Image from 'next/image'
import {getImageDimensions} from '@/lib/imageDimensions'
type Props = {
  item: tItem
}

function Cell({item}: Props) {
  const image = `/assets/images/${item.image}`
  const dimensions = getImageDimensions(item.image)
  const modules = useModules()

  return <>
    <div className={styles.Cell}>
      <div className={`${styles.frame} ${modules.includes(item) && styles.selected}`}>
        <div className={styles.image}>
          <Image src={image} width={dimensions.width} height={dimensions.height} alt={item.name} />
        </div>

        <div className={styles.name}>{item.name}</div>
      </div>
    </div>
  </>
}

export default Cell
