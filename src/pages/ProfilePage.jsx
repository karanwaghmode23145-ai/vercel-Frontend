import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ProfilePage = () => {
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    mobile: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // ✅ Get logged-in user email from localStorage
  const loggedInEmail = localStorage.getItem("userEmail");

  // ✅ Fetch user profile from backend
  const fetchUser = async () => {
    try {
      if (!loggedInEmail) {
        setMessage({
          type: "danger",
          text: "No logged-in user found. Please login first.",
        });
        return;
      }

      console.log("📡 Fetching user:", loggedInEmail);
      const res = await fetch(
        `https://vercel-backend-two-flame.vercel.app/api/users/profile?email=${loggedInEmail}`
      );
      const data = await res.json();

      console.log("📩 API response:", data);
      if (!data.success) throw new Error(data.message);
      setUser(data.data);
    } catch (error) {
      setMessage({ type: "danger", text: error.message });
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Update profile
  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log("🟢 Updating user:", user);

    try {
      const res = await fetch("http://localhost:2000/api/users/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const data = await res.json();
      console.log("✅ Update response:", data);

      if (!data.success) throw new Error(data.message);

      setMessage({ type: "success", text: "Profile updated successfully!" });
      setEditMode(false);
      fetchUser();
    } catch (error) {
      setMessage({ type: "danger", text: error.message });
    }
  };

  // ✅ UI Render
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
              <h4 className="mb-0">My Profile</h4>
              {!editMode && user.email && (
                <button
                  type="button"
                  className="btn btn-light btn-sm"
                  onClick={() => setEditMode(true)}
                >
                  ✏️ Edit
                </button>
              )}
            </div>

            <div className="card-body">
              {message.text && (
                <div className={`alert alert-${message.type}`} role="alert">
                  {message.text}
                </div>
              )}

              {user.email ? (
                <form onSubmit={handleUpdate}>
                  {/* Full Name */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      className="form-control"
                      value={user.fullName || ""}
                      onChange={handleChange}
                      disabled={!editMode}
                    />
                  </div>

                  {/* Email */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={user.email || ""}
                      disabled
                    />
                  </div>

                  {/* Mobile */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Mobile</label>
                    <input
                      type="text"
                      name="mobile"
                      className="form-control"
                      value={user.mobile || ""}
                      onChange={handleChange}
                      disabled={!editMode}
                    />
                  </div>

                  {/* Buttons */}
                  {editMode && (
                    <div className="d-flex justify-content-between">
                      <button type="submit" className="btn btn-success">
                        💾 Save Changes
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => {
                          setEditMode(false);
                          fetchUser();
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </form>
              ) : (
                <p className="text-muted text-center mt-3">
                  Please login to view your profile.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
