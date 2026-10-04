export const CONSENT_KEY = 'oni-rocket-cookie-consent'
export const CONSENT_VERSION = 1
export const CONSENT_MAX_AGE = 180 * 24 * 60 * 60 * 1000
export type ConsentChoice = 'accepted' | 'rejected'

export function validGtmId(value: string | undefined): string | undefined {
  const id = value?.trim()
  return id && /^GTM-[A-Z0-9]+$/.test(id) ? id : undefined
}

export function parseConsent(raw: string | null, gtmId: string, now = Date.now()): ConsentChoice | null {
  if (!raw) return null
  try {
    const data = JSON.parse(raw)
    // 文面・コンテナ・有効期限が変わった場合は、過去の同意を流用しない。
    if (data?.version !== CONSENT_VERSION || data.gtmId !== gtmId ||
      !Number.isFinite(data.savedAt) || data.savedAt > now || now - data.savedAt >= CONSENT_MAX_AGE) return null
    return data.choice === 'accepted' || data.choice === 'rejected' ? data.choice : null
  } catch {
    return null
  }
}

export function readConsent(gtmId: string): ConsentChoice | null {
  try {
    return parseConsent(window.localStorage.getItem(CONSENT_KEY), gtmId)
  } catch {
    // 保存領域が無効でも、未選択として同意 UI を利用できるようにする。
    return null
  }
}

export function saveConsent(choice: ConsentChoice, gtmId: string): void {
  try {
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify({choice, gtmId, version: CONSENT_VERSION, savedAt: Date.now()}))
  } catch {
    // 永続化に失敗した場合も、現在のページ内の選択は有効にする。
  }
}
