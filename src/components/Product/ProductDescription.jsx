import React from "react";

const ProductDescription = ({ description }) => {
  return (
    <div className="mt-4">
      <h5 className="fw-bold mb-3 border-bottom pb-2">📝 Product Description</h5>
      <p className="text-muted">{description}</p>
    </div>
  );
};

export default ProductDescription;
