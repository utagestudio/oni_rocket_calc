"use client"
import styles from './ModuleSelector.module.sass'
import data from '@/contents/data.json'
import Group from '@/components/Group'
import {useEffect} from 'react'
import useModules from '@/hooks/useModules'
type Props = {}

function ModuleSelector({}: Props) {
  const modules = useModules()

  useEffect(() => {
    data && data.map((group) => {
      group.items.map((item) => {
        item.selected && modules.addModule(item)
      })
    })
  }, []);

  return <>
    <div className={styles.ModuleSelector}>
      {data && data.map((group) => <Group group={group} key={group.title} />)}
    </div>
  </>
}

export default ModuleSelector
