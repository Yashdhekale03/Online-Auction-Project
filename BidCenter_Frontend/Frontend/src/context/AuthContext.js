// src/context/AuthContext.js

import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setLoggedIn(true);
    }
  }, []);

  const login = (id, name, email, createdAt, role) => {
    if (user != null) {
      console.log("User already exists, updating:", user);
      setUser({ ...user, id, name, email, createdAt, role });
      localStorage.setItem(
        "user",
        JSON.stringify({ ...user, id, name, email, createdAt, role })
      );
      return;
    }
    const normalizedUser = {
      id,
      name,
      email,
      createdAt,
      lastLogin: new Date().toISOString(), // Set current date as last login
      role,
    };
    console.log("Normalized user object:", normalizedUser);

    setUser(normalizedUser);
    localStorage.setItem("user", JSON.stringify(normalizedUser));

    setLoggedIn(true);
  };

  const logout = () => {
    setUser(null);
    setLoggedIn(false);
    localStorage.removeItem("user");
    console.log("User logged out and local storage cleared.");
  };

  return (
    <AuthContext.Provider value={{ loggedIn, user, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
