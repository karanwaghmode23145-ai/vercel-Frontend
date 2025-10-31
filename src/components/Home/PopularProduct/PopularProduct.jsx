import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const PopularProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Backend se product fetch karne ka function
  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:2000/api/products");
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to fetch products");

      setProducts(data.data); // ✅ Backend me data.data array milta hai
    } catch (error) {
      console.error("Error fetching products:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Component mount hone par data load karo
  useEffect(() => {
    fetchProducts();
  }, []);

  // ✅ Loading spinner
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center my-5">
        <div className="spinner-border text-dark" role="status">
          <span className="visually-hidden">Loading products...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h2 className="text-center fw-bold mb-5">Popular Products</h2>

      <div className="row g-4">
        {products.slice(0, 8).map((product) => (
          <div key={product._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card h-100 shadow-sm border-0">
              {/* ✅ Product Image */}
              <img
                src={product.image}
                alt={product.name}
                className="card-img-top rounded-top"
                style={{
                  height: "220px",
                  objectFit: "cover",
                }}
              />

              <div className="card-body d-flex flex-column">
                {/* ✅ Product Name */}
                <h6 className="card-title fw-semibold">{product.name}</h6>

                <div className="mt-auto">
                  {/* ✅ Product Price */}
                  <p className="mb-1 text-muted">${product.price}</p>

                  {/* ✅ Product Rating & Review Count */}
                  <p className="small text-warning mb-2">
                    ⭐ {product.rating?.toFixed(1) || "0.0"}{" "}
                    <span className="text-secondary">
                      (
                      {product.reviewsCount !== undefined
                        ? product.reviewsCount
                        : product.reviews?.length || 0}{" "}
                      reviews)
                    </span>
                  </p>

                  {/* ✅ View Product Button */}
                  <Link
                    to={`/product/${product._id}`}
                    className="btn btn-dark w-100"
                  >
                    View Product
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularProducts;
