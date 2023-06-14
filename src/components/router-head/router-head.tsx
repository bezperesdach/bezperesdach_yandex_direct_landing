import { component$ } from "@builder.io/qwik";
import { useDocumentHead, useLocation } from "@builder.io/qwik-city";

/**
 * The RouterHead component is placed inside of the document `<head>` element.
 */
export const RouterHead = component$(() => {
  const head = useDocumentHead();
  const loc = useLocation();

  return (
    <>
      <title>{head.title}</title>

      <link rel="canonical" href={loc.url.href} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

      <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png?v=1" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png?v=1" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png?v=1" />
      <link rel="manifest" href="/favicon/site.webmanifest?v=1" />
      <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg?v=1" color="#1170ee" />
      <link rel="icon" href="/favicon.ico?v=1" type="image/x-icon" />
      <link rel="shortcut icon" href="/favicon.ico?v=1" type="image/x-icon" />
      <meta name="apple-mobile-web-app-title" content="Безпересдач" />
      <meta name="application-name" content="Безпересдач" />
      <meta name="msapplication-TileColor" content="#2d89ef" />

      <meta name="msapplication-config" content="/favicon/browserconfig.xml?v=1" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="bezperesdach.online" />

      <meta property="og:site_name" content="Безпересдач" />

      {head.meta.map((m) => (
        <meta key={m.key} {...m} />
      ))}

      {head.links.map((l) => (
        <link key={l.key} {...l} />
      ))}

      {head.styles.map((s) => (
        <style key={s.key} {...s.props} dangerouslySetInnerHTML={s.style} />
      ))}
    </>
  );
});
