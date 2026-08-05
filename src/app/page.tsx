import styles from "./page.module.sass";
import Footer from '@/components/Footer'
import Header from '@/app/Header'
import RocketCalculator from '@/components/RocketCalculator'

export default function Home() {
  return <>
    <div className={styles.page}>
      <div className={styles.main}>
        <div className={styles.wrapper}>
          <div className={styles.heading}><Header /></div>
          <RocketCalculator
            classes={{
              reset: styles.reset,
              content: styles.content,
              distance: styles.distance,
              rocket: styles.rocket,
              results: styles.results,
            }}
          />
        </div>
      </div>
      <div className={styles.footer}><Footer /></div>
    </div>
  </>

}
