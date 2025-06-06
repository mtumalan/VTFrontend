import Link from "next/link";

/* eslint-disable @next/next/no-img-element */
export default function Team() {
  return (
    <div className="fugu--team-section fugu--section-padding2">
      <div className="container">
        {/*
          Wrap the title in its own row/column and add `text-center`
          so that the H2 and paragraph both center horizontally.
        */}
        <div className="row justify-content-center mb-5">
          <div className="col-12 col-md-8 text-center">
            <h2 className="mb-3 text-white">Meet the Development Team</h2>
            <p className="text-white">
              We are a multidisciplinary team focused on creating technological
              solutions for the detection of structural failures in buildings
              and walls. Our mission is to facilitate analysis and risk
              prevention through artificial intelligence.
            </p>
          </div>
        </div>

        {/*
          This row already has `justify-content-center` so any “incomplete”
          final row of cards (like two cards out of three) will center on-screen.
        */}
        <div className="row justify-content-center">
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="fugu--team-wrap wow fadeInUpX" data-wow-delay="0s">
              <div className="fugu--team-left d-flex align-items-center">
                <div className="fugu--team-thumb me-3">
                  <img src="/images/all-img/v3/team2.jpg" alt="Gabriel" />
                </div>
                <div className="fugu--team-data">
                  <h4>Gabriel</h4>
                  <p>Developer</p>
                </div>
              </div>
              <button type="button" className="fugu--dot-btn">
                <img src="/images/svg2/dots.svg" alt="More" />
              </button>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 mb-4">
            <div
              className="fugu--team-wrap wow fadeInUpX"
              data-wow-delay="0.10s"
            >
              <div className="fugu--team-left d-flex align-items-center">
                <div className="fugu--team-thumb me-3">
                  <img src="/images/all-img/v3/team2.jpg" alt="Mauricio" />
                </div>
                <div className="fugu--team-data">
                  <h4>Mauricio</h4>
                  <p>Developer</p>
                </div>
              </div>
              <button type="button" className="fugu--dot-btn">
                <img src="/images/svg2/dots.svg" alt="More" />
              </button>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 mb-4">
            <div
              className="fugu--team-wrap wow fadeInUpX"
              data-wow-delay="0.20s"
            >
              <div className="fugu--team-left d-flex align-items-center">
                <div className="fugu--team-thumb me-3">
                  <img src="/images/all-img/v3/team2.jpg" alt="Daniel" />
                </div>
                <div className="fugu--team-data">
                  <h4>Daniel</h4>
                  <p>Developer</p>
                </div>
              </div>
              <button type="button" className="fugu--dot-btn">
                <img src="/images/svg2/dots.svg" alt="More" />
              </button>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 mb-4">
            <div
              className="fugu--team-wrap wow fadeInUpX"
              data-wow-delay="0.30s"
            >
              <div className="fugu--team-left d-flex align-items-center">
                <div className="fugu--team-thumb me-3">
                  <img src="/images/all-img/v3/team2.jpg" alt="Carlos" />
                </div>
                <div className="fugu--team-data">
                  <h4>Carlos</h4>
                  <p>Developer</p>
                </div>
              </div>
              <button type="button" className="fugu--dot-btn">
                <img src="/images/svg2/dots.svg" alt="More" />
              </button>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 mb-4">
            <div
              className="fugu--team-wrap wow fadeInUpX"
              data-wow-delay="0.40s"
            >
              <div className="fugu--team-left d-flex align-items-center">
                <div className="fugu--team-thumb me-3">
                  <img src="/images/all-img/v3/team2.jpg" alt="Erik" />
                </div>
                <div className="fugu--team-data">
                  <h4>Erik</h4>
                  <p>Developer</p>
                </div>
              </div>
              <button type="button" className="fugu--dot-btn">
                <img src="/images/svg2/dots.svg" alt="More" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="fugu--shape3">
        <img src="/images/shape2/shape3.png" alt="Decorative shape" />
      </div>
    </div>
  );
}
