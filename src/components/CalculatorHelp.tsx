"use client"

import {useRef, type KeyboardEvent} from 'react'
import styles from './CalculatorHelp.module.sass'
import {CONTACT_FORM_URL, PRODUCT_VERSION} from '@/lib/product'

export default function CalculatorHelp() {
  const dialog = useRef<HTMLDialogElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)

  function keepFocusWithinHelp(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== 'Tab') return
    const controls = dialog.current?.querySelectorAll<HTMLElement>('button:not(:disabled), a[href]')
    if (!controls?.length) return
    const first = controls[0]
    const last = controls[controls.length - 1]
    // 末尾のリンクからも閉じる操作へ戻れるよう、ヘルプ内のTab循環を明示する。
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  return <>
    <button type="button" ref={trigger} data-help-trigger aria-haspopup="dialog" onClick={() => dialog.current?.showModal()} className={styles.trigger}>Help</button>
    {/* 初期HTMLにも本文を含め、通常操作を圧迫せず必要時だけ同じ説明を読めるようにする。 */}
    <dialog ref={dialog} data-help-dialog aria-labelledby="calculator-help-title" className={styles.dialog} onKeyDown={keepFocusWithinHelp} onClose={() => trigger.current?.focus()}>
      <button type="button" autoFocus className={styles.close} aria-label="Close help" onClick={() => dialog.current?.close()}>×</button>
      <h2 id="calculator-help-title">Rocket fuel calculator guide</h2>
      <p>Calculate rocket fuel requirements for <strong>Oxygen Not Included’s base game</strong>. Choose an engine, configure your rocket modules, and set a target distance to estimate fuel and oxidizer requirements. This calculator uses the base-game distance system in kilometres; it does not support Spaced Out! rocket travel.</p>
      <h3>Quick start</h3>
      <ol>
        <li>Select a capsule and a Steam, Petroleum, Biodiesel, or Hydrogen Engine.</li>
        <li>Click or tap modules to add them. On PC, right-click to remove one; the rocket’s + / − buttons also adjust modules. On touch screens, use the − button beside a selected module.</li>
        <li>Select the target distance shown on the base-game starmap. The calculator uses this value directly; it does not double it.</li>
        <li>For liquid-fuel engines, select Oxylite or Liquid Oxygen in the results panel.</li>
        <li>Read Fuel Amount and the tank amounts. Results update automatically. Adding excess fuel also adds weight, so more fuel is not always better.</li>
      </ol>
      <h3>Reading the results</h3>
      <p>Fuel Amount is the calculated engine fuel in kilograms. For Steam, load the shown steam amount into the engine. Other engines use the same calculated mass of fuel and oxidizer in this model; the tank diagrams show their distribution. Solid Fuel Thrusters have separate Iron and Oxylite requirements, shown under For Thruster.</p>
      <p><strong>Unreached</strong> means that this calculator could not find enough range for the selected configuration within its search limits. Try a shorter distance, fewer heavy modules, a different engine, or a different oxidizer.</p>
      <h3>Rocket slots and reset</h3>
      <p>Rocket 1–5 keep separate configurations in this browser. The small reset icon restores that slot to its initial configuration. The main Reset removes optional modules and thrusters while keeping the capsule, engine, oxidizer choice, and distance. CHANGE switches between the rocket illustration and the selected-module list.</p>
      <p>This is a free, unofficial fan-made tool, unaffiliated with or endorsed by Klei Entertainment. English is currently supported. Mobile layout is provisional; scroll to see results.</p>
    </dialog>
  </>
}
