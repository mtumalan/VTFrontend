/* eslint-disable @next/next/no-img-element */
import Isotope from "isotope-layout";
import { useEffect, useRef, useState } from "react";
import { GALLERY_ENDPOINT } from "../../utils/api";

export default function Gallery() {
    const isotope = useRef();
    const [modalImg, setModalImg] = useState(null);
    const [images, setImages] = useState([]);
    const [filterKey, setFilterKey] = useState("*");

    useEffect(() => {
        isotope.current = new Isotope("#fugu--two-column", {
            itemSelector: ".collection-grid-item",
            layoutMode: "fitRows",
            percentPosition: true,
        });
        return () => isotope.current.destroy();
    }, []);

    useEffect(() => {
        filterKey === "*"
            ? isotope.current.arrange({ filter: `*` })
            : isotope.current.arrange({ filter: `.${filterKey}` });
    }, [filterKey]);

    useEffect(() => {
        async function fetchImages() {
            try {
                const res = await fetch(GALLERY_ENDPOINT);
                if (!res.ok) throw new Error("Error fetching gallery");
                const data = await res.json();
                const formatted = data.map(item => ({
                    src: item.image,
                    category: "analysis",
                    text: item.title
                }));
                setImages(formatted);
            } catch (err) {
                setImages([]);
            }
        }
        fetchImages();
    }, []);

    return (
        <div className="fugu--blog-filtering row">
            <div className="col-12">
                <div className="fugu--portfolio-wrap row" id="fugu--two-column">
                    {images.map((img, idx) => (
                        <div
                            key={idx}
                            className={`collection-grid-item ${img.category} analysis wow fadeInUpX col-lg-6 col-sm-12`}
                            onClick={() => setModalImg(img)}
                        >
                            <div className="sora-gallery-img-wrap">
                                <img
                                    src={img.src}
                                    alt=""
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        display: "block",
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                    </div>
            </div>

            {/* Modal para mostrar la imagen grande y el texto */}
            {modalImg && (
                <div className="sora-modal" onClick={() => setModalImg(null)}>
                    <div className="sora-modal-content" onClick={e => e.stopPropagation()}>
                        <img src={modalImg.src} alt="" />
                        <div className="sora-modal-text">{modalImg.text}</div>
                        <button className="sora-modal-close" onClick={() => setModalImg(null)}>×</button>
                    </div>
                </div>
            )}

        </div>
    );
}