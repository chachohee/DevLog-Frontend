import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { SunIcon, MoonIcon, HomeIcon, Bars3Icon } from "@heroicons/react/24/outline";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";

const TopBar: React.FC<{
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}> = ({ darkMode, setDarkMode, isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    const html = document.documentElement;
    if (!darkMode) html.classList.add("dark");
    else html.classList.remove("dark");
  };

  return (
    <div className="fixed top-0 left-0 right-0 flex justify-between items-center z-50 px-4 py-2 bg-gray-100 dark:bg-gray-900 shadow">
      {/* 왼쪽: 홈 + 다크모드 버튼 */}
      <div className="flex items-center gap-2">
        <button
          className="flex items-center gap-1 px-3 py-1 bg-gray-300 dark:bg-gray-700 rounded hover:bg-gray-400 dark:hover:bg-gray-600 transition"
          onClick={() => navigate("/")}
        >
          <HomeIcon className="w-5 h-5" />
          Home
        </button>
        <button
          className="flex items-center gap-1 px-3 py-1 bg-gray-300 dark:bg-gray-700 rounded hover:bg-gray-400 dark:hover:bg-gray-600 transition"
          onClick={toggleDarkMode}
        >
          {darkMode ? <SunIcon className="w-5 h-5 text-yellow-400" /> : <MoonIcon className="w-5 h-5 text-gray-800" />}
          {darkMode ? "Light" : "Dark"}
        </button>
      </div>

      {/* 중앙 메뉴바 - 로그인 상태일 때만 */}
      {isLoggedIn && (
        <div className="flex gap-4">
          <button onClick={() => navigate("/dashboard")} className="hover:underline">Dashboard</button>
          <button onClick={() => navigate("/projects")} className="hover:underline">Projects</button>
          <button onClick={() => navigate("/settings")} className="hover:underline">Settings</button>
        </div>
      )}

      {/* 오른쪽 메뉴바 버튼 (로그인 상태일 때만) */}
      {isLoggedIn && (
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="px-3 py-1 bg-gray-300 dark:bg-gray-700 rounded hover:bg-gray-400 dark:hover:bg-gray-600 transition"
          >
            <Bars3Icon className="w-6 h-6 text-gray-800 dark:text-white" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-700 rounded shadow-lg py-1 z-50">
              <button
                onClick={() => navigate("/profile")}
                className="block w-full text-left px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                My Profile
              </button>
              <button
                onClick={() => navigate("/settings")}
                className="block w-full text-left px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                Settings
              </button>
              <button
                onClick={() => {
                  localStorage.removeItem("accessToken");
                  setIsLoggedIn(false); // ✅ 상태 업데이트
                  setMenuOpen(false);
                  navigate("/"); // 홈으로 이동
                }}
                className="block w-full text-left px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("accessToken"));

  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) html.classList.add("dark");
    else html.classList.remove("dark");
  }, [darkMode]);

  return (
    <Router>
      <TopBar darkMode={darkMode} setDarkMode={setDarkMode} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      <div className="min-h-screen pt-14 bg-gray-50 dark:bg-black transition-colors">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* 메뉴바 연결 페이지 */}
          <Route path="/dashboard" element={<div className="p-4">Dashboard Page</div>} />
          <Route path="/projects" element={<div className="p-4">Projects Page</div>} />
          <Route path="/settings" element={<div className="p-4">Settings Page</div>} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
