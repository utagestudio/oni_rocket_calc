import styles from './Footer.module.sass'
import {CONTACT_FORM_URL} from '@/lib/product'
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
        <a href={CONTACT_FORM_URL} target='_blank' rel='noopener noreferrer' className={styles.anchor}>
          Contact form (bugs, requests, questions; no account required)
        </a>
      </span>

      <span className={styles.wrap}>/</span>

      <span className={styles.wrap}>
        <a href='https://github.com/utagestudio/oni_rocket_calc/issues' target='_blank' className={styles.anchor}>
          Issue Tracker (GitHub account required)
        </a>
      </span>

      <span className={styles.wrap}>/</span>

      <span className={styles.wrap}>
        <a href='https://oxygennotincluded.wiki.gg/' target='_blank' className={styles.anchor}>
          The Oxygen Not Included Wiki
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
