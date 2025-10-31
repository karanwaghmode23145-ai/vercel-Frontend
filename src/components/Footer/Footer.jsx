import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.webp";
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-container">
      {/* ✅ Added top border line */}
      <div style={{ borderTop: "1px solid #ddd" }}></div>

      <div className="container py-5">
        <div className="footer-top">
          {/* Logo & Description */}
          <div className="footer-logo-section">
            <img src={logo} alt="jemzy.pk" className="footer-logo" />
            <p className="footer-description">
              Welcome to <span className="highlight">JEMZY</span>, your trusted destination for
              elegant and affordable jewelry. From delicate everyday pieces to
              eye-catching designs, our collection is made to help you shine
              with confidence. Discover jewelry that tells your story —
              beautifully and effortlessly.
            </p>
          </div>

          {/* Company Links */}
          <div className="footer-links">
            <p className="footer-heading">Company</p>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/order">Delivery</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-contact">
            <p className="footer-heading">Get in Touch</p>
            <ul>
              <li><a href="tel:+923274243417">0327 4243417</a></li>
              <li><a href="mailto:contact.jemzypk@gmail.com">contact.jemzypk@gmail.com</a></li>
              <li><Link to="">INSTAGRAM</Link></li>
              <li><Link to="">FACEBOOK</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="footer-bottom mt-4">
          <hr />
          <p className="text-center mb-0">
            Copyright {currentYear} @usman.dev - All Right Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
