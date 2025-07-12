import styles from './Selection.module.sass'
import data from '@/contents/data.json'
import Group from '@/components/Group'
type Props = {}

function Selection({}: Props) {

  return <>
    <div className={styles.Selection}>
      {data && data.map((group) => <Group group={group} />)}
    </div>
  </>
}

export default Selection
