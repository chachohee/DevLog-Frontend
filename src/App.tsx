import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { DarkModeProvider } from "./context/DarkModeContext";
import TopBar from "./components/TopBar";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <DarkModeProvider>
        <Router>
          <TopBar />
          <div className="min-h-screen pt-14 bg-gray-50 dark:bg-black transition-colors text-gray-900 dark:text-white">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/profile" element={<ProfilePage />} />

              {/* 임시 페이지 */}
              <Route path="/dashboard" element={<div className="p-4">Dashboard Page</div>} />
              <Route path="/projects" element={<div className="p-4">Projects Page</div>} />
              <Route path="/settings" element={<div className="p-4">Settings Page</div>} />
            </Routes>
          </div>
        </Router>
      </DarkModeProvider>
    </AuthProvider>
  );
};

export default App;
