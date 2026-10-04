'use client'

import Script from 'next/script'

export default function GtmLoader({gtmId}: {gtmId: string}) {
  return <Script id="rocket-gtm" strategy="afterInteractive">{`
    // 再描画や Strict Mode によるコンテナの二重初期化を防ぐ。
    if (!window.__rocketGtmLoaded) {
      window.__rocketGtmLoaded = true;
      window.dataLayer = window.dataLayer || [];
      function gtag(){window.dataLayer.push(arguments);}
      gtag('consent', 'default', {
        analytics_storage: 'granted',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied'
      });
      window.dataLayer.push({'gtm.start': Date.now(), event: 'gtm.js'});
      var script = document.createElement('script');
      script.async = true;
      script.src = 'https://www.googletagmanager.com/gtm.js?id=' + ${JSON.stringify(gtmId)};
      document.head.appendChild(script);
    }
  `}</Script>
}
