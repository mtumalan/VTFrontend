/* components/common/HeroSection.jsx */
import { useEffect, useState } from "react";
import Link from "next/link";
import CountUp from "react-countup";
import { METRICS_ENDPOINT } from "../../utils/api";
import { readCookie } from "../../utils/cookies";

export default function HeroSection() {
  // ─── Local state for metrics ─────────────────────────────────────────────────
  const [metrics, setMetrics] = useState({
    total_photos_analyzed: 0,
    total_failures_detected: 0,
    total_users: 0,
  });
  const [loadingMetrics, setLoadingMetrics] = useState(true);
  const [metricsError, setMetricsError] = useState("");

  // ─── Fetch the metrics once on mount ──────────────────────────────────────────
  useEffect(() => {
    setLoadingMetrics(true);
    setMetricsError("");

    fetch(METRICS_ENDPOINT, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        // Note: GET requests do not strictly need CSRF, but including it does no harm
        "X-CSRFToken": readCookie("csrftoken"),
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Metrics request failed: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        // Expecting response shape: { total_photos_analyzed, total_failures_detected, total_users }
        setMetrics({
          total_photos_analyzed: data.total_photos_analyzed || 0,
          total_failures_detected: data.total_failures_detected || 0,
          total_users: data.total_users || 0,
        });
      })
      .catch((err) => {
        console.error("Error loading metrics:", err);
        setMetricsError("Could not load statistics");
      })
      .finally(() => {
        setLoadingMetrics(false);
      });
  }, []);

  return (
    <div
      className="fugu--hero-section d-flex align-items-center"
      style={{
        backgroundImage: "url(/images/all-img/v3/hero-bg.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "80vh",
      }}
    >
      <div className="container text-center">
        {/* —————— Title + Subtitle + Buttons —————— */}
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8">
            <h1 className="text-white mb-4">
              Detect structural failures in seconds
            </h1>
            <p className="lead mb-4 text-white">
              Upload a photo of your building or wall and our AI model will
              analyze and visualize possible structural failures.
            </p>
            <div className="d-flex justify-content-center gap-3 mb-5 mt-5">
              <Link href="/ai-chat" legacyBehavior>
                <a className="fugu--btn bg-gray">Upload Photo</a>
              </Link>
              <Link href="/gallery" legacyBehavior>
                <a className="fugu--btn bg-gray">View Gallery</a>
              </Link>
            </div>
          </div>
        </div>

        {/* —————— Metrics Row —————— */}
        <div className="row justify-content-center">
          {loadingMetrics ? (
            <div className="col-12">
              <p className="text-white">Loading statistics…</p>
            </div>
          ) : metricsError ? (
            <div className="col-12">
              <p className="text-white" style={{ color: "#ff5e6d" }}>
                {metricsError}
              </p>
            </div>
          ) : (
            <>
              <div className="col-6 col-sm-4 col-lg-2 mb-4 mb-sm-0 mx-4">
                <div className="fugu--counter-wrap text-center">
                  <h2 className="mb-1 text-white">
                    <CountUp
                      end={metrics.total_photos_analyzed}
                      duration={2.5}
                    />
                    +
                  </h2>
                  <p className="mb-0 text-white">Photos Analyzed</p>
                </div>
              </div>
              <div className="col-6 col-sm-4 col-lg-2 mb-4 mb-sm-0">
                <div className="fugu--counter-wrap text-center">
                  <h2 className="mb-1 text-white">
                    <CountUp
                      end={metrics.total_failures_detected}
                      duration={2.5}
                    />
                    +
                  </h2>
                  <p className="mb-0 text-white">Failures Detected</p>
                </div>
              </div>
              <div className="col-6 col-sm-4 col-lg-2">
                <div className="fugu--counter-wrap text-center">
                  <h2 className="mb-1 text-white">
                    <CountUp end={metrics.total_users} duration={2.5} />
                    +
                  </h2>
                  <p className="mb-0 text-white">Users</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
