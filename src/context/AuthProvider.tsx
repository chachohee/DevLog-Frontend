import React, { useState, useEffect } from "react";
import { getProfile } from "../api/auth";
import { AuthContext } from "./AuthContext";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const login = (token: string, username: string) => {
    localStorage.setItem("accessToken", token);
    localStorage.setItem("username", username);
    setIsLoggedIn(true);
    setToken(token);
    setUsername(username);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setToken(null);
    setUsername(null);
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("accessToken");
    if (!savedToken) {
      logout();
      setLoading(false);
      return;
    }

    getProfile()
      .then((res) => {
        setToken(savedToken);
        setUsername(res.username || localStorage.getItem("username"));
        setIsLoggedIn(true);
      })
      .catch(() => {
        logout();
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center mt-20">Checking session...</div>;
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, token, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};