"use client"

import ModuleSelector from '@/components/ModuleSelector'
import Distance from '@/components/Distance'
import Rocket from '@/components/Rocket/Rocket'
import ResetButton from '@/components/ResetButton'
import Results from '@/components/Results/Results'
import ModulesProvider from '@/provider/ModulesProvider'
import DistanceProvider from '@/provider/DistanceProvider'
import AmountProvider from '@/provider/AmountProvider'

type Props = {
  classes: {
    reset: string
    content: string
    distance: string
    rocket: string
    results: string
  }
}

function RocketCalculator({classes}: Props) {
  return (
    <AmountProvider>
      <ModulesProvider>
        <DistanceProvider>
          {/* ロケット設定と計算結果だけが Context を必要とするため、この範囲だけを Client Component に閉じ込める。 */}
          <div className={classes.reset}><ResetButton /></div>
          <div className={classes.content}>
            <ModuleSelector />
          </div>
          <div className={classes.distance}><Distance /></div>
          <div className={classes.rocket}><Rocket /></div>
          <div className={classes.results}><Results /></div>
        </DistanceProvider>
      </ModulesProvider>
    </AmountProvider>
  )
}

export default RocketCalculator
