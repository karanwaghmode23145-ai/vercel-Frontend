import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";

const OrdersPage = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    if (!user || !user.email) {
      toast.error("⚠️ Please login to view your orders");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:2000/api/orders?email=${user.email}`
      );
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to fetch orders");
      setOrders(data.data || []);
    } catch (error) {
      toast.error(error.message || "Error fetching orders");
    } finally {
      setLoading(false);
    }
  };

  const markAsCompleted = async (id) => {
    try {
      const res = await fetch(`http://localhost:2000/api/orders/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Completed" }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update status");

      setOrders((prev) =>
        prev.map((order) =>
          order._id === id ? { ...order, status: "Completed" } : order
        )
      );

      toast.success("✅ Order marked as completed!");
    } catch (error) {
      toast.error("❌ " + error.message);
    }
  };

  if (loading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-3">Loading your orders...</p>
      </div>
    );

  return (
    <div className="container py-5">
      <Toaster position="top-right" />
      <h2 className="text-center mb-5 fw-bold">📦 My Orders</h2>

      {orders.length === 0 ? (
        <div className="text-center bg-light p-5 rounded shadow-sm">
          <p className="lead mb-0">You have no orders yet 😔</p>
        </div>
      ) : (
        <div className="row g-4">
          {orders.map((order) => (
            <div key={order._id} className="col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm border-0 rounded-3">
                <div className="card-body d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <h5 className="card-title fw-semibold">
                      Order #{order._id.slice(-6)}
                    </h5>
                    <span
                      className={`badge ${
                        order.status === "Pending"
                          ? "bg-warning text-dark"
                          : order.status === "Completed"
                          ? "bg-success"
                          : "bg-danger"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>

                  <p className="text-muted small mb-3">
                    Placed on: {new Date(order.createdAt).toLocaleString()}
                  </p>

                  <ul className="list-group mb-3 small">
                    {order.items.map((item, index) => (
                      <li
                        key={index}
                        className="list-group-item d-flex justify-content-between align-items-center"
                      >
                        <span>
                          {item?.productId?.name || "Unknown Product"} ×{" "}
                          {item.qty}
                        </span>
                        <strong>
                          ₹{(item?.productId?.price || 0) * item.qty}
                        </strong>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto d-flex justify-content-between align-items-center">
                    <h6 className="fw-bold mb-0">
                      💰 Total: ₹{order.totalAmount}
                    </h6>

                    {order.status !== "Completed" && (
                      <button
                        onClick={() => markAsCompleted(order._id)}
                        className="btn btn-success btn-sm"
                      >
                        Mark as Completed ✅
                      </button>
                    )}
                  </div>
                </div>

                <div className="card-footer bg-light text-center small text-muted">
                  <span>
                    Thank you for shopping with{" "}
                    <strong className="text-primary">Jemzy.pk</strong> 💎
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
