import type {Metadata} from "next";
import {Barriecito} from "next/font/google";
import "./globals.sass";
import ModulesProvider from '@/provider/ModulesProvider'
import DistanceProvider from '@/provider/DistanceProvider'
import AmountProvider from '@/provider/AmountProvider'

const barriecito = Barriecito({
  variable: "--font-barriecito",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rocket Calculator for Oxygen Not Included Base Game | UTAGE.GAMES",
  description: "Automatic fuel amount calculator for rockets in Oxygen Not Included",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body className={barriecito.variable}>
      <AmountProvider>
        <ModulesProvider>
          <DistanceProvider>
            {children}
          </DistanceProvider>
        </ModulesProvider>
      </AmountProvider>
    </body>
    </html>
  );
}