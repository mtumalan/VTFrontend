// pages/blog-dark.jsx
import GalleryDarkInnerSection from "../components/myuploads/gallery-inner-secction";

export default function BlogDark() {
  return <GalleryDarkInnerSection />;
}

export async function getStaticProps() {
  return { props: { header: "three", footer: "three" } };
}
