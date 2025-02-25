import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import UserLogin from "./UserLogin";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";
import Cart from "./Cart";
import ProductDetails from "./ProductDetails";

function App() {
  return (
    <Routes>  
      <Route path="/" element={<Home />} />
      <Route path="/user-login" element={<UserLogin />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="*" element={<h1>404 Page Not Found</h1>} />
    </Routes>
  );
}

export default App;
