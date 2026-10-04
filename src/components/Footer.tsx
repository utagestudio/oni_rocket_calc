import styles from './Footer.module.sass'
import {CONTACT_FORM_URL} from '@/lib/product'
import CookieConsent from './CookieConsent'
import {validGtmId} from '@/lib/cookieConsent'
type Props = {}

function Footer({}: Props) {
  const gtmId = validGtmId(process.env.GTM_ID)
  if (process.env.GTM_ID?.trim() && !gtmId) {
    console.error('GTM_ID must be a GTM container ID (GTM- followed by uppercase letters or digits).')
  }
  return <>
    <div className={styles.footer}>
      <div className={styles.links}>
        <span className={styles.wrap}>
          <a href='https://youtube.com/@utagegames' target='_blank' className={styles.anchor}>
            &copy;UTAGE.GAMES
          </a>
        </span>
        <span className={styles.wrap}>/</span>

        <span className={styles.wrap}>
          <a href={CONTACT_FORM_URL} target='_blank' rel='noopener noreferrer' className={styles.anchor}>
            Report bugs, Rquests
          </a>
        </span>

        <span className={styles.wrap}>/</span>

        <span className={styles.wrap}>
          <a href='https://github.com/utagestudio/oni_rocket_calc/issues' target='_blank' className={styles.anchor}>
            Issue Tracker
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
      {/* 同意 UI をフッター内に置き、設定ボタンをリンクと同じ書体で表示する。 */}
      {gtmId && <CookieConsent gtmId={gtmId} />}
    </div>
  </>
}

export default Footer
