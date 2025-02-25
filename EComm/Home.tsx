import React, { useState } from "react";
import { useAppContext } from "./AppContext";
import ProductCard from "./ProductCard";

const Home: React.FC = () => {
  const { state, fetchProducts } = useAppContext();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const filteredProducts = selectedCategory
    ? state.products.filter((product) => product.category === selectedCategory)
    : state.products;

  return (
    <div>
      <h1>Products</h1>
      <div className="categories">
        <button onClick={() => setSelectedCategory(null)}>All</button>
        {state.categories.map((category) => (
          <button key={category} onClick={() => handleCategoryChange(category)}>
            {category}
          </button>
        ))}
      </div>
      <div className="product-list">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
