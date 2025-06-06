// pages/gallery.jsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../contexts/AuthContext";
import Link from "next/link";
import { INTERFERENCE_JOBS_ENDPOINT } from "../../utils/api";
import { readCookie } from "../../utils/cookies"; // Adjust the import path as needed

export default function GalleryPage() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  const [images, setImages] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // If not logged in, redirect
  useEffect(() => {
    if (isLoggedIn === false) {
      router.replace("/login");
    }
  }, [isLoggedIn, router]);

  // Once isLoggedIn === true, fetch the jobs
  useEffect(() => {
    if (!isLoggedIn) return;

    fetch(INTERFERENCE_JOBS_ENDPOINT, {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json", "X-CSRFToken": readCookie("csrftoken") }
    })
      .then((res) => {
        if (res.status === 403) {
          router.replace("/login");
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setImages(data);
        } else {
          setImages([]);
        }
      })
      .catch((err) => {
        console.error("Error loading jobs:", err);
        setImages([]);
      });
  }, [isLoggedIn, router]);

  if (isLoggedIn !== true) {
    // Don’t render the gallery until we know we’re logged in
    return null;
  }

  return (
    <div className="fugu--blog-filtering dark-version row">
      <div className="col-12">
        <div className="fugu--portfolio-wrap row" id="fugu--two-column">
          {images.map((image, idx) => (
            <div
              key={image.id || idx}
              className={`collection-grid-item wow fadeInUpX col-lg-4 col-sm-12`}
              data-wow-delay={`${idx * 0.1}s`}
            >
              <div className="fugu--blog-wrap">
                <div
                  className="fugu--blog-thumb"
                  style={{ cursor: "pointer" }}
                  onClick={() => setModalOpen(image)}
                >
                  <Link href={image.link || "#"} onClick={(e) => e.preventDefault()}>
                    <img src={image.input_image} alt={image.id || ""} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {modalOpen && (
        <div className="gallery-modal-overlay" onClick={() => setModalOpen(null)}>
          <div
            className="gallery-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => setModalOpen(null)} className="gallery-modal-close">
              &times;
            </button>
            <img
              src={modalOpen.input_image}
              alt="Input"
              className="gallery-modal-image"
            />
            {modalOpen.mask_image && (
              <img
                src={modalOpen.mask_image}
                alt="Mask"
                className="gallery-modal-image"
                style={{ marginLeft: "16px" }}
              />
            )}
            <h3 className="gallery-modal-model">{modalOpen.model}</h3>
            <p className="gallery-modal-user">{modalOpen.user}</p>
          </div>
        </div>
      )}
    </div>
  );
}