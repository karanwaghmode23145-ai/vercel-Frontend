import React, { useEffect, useState, useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchCart();
  }, []);

  // 🟢 Fetch Cart
  const fetchCart = async () => {
    try {
      const res = await fetch("http://localhost:2000/api/cart");
      const data = await res.json();
      setCart(data);
    } catch (error) {
      console.error("❌ Error fetching cart:", error);
      toast.error("Failed to fetch cart");
    }
  };

  // 🟡 Update Quantity
  const handleQuantityChange = async (id, newQty) => {
    if (newQty <= 0) return;
    try {
      const res = await fetch(`http://localhost:2000/api/cart/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ qty: newQty }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to update quantity");

      setCart((prev) =>
        prev.map((item) => (item._id === data._id ? data : item))
      );
      toast.success("Quantity updated!");
    } catch (error) {
      toast.error("Failed to update quantity");
    }
  };

  // 🔴 Delete Item
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:2000/api/cart/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      setCart(data);
      toast.success("Item removed!");
    } catch {
      toast.error("Failed to remove item");
    }
  };

  // 🟢 Place Order
  const handlePlaceOrder = async () => {
    if (!user) return toast.error("Please login to place an order!");

    const orderData = {
      userEmail: user.email,
      items: cart.map((item) => ({
        productId: item.productId._id,
        qty: item.qty,
      })),
      totalAmount: cart.reduce(
        (acc, item) => acc + (item?.productId?.price || 0) * item.qty,
        0
      ),
    };

    try {
      const res = await fetch("http://localhost:2000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to place order");

      toast.success("✅ Order placed successfully!");
      setCart([]);
      await fetch("http://localhost:2000/api/cart", { method: "DELETE" });
    } catch (error) {
      toast.error(error.message || "Order failed");
    }
  };

  // 🧹 Clear All
  const handleClearCart = async () => {
    try {
      await fetch("http://localhost:2000/api/cart", { method: "DELETE" });
      setCart([]);
      toast.success("Cart cleared!");
    } catch {
      toast.error("Failed to clear cart");
    }
  };

  // 🧮 Calculate total
  const total = cart.reduce(
    (acc, item) => acc + (item?.productId?.price || 0) * (item.qty || 0),
    0
  );

  return (
    <div className="container py-5" style={{ paddingTop: "80px" }}>
      <Toaster position="top-right" />
      <h2 className="fw-bold text-center mb-5">🛒 Your Shopping Cart</h2>

      {cart.length === 0 ? (
        <div className="text-center py-5">
          <h4>Your cart is empty 😕</h4>
          <p className="text-muted">Add some products to see them here.</p>
        </div>
      ) : (
        <>
          <div className="row g-4">
            {cart.map((item) => (
              <div key={item._id} className="col-md-6 col-lg-4">
                <div className="card shadow-sm border-0 h-100">
                  <img
                    src={item?.productId?.image || "https://via.placeholder.com/200"}
                    alt={item?.productId?.name}
                    className="card-img-top"
                    style={{ height: "220px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title fw-semibold">
                      {item?.productId?.name || "Unknown Product"}
                    </h5>
                    <p className="text-muted mb-2">
                      ₹{item?.productId?.price?.toLocaleString() || 0}
                    </p>

                    {/* Quantity Controls */}
                    <div className="d-flex align-items-center justify-content-center mb-3">
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() =>
                          handleQuantityChange(item._id, item.qty - 1)
                        }
                      >
                        -
                      </button>
                      <span className="mx-3 fw-semibold">{item.qty}</span>
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() =>
                          handleQuantityChange(item._id, item.qty + 1)
                        }
                      >
                        +
                      </button>
                    </div>

                    <p className="fw-bold">
                      Total: ₹
                      {(
                        (item?.productId?.price || 0) * (item.qty || 0)
                      ).toLocaleString()}
                    </p>

                    <div className="d-grid">
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="btn btn-danger btn-sm"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary Section */}
          <div className="card shadow mt-5 border-0 p-4">
            <h4 className="fw-bold mb-3">🧾 Cart Summary</h4>
            <p className="fs-5">
              <strong>Total Amount:</strong> ₹{total.toLocaleString()}
            </p>

            <div className="d-flex flex-wrap gap-2">
              <button onClick={handleClearCart} className="btn btn-warning">
                Clear Cart
              </button>
              <button onClick={handlePlaceOrder} className="btn btn-success">
                Place Order
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
