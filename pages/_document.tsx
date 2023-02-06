import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
          rel="stylesheet"
        />
        <link href="https://unpkg.com/nes.css/css/nes.css" rel="stylesheet" />
        <link href="/favicon.png" rel="shortcut icon" />
        <title>HoW :: The Dungeon of Souls</title>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
