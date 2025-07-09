import styles from './Copyright.module.sass'
type Props = {}

function Copyright({}: Props) {
  return <>
    <div className={styles.copyright}>
      <div className={styles.text}>
        POWERED BY<br />
        UTAGE.GAMES
      </div>
    </div>
  </>
}

export default Copyright
