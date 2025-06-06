/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useState } from "react";
import useScroll from "../../../hooks/useScroll";
import { useAuth } from "../../../contexts/AuthContext";

export default function HeaderHome() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const scroll = useScroll();
  const { user, isLoggedIn, logout } = useAuth();

  const handleCloseMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`site-header site-header--menu-right fugu--header-section fugu--header-three ${
        scroll ? "sticky-menu" : ""
      }`}
      id="sticky-menu"
    >
      <div className="container-fluid">
        <nav className="navbar site-navbar">
          <div className="brand-logo">
            <Link href="/">
              <img
                src="/images/logo/logo-white.svg"
                alt="Logo"
                className="light-version-logo"
              />
            </Link>
          </div>

          <div className="menu-block-wrapper">
            <div
              className={`menu-overlay ${isMobileMenuOpen ? "active" : ""}`}
              onClick={handleCloseMobileMenu}
            ></div>

            <nav
              className={`menu-block ${isMobileMenuOpen ? "active" : ""}`}
              id="append-menu-header"
            >
              <div className="mobile-menu-head">
                <div
                  className="mobile-menu-close"
                  onClick={handleCloseMobileMenu}
                >
                  &times;
                </div>
              </div>
              <div className="fugu--header-menu2">
                <ul className="header-menu-list">
                  <li>
                    <Link href="/gallery" className="fugu--btn-link">
                      Gallery
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>

          <div className="header-btn header-btn-l1 ms-auto d-none d-xs-inline-flex">
            {!isLoggedIn ? (
              <Link href="/login" className="fugu--btn fugu--menu-btn1">
                Get Started
              </Link>
            ) : (
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <span style={{ color: "#fff", fontWeight: 500 }}>
                  Hi, {user.username}
                </span>
                <button
                  onClick={logout}
                  className="fugu--btn fugu--menu-btn1"
                  style={{ padding: "8px 16px" }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          <div
            className="mobile-menu-trigger"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span></span>
          </div>
        </nav>
      </div>
    </header>
  );
}
