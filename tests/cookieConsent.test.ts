import assert from 'node:assert/strict'
import test from 'node:test'
import {CONSENT_MAX_AGE, CONSENT_VERSION, parseConsent, readConsent, saveConsent, validGtmId} from '../src/lib/cookieConsent'

const now = 1_800_000_000_000
const record = {choice: 'accepted', gtmId: 'GTM-ABC123', savedAt: now, version: CONSENT_VERSION}

test('accepts only valid container IDs', () => {
  assert.equal(validGtmId(' GTM-ABC123 '), 'GTM-ABC123')
  for (const value of [undefined, '', 'G-ABC123', 'GTM-abc', 'GTM-ABC<script>']) assert.equal(validGtmId(value), undefined)
})

test('restores accepted and rejected choices for the current container', () => {
  for (const choice of ['accepted', 'rejected']) {
    assert.equal(parseConsent(JSON.stringify({...record, choice}), record.gtmId, now), choice)
  }
})

test('requires new consent for invalid, expired, or outdated records', () => {
  for (const raw of [null, '{', 'null', '{}', JSON.stringify({...record, choice: 'other'}),
    JSON.stringify({...record, version: 0}), JSON.stringify({...record, gtmId: 'GTM-OTHER'}),
    JSON.stringify({...record, savedAt: now + 1}), JSON.stringify({...record, savedAt: String(now)}),
    JSON.stringify({...record, savedAt: now - CONSENT_MAX_AGE})]) {
    assert.equal(parseConsent(raw, record.gtmId, now), null)
  }
  assert.equal(parseConsent(JSON.stringify({...record, savedAt: now - CONSENT_MAX_AGE + 1}), record.gtmId, now), 'accepted')
})

test('storage failures do not prevent choosing consent', () => {
  Object.defineProperty(globalThis, 'window', {configurable: true, value: {
    get localStorage() { throw new Error('Storage blocked') },
  }})
  assert.equal(readConsent(record.gtmId), null)
  assert.doesNotThrow(() => saveConsent('rejected', record.gtmId))
})
