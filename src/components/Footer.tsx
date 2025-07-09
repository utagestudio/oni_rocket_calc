import styles from './Footer.module.sass'
type Props = {}

function Footer({}: Props) {
  return <>
    <div className={styles.footer}>
      <div className={styles.wrap}>
        &copy;UTAGE.GAMES
      </div>
    </div>
  </>
}

export default Footer
