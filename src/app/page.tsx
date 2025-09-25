import styles from "./page.module.sass";
import Footer from '@/components/Footer'
import Copyright from '@/components/Copyright'
import ModuleSelector from '@/components/ModuleSelector'
import Distance from '@/components/Distance'
import Rocket from '@/components/Rocket'
import ResetButton from '@/components/ResetButton'
import Results from '@/components/Results/Results'
import Header from '@/app/Header'

export default function Home() {
  return <>
    <div className={styles.page}>
      <div className={styles.main}>
        <div className={styles.wrapper}>
          <div className={styles.heading}><Header /></div>
          <div className={styles.reset}><ResetButton /></div>
          <div className={styles.copyright}><Copyright /></div>
          <div className={styles.content}>
            <ModuleSelector />
          </div>
          <div className={styles.distance}><Distance /></div>
          <div className={styles.rocket}><Rocket /></div>
          <div className={styles.results}><Results /></div>
        </div>
      </div>
      <div className={styles.footer}><Footer /></div>
    </div>
  </>

}
