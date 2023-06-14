import { component$ } from "@builder.io/qwik";
import { QwikCityProvider, RouterOutlet, ServiceWorkerRegister } from "@builder.io/qwik-city";
import { RouterHead } from "./components/router-head/router-head";

// import { themeContext } from "./providers/theme";

import "@fontsource-variable/montserrat";
import "./tailwind.css";
import { DarkThemeLauncher } from "./components/common/DarkThemeLauncher";

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Dont remove the `<head>` and `<body>` elements.
   */

  const yandexMetrica = `
  (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
  m[i].l=1*new Date();
  for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
  k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
  (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

  ym(${import.meta.env.PUBLIC_YANDEX_METRIKA_ID}, "init", {
       clickmap:true,
       trackLinks:true,
       accurateTrackBounce:true
  });
  `;

  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.json" />
        <script type="text/javascript" dangerouslySetInnerHTML={yandexMetrica} />

        <RouterHead />
        <DarkThemeLauncher />
      </head>
      <body lang="ru">
        <RouterOutlet />
        <ServiceWorkerRegister />
        <noscript>
          <div>
            <img src="https://mc.yandex.ru/watch/93936128" width={0} height={0} style="position:absolute; left:-9999px;" alt="" />
          </div>
        </noscript>
      </body>
    </QwikCityProvider>
  );
});
