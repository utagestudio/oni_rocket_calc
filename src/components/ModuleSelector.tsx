"use client"

import styles from './ModuleSelector.module.sass'
import data from '@/contents/data.json'
import Group from '@/components/Group'
type Props = {}

const moduleGroups = data as tGroup[]

function ModuleSelector({}: Props) {
  return <>
    <div className={styles.ModuleSelector}>
      {moduleGroups.map((group) => {
        if( group.isUnSelectable ) return
        return <Group group={group} key={group.title}/>
      })}
    </div>
  </>
}

export default ModuleSelector
