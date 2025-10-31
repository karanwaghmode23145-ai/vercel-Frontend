import React from "react";
import img from "../../assets/model.webp";
import "./AboutPage.css";

const AboutPage = () => {
  return (
    <div className="about-page-container">
      {/* Heading */}
      <div className="about-heading">
        <h2>ABOUT US</h2>
      </div>

      <div className="about-content">
        <img
          src={img}
          alt="Jemzy.pk - About us"
          className="about-image"
          loading="lazy"
          decoding="async"
        />

        <div className="about-text">
          <p>
            Welcome to <span className="highlight">Jemzy.pk</span>, your go-to
            destination for premium jewelry in Pakistan. At Jemzy, we blend
            timeless elegance with modern craftsmanship to bring you jewelry
            that tells a story.
          </p>

          <p>
            Since our launch, Jemzy.pk has proudly offered a carefully selected
            range of high-quality jewelry — from classic everyday essentials
            to statement pieces for special moments. Whether you’re shopping
            for yourself or a loved one, our designs celebrate individuality
            and style with a modern touch.
          </p>

          <h3>Our Mission</h3>
          <p>
            Our mission is to redefine how jewelry is discovered and worn in
            Pakistan. We aim to make luxury accessible, offering elegant and
            affordable pieces crafted with precision and care. Through a
            seamless online experience, we bring quality craftsmanship and
            contemporary design to your doorstep.
          </p>

          <h3>Why Choose Jemzy?</h3>
          <p>
            At Jemzy.pk, we value trust, quality, and customer satisfaction.
            From handpicked materials to modern finishes, every detail is made
            to impress. We’re committed to helping you celebrate life’s
            moments with jewelry that lasts.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
