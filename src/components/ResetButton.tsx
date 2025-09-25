"use client"

import './ResetButton.sass'
import useModules from '@/hooks/useModules'

type Props = {}

function ResetButton({}: Props) {
  const {reset} = useModules()
  return <>
    <button onClick={reset} className="ResetButton">
      <span className="ResetButton_icon"><img className="ResetButton_img" src={`/assets/images/ico_reset.svg`} alt="reset" width={24} /></span>
      <span className="ResetButton_label">Reset</span>
    </button>
  </>
}

export default ResetButton
