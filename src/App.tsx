import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { SunIcon, MoonIcon, HomeIcon } from "@heroicons/react/24/outline";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

const TopBar: React.FC<{ darkMode: boolean; setDarkMode: (value: boolean) => void }> = ({
  darkMode,
  setDarkMode,
}) => {
  const navigate = useNavigate();

  return (
    <div className="fixed top-4 left-4 right-4 flex justify-between items-center z-50">
      {/* 왼쪽 홈 버튼 */}
      <button
        className="px-3 py-1 bg-gray-300 dark:bg-gray-700 rounded hover:bg-gray-400 dark:hover:bg-gray-600 transition flex items-center gap-1"
        onClick={() => navigate("/")}
      >
        <HomeIcon className="w-5 h-5" />
        Home
      </button>

      {/* 오른쪽 다크모드/라이트모드 버튼 */}
      <button
        className="px-3 py-1 bg-gray-300 dark:bg-gray-700 rounded hover:bg-gray-400 dark:hover:bg-gray-600 transition flex items-center justify-center"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? (
          <SunIcon className="w-5 h-5 text-yellow-400" />
        ) : (
          <MoonIcon className="w-5 h-5 text-gray-800" />
        )}
      </button>
    </div>
  );
};

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) html.classList.add("dark");
    else html.classList.remove("dark");
  }, [darkMode]);

  return (
    <Router>
      {/* 상단 버튼 */}
      <TopBar darkMode={darkMode} setDarkMode={setDarkMode} />

      <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
