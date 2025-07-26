"use client"
import './ResetButton.sass'
import useModules from '@/hooks/useModules'

type Props = {}

function ResetButton({}: Props) {
  const {reset} = useModules()
  return <>
    <button onClick={reset} className="ResetButton">
      Reset
    </button>
  </>
}

export default ResetButton
