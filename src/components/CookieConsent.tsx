'use client'

import {useEffect, useRef, useState} from 'react'
import {CONSENT_KEY, readConsent, saveConsent, type ConsentChoice} from '@/lib/cookieConsent'
import GtmLoader from './GtmLoader'
import styles from './CookieConsent.module.sass'

export default function CookieConsent({gtmId}: {gtmId: string}) {
  const [choice, setChoice] = useState<ConsentChoice | null>(null)
  const [ready, setReady] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const dialog = useRef<HTMLDialogElement>(null)
  const settings = useRef<HTMLButtonElement>(null)
  const hasLoaded = useRef(false)
  const visible = ready && (choice === null || settingsOpen)

  useEffect(() => {
    const url = new URL(window.location.href)
    const withdrawn = url.searchParams.get('cookie-consent') === 'rejected'
    // 保存領域が書き込み不可でも、撤回直後のリロードで古い許可を復元しない。
    if (withdrawn) {
      url.searchParams.delete('cookie-consent')
      window.history.replaceState(window.history.state, '', url)
    }
    setChoice(withdrawn ? 'rejected' : readConsent(gtmId))
    setReady(true)
    // 別タブでの撤回も反映し、実行済みタグを残さないようページを再読み込みする。
    const sync = (event: StorageEvent) => {
      if (event.key !== CONSENT_KEY && event.key !== null) return
      const next = readConsent(gtmId)
      if (hasLoaded.current && next !== 'accepted') window.location.reload()
      else setChoice(next)
    }
    window.addEventListener('storage', sync)
    return () => window.removeEventListener('storage', sync)
  }, [gtmId])

  useEffect(() => {
    if (choice === 'accepted') hasLoaded.current = true
  }, [choice])

  useEffect(() => {
    if (visible && !dialog.current?.open) dialog.current?.showModal()
    else if (!visible && dialog.current?.open) {
      dialog.current.close()
      settings.current?.focus()
    }
  }, [visible])

  function choose(next: ConsentChoice) {
    saveConsent(next, gtmId)
    if (next === 'rejected' && hasLoaded.current) {
      // 保存不可でも撤回できるよう、読み込み済みタグはリロードで停止する。
      const url = new URL(window.location.href)
      url.searchParams.set('cookie-consent', 'rejected')
      window.location.replace(url.href)
      return
    }
    setChoice(next)
    setSettingsOpen(false)
  }

  return <>
    {ready && choice === 'accepted' && <GtmLoader gtmId={gtmId} />}
    <div className={styles.settings}>
      <button ref={settings} type="button" onClick={() => setSettingsOpen(true)}>Cookie settings</button>
    </div>
    <dialog ref={dialog} className={styles.dialog} aria-labelledby="cookie-title" aria-describedby="cookie-description"
      onCancel={event => {
        event.preventDefault()
        if (choice === null) choose('rejected')
        else setSettingsOpen(false)
      }}>
      {/* 閉じる操作も拒否として保存し、許可済みの場合は同じ撤回処理を使う。 */}
      <button className={styles.close} type="button" aria-label="Reject analytics cookies and close" onClick={() => choose('rejected')}>
        <span aria-hidden="true">×</span>
      </button>
      <h2 id="cookie-title">Analytics cookies</h2>
      <p id="cookie-description">With your permission, we use Google Tag Manager to enable analytics tags that may use cookies to understand how this calculator is used. Advertising is not included in this consent. Vercel Analytics runs separately. You can change your choice in Cookie settings at any time.</p>
      <div className={styles.actions}>
        <button type="button" onClick={() => choose('rejected')} autoFocus>Reject</button>
        <button type="button" onClick={() => choose('accepted')}>Accept</button>
      </div>
    </dialog>
  </>
}
