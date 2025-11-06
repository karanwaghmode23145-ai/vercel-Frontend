import React from "react";
import { Heart, HeartOff } from "lucide-react";


const ProductDetails = ({
  product,
  quantity,
  setQuantity,
  selectedSize,
  setSelectedSize,
  sizes,
  handleAddToCart,
  handleWishlist,
  isWishlisted
}) => (
  <div>
    <h2 className="fw-bold mb-3">{product.name}</h2>
    <p className="text-muted">{product.description}</p>
    <div className="d-flex align-items-center mb-3">
      <h3 className="text-danger fw-bold me-3 mb-0">₹{product.price}</h3>
      <span className="badge bg-success fs-6">In Stock</span>
    </div>

    <div className="mb-3">
      <label className="fw-semibold d-block mb-2">Select Size:</label>
      <div className="d-flex gap-2 flex-wrap">
        {sizes.map(size => (
          <button
            key={size}
            onClick={() => setSelectedSize(size)}
            className={`btn border px-3 py-2 rounded-3 ${
              selectedSize === size ? "btn-dark text-white" : "btn-outline-dark"
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>

    <div className="mb-3">
      <label className="fw-semibold me-2">Quantity:</label>
      <select
        className="form-select w-auto d-inline-block"
        value={quantity}
        onChange={e => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 10 }, (_, i) => i + 1).map(num => (
          <option key={num} value={num}>{num}</option>
        ))}
      </select>
    </div>

    <div className="d-flex align-items-center gap-3 mt-4">
      <button className="btn btn-dark px-4 py-2 rounded-3 shadow-sm" onClick={handleAddToCart}>
        🛒 Add to Cart
      </button>
      <button
        onClick={handleWishlist}
        className={`btn rounded-circle shadow-sm border-0 ${isWishlisted ? "text-danger" : "text-secondary"}`}
        style={{ width: "45px", height: "45px", fontSize: "22px", backgroundColor: "#f8f9fa" }}
      >
        {isWishlisted ? "❤️" : "🤍"}
      </button>
    </div>
  </div>
);

export default ProductDetails;
