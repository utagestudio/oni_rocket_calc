"use client"

import styles from './Copyright.module.sass'
type Props = {}

function Copyright({}: Props) {
  return <>
    <div className={styles.copyright}>
      <a href="https://youtube.com/@utagegames" target='_blank' className={styles.anchor}>
        <div className={styles.text}>
          POWERED BY<br />
          UTAGE.GAMES
        </div>
      </a>
    </div>
  </>
}

export default Copyright
