import React, { useContext, useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { ShoppingBag, User, Search, Home, Grid, Heart } from "lucide-react";
import { useSelector } from "react-redux"; 
import { AuthContext } from "../../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../assets/logo.webp";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [wishlistCount, setWishlistCount] = useState(0);
  const navigate = useNavigate();

  // ✅ Get cart count from Redux
  const cartCount = useSelector((state) => state.cart.items.length);

  // Example logged-in user email (replace with actual user from auth context)
  const userEmail = user?.email || "test@example.com";

  // ✅ Fetch wishlist count on load
  useEffect(() => {
    const fetchWishlist = async () => {
      if (!userEmail) return;
      try {
        const res = await fetch(`https://vercel-backend-two-flame.vercel.app/api/wishlist/${userEmail}`);
        const data = await res.json();
        if (res.ok) {
          setWishlistCount(data.data.length);
          console.log("✅ Wishlist fetched:", data.data.length);
        }
      } catch (error) {
        console.error("❌ Error fetching wishlist:", error);
      }
    };
    fetchWishlist();
  }, [userEmail]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/collection?search=${searchTerm}`);
      setSearchTerm("");
    }
  };

  return (
    <>
      {/* =================== TOP NAVBAR (Desktop) =================== */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm sticky-top d-none d-md-block">
        <div className="container">
          {/* Logo */}
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img src={logo} alt="jemzy.pk" style={{ height: "45px", marginRight: "10px" }} />
          </Link>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            {/* Nav links */}
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/" className="nav-link">HOME</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/collection" className="nav-link">ALL PRODUCTS</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/about" className="nav-link">ABOUT</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/contact" className="nav-link">CONTACT</NavLink>
              </li>
            </ul>

            {/* Search bar */}
            <form className="d-flex me-3" role="search" onSubmit={handleSearch} style={{ maxWidth: "250px" }}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search..."
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="btn btn-outline-dark" type="submit">
                <Search size={18} />
              </button>
            </form>

            {/* Icons / User */}
            <div className="d-flex align-items-center gap-3">
              {/* 🛒 Cart Icon */}
              <Link to="/cart" className="btn btn-outline-dark position-relative">
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: "0.7rem" }}>
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* ❤️ Wishlist Icon */}
              <Link to="/wishlist" className="btn btn-outline-dark position-relative">
                <Heart size={20} />
                {wishlistCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: "0.7rem" }}>
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {user ? (
                <div className="dropdown">
                  <button className="btn btn-outline-dark dropdown-toggle" type="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                    <User size={18} className="me-1" /> {user.name || "Account"}
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li><Link className="dropdown-item" to="/profile">My Profile</Link></li>
                    <li><Link className="dropdown-item" to="/orders">My Orders</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><button className="dropdown-item text-danger" onClick={logout}>Logout</button></li>
                  </ul>
                </div>
              ) : (
                <Link to="/login" className="btn btn-outline-dark"><User size={18} className="me-1" /> Login</Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* =================== BOTTOM NAVBAR (Mobile Only) =================== */}
      <div className="d-md-none bg-light shadow-lg border-top fixed-bottom py-2" style={{ zIndex: 1050 }}>
        <div className="container d-flex justify-content-around text-center">
          <Link to="/" className="text-dark text-decoration-none">
            <Home size={22} /><div style={{ fontSize: "12px" }}>Home</div>
          </Link>

          <Link to="/collection" className="text-dark text-decoration-none">
            <Grid size={22} /><div style={{ fontSize: "12px" }}>Shop</div>
          </Link>

          <Link to="/search" className="text-dark text-decoration-none">
            <Search size={22} /><div style={{ fontSize: "12px" }}>Search</div>
          </Link>

          {/* 🛒 Mobile Cart */}
          <Link to="/cart" className="text-dark text-decoration-none position-relative">
            <ShoppingBag size={22} />
            {cartCount > 0 && <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: "0.6rem" }}>{cartCount}</span>}
            <div style={{ fontSize: "12px" }}>Cart</div>
          </Link>

          {/* ❤️ Mobile Wishlist */}
          <Link to="/wishlist" className="text-dark text-decoration-none position-relative">
            <Heart size={22} />
            {wishlistCount > 0 && <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: "0.6rem" }}>{wishlistCount}</span>}
            <div style={{ fontSize: "12px" }}>Wishlist</div>
          </Link>

          {user ? (
            <Link to="/profile" className="text-dark text-decoration-none">
              <User size={22} /><div style={{ fontSize: "12px" }}>Account</div>
            </Link>
          ) : (
            <Link to="/login" className="text-dark text-decoration-none">
              <User size={22} /><div style={{ fontSize: "12px" }}>Login</div>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
