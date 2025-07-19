"use client"
import styles from './ModuleSelector.module.sass'
import data from '@/contents/data.json'
import Group from '@/components/Group'
type Props = {}

function ModuleSelector({}: Props) {
  return <>
    <div className={styles.ModuleSelector}>
      {data && data.map((group) => <Group group={group} key={group.title} />)}
    </div>
  </>
}

export default ModuleSelector
