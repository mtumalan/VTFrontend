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
						<h2>Ejemplos de análisis recientes</h2>
						<p>
							Estos son algunos ejemplos de imágenes analizadas por nuestros modelos de detección de fallas
							estructurales. Observa cómo se identifican grietas, humedad y otros problemas en muros y edificios.
						</p>
					</div>
				</div>
				<div className="fugu--slider-one">
					<Slider {...settings}>
						<div className="fugu--card-wrap">
							<div className="fugu--card-thumb">
								<img src="/images/all-img/v3/card1.jpg" alt="Ejemplo de grieta en muro" />
							</div>
							<div className="fugu--card-data">
								<h3>Detección de grietas</h3>
								<p>El modelo identificó varias grietas en la superficie del muro.</p>
								<div className="fugu--card-footer">
									<div className="fugu--card-footer-data">
										<span>Precisión:</span>
										<h4>92%</h4>
									</div>
									<Link href={"/"} legacyBehavior>
										<a className="fugu--btn btn-sm bg-white">Ver detalle</a>
									</Link>
								</div>
							</div>
						</div>
						<div className="fugu--card-wrap">
							<div className="fugu--card-thumb">
								<img src="/images/all-img/v3/card2.jpg" alt="Ejemplo de humedad" />
							</div>
							<div className="fugu--card-data">
								<h3>Detección de humedad</h3>
								<p>Se detectaron manchas de humedad en la pared analizada.</p>
								<div className="fugu--card-footer">
									<div className="fugu--card-footer-data">
										<span>Precisión:</span>
										<h4>89%</h4>
									</div>
									<Link href={"/"} legacyBehavior>
										<a className="fugu--btn btn-sm bg-white">Ver detalle</a>
									</Link>
								</div>
							</div>
						</div>
						<div className="fugu--card-wrap">
							<div className="fugu--card-thumb">
								<img src="/images/all-img/v3/card3.jpg" alt="Ejemplo de corrosión" />
							</div>
							<div className="fugu--card-data">
								<h3>Detección de corrosión</h3>
								<p>El sistema encontró zonas con corrosión en elementos metálicos.</p>
								<div className="fugu--card-footer">
									<div className="fugu--card-footer-data">
										<span>Precisión:</span>
										<h4>87%</h4>
									</div>
									<Link href={"/"} legacyBehavior>
										<a className="fugu--btn btn-sm bg-white">Ver detalle</a>
									</Link>
								</div>
							</div>
						</div>
						<div className="fugu--card-wrap">
							<div className="fugu--card-thumb">
								<img src="/images/all-img/v3/card5.jpg" alt="Ejemplo de análisis general" />
							</div>
							<div className="fugu--card-data">
								<h3>Análisis general</h3>
								<p>El modelo clasificó la imagen según el tipo de falla predominante.</p>
								<div className="fugu--card-footer">
									<div className="fugu--card-footer-data">
										<span>Precisión:</span>
										<h4>91%</h4>
									</div>
									<Link href={"/"} legacyBehavior>
										<a className="fugu--btn btn-sm bg-white">Ver detalle</a>
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
