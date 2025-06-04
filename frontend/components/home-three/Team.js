import Link from "next/link";

/* eslint-disable @next/next/no-img-element */
export default function Team() {
	return (
		<div className="fugu--team-section fugu--section-padding2">
			<div className="container">
				<div className="fugu--section-title-wrap">
					<div className="fugu--section-title">
						<div className="fugu--default-content content-sm">
							<h2>Meet the Development Team</h2>
							<p>
								We are a multidisciplinary team focused on creating technological solutions for the detection of
								structural failures in buildings and walls. Our mission is to facilitate analysis and risk
								prevention through artificial intelligence.
							</p>
						</div>
					</div>
					<div className="fugu--section-button">
						<div className="fugu--portfolio-btn">
							<Link href={"#"} legacyBehavior>
								<a className="fugu--outline-btn">
									<span>View all members</span>
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
									<p>Developer</p>
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
									<p>Developer</p>
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
									<p>Developer</p>
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
									<p>Developer</p>
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
									<p>Developer</p>
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
