import styles from './Cell.module.sass'
import useModules from '@/hooks/useModules'
type Props = {
  item: tItem
}

function Cell({item}: Props) {
  const image = `/assets/images/${item.image}`
  const image2x = `/assets/images/${item.image2x}`
  const modules = useModules()

  return <>
    <div className={styles.Cell}>
      <div className={`${styles.frame} ${modules.includes(item) && styles.selected}`}>
        <div className={styles.image}><img src={image}
                                           srcSet={`${image2x} 2x, ${image} 1x`}
                                           alt={item.name} /></div>

        <div className={styles.name}>{item.name}</div>
      </div>
    </div>
  </>
}

export default Cell
