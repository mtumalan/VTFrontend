/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import CountUp from "react-countup";
import React from "react";

export default function HeroSection() {
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
          <div className="col-6 col-sm-4 col-lg-2 mb-4 mb-sm-0 mx-4">
            <div className="fugu--counter-wrap text-center">
              <h2 className="mb-1 text-white">
                <CountUp end={1024} duration={2.5} />+
              </h2>
              <p className="mb-0 text-white">Photos Analyzed</p>
            </div>
          </div>
          <div className="col-6 col-sm-4 col-lg-2 mb-4 mb-sm-0">
            <div className="fugu--counter-wrap text-center">
              <h2 className="mb-1 text-white">
                <CountUp end={390} duration={2.5} />+
              </h2>
              <p className="mb-0 text-white">Failures Detected</p>
            </div>
          </div>
          <div className="col-6 col-sm-4 col-lg-2">
            <div className="fugu--counter-wrap text-center">
              <h2 className="mb-1 text-white">
                <CountUp end={178} duration={2.5} />+
              </h2>
              <p className="mb-0 text-white">Users</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
