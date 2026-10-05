import styles from './Group.module.sass'
import Cell from '@/components/Cell'
import {useCallback} from 'react'
import useModules from '@/hooks/useModules'
type Props = {
  group: tGroup
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
        <h2 className={styles.title}>{group.title === 'HEAD' ? 'CAPSULES' : group.title === 'MODULES' ? 'ROCKET MODULES' : group.title}</h2>
        <div className={styles.items}>
          {group && group.items && group.items.map((item:tItem) => <div className={styles.wrap} key={item.name}>
            {item && item.options && <div className={styles.option}>+</div>}
            <div className={styles.item}>
              <button type="button" className={styles.select} aria-label={`${item.multiple ? 'Add' : 'Select'} ${item.name}`} aria-pressed={Boolean(modules.includes(item))} onClick={(e) => onClick(e, item)} onContextMenu={(e) => onRightClick(e, item)}><Cell item={item}/></button>
              {/* タッチ端末は右クリックできないため、同じ削除操作を選択欄からも提供する。 */}
              {item.multiple && <button type="button" className={styles.remove} aria-label={`Remove ${item.name}`} disabled={!modules.includes(item)} onClick={() => modules.removeModule(item)}>−</button>}
            </div>
          </div>)}
        </div>
    </div>
  </>
}

export default Group
