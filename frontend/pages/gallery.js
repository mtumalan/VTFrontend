import GalleryDarkInnerSection from "../components/gallery/gallery-inner-secction";

export default function BlogDark() {
	return <GalleryDarkInnerSection />;
}

export async function getStaticProps() {
	return { props: { header: "three", footer: "three" } };
}
