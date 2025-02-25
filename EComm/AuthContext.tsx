import React, { createContext, useContext, useState } from "react";
import axios from "axios";

type User = { username: string; role: string } | null;
type AuthContextType = { user: User; login: (username: string, password: string) => Promise<void>; logout: () => void; };

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(null);

  const login = async (username: string, password: string) => {
    try {
      const res = await axios.get("https://fakestoreapi.com/users");
      const foundUser = res.data.find((u: any) => u.username === username && u.password === password);

      if (foundUser) {
        setUser({ username: foundUser.username, role: foundUser.username === "admin" ? "admin" : "user" });
        alert("Login successful!");
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      alert("Login error!");
    }
  };

  const logout = () => {
    setUser(null);
    alert("Logged out!");
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext)!;
