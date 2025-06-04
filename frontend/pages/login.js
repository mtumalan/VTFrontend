import InnerSection from "../components/login/inner-section";

export default function ContactDark() {
	return <InnerSection />;
}

export async function getStaticProps() {
	return { props: { header: "three", footer: "three" } };
}
