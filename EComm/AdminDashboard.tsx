import React, { useState } from "react";
import axios from "axios";
import "./styles.css";

const AdminDashboard: React.FC = () => {
  const [newProduct, setNewProduct] = useState({ title: "", price: "", description: "", category: "", image: "" });

  const addProduct = async () => {
    try {
      await axios.post("https://fakestoreapi.com/products", newProduct);
      alert("Product added successfully!");
    } catch {
      alert("Error adding product");
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <input type="text" placeholder="Title" onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })} />
      <input type="text" placeholder="Price" onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
      <input type="text" placeholder="Description" onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} />
      <input type="text" placeholder="Category" onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} />
      <input type="text" placeholder="Image URL" onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })} />
      <button onClick={addProduct}>Add Product</button>
    </div>
  );
};

export default AdminDashboard;
