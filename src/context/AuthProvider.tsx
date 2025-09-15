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
    const savedUsername = localStorage.getItem("username");
    
    console.log("AuthProvider 초기화:", { savedToken: !!savedToken, savedUsername });
    
    if (!savedToken) {
      console.log("토큰이 없음 - 로그아웃 상태로 설정");
      logout();
      setLoading(false);
      return;
    }

    console.log("토큰 검증 시작");
    console.log("요청할 URL:", "/api/auth/profile");
    console.log("토큰:", savedToken ? `${savedToken.substring(0, 20)}...` : "없음");
    
    getProfile()
      .then((res) => {
        console.log("프로필 조회 성공:", res);
        setToken(savedToken);
        setUsername(res.username || savedUsername);
        setIsLoggedIn(true);
      })
      .catch((error) => {
        console.error("프로필 조회 실패:", error);
        console.error("에러 상세:", {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          url: error.config?.url
        });
        
        // 토큰이 유효하지 않거나 접근이 거부된 경우 로그아웃
        if (error.response?.status === 401 || error.response?.status === 403) {
          console.log("토큰이 유효하지 않거나 접근 거부됨 - 로그아웃");
          logout();
        } else {
          // 네트워크 오류 등 다른 문제의 경우 토큰은 유지
          console.log("네트워크 오류 - 토큰 유지");
          setToken(savedToken);
          setUsername(savedUsername);
          setIsLoggedIn(true);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center mt-20">Checking session...</div>;
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, token, username, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};