// pages/gallery-dark.jsx   (rename file to match route if needed)
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../contexts/AuthContext";

import GalleryDarkInnerSection from "../components/gallery/gallery-inner-secction";

export default function GalleryDarkPage() {
  /* pull flags from AuthContext */
  const { isLoggedIn, loading } = useAuth();
  const router = useRouter();

  /* redirect only after auth finished */
  useEffect(() => {
    if (!loading && isLoggedIn === false) {
      router.replace("/login");
    }
  }, [loading, isLoggedIn, router]);

  /* while auth check is pending (loading) OR redirecting → render nothing */
  if (loading || isLoggedIn !== true) {
    return null;                       // or return a tiny spinner if you like
  }

  /* confirmed logged-in */
  return <GalleryDarkInnerSection />;
}

export async function getStaticProps() {
  return { props: { header: "three", footer: "three" } };
}
