/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import CountUp from "react-countup";

export default function HeroSection() {
	return (
		<div className="fugu--hero-section" style={{ backgroundImage: "url(/images/all-img/v3/hero-bg.png)" }}>
			<div id="fugu--counter"></div>
			<div className="container">
				<div className="row">
					<div className="col-lg-7">
						<div className="fugu--hero-content">
							<h1 className="wow fadeInUpX" data-wow-delay="0s">
								Detect structural failures in seconds
							</h1>
							<p className="wow fadeInUpX" data-wow-delay="0.10s">
								Upload a photo of your building or wall and our AI model will analyze and visualize possible structural failures.
							</p>
							<div className="fugu--btn-wrap fugu--hero-btn wow fadeInUpX" data-wow-delay="0.20s">
								<Link href={"/upload"} legacyBehavior>
									<a className="fugu--btn bg-gray active">Upload Photo</a>
								</Link>
								<Link href={"/about"} legacyBehavior>
									<a className="fugu--btn bg-gray">View Gallery</a>
								</Link>
							</div>
							<div className="fugu--counter-wrap wow fadeInUpX" data-wow-delay="0.30s">
								<div className="fugu--counter-data">
									<h2>
										<span data-percentage="1024" className="fugu--counter">
											<CountUp end={1024} />
										</span>
										<strong>+</strong>
									</h2>
									<p>Photos Analyzed</p>
								</div>
								<div className="fugu--counter-data">
									<h2>
										<span data-percentage="390" className="fugu--counter">
											<CountUp end={390} />
										</span>
										<strong>+</strong>
									</h2>
									<p>Failures Detected</p>
								</div>
								<div className="fugu--counter-data">
									<h2>
										<span data-percentage="178" className="fugu--counter">
											<CountUp end={178} />
										</span>
										<strong>+</strong>
									</h2>
									<p>Users</p>
								</div>
							</div>
						</div>
					</div>
					<div className="col-lg-5">
						<div className="fugu--hero-right" id="rotateOne">
							<div className="fugu--card-wrap">
								<div className="fugu--card-thumb">
									<img src="/images/app-demo/building-analyze.png" alt="Analysis example" />
								</div>
								<div className="fugu--card-data">
									<h3>Analyze your structure now</h3>
									<p>Immediate results</p>
									<div className="fugu--card-footer">
										<div className="fugu--card-footer-data">
											<span>Accurate AI</span>
											<h4>+95% accuracy</h4>
										</div>
										<Link href={"/upload"} legacyBehavior>
											<a className="fugu--btn btn-sm bg-white">Start</a>
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="fugu--hero-shape1">
					<img src="/images/all-img/v3/shape-hero1.png" alt="" />
				</div>
				<div className="fugu--hero-shape2"></div>
			</div>
		</div>
	);
}
