import dynamic from "next/dynamic";
import Head from "next/head";

import CardSliderOne from "../components/common/sliders/card/card-slider-one";
import HeroSection from "../components/home-three/hero-section";
import NftRoadMap from "../components/home-three/nft-roadmap";
import Team from "../components/home-three/Team";

const FilterGalarryOne = dynamic(() => import("../components/common/filter-gallary/filter-gallary-one"), {
	ssr: false,
});

export default function IndexThree() {
	return (
		<>
			<Head>
				<title>fugu - index o3</title>
			</Head>
			<HeroSection />
			<CardSliderOne />
			<FilterGalarryOne />
			<Team />
			{/* <NftRoadMap /> */}
		</>
	);
}
export async function getStaticProps() {
	return { props: { header: "three", footer: "three" } };
}
