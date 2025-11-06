import React from "react";
import { Link } from "react-router-dom";

const RelatedProducts = ({ products }) => {
  if (!products || products.length === 0) return null;

  return (
    <div className="mt-5 pt-4 border-top">
      <h4 className="fw-bold mb-4 text-center">🛍 Related Products</h4>
      <div className="row g-4">
        {products.map(item => (
          <div key={item._id} className="col-md-3 col-sm-6">
            <Link to={`/product/${item._id}`} className="text-decoration-none text-dark">
              <div className="card border-0 shadow-sm h-100 rounded-4 overflow-hidden" style={{ cursor: "pointer", transition: "0.3s" }}>
                <img src={item.image} alt={item.name} className="card-img-top" style={{ height: "230px", objectFit: "cover" }} />
                <div className="card-body text-center">
                  <h6 className="fw-semibold mb-1">{item.name}</h6>
                  <p className="text-danger fw-bold mb-0">₹{item.price}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
