/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";

export default function FooterHomeThree() {
  return (
    <footer className="fugu--footer-section text-light">
      <div className="container py-4">
        {/* TOP BAR: single row, three sections (logo / nav / optional) */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
          {/* ------------------------- */}
          {/* 1) LEFT: Logo or Project Name */}
          {/* ------------------------- */}
          <div className="d-flex align-items-center mb-3 mb-md-0">
            {/* Replace with your actual logo path or just project name text */}
            <img
              src="/images/logo/logo-white.svg"
              alt="Project Logo"
              style={{ height: "40px", marginRight: "0px" }}
            />
            <span className="h5 mb-0">VisionSeg</span>
          </div>

          <nav className="flex-grow-1">
            {/* <ul className="list-unstyled d-flex justify-content-center gap-4 mb-0 ml-2">
              <li>
                <Link href="/login">Login</Link>
              </li>
              <li>
                <Link href="/register">Register</Link>
              </li>
              <li>
                <Link href="/gallery">Models Gallery</Link>
              </li>
            </ul> */}
          </nav>

          <div className="d-flex align-items-center">
            <ul className="list-unstyled d-flex gap-3 mb-0">
              <li>
                <Link href="https://github.com/your‐repo">
                  <img
                    src="/images/social2/github.svg"
                    alt="GitHub"
                    style={{ height: "24px" }}
                  />
                </Link>
              </li>
              <li>
                <Link href="https://your‐docs.example.com">
                  <img
                    src="/images/social2/document.svg"
                    alt="Docs"
                    style={{ height: "24px" }}
                  />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* ========================= */}
        {/*  BOTTOM BAR: Copyright */}
        {/* ========================= */}
        <div className="pt-3 mt-4 border-top">
          <div className="d-flex justify-content-center">
            <p className="mb-0 small">
              &copy; Copyright 2025, All Rights Reserved by Cracks
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
