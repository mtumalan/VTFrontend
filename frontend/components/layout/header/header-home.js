/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useState } from "react";
import useScroll from "../../../hooks/useScroll";

export default function HeaderHome() {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const handleCloseMobileMenu = () => {
		setIsMobileMenuOpen(false);
	};

	const scroll = useScroll();
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
						<Link href={"/"}>
							<img src="/images/logo/logo-white.svg" alt="" className="light-version-logo" />
						</Link>
					</div>
					<div className="menu-block-wrapper">
						<div
							className={`menu-overlay ${isMobileMenuOpen ? "active" : null}`}
							onClick={handleCloseMobileMenu}
						></div>
						<nav className={`menu-block ${isMobileMenuOpen ? "active" : null}`} id="append-menu-header">
							<div className="mobile-menu-head">
								<div className="mobile-menu-close" onClick={handleCloseMobileMenu}>
									&times;
								</div>
							</div>
							<div className="fugu--header-menu2">
								<ul className="header-menu-list">
									<li>
										<Link href={"#"}> Gallery </Link>
									</li>
									<li>
										<Link href={"about-us"}> My photos </Link>
									</li>

								</ul>
							</div>
						</nav>
					</div>
					<div className="header-btn header-btn-l1 ms-auto d-none d-xs-inline-flex">
						<a className="fugu--btn fugu--menu-btn1" href="/login">
							Get Started
						</a>
					</div>
					<div className="mobile-menu-trigger" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
						<span></span>
					</div>
				</nav>
			</div>
		</header>
	);
}
