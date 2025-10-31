import React from "react";
import { Link } from "react-router-dom";
import { PartyPopper } from "lucide-react";
import banner from "../../../assets/banner_1.webp";
import "bootstrap/dist/css/bootstrap.min.css";

const AdBanner = () => {
  return (
    <section
      className="container py-5"
      style={{ paddingTop: "60px", paddingBottom: "60px" }}
    >
      <div className="row align-items-center">
        {/* Text Section */}
        <div className="col-lg-6 mb-4 mb-lg-0">
          <p className="text-uppercase text-danger fw-semibold mb-2">
            Most Demanded Necklace
          </p>
          <h1 className="fw-bold mb-3" style={{ lineHeight: "1.3" }}>
            The Wait Is Over!{" "}
            <span className="text-danger">Most Wanted Necklace</span> Restocked —{" "}
            <span className="text-danger">Limited Time Sale</span> On Now
          </h1>
          <p className="text-muted mb-4">
            Back by demand — our best-selling necklace is restocked and on sale!
            Limited stock, so grab yours now before it’s gone again.
          </p>
          <Link to="/collection">
            <button className="btn btn-dark d-flex align-items-center gap-2">
              Claim Now <PartyPopper size={18} />
            </button>
          </Link>
        </div>

        {/* Image Section */}
        <div className="col-lg-6 text-center position-relative">
          <img
            src={banner}
            alt="Jemzy Featured Product"
            className="img-fluid rounded shadow"
            style={{ maxHeight: "400px", objectFit: "cover" }}
          />

          {/* Decorative Star */}
          <div
            className="position-absolute top-0 end-0 translate-middle"
            style={{ transform: "translate(50%, 20%)" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 68 68"
              fill="none"
            >
              <path
                d="M34 0L43.6167 24.3833L68 34L43.6167 43.6167L34 68L24.3833 43.6167L0 34L24.3833 24.3833L34 0Z"
                fill="#CC0D39"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdBanner;
