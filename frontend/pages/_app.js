// pages/_app.js
import "bootstrap/dist/css/bootstrap.css";
import "slick-carousel/slick/slick.css";
import "react-modal-video/css/modal-video.min.css";
import "swiper/css";
import "swiper/css/effect-cards";

import Head from "next/head";
import Layout from "../components/layout";
import Preloader from "../components/common/preloader/preloader";
import ScrollTop from "../components/common/scroll-top";
import { AuthProvider, useAuth } from "../contexts/AuthContext";

import "../styles/css/app.css";
import "../styles/css/main.css";

/* ─────────────────────────────────  shell that *knows* auth status */
function AppContent({ Component, pageProps }) {
  const { loading } = useAuth();       // ← exposed by AuthContext

  return (
    <>
      {/*  Preloader disappears as soon as loading === false  */}
      <Preloader done={!loading} />

      <Layout>
        <Component {...pageProps} />
      </Layout>

      <ScrollTop />
    </>
  );
}

/* ─────────────────────────────────  top–level wrapper */
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Cracks</title>
      </Head>

      <AuthProvider>
        <AppContent Component={Component} pageProps={pageProps} />
      </AuthProvider>
    </>
  );
}

export default MyApp;
