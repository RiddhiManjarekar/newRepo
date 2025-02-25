import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import "./styles.css";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products").then((res) => setProducts(res.data));
    axios.get("https://fakestoreapi.com/products/categories").then((res) => setCategories(res.data));
  }, []);

  const fetchCategoryProducts = (category: string) => {
    axios.get(`https://fakestoreapi.com/products/category/${category}`).then((res) => setProducts(res.data));
  };

  return (
    <div className="product-list">
      <h1>Products</h1>
      <div className="category-filter">
        <button onClick={() => setSelectedCategory("")}>All</button>
        {categories.map((cat) => (
          <button key={cat} onClick={() => fetchCategoryProducts(cat)}>
            {cat}
          </button>
        ))}
      </div>
      <div className="products-container">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
