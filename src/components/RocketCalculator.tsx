"use client"

import ModuleSelector from '@/components/ModuleSelector'
import Distance from '@/components/Distance'
import Rocket from '@/components/Rocket/Rocket'
import ResetButton from '@/components/ResetButton'
import Results from '@/components/Results/Results'

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
    <>
      <div className={classes.reset}><ResetButton /></div>
      <div className={classes.content}>
        <ModuleSelector />
      </div>
      <div className={classes.distance}><Distance /></div>
      <div className={classes.rocket}><Rocket /></div>
      <div className={classes.results}><Results /></div>
    </>
  )
}

export default RocketCalculator
