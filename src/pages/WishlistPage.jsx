import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const userEmail = "test@example.com"; // 👈 replace with logged-in user's email

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await fetch(`http://localhost:2000/api/wishlist/${userEmail}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to fetch wishlist");
        console.log("✅ Wishlist fetched:", data.data);
        setWishlist(data.data);
      } catch (error) {
        console.error("❌ Error fetching wishlist:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [userEmail]);

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-dark" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  if (!wishlist || wishlist.length === 0)
    return (
      <div className="container py-5 text-center">
        <h3>Your wishlist is empty 😔</h3>
      </div>
    );

  return (
    <div className="container py-5" style={{ paddingTop: "80px" }}>
      <h3 className="mb-4 fw-bold">💖 Your Wishlist</h3>
      <div className="row g-4">
        {wishlist.map((item) =>
          item.productId ? ( // ✅ check if productId exists
            <div key={item._id} className="col-md-3 col-sm-6">
              <Link
                to={`/product/${item.productId._id}`}
                className="text-decoration-none text-dark"
              >
                <div className="card h-100 shadow-sm rounded-4 overflow-hidden">
                  <img
                    src={item.productId.image}
                    alt={item.productId.name}
                    className="card-img-top"
                    style={{ height: "220px", objectFit: "cover" }}
                  />
                  <div className="card-body text-center">
                    <h6 className="fw-semibold mb-1">{item.productId.name}</h6>
                    <p className="text-danger fw-bold mb-0">
                      ₹{item.productId.price}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ) : null // skip if productId missing
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
        