import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // ⚡ Important for Tabs toggle

const ProductPage = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [review, setReview] = useState({ rating: "", comment: "" });
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();

  // 🧠 Fetch Product + Related Products
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:2000/api/products/${id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Product not found");

        setProduct(data.data);

        // Related products
        const relatedRes = await fetch(
          `http://localhost:2000/api/products/related/${data.data.category}/${id}`
        );
        const relatedData = await relatedRes.json();
        if (relatedRes.ok) setRelated(relatedData.data);
      } catch (error) {
        console.error(error.message);
        toast.error("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // 🛒 Add to cart
  const handleAddToCart = async () => {
    if (!user) return toast.error("Please login to add to cart");

    try {
      const res = await fetch("http://localhost:2000/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product._id,
          qty: quantity,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add to cart");

      dispatch(
        addToCart({
          id: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          qty: quantity,
        })
      );

      toast.success("Product added to cart!");
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  // ✍️ Add Review
  const handleAddReview = async (e) => {
    e.preventDefault();
    if (!user) return toast.error("Please login to add a review");
    if (!review.rating || !review.comment)
      return toast.error("Please fill all fields");

    try {
      setSubmitting(true);
      const res = await fetch(`http://localhost:2000/api/products/${id}/review`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: user.name || "Anonymous",
          rating: Number(review.rating),
          comment: review.comment,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to add review");

      toast.success("Review added successfully!");
      setProduct(data.data);
      setReview({ rating: "", comment: "" });
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  // 🌀 Loading UI
  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-dark" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  if (!product)
    return (
      <div className="container text-center py-5">
        <h3>Product not found.</h3>
      </div>
    );

  return (
    <div className="container py-5" style={{ paddingTop: "80px" }}>
      <Toaster position="top-right" />

      {/* Product Section */}
      <div className="row g-5 align-items-center">
        {/* Left: Product Image */}
        <div className="col-md-6 text-center">
          <div className="border rounded-4 shadow-sm p-3 bg-white">
            <img
              src={product.image}
              alt={product.name}
              className="img-fluid rounded-3"
              style={{ maxHeight: "450px", objectFit: "contain" }}
            />
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="col-md-6">
          <h2 className="fw-bold mb-3">{product.name}</h2>
          <p className="text-muted">{product.description}</p>

          <div className="d-flex align-items-center mb-3">
            <h3 className="text-danger fw-bold me-3 mb-0">₹{product.price}</h3>
            <span className="badge bg-success fs-6">In Stock</span>
          </div>

          {/* ⭐ Rating */}
          <p>
            ⭐ {Number(product?.rating || 0).toFixed(1)} / 5 (
            {product?.reviewsCount || 0} reviews)
          </p>

          <hr />

          <div className="mb-3">
            <label className="fw-semibold me-2">Quantity:</label>
            <select
              className="form-select w-auto d-inline-block"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            >
              {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleAddToCart}
            className="btn btn-dark px-4 py-2 rounded-3 shadow-sm"
          >
            🛒 Add to Cart
          </button>
        </div>
      </div>

      {/* Product Tabs Section */}
      <div className="mt-5">
        <ul className="nav nav-tabs" id="productTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="description-tab"
              data-bs-toggle="tab"
              data-bs-target="#description"
              type="button"
              role="tab"
            >
              Description
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="reviews-tab"
              data-bs-toggle="tab"
              data-bs-target="#reviews"
              type="button"
              role="tab"
            >
              Reviews ({product?.reviewsCount || 0})
            </button>
          </li>
        </ul>

        <div className="tab-content mt-4" id="productTabContent">
          {/* Description Tab */}
          <div
            className="tab-pane fade show active"
            id="description"
            role="tabpanel"
          >
            <h5>Product Description</h5>
            <p className="text-muted">{product.description}</p>
            <ul>
              <li>✅ 100% Original Product</li>
              <li>🚚 Free Shipping above ₹999</li>
              <li>🔄 Easy 7-Day Return Policy</li>
            </ul>
          </div>

          {/* Reviews Tab */}
          <div className="tab-pane fade" id="reviews" role="tabpanel">
            {/* Review Form */}
            <div className="border rounded-3 p-4 bg-light shadow-sm mb-4">
              <h5 className="mb-3">Add Your Review</h5>
              <form onSubmit={handleAddReview}>
                <div className="mb-3">
                  <label className="form-label">Rating (1–5)</label>
                  <select
                    className="form-select"
                    value={review.rating}
                    onChange={(e) =>
                      setReview({ ...review, rating: e.target.value })
                    }
                  >
                    <option value="">Select Rating</option>
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Comment</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Write your review..."
                    value={review.comment}
                    onChange={(e) =>
                      setReview({ ...review, comment: e.target.value })
                    }
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-dark px-4 py-2 rounded-3 shadow-sm"
                >
                  {submitting ? "Submitting..." : "Submit Review"}
                </button>
              </form>
            </div>

            {/* Customer Reviews */}
            <div>
              <h5 className="mb-3">Customer Reviews</h5>
              {product.reviews?.length > 0 ? (
                product.reviews.map((rev, index) => (
                  <div
                    key={index}
                    className="border rounded p-3 mb-3 bg-white shadow-sm"
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <h6 className="mb-1">{rev.user}</h6>
                      <span>⭐ {rev.rating}</span>
                    </div>
                    <p className="text-muted mb-0">{rev.comment}</p>
                  </div>
                ))
              ) : (
                <p className="text-muted">No reviews yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div className="related-products mt-5 pt-5">
          <h3 className="fw-bold text-center mb-4">You May Also Like</h3>
          <div className="row g-4">
            {related.map((prod) => (
              <div key={prod._id} className="col-6 col-md-4 col-lg-3">
                <div className="card border-0 shadow-sm h-100 rounded-4">
                  <img
                    src={prod.image}
                    className="card-img-top rounded-top-4"
                    alt={prod.name}
                    style={{ height: "220px", objectFit: "cover" }}
                  />
                  <div className="card-body text-center">
                    <h6 className="fw-semibold">{prod.name}</h6>
                    <p className="text-danger fw-bold mb-2">₹{prod.price}</p>
                    <Link
                      to={`/product/${prod._id}`}
                      className="btn btn-outline-dark btn-sm w-100 rounded-3"
                    >
                      View Product
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
