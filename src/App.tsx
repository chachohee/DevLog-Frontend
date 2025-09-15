import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import TopBar from "./components/TopBar";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";

// 게시글 CRUD 페이지
import PostsPage from "./pages/post/PostPage";
import PostDetailPage from "./pages/post/PostDetailPage";
import PostCreatePage from "./pages/post/PostCreatePage";
import PostEditPage from "./pages/post/PostEditPage";

const App: React.FC = () => {
  return (
    <AuthProvider>
        <Router>
          <TopBar />
          <div className="min-h-screen pt-14 bg-gray-50 dark:bg-black transition-colors text-gray-900 dark:text-white">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/profile" element={<ProfilePage />} />

              {/* 게시판 관련 페이지 */}
              <Route path="/dashboard" element={<PostsPage />} /> {/* Dashboard → PostsPage */}
              <Route path="/posts/create" element={<PostCreatePage />} />
              <Route path="/posts/:id" element={<PostDetailPage />} />
              <Route path="/posts/:id/edit" element={<PostEditPage />} />

              {/* 임시 페이지 */}
              <Route path="/projects" element={<div className="p-4">Projects Page</div>} />
              <Route path="/settings" element={<div className="p-4">Settings Page</div>} />
            </Routes>
          </div>
        </Router>
    </AuthProvider>
  );
};

export default App;
