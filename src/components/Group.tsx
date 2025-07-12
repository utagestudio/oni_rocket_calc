import styles from './Group.module.sass'
import Cell from '@/components/Cell'
type Props = {
  group: any
}

function Group({group}: Props) {
  return <>
    <div className={styles.Group}>
        <h1 className={styles.title}>{group.title}</h1>
        <div className={styles.items}>
          {group && group.items && group.items.map((item:tItem) => <>
            {item && item.options && <div className={styles.option}>+</div>}
            <div className={styles.item}><Cell item={item}/></div>
          </>)}
        </div>
    </div>
  </>
}

export default Group
