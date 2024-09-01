// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />

          <meta name="author" content="Pranit Bauva" />
          <meta name="robots" content="index, follow" />
          <meta name="language" content="English" />
          <meta name="revisit-after" content="7 days" />
          <meta name="description" content="Financial Tools & Calculators" />
          <meta name="keywords" content="Financial Tools, Calculators, Investments, SIP, Mutual Funds, Financial Planning, Wealth Growth, Mutual Fund Returns, Monthly Investment, Index Funds, Active Funds, Passive Funds, loans, EMI, home loan, car loan, vehicle loan, gold loan, personal loan, credit card loan" />
          <meta name="twitter:site" content="@pranitbauva1997" />
          <meta name="twitter:creator" content="@pranitbauva1997" />
          <meta property="site_name" content="Financial Tools & Calculators" />
          <meta property="locale" content="en_US" />
          <meta property="og:title" content="Financial Tools & Calculators" />
          <meta property="og:description" content="Financial Tools & Calculators" />
          <meta property="og:url" content="https://fintools.bauva.com" />
          <meta property="og:image" content="https://fintools.bauva.com/image.jpg" />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Financial Tools & Calculators" />
          <meta name="twitter:url" content="https://fintools.bauva.com" />
          <meta name="twitter:description" content="Financial Tools & Calculators" />
          <meta name="twitter:image" content="https://fintools.bauva.com/image.jpg" />
          <title>Financial Tools & Calculators</title>

          <link rel="icon" href="/favicon.ico" />

          {assets}
        </head>
        <body class="dark-mode">
          <div id="app">{children}</div>
          {scripts}
        </body>
      </html>
    )}
  />
));
