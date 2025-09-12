import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
    isLoggedIn: boolean;
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => !!localStorage.getItem("accessToken"));
    const [token, setToken] = useState<string | null>(() => localStorage.getItem("accessToken"));

    const login = (token: string) => {
        localStorage.setItem("accessToken", token);
        setIsLoggedIn(true);
        setToken(token);
    };

    const logout = () => {
        localStorage.removeItem("accessToken");
        setIsLoggedIn(false);
        setToken(null);
    };

    useEffect(() => {
        const savedToken = localStorage.getItem("accessToken");
        setToken(savedToken);
        setIsLoggedIn(!!savedToken);
    }, []);

    return <AuthContext.Provider value={{ isLoggedIn, token, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};
