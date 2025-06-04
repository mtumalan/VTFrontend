/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Slider from "react-slick";
function NextArrow({ onClick }) {
	return <button className="slide-arrow fugu--arrow" onClick={onClick}></button>;
}

function PrevArrow({ onClick }) {
	return <button className="slide-arrow prev-arrow" onClick={onClick}></button>;
}

export default function CardSliderOne() {
	const settings = {
		infinite: true,
		slidesToShow: 4,
		slidesToScroll: 1,
		arrows: true,
		dots: false,
		autoplay: false,
		nextArrow: <NextArrow />,
		prevArrow: <PrevArrow />,
		responsive: [
			{
				breakpoint: 1400,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: false,
				},
			},
		],
	};
	return (
		<div className="fugu--slider-section">
			<div className="container">
				<div className="fugu--section-title">
					<div className="fugu--default-content content-sm">
						<h2>Our available models</h2>
					</div>
				</div>
				<div className="fugu--slider-one">
					<Slider {...settings}>
						<div className="fugu--card-wrap">
							<div className="fugu--card-thumb">
								<img src="/images/all-img/v3/card1.jpg" alt="Example of crack in wall" />
							</div>
							<div className="fugu--card-data">
								<h3>Crack detection</h3>
								<p>The model identified several cracks on the wall surface.</p>
								<div className="fugu--card-footer">
									<div className="fugu--card-footer-data">
										<span>Accuracy:</span>
										<h4>92%</h4>
									</div>
									<Link href={"/"} legacyBehavior>
										<a className="fugu--btn btn-sm bg-white">View details</a>
									</Link>
								</div>
							</div>
						</div>
						<div className="fugu--card-wrap">
							<div className="fugu--card-thumb">
								<img src="/images/all-img/v3/card2.jpg" alt="Example of moisture" />
							</div>
							<div className="fugu--card-data">
								<h3>Moisture detection</h3>
								<p>Moisture stains were detected on the analyzed wall.</p>
								<div className="fugu--card-footer">
									<div className="fugu--card-footer-data">
										<span>Accuracy:</span>
										<h4>89%</h4>
									</div>
									<Link href={"/"} legacyBehavior>
										<a className="fugu--btn btn-sm bg-white">View details</a>
									</Link>
								</div>
							</div>
						</div>
						<div className="fugu--card-wrap">
							<div className="fugu--card-thumb">
								<img src="/images/all-img/v3/card3.jpg" alt="Example of corrosion" />
							</div>
							<div className="fugu--card-data">
								<h3>Corrosion detection</h3>
								<p>The system found areas with corrosion on metal elements.</p>
								<div className="fugu--card-footer">
									<div className="fugu--card-footer-data">
										<span>Accuracy:</span>
										<h4>87%</h4>
									</div>
									<Link href={"/"} legacyBehavior>
										<a className="fugu--btn btn-sm bg-white">View details</a>
									</Link>
								</div>
							</div>
						</div>
						<div className="fugu--card-wrap">
							<div className="fugu--card-thumb">
								<img src="/images/all-img/v3/card5.jpg" alt="Example of general analysis" />
							</div>
							<div className="fugu--card-data">
								<h3>General analysis</h3>
								<p>The model classified the image according to the predominant failure type.</p>
								<div className="fugu--card-footer">
									<div className="fugu--card-footer-data">
										<span>Accuracy:</span>
										<h4>91%</h4>
									</div>
									<Link href={"/"} legacyBehavior>
										<a className="fugu--btn btn-sm bg-white">View details</a>
									</Link>
								</div>
							</div>
						</div>
					</Slider>
				</div>
			</div>
			<div className="fugu--shape1">
				<img src="/images/shape2/shape1.png" alt="" />
			</div>
		</div>
	);
}
