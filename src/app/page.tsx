import styles from "./page.module.sass";
import Footer from '@/components/Footer'
import Header from '@/app/Header'
import RocketCalculator from '@/components/RocketCalculator'
import MemorySlots from '@/components/MemorySlots'
import AmountProvider from '@/provider/AmountProvider'
import ModulesProvider from '@/provider/ModulesProvider'
import DistanceProvider from '@/provider/DistanceProvider'
import {applicationSchema} from '@/lib/seo'

export default function Home() {
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(applicationSchema).replace(/</g, '\\u003c')}} />
    <div className={styles.page}>
      <main className={styles.main} aria-label="Rocket fuel calculator">
        <div className={styles.wrapper}>
          {/* MemorySlots もロケット構成と距離を読み書きするため、計算 UI 全体を同じ Provider 配下に置く。 */}
          <AmountProvider>
            <ModulesProvider>
              <DistanceProvider>
                <div className={styles.heading}>
                  <Header />
                  <MemorySlots />
                </div>
                <RocketCalculator
                  classes={{
                    reset: styles.reset,
                    content: styles.content,
                    distance: styles.distance,
                    rocket: styles.rocket,
                    results: styles.results,
                  }}
                />
              </DistanceProvider>
            </ModulesProvider>
          </AmountProvider>
        </div>
      </main>
      <div className={styles.footer}><Footer /></div>
    </div>
  </>

}
