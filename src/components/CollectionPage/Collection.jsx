import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useLocation } from "react-router-dom";

const CollectionPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [sortOption, setSortOption] = useState("relevant");

  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("search") || "";

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:2000/api/products");
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to fetch products");

      setProducts(data.data || []);
      setCategories([...new Set(data.data.map((p) => p.category))]);
      setBrands([...new Set(data.data.map((p) => p.brand))]);
    } catch (error) {
      setError(error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ✅ Filter & Sort Logic (with search)
  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      selectedCategories.length === 0 || selectedCategories.includes(p.category);
    const matchesBrand =
      selectedBrands.length === 0 || selectedBrands.includes(p.brand);
    const matchesSearch =
      searchQuery === "" ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesBrand && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "low-high") return a.price - b.price;
    if (sortOption === "high-low") return b.price - a.price;
    return 0;
  });

  // Handlers
  const handleCategoryChange = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handleBrandChange = (br) => {
    setSelectedBrands((prev) =>
      prev.includes(br) ? prev.filter((b) => b !== br) : [...prev, br]
    );
  };

  if (loading) return <div className="text-center mt-5">Loading products...</div>;
  if (error) return <div className="text-danger text-center mt-5">Error: {error}</div>;

  return (
    <div className="container mt-5">
      {/* ✅ Show current search term */}
      {searchQuery && (
        <div className="alert alert-info">
          Showing results for: <strong>{searchQuery}</strong>
        </div>
      )}

      <div className="row">
        {/* Filters Sidebar */}
        <div className="col-md-3 mb-4">
          <h5>Filter By</h5>
          <hr />
          <div className="mb-3">
            <h6>Categories</h6>
            {categories.map((cat) => (
              <div className="form-check" key={cat}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={cat}
                  id={`cat-${cat}`}
                  checked={selectedCategories.includes(cat)}
                  onChange={() => handleCategoryChange(cat)}
                />
                <label className="form-check-label" htmlFor={`cat-${cat}`}>
                  {cat}
                </label>
              </div>
            ))}
          </div>

          <div className="mb-3">
            <h6>Brands</h6>
            {brands.map((br) => (
              <div className="form-check" key={br}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={br}
                  id={`br-${br}`}
                  checked={selectedBrands.includes(br)}
                  onChange={() => handleBrandChange(br)}
                />
                <label className="form-check-label" htmlFor={`br-${br}`}>
                  {br}
                </label>
              </div>
            ))}
          </div>

          <div className="mb-3">
            <h6>Sort By</h6>
            <select
              className="form-select"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="relevant">Relevant</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="col-md-9">
          <div className="row g-4">
            {sortedProducts.length === 0 ? (
              <p className="text-center">No products match your filters.</p>
            ) : (
              sortedProducts.map((product) => (
                <div className="col-sm-6 col-lg-4" key={product._id}>
                  <div className="card h-100 shadow-sm">
                    <img
                      src={product.image}
                      className="card-img-top"
                      alt={product.name}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text mb-1">
                        Category: {product.category}
                      </p>
                      <p className="card-text mb-1">Brand: {product.brand}</p>
                      <p className="card-text fw-bold mt-auto">
                        Price: ${product.price}
                      </p>
                      <Link
                        to={`/product/${product._id}`}
                        className="btn btn-dark w-100"
                      >
                        View Product
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionPage;
