import FooterHomeFive from "./footer/footer-home-five";
import FooterHomeFour from "./footer/footer-home-four";
import FooterHomeOne from "./footer/footer-home-one";
import FooterHomeThree from "./footer/footer-home-three";
import FooterHomeTwo from "./footer/footer-home-two";
import HeaderHome from "./header/header-home";

export default function Layout({ children }) {
	const headerChooseFunc = () => {
		return <HeaderHome />;
	};
	const footerChooseFunc = () => {
		switch (children.props.footer) {
			case "one":
				return <FooterHomeThree />;
			case "two":
				return <FooterHomeTwo />;
			case "three":
				return <FooterHomeThree />;
			case "four":
				return <FooterHomeFour />;
			case "five":
				return <FooterHomeFive />;
			default:
				return <FooterHomeThree />;
		}
	};
	return (
		<>
			{headerChooseFunc()}
			<main>{children}</main>
			{footerChooseFunc()}
		</>
	);
}
