import React from "react";
import { useCart } from "./CartContext";
import "./styles.css";

const Cart: React.FC = () => {
  const { cart, dispatch } = useCart();

  return (
    <div className="cart">
      <h1>Shopping Cart</h1>
      {cart.length === 0 ? <p>Your cart is empty</p> : cart.map((item: any) => (
        <div key={item.id} className="cart-item">
          <img src={item.image} alt={item.title} />
          <h3>{item.title}</h3>
          <p>${item.price}</p>
          <button onClick={() => dispatch({ type: "REMOVE", payload: item.id })}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default Cart;
