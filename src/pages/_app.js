// pages/_app.js
import "@/styles/globals.css";
import Navbar from "@/components/Navbar";

export default function App({ Component, pageProps }) {
  return (
    <div className="min-w-[1280px] overflow-x-auto">
      {/* Sticky Navbar */}
      <Navbar />

      {/* Main content with top padding so it doesn't hide behind navbar */}
      <main className="pt-[72px]">
        <Component {...pageProps} />
      </main>
    </div>
  );
}
