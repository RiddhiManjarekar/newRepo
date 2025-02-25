import React, { createContext, useContext, useReducer } from "react";

const CartContext = createContext<any>(null);

const cartReducer = (state: any, action: any) => {
  switch (action.type) {
    case "ADD":
      alert("Item added to cart!");
      return [...state, action.payload];
    case "REMOVE":
      alert("Item removed from cart!");
      return state.filter((item: any) => item.id !== action.payload);
    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  return <CartContext.Provider value={{ cart, dispatch }}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
