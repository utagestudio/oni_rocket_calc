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

      <span className={styles.wrap}>/</span>

      <span className={styles.wrap}>
        <a href='https://store.steampowered.com/app/457140/Oxygen_Not_Included/' target='_blank' className={styles.anchor}>
          Oxygen Not Included
        </a>
      </span>

      <span className={styles.wrap}>/</span>

      <span className={styles.wrap}>
        <a href='https://www.klei.com/' target='_blank' className={styles.anchor}>
          Klei Entertainment
        </a>
      </span>
    </div>
  </>
}

export default Footer
