import Link from "next/link";

/* eslint-disable @next/next/no-img-element */
export default function Team() {
	return (
		<div className="fugu--team-section fugu--section-padding2">
			<div className="container">
				<div className="fugu--section-title-wrap">
					<div className="fugu--section-title">
						<div className="fugu--default-content content-sm">
							<h2>Conoce al equipo de desarrollo</h2>
							<p>
								Somos un equipo multidisciplinario enfocado en crear soluciones tecnológicas para la detección de
								fallas estructurales en edificaciones y muros. Nuestra misión es facilitar el análisis y la
								prevención de riesgos mediante inteligencia artificial.
							</p>
						</div>
					</div>
					<div className="fugu--section-button">
						<div className="fugu--portfolio-btn">
							<Link href={"#"} legacyBehavior>
								<a className="fugu--outline-btn">
									<span>Ver todos los miembros</span>
								</a>
							</Link>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-4 col-md-6">
						<div className="fugu--team-wrap wow fadeInUpX" data-wow-delay="0s">
							<div className="fugu--team-left">
								<div className="fugu--team-thumb">
									<img src="/images/all-img/v3/team2.jpg" alt="" />
								</div>
								<div className="fugu--team-data">
									<h4>Gabriel</h4>
									<p>Desarrollador</p>
								</div>
							</div>
							<button type="button" className="fugu--dot-btn">
								<img src="/images/svg2/dots.svg" alt="" />
							</button>
						</div>
					</div>
					<div className="col-lg-4 col-md-6">
						<div className="fugu--team-wrap wow fadeInUpX" data-wow-delay="0.10s">
							<div className="fugu--team-left">
								<div className="fugu--team-thumb">
									<img src="/images/all-img/v3/team2.jpg" alt="" />
								</div>
								<div className="fugu--team-data">
									<h4>Mauricio</h4>
									<p>Desarrollador</p>
								</div>
							</div>
							<button type="button" className="fugu--dot-btn">
								<img src="/images/svg2/dots.svg" alt="" />
							</button>
						</div>
					</div>
					<div className="col-lg-4 col-md-6">
						<div className="fugu--team-wrap wow fadeInUpX" data-wow-delay="0.20s">
							<div className="fugu--team-left">
								<div className="fugu--team-thumb">
									<img src="/images/all-img/v3/team2.jpg" alt="" />
								</div>
								<div className="fugu--team-data">
									<h4>Daniel</h4>
									<p>Desarrollador</p>
								</div>
							</div>
							<button type="button" className="fugu--dot-btn">
								<img src="/images/svg2/dots.svg" alt="" />
							</button>
						</div>
					</div>
					<div className="col-lg-4 col-md-6">
						<div className="fugu--team-wrap wow fadeInUpX" data-wow-delay="0.30s">
							<div className="fugu--team-left">
								<div className="fugu--team-thumb">
									<img src="/images/all-img/v3/team2.jpg" alt="" />
								</div>
								<div className="fugu--team-data">
									<h4>Carlos</h4>
									<p>Desarrollador</p>
								</div>
							</div>
							<button type="button" className="fugu--dot-btn">
								<img src="/images/svg2/dots.svg" alt="" />
							</button>
						</div>
					</div>
					<div className="col-lg-4 col-md-6">
						<div className="fugu--team-wrap wow fadeInUpX" data-wow-delay="0.40s">
							<div className="fugu--team-left">
								<div className="fugu--team-thumb">
									<img src="/images/all-img/v3/team2.jpg" alt="" />
								</div>
								<div className="fugu--team-data">
									<h4>Erik</h4>
									<p>Desarrollador</p>
								</div>
							</div>
							<button type="button" className="fugu--dot-btn">
								<img src="/images/svg2/dots.svg" alt="" />
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className="fugu--shape3">
				<img src="/images/shape2/shape3.png" alt="" />
			</div>
		</div>
	);
}
