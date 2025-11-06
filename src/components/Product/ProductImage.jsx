import React from "react";

const ProductImage = ({ image, name, isZoomed, setIsZoomed }) => {
  return (
    <div className="border rounded-4 shadow-sm p-3 bg-white overflow-hidden text-center">
      <div
        className="zoom-container"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        style={{ overflow: "hidden", borderRadius: "12px", transition: "all 0.3s ease-in-out" }}
      >
        <img
          src={image}
          alt={name}
          className="img-fluid rounded-3"
          style={{
            maxHeight: "450px",
            objectFit: "contain",
            transform: isZoomed ? "scale(3)" : "scale(1)",
            transition: "transform 0.4s ease-in-out",
            cursor: "zoom-in",
          }}
        />
      </div>
    </div>
  );
};

export default ProductImage;
