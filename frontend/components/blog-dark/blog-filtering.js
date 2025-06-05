/* eslint-disable @next/next/no-img-element */
import Isotope from "isotope-layout";
import Link from "next/link";
// ...existing code...
import { useEffect, useRef, useState } from "react";

export default function BlogFiltering() {
    const isotope = useRef();
    const [activeClass, setActiveClass] = useState("*");
    const [filterKey, setFilterKey] = useState("*");
    const [modalImg, setModalImg] = useState(null); // Nuevo estado para el modal

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

    const handleFilterKeyChange = (key) => () => {
        setFilterKey(key);
        setActiveClass(key);
    };

    const handleActiveClass = (key) => {
        if (key === activeClass) return "active";
    };

    // Array de imágenes y categorías para simplificar el renderizado
    const images = [
        { src: "/images/all-img/blog2/dark/blog1.png", category: "analysis", text: "Descripción de la imagen 1" },
        { src: "/images/all-img/blog2/dark/blog2.png", category: "collectible", text: "Descripción de la imagen 2" },
        { src: "/images/all-img/blog2/dark/blog1.png", category: "analysis", text: "Descripción de la imagen 3" },
        { src: "/images/all-img/blog2/dark/blog2.png", category: "collectible", text: "Descripción de la imagen 4" },
        { src: "/images/all-img/blog2/dark/blog3.png", category: "collectible", text: "Descripción de la imagen 5" },
        { src: "/images/all-img/blog2/dark/blog4.png", category: "metaverse", text: "Descripción de la imagen 6" },
        { src: "/images/all-img/blog2/dark/blog5.png", category: "utility", text: "Descripción de la imagen 7" },
        { src: "/images/all-img/blog2/dark/blog6.png", category: "utility", text: "Descripción de la imagen 8" },
    ];

    return (
        <div className="fugu--blog-filtering dark-version row">
            <div className="fugu--section-title-wrap col-md-12">
                <div className="fugu--default-content content-sm">
                    <h2>Galería</h2>
                </div>
                <div className="fugu--portfolio-menu">
                    <ul className="option-set clear-both">
                        <li onClick={handleFilterKeyChange("*")} className={handleActiveClass("*")}>
                            <span>Todos</span>
                        </li>
                        <li onClick={handleFilterKeyChange("analysis")} className={handleActiveClass("analysis")}>
                            <span>Art & Analysis</span>
                        </li>
                        <li onClick={handleFilterKeyChange("collectible")} className={handleActiveClass("collectible")}>
                            <span>Collectible</span>
                        </li>
                        <li onClick={handleFilterKeyChange("metaverse")} className={handleActiveClass("metaverse")}>
                            <span>Metaverse</span>
                        </li>
                        <li onClick={handleFilterKeyChange("utility")} className={handleActiveClass("utility")}>
                            <span>Utility</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="col-12">
                {/* Galería tipo Sora: solo imágenes, sin texto, imágenes pegadas */}
                <div
                    className="fugu--portfolio-wrap sora-gallery"
                    id="fugu--two-column"
                >
                    {images.map((img, idx) => (
                        <div
                            key={idx}
                            className={`collection-grid-item ${img.category} sora-gallery-col`}
                            onClick={() => setModalImg(img)}
                            style={{ cursor: "pointer" }}
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

            <style jsx>{`
                .sora-gallery {
                    display: flex;
                    flex-wrap: wrap;
                    margin: 0;
                    padding: 0;
                }
                .sora-gallery-col {
                    width: 33.3333%;
                    padding: 0;
                    margin: 0;
                }
                .sora-gallery-img-wrap {
                    width: 100%;
                    height: 220px;
                    overflow: hidden;
                }
                @media (max-width: 992px) {
                    .sora-gallery-col {
                        width: 50%;
                    }
                    .sora-gallery-img-wrap {
                        height: 160px;
                    }
                }
                @media (max-width: 768px) {
                    .sora-gallery-col {
                        width: 100%;
                    }
                    .sora-gallery-img-wrap {
                        height: 140px;
                    }
                }
                .sora-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    background: rgba(0,0,0,0.85);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 2147483647; /* Asegura que esté por encima de todo, incluso el footer */
                }
                .sora-modal-content {
                    background: #181818;
                    border-radius: 10px;
                    padding: 24px 24px 16px 24px;
                    max-width: 90vw;
                    max-height: 90vh;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    position: relative;
                }
                .sora-modal-content img {
                    max-width: 70vw;
                    max-height: 60vh;
                    border-radius: 8px;
                    margin-bottom: 16px;
                }
                .sora-modal-text {
                    color: #fff;
                    font-size: 1.1rem;
                    text-align: center;
                    margin-bottom: 8px;
                }
                .sora-modal-close {
                    position: absolute;
                    top: 8px;
                    right: 16px;
                    background: transparent;
                    border: none;
                    color: #fff;
                    font-size: 2rem;
                    cursor: pointer;
                }
            `}</style>
        </div>
    );
}