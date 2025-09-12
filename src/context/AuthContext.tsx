import React, { createContext, useContext, useState, useEffect } from "react";
import { getProfile } from "../api/auth";

interface AuthContextType {
    isLoggedIn: boolean;
    token: string | null;
    username: string | null;
    login: (token: string, username: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(() => localStorage.getItem("accessToken"));
    const [username, setUsername] = useState<string | null>(localStorage.getItem("username"));
    // const isLoggedIn = !!token;
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => !!localStorage.getItem("accessToken"));


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
        const savedUsername = localStorage.getItem("username");
        // setToken(savedToken);
        // setUsername(savedUsername);
        // setIsLoggedIn(!!savedToken);

        if (!savedToken) {
            logout();
            return;
        }

        // 서버에 토큰 검증 요청
        getProfile()
            .then((res) => {
                setToken(savedToken);
                setUsername(res.username || savedUsername);
                setIsLoggedIn(true);
            })
            .catch(() => {
                // 토큰이 유효하지 않으면 자동 로그아웃
                logout();
            });
    }, []);

    return <AuthContext.Provider value={{ isLoggedIn, token, username, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};
