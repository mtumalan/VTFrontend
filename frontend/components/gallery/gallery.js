/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useEffect, useState } from "react";
import { INTERFERENCE_JOBS_ENDPOINT } from "../../utils/api";

export default function Gallery() {
	const [images, setimages] = useState([]);
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedImage, setSelectedImage] = useState(null);

	useEffect(() => {
		fetch(INTERFERENCE_JOBS_ENDPOINT)
			.then((res) => res.json())
			.then((data) => setimages(Array.isArray(data) ? data : []))
			.catch((err) => {
				console.error(err);
				setimages([]);
			});
	}, []);

	const openModal = (image) => {
		setSelectedImage(image);
		setModalOpen(true);
	};

	const closeModal = () => {
		setModalOpen(false);
		setSelectedImage(null);
	};

	return (
		<div className="fugu--blog-filtering dark-version row" style={{ minHeight: "60vh" }}>
			<div className="col-12">
				{Array.isArray(images) && images.length === 0 ? (
					<div style={{
						width: "100%",
						padding: "48px 0",
						textAlign: "center",
						color: "#fff",
						background: "transparent", // <-- sin fondo
						borderRadius: 0,
						fontSize: 22,
						fontWeight: 600,
						margin: "40px 0"
					}}>
						No hay imágenes
					</div>
				) : (
					<div className="fugu--portfolio-wrap row" id="fugu--two-column">
						{Array.isArray(images) && images.map((image, idx) => (
							<div
								key={image.id || idx}
								className={`collection-grid-item wow fadeInUpX col-lg-4 col-sm-12`}
								data-wow-delay={`${idx * 0.1}s`}
							>
								<div className="fugu--blog-wrap">
									<div
										className="fugu--blog-thumb"
										style={{ cursor: "pointer" }}
										onClick={() => openModal(image)}
									>
										<Link
											href={image.link || "single-blog-dark"}
											onClick={(e) => e.preventDefault()}
										>
											<img src={image.input_image} alt="" />
										</Link>
									</div>
								</div>
							</div>
						))}
					</div>
				)}
			</div>

			{modalOpen && selectedImage && (
				<div className="gallery-modal-overlay" onClick={closeModal}>
					<div className="gallery-modal-content" onClick={(e) => e.stopPropagation()}>
						<button onClick={closeModal} className="gallery-modal-close">
							&times;
						</button>
						<img src={selectedImage.input_image} alt="Input" className="gallery-modal-image" />
						{selectedImage.mask_image && (
							<img
								src={selectedImage.mask_image}
								alt="Mask"
								className="gallery-modal-image"
								style={{ marginLeft: "16px" }}
							/>
						)}
						<h3 className="gallery-modal-model">
							{selectedImage.model}
						</h3>
						<p className="gallery-modal-user">
							{selectedImage.user}
						</p>
					</div>
				</div>
			)}
		</div>
	);
}
