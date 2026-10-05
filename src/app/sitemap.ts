import type {MetadataRoute} from 'next'
import {SITE_URL} from '@/lib/seo'

export default function sitemap(): MetadataRoute.Sitemap {
  // ビルド日時を更新日として偽装せず、実在する正規ページだけを掲載する。
  return [{url: SITE_URL}]
}
