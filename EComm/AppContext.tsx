import React, { createContext, useReducer, useContext, useEffect } from "react";
import axios from "axios";
import { Product, User } from "./types";

interface State {
  products: Product[];
  categories: string[];
  cart: Product[];
  user: User | null;
  isAdmin: boolean;
}

type Action =
  | { type: "SET_PRODUCTS"; payload: Product[] }
  | { type: "SET_CATEGORIES"; payload: string[] }
  | { type: "ADD_TO_CART"; payload: Product }
  | { type: "REMOVE_FROM_CART"; payload: number }
  | { type: "SET_USER"; payload: User | null }
  | { type: "SET_ADMIN"; payload: boolean };

const initialState: State = {
  products: [],
  categories: [],
  cart: [],
  user: null,
  isAdmin: false,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return { ...state, products: action.payload };
    case "SET_CATEGORIES":
      return { ...state, categories: action.payload };
    case "ADD_TO_CART":
      return { ...state, cart: [...state.cart, action.payload] };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };
    case "SET_USER":
      return { ...state, user: action.payload };
    case "SET_ADMIN":
      return { ...state, isAdmin: action.payload };
    default:
      return state;
  }
};

const AppContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
  fetchProducts: () => void;
  fetchCategories: () => void;
}>({ state: initialState, dispatch: () => null, fetchProducts: () => {}, fetchCategories: () => {} });

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("https://fakestoreapi.com/products");
      dispatch({ type: "SET_PRODUCTS", payload: res.data });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get("https://fakestoreapi.com/products/categories");
      dispatch({ type: "SET_CATEGORIES", payload: res.data });
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch, fetchProducts, fetchCategories }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
