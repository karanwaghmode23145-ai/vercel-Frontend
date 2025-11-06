import React, { useEffect, useState } from "react";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🧠 Fetch cart data
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch("https://vercel-backend-two-flame.vercel.app/api/cart/");
        if (!res.ok) throw new Error("Failed to fetch cart data");
        const data = await res.json();
        setCartItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  // 🧮 Total price
  const totalPrice = cartItems.reduce((acc, item) => {
    const price = item?.productId?.price || 0;
    return acc + price * item.qty;
  }, 0);

  if (loading) return <div className="text-center mt-5">Loading cart...</div>;
  if (error) return <div className="text-center text-danger">{error}</div>;

  return (
    <div className="container py-5" style={{ paddingTop: "80px" }}>
      <h2 className="mb-4 text-center">🛒 My Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-muted">Your cart is empty.</p>
      ) : (
        <div className="row justify-content-center">
          <div className="col-lg-8">
            {cartItems.map((item) => (
              <div key={item._id} className="card mb-3 shadow-sm border-0">
                <div className="card-body d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <img
                      src={item?.productId?.image || "https://via.placeholder.com/80"}
                      alt={item?.productId?.name}
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        marginRight: "15px",
                      }}
                    />
                    <div>
                      <h5 className="mb-1">{item?.productId?.name}</h5>
                      <p className="mb-1 text-muted">
                        ₹{item?.productId?.price} × {item.qty}
                      </p>
                      <p className="fw-bold text-success">
                        Subtotal: ₹{item?.productId?.price * item.qty}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="card mt-4 border-0 shadow-sm">
              <div className="card-body text-end">
                <h4 className="fw-bold">Total: ₹{totalPrice}</h4>
                <button className="btn btn-dark mt-3">Proceed to Checkout</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
