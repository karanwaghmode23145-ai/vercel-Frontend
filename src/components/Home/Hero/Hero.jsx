import React from "react";
import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";




import "./Hero.css";

import model from "../../../assets/model.webp";
import banner_s_1 from "../../../assets/banner_s_1.webp";
import banner_s_2 from "../../../assets/banner_s_2.webp";
import banner_s_3 from "../../../assets/banner_s_3.webp";

const Hero = () => {
    return (
        <>
            <div className="hero-container">
                {/* Left Content */}
                <div className="hero-content">
                    <h1 className="hero-title text-center">
                        Stunning <br />
                        <span className="hero-highlight">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="68"
                                height="68"
                                viewBox="0 0 68 68"
                                fill="none"
                            >
                                <path
                                    d="M34 0L43.6167 24.3833L68 34L43.6167 43.6167L34 68L24.3833 43.6167L0 34L24.3833 24.3833L34 0Z"
                                    fill="#CC0D39"
                                ></path>
                            </svg>
                            T-Shirts
                        </span>
                        <br />
                        <span>Shine Bright</span>
                    </h1>

                    <p className="hero-desc">
                        Your new favorite jewelry is just a click away.
                        <br />
                        <span className="hero-free">Free shipping</span> on all orders —
                        always.
                    </p>
             <Link to="/collection" className="shop-btn mt-1 mb-3">
          <span>Shop Now</span>
          <ShoppingBag className="shop-icon" />
        </Link>
                    
                </div>

                {/* Right Image Section */}
                <div className="hero-image-section">
                    <div className="hero-main-image">
                        <img
                            src={model}
                            alt="Jewelry Model"
                            className="main-img"
                            onError={(e) => {
                                e.currentTarget.src = "";
                                e.currentTarget.style.backgroundColor = "#f0f0f0";
                                e.currentTarget.style.objectFit = "contain";
                            }}
                        />
                    </div>

                   
                   

                    {/* Small Banner Box */}
                    <div className="small-banner-box">
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 32 29"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="heart-icon"
                        >
                            <path
                                d="M22.7351 0.811523C19.9976 0.811523 17.0258 2.21087 15.5556 5.0098C14.0854 2.21087 11.1135 0.811523 8.37604 0.811523C3.5866 0.811523 0 4.2495 0 10.0174C0 12.5052 0.872361 15.7363 2.84187 18.4185C4.81125 21.1009 5.98278 22.5293 9.79694 25.4156C13.6111 28.3021 15.5556 28.8 15.5556 28.8C15.5556 28.8 17.5 28.3021 21.3142 25.4156C25.1283 22.5293 26.2999 21.1009 28.2692 18.4185C30.2388 15.7363 31.1111 12.5052 31.1111 10.0174C31.1111 4.2495 27.5245 0.811523 22.7351 0.811523Z"
                                fill="#CC0D39"
                            />
                        </svg>

                        <ul className="customer-list">
                            <li>
                                <img src={banner_s_1} alt="banner" />
                            </li>
                            <li>
                                <img src={banner_s_2} alt="banner" />
                            </li>
                            <li>
                                <img src={banner_s_3} alt="banner" />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>

    );
};

export default Hero;
