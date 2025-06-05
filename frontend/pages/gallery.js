import GalleryDarkInnerSection from "../components/blog-dark/gallery-inner-secction";

export default function BlogDark() {
	return <GalleryDarkInnerSection />;
}

export async function getStaticProps() {
	return { props: { header: "three", footer: "three" } };
}
