import Head from "next/head";
import CardSliderOne from "../components/common/sliders/card/card-slider-one";
import HeroSection from "../components/home/hero-section";
import Team from "../components/home/Team";

export default function Home() {
	return (
		<>
			<Head>
				<title>Index</title>
			</Head>
			<HeroSection />
			<CardSliderOne />
			<Team />
		</>
	);
}
export async function getStaticProps() {
	return { props: { header: "one", footer: "one" } };
}
