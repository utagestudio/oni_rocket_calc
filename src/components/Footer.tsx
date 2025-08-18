import styles from './Footer.module.sass'
type Props = {}

function Footer({}: Props) {
  return <>
    <div className={styles.footer}>
      <span className={styles.wrap}>
        <a href='https://youtube.com/@utagegames' target='_blank' className={styles.anchor}>
          &copy;UTAGE.GAMES
        </a>
      </span>
      <span className={styles.wrap}>/</span>

      <span className={styles.wrap}>
        <a href='https://github.com/utagestudio/oni_rocket_calc/issues' target='_blank' className={styles.anchor}>
          Issue Tracker (バグ報告等）
        </a>
      </span>
    </div>
  </>
}

export default Footer
