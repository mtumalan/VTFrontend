// pages/gallery-dark.jsx
import GalleryDarkInnerSection from "../components/gallery/gallery-inner-secction";

export default function GalleryDarkPage() {
  return <GalleryDarkInnerSection />;
}

export async function getStaticProps() {
  return { props: { header: "three", footer: "three" } };
}
