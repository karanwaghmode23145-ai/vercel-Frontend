import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch } from "react-redux";          // ✅ Redux
import { addToCart } from "../../../features/cart/cartSlice"; // ✅ Redux Slice

const SaleProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch(); // <-- initialize dispatch

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:2000/api/products");
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch products");
      setProducts(data.data);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3500,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3, dots: true } },
      { breakpoint: 768, settings: { slidesToShow: 2, dots: true } },
      { breakpoint: 576, settings: { slidesToShow: 1, dots: false } },
    ],
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center my-5">
        <div className="spinner-border text-dark" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5" style={{ paddingTop: "60px", paddingBottom: "60px" }}>
      <h2 className="text-center fw-bold mb-5">🔥 Our Flash Sale</h2>

      <Slider {...settings}>
        {products.map((product) => (
          <div key={product._id} className="px-2">
            <div className="card h-100 border-0 shadow-sm text-center">
              <img
                src={product.image}
                alt={product.name}
                className="card-img-top rounded-top"
                style={{ height: "220px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h6 className="fw-semibold">{product.name}</h6>
                <p className="text-muted mb-2">${product.price}</p>
                <div className="d-flex gap-2">
                  <Link to={`/product/${product._id}`} className="btn btn-outline-dark w-50">
                    View
                  </Link>
                  <button
                    onClick={() =>
                      dispatch(
                        addToCart({
                          id: product._id,
                          name: product.name,
                          price: product.price,
                          image: product.image,
                        })
                      )
                    }
                    className="btn btn-dark w-50"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SaleProducts;
