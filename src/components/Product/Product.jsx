import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductImage from "./ProductImage";
import ProductDetails from "./ProductDetails";
import ProductReviews from "./ProductReviews";
import RelatedProducts from "./RelatedProducts";
import ProductDescription from "./ProductDescription";
import { AuthContext } from "../../context/AuthContext";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const sizes = ["S", "M", "L", "XL", "XXL"];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://vercel-backend-two-flame.vercel.app/api/products/${id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Product not found");

        setProduct(data.data);
        setReviews(data.data.reviews || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // ✅ Add to Cart function
  const handleAddToCart = async () => {
    if (!user) {
      alert("Please login to add items to cart");
      navigate("/login");
      return;
    }

    try {
      const res = await fetch("https://vercel-backend-two-flame.vercel.app/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user._id,
          productId: product._id,
          quantity,
          size: selectedSize || "M",
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      alert("✅ Added to cart successfully!");
    } catch (error) {
      console.error("Cart Error:", error.message);
      alert("❌ Failed to add to cart");
    }
  };

  // ✅ Wishlist function
  const handleWishlist = async () => {
    if (!user) {
      alert("Please login to add to wishlist");
      navigate("/login");
      return;
    }

    try {
      const res = await fetch("https://vercel-backend-two-flame.vercel.app/api/wishlist", {
        method: isWishlisted ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user._id,
          productId: product._id,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setIsWishlisted(!isWishlisted);
      alert(isWishlisted ? "❌ Removed from wishlist" : "❤️ Added to wishlist");
    } catch (error) {
      console.error("Wishlist Error:", error.message);
      alert("❌ Something went wrong");
    }
  };

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-dark" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  if (!product)
    return (
      <div className="container py-5 text-center">
        <h3>Product not found</h3>
      </div>
    );

  return (
    <div className="container py-5" style={{ paddingTop: "80px" }}>
      <div className="row g-5">
        <div className="col-md-6">
          <ProductImage
            image={product.image}
            name={product.name}
            isZoomed={isZoomed}
            setIsZoomed={setIsZoomed}
          />
        </div>

        <div className="col-md-6">
          <ProductDetails
            product={product}
            quantity={quantity}
            setQuantity={setQuantity}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            sizes={sizes}
            isWishlisted={isWishlisted}
            handleAddToCart={handleAddToCart}
            handleWishlist={handleWishlist}
          />

          <ProductDescription description={product.description} />

          <ProductReviews
            reviews={reviews}
            newReview={newReview}
            setNewReview={setNewReview}
            rating={rating}
            setRating={setRating}
          />
        </div>
      </div>

      <RelatedProducts products={relatedProducts} />
    </div>
  );
};

export default ProductPage;
