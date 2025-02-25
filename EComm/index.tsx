import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";  // ✅ Wrap Router Here
import App from "./App";
import { CartProvider } from "./CartContext";
import { AuthProvider } from "./AuthContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter> 
      <AuthProvider>
        <CartProvider>
          <App />  
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
