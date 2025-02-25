import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const ProductCard: React.FC<{ product: any }> = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p>${product.price}</p>
      <Link to={`/product/${product.id}`} className="btn">View Details</Link>
    </div>
  );
};

export default ProductCard;
