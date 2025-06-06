// pages/gallery.jsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { useAuth } from "../../contexts/AuthContext";
import { INTERFERENCE_JOBS_ENDPOINT } from "../../utils/api";
import { readCookie } from "../../utils/cookies";

export default function GalleryPage() {
  const { isLoggedIn } = useAuth();
  const router         = useRouter();

  /* ─── pagination state ───────────────────────────────────────────── */
  const [jobs,  setJobs]  = useState([]);
  const [count, setCount] = useState(0);
  const [next,  setNext]  = useState(null);
  const [prev,  setPrev]  = useState(null);
  const [page,  setPage]  = useState(1);

  /* misc state */
  const [loading,  setLoading]  = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [modalJob, setModalJob] = useState(null);

  /* ─── redirect if not logged in ──────────────────────────────────── */
  useEffect(() => {
    if (isLoggedIn === false) router.replace("/login");
  }, [isLoggedIn, router]);

  /* ─── fetch DONE jobs for the current page ───────────────────────── */
  useEffect(() => {
    if (!isLoggedIn) return;

    setLoading(true);  setErrorMsg("");

    fetch(`${INTERFERENCE_JOBS_ENDPOINT}?status=DONE&page=${page}`, {
      credentials: "include",
      headers: { "Content-Type": "application/json",
                 "X-CSRFToken": readCookie("csrftoken") },
    })
      .then(r => (r.status === 403 ? (router.replace("/login"), null) : r.json()))
      .then(data => {
        if (!data) return;
        setJobs(Array.isArray(data.results) ? data.results : []);
        setCount(data.count || 0);
        setNext(data.next);  setPrev(data.previous);
      })
      .catch(err => {
        console.error(err);
        setErrorMsg("Failed to load images.");
        setJobs([]); setCount(0); setNext(null); setPrev(null);
      })
      .finally(() => setLoading(false));
  }, [isLoggedIn, page, router]);

  const toPrev = () => prev && setPage(p => Math.max(p - 1, 1));
  const toNext = () => next && setPage(p => p + 1);
  const pages  = Math.max(Math.ceil(count / 9), 1);

  if (isLoggedIn !== true) return null;           // wait for auth check

  /* ─── layout: flex column so the body fills 100 vh ───────────────── */
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
      padding: 24,
      color: "#fff",
    }}>
      <h1 style={{ textAlign: "center", marginBottom: 24 }}>Gallery</h1>

      {/* Main content block grows to fill the viewport */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {loading ? (
          <Centered>Loading page {page}…</Centered>
        ) : errorMsg ? (
          <Centered style={{ color: "#ff5e6d" }}>{errorMsg}</Centered>
        ) : jobs.length === 0 ? (
          <Centered>No images on this page.</Centered>
        ) : (
          <div style={{ margin: "0 auto", width: "100%", maxWidth: 1280 }}>
            <div className="row fugu--portfolio-wrap" id="fugu--two-column">
              {jobs.map((job, i) => (
                <div
                  key={job.id}
                  className="collection-grid-item col-lg-4 col-sm-12 wow fadeInUpX"
                  data-wow-delay={`${i * 0.05}s`}
                  style={{ marginBottom: 24 }}
                >
                  <div className="fugu--blog-wrap">
                    <div
                      className="fugu--blog-thumb"
                      style={{ height: 250, overflow: "hidden", cursor: "pointer" }}
                      onClick={() => setModalJob(job)}
                    >
                      <Link href={job.mask_image || "#"} onClick={e=>e.preventDefault()}>
                        <img
                          src={job.mask_image}
                          alt={`Job ${job.id}`}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* pagination */}
        <div style={{
          display: "flex", justifyContent: "center", alignItems: "center",
          gap: 12, marginTop: 24,
        }}>
          <PagerBtn disabled={!prev} onClick={toPrev}>←</PagerBtn>
          <span style={{ color: "#aaa" }}>
            Page {page} of {pages}
          </span>
          <PagerBtn disabled={!next} onClick={toNext}>→</PagerBtn>
        </div>
      </div>

      {/* modal preview (input & result) */}
      {modalJob && (
        <div
          className="gallery-modal-overlay"
          onClick={() => setModalJob(null)}
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,.8)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: 20, zIndex: 1000,
          }}
        >
          <div
            onClick={e=>e.stopPropagation()}
            style={{
              background: "#181828", borderRadius: 8, padding: 20,
              maxWidth: "90vw", display: "flex", flexDirection: "column", alignItems: "center",
            }}
          >
            <button
              onClick={() => setModalJob(null)}
              style={{ alignSelf: "flex-end", fontSize: "1.5rem",
                       background: "none", border: "none",
                       color: "#fff", cursor: "pointer" }}
            >&times;</button>

            <img
              src={modalJob.mask_image}
              alt="Result"
              style={{ maxWidth: "100%", maxHeight: "40vh", objectFit: "contain" }}
            />
            {modalJob.input_image && (
              <img
                src={modalJob.input_image}
                alt="Input"
                style={{ maxWidth: "100%", maxHeight: "40vh",
                         objectFit: "contain", marginTop: 12 }}
              />
            )}
            <h3 style={{ marginTop: 12 }}>
              {modalJob.vision_model_details?.name || "Unknown model"}
            </h3>
            <p style={{ color: "#aaa" }}>Uploaded by: {modalJob.user_username}</p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── small helpers ─────────────────────────────────────────────────── */
function Centered({ children, style }) {
  return (
    <div style={{
      flex: 1, display: "flex", justifyContent: "center",
      alignItems: "center", minHeight: "40vh", fontSize: "1.25rem",
      ...style,
    }}>
      {children}
    </div>
  );
}

function PagerBtn({ disabled, children, ...rest }) {
  return (
    <button
      disabled={disabled}
      style={{
        padding: "8px 16px", borderRadius: 4, border: "none",
        background: disabled ? "#555" : "#4e00ff",
        color: "#fff", cursor: disabled ? "not-allowed" : "pointer",
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
