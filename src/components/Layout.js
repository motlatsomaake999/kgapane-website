import Head from "next/head";

export default function Layout({ title, description, children }) {
  const pageTitle = title ? `${title} | Kgapane High School` : "Kgapane High School";
  const pageDesc = description || "Wisdom is a Treasure of All Time.";

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/hero1.jpg" />
        <meta property="og:url" content="https://kgapane.vercel.app" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDesc} />
        <meta name="twitter:image" content="/hero1.jpg" />

        {/* PWA + Icons */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#065f46" />
      </Head>

      <div className="min-h-screen bg-gray-50">{children}</div>
    </>
  );
}
