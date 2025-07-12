import styles from './Cell.module.sass'
type Props = {
  item: tItem
}

function Cell({item}: Props) {
  const image = `/assets/images/${item.image}`
  const image2x = `/assets/images/${item.image2x}`

  return <>
    <div className={styles.Cell}>
      <div className={styles.frame}>
        <div className={styles.image}><img src={image}
                                           srcSet={`${image2x} 2x, ${image} 1x`}
                                           alt={item.name} /></div>

        <div className={styles.name}>{item.name}</div>
      </div>
    </div>
  </>
}

export default Cell
