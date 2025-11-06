import React, { useState } from "react";
import { Star, Send } from "lucide-react";

const ProductReviews = ({ reviews, newReview, setNewReview, rating, setRating }) => {
  const handleAddReview = () => {
    if (!newReview || rating === 0) return alert("Add review and rating!");
    alert("Review added (mock)"); // replace with backend API
    setNewReview("");
    setRating(0);
  };

  return (
    <div className="mt-5">
      <h5 className="fw-bold mb-3 border-bottom pb-2">💬 Product Reviews</h5>

      <div className="p-3 rounded-3 shadow-sm mb-4" style={{ backgroundColor: "#f9fafb" }}>
        <div className="mb-2 fw-semibold">Add your review:</div>
        <div className="d-flex align-items-center mb-3">
          {[1,2,3,4,5].map(star => (
            <Star key={star} size={22} onClick={() => setRating(star)} color={star <= rating ? "#fbc02d" : "#ccc"} style={{ cursor: "pointer", marginRight: "5px" }} />
          ))}
        </div>
        <textarea className="form-control mb-3" rows="3" placeholder="Write your review here..." value={newReview} onChange={e => setNewReview(e.target.value)} />
        <button className="btn btn-dark btn-sm px-3" onClick={handleAddReview}><Send size={16} className="me-1"/> Submit Review</button>
      </div>

      {reviews.length === 0 ? <p className="text-muted">No reviews yet.</p> :
        reviews.map((rev,i) => (
          <div key={i} className="border-bottom py-3 mb-2">
            <div className="d-flex align-items-center mb-1">
              {[1,2,3,4,5].map(s => <Star key={s} size={18} color={s <= rev.rating ? "#fbc02d" : "#ddd"} />)}
            </div>
            <p className="mb-1 text-dark">{rev.comment}</p>
            <small className="text-muted">— {rev.name}</small>
          </div>
      ))}
    </div>
  );
};

export default ProductReviews;
