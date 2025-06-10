/* pages/ai-chat.jsx */
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { VISION_MODELS_URL, INTERFERENCE_JOBS_ENDPOINT } from "../utils/api";
import { readCookie } from "../utils/cookies";
import { useAuth } from "../contexts/AuthContext";

export default function AiChat() {
  const router                = useRouter();
  const { isLoggedIn, loading } = useAuth();   // ← include loading flag

  /* fetched models */
  const [models, setModels]   = useState([]);
  const [modelsBusy, setMB]   = useState(true);
  const [fetchErr, setFE]     = useState("");

  /* user inputs */
  const [modelId, setModelId] = useState("");
  const [file,    setFile]    = useState(null);

  /* form feedback */
  const [errMsg, setErr]      = useState("");
  const [okMsg,  setOk]       = useState("");

  /* ─── redirect gate ─────────────────────────────────────────────── */
  useEffect(() => {
    if (!loading && isLoggedIn === false) {
      router.replace("/login");
    }
  }, [loading, isLoggedIn, router]);

  /* ─── fetch models once auth finished ───────────────────────────── */
  useEffect(() => {
    if (loading || isLoggedIn !== true) return;      // wait for auth

    setMB(true);  setFE("");

    fetch(VISION_MODELS_URL, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": readCookie("csrftoken"),
      },
    })
      .then(r => r.json())
      .then(data => {
        const arr = Array.isArray(data.results) ? data.results : [];
        setModels(arr);
        if (arr.length) setModelId(arr[0].id.toString());
      })
      .catch(e => {
        console.error(e);
        setFE("Error loading models.");
      })
      .finally(() => setMB(false));
  }, [loading, isLoggedIn]);

  /* ─── submit handler ────────────────────────────────────────────── */
  const handleSend = async () => {
    setErr(""); setOk("");

    if (!modelId) { setErr("Please select a model."); return; }
    if (!file)    { setErr("Please select an image."); return; }

    const fd = new FormData();
    fd.append("vision_model", modelId);
    fd.append("input_image", file);

    try {
      const r = await fetch(INTERFERENCE_JOBS_ENDPOINT, {
        method : "POST",
        credentials: "include",
        headers : { "X-CSRFToken": readCookie("csrftoken") },
        body    : fd,
      });

      if (!r.ok) {
        let msg = `Error ${r.status}`;
        try { const j = await r.json(); msg = j.detail || JSON.stringify(j); } catch {}
        throw new Error(msg);
      }
      setOk("Job submitted successfully!");
      router.push("/my-uploads");  // redirect to uploads page
    } catch (e) {
      console.error(e);
      setErr(e.message || "Submission failed.");
    }
  };

  /* ─── while auth is pending or redirecting, render nothing ─────── */
  if (loading || isLoggedIn !== true) return null;

  /* ─── UI ────────────────────────────────────────────────────────── */
  return (
    <div className="fugu--inner-section dark-version"
         style={{ minHeight:"100vh", display:"flex" }}>
      <div style={{
        width:"100%", display:"flex", justifyContent:"center",
        alignItems:"center" }}>
        <div className="col-lg-6">
          <div className="fugu--contact-form wow fadeInUpX" data-wow-delay="0.15s">
            <h3 style={{ color:"#fff", marginBottom:15 }}>Analyze your image</h3>

            {modelsBusy ? (
              <p style={{ color:"#aaa" }}>Loading models…</p>
            ) : fetchErr ? (
              <p style={{ color:"#ff5e6d" }}>{fetchErr}</p>
            ) : (
              <form onSubmit={e => e.preventDefault()}>
                {/* model selector */}
                <div className="fugu--comment-field">
                  <label htmlFor="model-select"
                         style={{ color:"#fff", marginBottom:8, display:"block" }}>
                    Select a model
                  </label>
                  <select id="model-select"
                          value={modelId}
                          onChange={e => setModelId(e.target.value)}
                          className="form-control"
                          style={{
                            background:"#181828", color:"#fff", borderRadius:8,
                            border:"1.5px solid #4f8cff", padding:12, fontSize:"1rem",
                            marginBottom:16 }}>
                    {models.map(m => (
                      <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                  </select>
                </div>

                {/* file input */}
                <div className="fugu--comment-field">
                  <label htmlFor="file-upload"
                         style={{ color:"#fff", marginBottom:8, display:"block" }}>
                    Select file
                  </label>
                  <input id="file-upload" type="file"
                         onChange={e => setFile(e.target.files[0])}
                         className="form-control"
                         style={{
                           background:"#181828", color:"#fff", borderRadius:8,
                           border:"1.5px solid #4f8cff", padding:12, fontSize:"1rem" }} />
                  {file && (
                    <div style={{ color:"#aaa", fontSize:14, marginTop:8 }}>
                      Selected: {file.name}
                    </div>
                  )}
                </div>

                {/* feedback */}
                {errMsg && <p style={{ color:"#ff5e6d" }}>{errMsg}</p>}
                {okMsg  && <p style={{ color:"#12e497" }}>{okMsg}</p>}

                {/* submit */}
                <button type="button" onClick={handleSend}
                        id="fugu--form-submit-btn" className="link-button"
                        style={{ color:"#fff" }}>
                  Enviar
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* decorative shapes (unchanged) */}
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
  return { props: { header:"three", footer:"three" } };
}
