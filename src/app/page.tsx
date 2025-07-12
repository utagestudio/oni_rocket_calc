import styles from "./page.module.sass";
import Footer from '@/components/Footer'
import Copyright from '@/components/Copyright'
import Selection from '@/components/Selection'

export default function Home() {
  return <>
    <div className={styles.page}>
      <div className={styles.main}>
        <div className={styles.title}>Rocket Calculator</div>
        <div className={styles.copyright}><Copyright /></div>
        <div className={styles.content}>
          <Selection />
        </div>
      </div>
      <div className={styles.footer}><Footer /></div>
    </div>
  </>

}
