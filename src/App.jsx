import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import CollectionPage from "./pages/CollectionPage";
import ProductPage from "./pages/ProductPage";
import Loginpage from "./pages/Loginpage";
import SignupPage from "./pages/SignupPage";
import CartPage from "./pages/CartPage";
import OrdersPage from "./pages/OrdersPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <>
    <Header />
     <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/collection" element={<CollectionPage />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/login" element={<Loginpage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/orders" element={<OrdersPage />} />
    </Routes>
    <Footer />
    </>
    
   
  );
}

export default App;
