/* eslint-disable react/no-unescaped-entities */
export default function ErrorPage() {
	return (
		<div className="fugu--inner-section dark-version">
			<div className="container">
				<div className="fugu-error-content fadeInUpX">
					<h1>404</h1>
					<h2>Oops, this page is not found</h2>
					<p>
						The page you're looking for can't be found. Double-check the URL and try again. we invite you to
						visit our homepage.
					</p>
					<a className="fugu-btn small-btn" href="">
						Go To Homepage
					</a>
				</div>
			</div>
			<div className="fugu--blog-shape1">
				<img src="/images/all-img/v3/shape2.png" alt="" />
			</div>
			<div className="fugu--blog-shape3">
				<img src="/images/all-img/blog2/shape.png" alt="" />
			</div>
		</div>
	);
}

export async function getStaticProps() {
	return { props: { header: "three", footer: "one" } };
}
