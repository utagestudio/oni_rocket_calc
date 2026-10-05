import type {Metadata, Viewport} from "next";
import {Barriecito, M_PLUS_Rounded_1c} from "next/font/google";
import "./globals.sass";
import { Analytics } from "@vercel/analytics/next"
import {SITE_DESCRIPTION, SITE_TITLE, SITE_URL} from '@/lib/seo'

const barriecito = Barriecito({
  variable: "--font-barriecito",
  weight: "400",
  subsets: ["latin"],
});

const mplus = M_PLUS_Rounded_1c({
  variable: "--font-mplus",
  weight: "400",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: '/', // ルートの canonical
  },
  openGraph: {
    type: 'website',
    siteName: SITE_TITLE,
    url: SITE_URL,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: '/assets/ogp.png',
        width: 1200,
        height: 630,
        alt: 'design',
      },
    ],
    locale: 'en',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@utage_studio', // 公式アカウント
    creator: '@utage_studio', // 作成者アカウント
  },
};

// App Routerではviewportをmetadataから分けて定義する。
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body className={`${mplus.variable} ${barriecito.variable}`}>
      {children}
      <Analytics />
    </body>
    </html>
  );
}
