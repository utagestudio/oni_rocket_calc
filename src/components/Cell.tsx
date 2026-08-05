import styles from './Cell.module.sass'
import useModules from '@/hooks/useModules'
import AssetImage from '@/components/AssetImage'
type Props = {
  item: tItem
}

function Cell({item}: Props) {
  const modules = useModules()

  return <>
    <div className={styles.Cell}>
      <div className={`${styles.frame} ${modules.includes(item) && styles.selected}`}>
        <div className={styles.image}>
          <AssetImage imageName={item.image} alt={item.name} />
        </div>

        <div className={styles.name}>{item.name}</div>
      </div>
    </div>
  </>
}

export default Cell
