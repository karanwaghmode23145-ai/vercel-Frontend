import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const SpecialProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      const res = await fetch("https://vercel-backend-two-flame.vercel.app/api/products");
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
    <div
      className="container py-5"
      style={{ paddingTop: "60px", paddingBottom: "60px" }}
    >
      <h2 className="text-center fw-bold mb-5">⭐ Our Special Products</h2>

      <div className="row">
        {products.slice(0, 4).map((product) => (
          <div key={product._id} className="col-md-3 col-sm-6 mb-4">
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
                <Link
                  to={`/product/${product._id}`}
                  className="btn btn-dark w-100"
                >
                  View Product
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecialProducts;
