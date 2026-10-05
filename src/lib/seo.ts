import {PRODUCT_NAME} from '@/lib/product'

// メタ情報・サイトマップ・構造化データで正規URLと説明を揃える。
export const SITE_URL = 'https://rocket-calc.utage.games'
export const SITE_TITLE = 'Oxygen Not Included Rocket Fuel Calculator (Base Game) | UTAGE.GAMES'
export const SITE_DESCRIPTION = 'Calculate rocket fuel for Oxygen Not Included’s base game. Choose an engine, modules, and distance to estimate fuel and oxidizer requirements.'

export const applicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: `${PRODUCT_NAME} for Oxygen Not Included`,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web browser',
  inLanguage: 'en',
  isAccessibleForFree: true,
  image: `${SITE_URL}/assets/ogp.png`,
}
