// pages/blog-dark.jsx   (or whatever the file is called)
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../contexts/AuthContext";

import GalleryDarkInnerSection from "../components/myuploads/gallery-inner-secction";

export default function BlogDark() {
  /* 1) pull both flags out of AuthContext */
  const { isLoggedIn, loading } = useAuth();
  const router = useRouter();

  /* 2) redirect *only* after the auth check finished */
  useEffect(() => {
    if (!loading && isLoggedIn === false) {
      router.replace("/login");
    }
  }, [loading, isLoggedIn, router]);

  /* 3) while we’re still checking (loading===true) OR
        we just triggered the redirect, render nothing (or a spinner) */
  if (loading || isLoggedIn !== true) {
    return null;           //   ← you can swap for a tiny loader if you like
  }

  /* 4) user is confirmed logged-in */
  return <GalleryDarkInnerSection />;
}

export async function getStaticProps() {
  return { props: { header: "three", footer: "three" } };
}
