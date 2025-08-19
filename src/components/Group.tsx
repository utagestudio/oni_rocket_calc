import styles from './Group.module.sass'
import Cell from '@/components/Cell'
import {useCallback} from 'react'
import useModules from '@/hooks/useModules'
type Props = {
  group: any
}

function Group({group}: Props) {
  const modules = useModules()

  const onClick = useCallback((e: React.MouseEvent, item:tItem) => {
    modules.addModule(item)
  }, [modules])

  const onRightClick = useCallback((e: React.MouseEvent, item:tItem) => {
    e.preventDefault()
    modules.removeModule(item)
  }, [modules])

  return <>
    <div className={styles.Group}>
        <h1 className={styles.title}>{group.title}</h1>
        <div className={styles.items}>
          {group && group.items && group.items.map((item:tItem) => <div className={styles.wrap} key={item.name}>
            {item && item.options && <div className={styles.option}>+</div>}
            <div className={styles.item} onClick={(e) => onClick(e, item)} onContextMenu={(e) => onRightClick(e, item)}><Cell item={item}/></div>
          </div>)}
        </div>
    </div>
  </>
}

export default Group
