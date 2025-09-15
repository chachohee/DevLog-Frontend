import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HomeIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { useAuth } from "../context/useAuth";

const TopBar: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout, username } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 right-0 flex justify-between items-center z-50 px-4 py-2 bg-white shadow">
      {/* 왼쪽: Home 버튼 */}
      <div className="flex items-center gap-2">
        <button
          className="flex items-center justify-center w-10 h-10 bg-white rounded hover:bg-gray-200 transition"
          onClick={() => navigate("/")}
        >
          <HomeIcon className="w-6 h-6 text-gray-900 hover:text-blue-600 transition-colors" />
        </button>
      </div>

      {/* 가운데: 내비게이션 버튼 */}
      {isLoggedIn && (
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 transition"
          >
            Dashboard
          </button>
          <button
            onClick={() => navigate("/projects")}
            className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 transition"
          >
            Projects
          </button>
          <button
            onClick={() => navigate("/menu1")}
            className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 transition"
          >
            Menu1
          </button>
          <button
            onClick={() => navigate("/menu2")}
            className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 transition"
          >
            Menu2
          </button>
        </div>
      )}

      {/* 오른쪽: 사용자 메뉴 */}
      {isLoggedIn && (
        <div className="flex items-center gap-3">
          {/* 환영 문구 */}
          <div className="text-sm text-gray-700">
            <span className="font-semibold text-blue-600">{username}</span>님
          </div>
          
          {/* 메뉴 버튼 */}
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 transition"
            >
              <Bars3Icon className="w-6 h-6 text-gray-900 hover:text-blue-600 transition-colors" />
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white rounded shadow-lg py-1 z-50">
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    navigate("/profile");
                  }}
                  className="block w-full text-left px-4 py-2 text-gray-900 hover:bg-gray-100 transition"
                >
                  My Profile
                </button>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    navigate("/settings");
                  }}
                  className="block w-full text-left px-4 py-2 text-gray-900 hover:bg-gray-100 transition"
                >
                  Settings
                </button>
                <button
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                    navigate("/");
                  }}
                  className="block w-full text-left px-4 py-2 text-gray-900 hover:bg-gray-100 transition"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TopBar;