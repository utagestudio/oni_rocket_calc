import type {Metadata} from "next";
import {Barriecito, M_PLUS_Rounded_1c} from "next/font/google";
import "./globals.sass";
import ModulesProvider from '@/provider/ModulesProvider'
import DistanceProvider from '@/provider/DistanceProvider'
import AmountProvider from '@/provider/AmountProvider'
import { Analytics } from "@vercel/analytics/next"

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
  metadataBase: new URL('https://rocket-calc.utage.games'),
  title: "Rocket Calculator for Oxygen Not Included Base Game | UTAGE.GAMES",
  description: "Automatic fuel amount calculator for rockets in Oxygen Not Included",
  alternates: {
    canonical: '/', // ルートの canonical
  },
  openGraph: {
    type: 'website',
    siteName: 'Rocket Calculator for Oxygen Not Included Base Game | UTAGE.GAMES',
    url: 'https://rocket-calc.utage.games',
    title: 'Rocket Calculator for Oxygen Not Included Base Game | UTAGE.GAMES',
    description: 'Automatic fuel amount calculator for rockets in Oxygen Not Included',
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
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body className={`${mplus.variable} ${barriecito.variable}`}>
      <AmountProvider>
        <ModulesProvider>
          <DistanceProvider>
            {children}
          </DistanceProvider>
        </ModulesProvider>
      </AmountProvider>
      <Analytics />
    </body>
    </html>
  );
}