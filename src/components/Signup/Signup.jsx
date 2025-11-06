import React, { useState } from "react";
import "./Signup.css";
import {useNavigate} from "react-router-dom"
import toast, { Toaster } from "react-hot-toast";



const SignupPage = () => {
  
  //navgation
  const navigate = useNavigate();


  // State 
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) =>{
    e.preventDefault(); 
    console.log("🟢 Form submitted!");

    // show loading
    setIsLoading(true);

    // Check form values
    console.log("📋 Form data:", {
      fullName,
      email,
      mobile,
      password,
    });

    try {

       console.log("📤 Sending data to API: http://localhost:2000/api/users/register");

        const res = await fetch("http://localhost:2000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, mobile, password }),
      });

       // 📥 Get API response
      const data = await res.json();
      console.log("📥 API Response Received:", data);

       // ❌ If response not OK
      if (!res.ok) {
        console.log("❌ Registration failed:", data.message);
        throw new Error(data.message || "Registration failed");
      }

       console.log("✅ User registered successfully!");
      toast.success("Account created successfully!");

      // 🔁 Redirect user to login page
      console.log("➡️ Redirecting to /login ...");
      navigate("/login");
      
    } catch (error) {
       console.log("❌ Error occurred:", error.message);
      toast.error(error.message || "Something went wrong");
    }



  }
  



  return (
    <div className="signup-container">
       <Toaster position="top-right" reverseOrder={false} />
      <div className="signup-box">
        <div className="signup-header">
          <h1>Create Account</h1>
          <p>Fill in the details below to create a new account.</p>
        </div>

        <form className="signup-form" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              name="fullName"
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

          {/* Button */}
          <div className="form-group">
            <button type="submit" className="signup-btn">
              Sign Up
            </button>
          </div>
        </form>

        {/* Login Link */}
        <p className="login-link">
          Already have an account?{" "}
          <a href="/login" className="link-btn">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
