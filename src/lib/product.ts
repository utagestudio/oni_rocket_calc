export const PRODUCT_NAME = 'Rocket Fuel Calculator'
export const PRODUCT_VERSION = 'epsilon'

// 表示とフォームのバージョンを共通化し、問い合わせ時の情報のずれを防ぐ。
export const CONTACT_FORM_URL = `https://tally.so/r/KYqY78?product=${encodeURIComponent(PRODUCT_NAME)}&version=${encodeURIComponent(PRODUCT_VERSION)}`
