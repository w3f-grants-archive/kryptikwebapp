import Head from "next/head";
import { useKryptikThemeContext } from "./ThemeProvider";
import Navbar from "./navbars/Navbar";
import { Toaster } from "react-hot-toast";

// TODO: Update to support dynamic headers
export default function Layout({ children }) {
  const { isDark, themeLoading } = useKryptikThemeContext();
  return (
    <>
      <Head>
        <title>Kryptik Wallet</title>
        <meta name="description" content="Crypto made simple." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toaster />

      <main
        className={`min-h-screen ${themeLoading || isDark ? "dark" : ""} ${
          themeLoading || isDark ? "bg-[#0c0c0c]" : "bg-white"
        } px-2`}
      >
        <Navbar />
        {children}
        <div className="min-h-[10vh] md:min-h-0"></div>
      </main>
    </>
  );
}
