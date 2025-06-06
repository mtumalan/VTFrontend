/* eslint-disable @next/next/no-img-element */

import dynamic from "next/dynamic";
const GalleryFilterning = dynamic(() => import("./my-uploads"), {
	ssr: false,
});
export default function GalleryDarkInnerSection() {
	return (
		<div className="fugu--inner-section dark-version">
			<div className="container">
				<GalleryFilterning />
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
