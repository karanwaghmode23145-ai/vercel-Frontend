import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import "./Signup.css";

const SignupPage = () => {
  const navigate = useNavigate();

  // Form state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:2000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, mobile, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Registration failed");

      toast.success("Account created successfully!");
      // Redirect to login page
      navigate("/login");
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="signup-box">
        <div className="signup-header">
          <h1>Create Account</h1>
          <p>Fill in the details below to create a new account.</p>
        </div>

        <form className="signup-form" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Mobile Number */}
          <div className="form-group">
            <label htmlFor="mobile">Mobile Number</label>
            <input
              id="mobile"
              name="mobile"
              type="tel"
              placeholder="Enter your mobile number"
              pattern="[0-9]{10}"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Sign Up Button */}
          <div className="form-group">
            <button type="submit" className="signup-btn" disabled={isLoading}>
              {isLoading ? "Creating..." : "Sign Up"}
            </button>
          </div>
        </form>

        {/* Back to login link */}
        <p className="login-link">
          Already have an account?{" "}
          <Link to="/login" className="link-btn">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
