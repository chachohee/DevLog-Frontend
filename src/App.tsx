import React, { useState } from "react";
import RegisterForm from "./component/RegisterForm";
import LoginForm from "./component/LoginForm";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowLoginForm(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowLoginForm(false);
    setShowLoginForm(false);
    localStorage.removeItem("accessToken");
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* 상단 네비게이션 */}
      <header style={{ marginBottom: "20px" }}>
        {!isLoggedIn ? (
          <>
            <button onClick={() => { setShowLoginForm(true); setShowRegisterForm(false); }}>Sign in</button>
            <button onClick={() => { setShowLoginForm(false); setShowRegisterForm(true); }}>Sign up</button>
          </>
        ) : (
          <>
            <button onClick={handleLogout}>Sign out</button>
            <button onClick={() => { setShowLoginForm(false); setShowRegisterForm(true); }}>Sign Up</button>
          </>
        )}
      </header>

      {/* 메인 화면 */}
      <main>
        {!showLoginForm && !showRegisterForm && (
          <h1>DevLog Homepage</h1>
        )}
        {showLoginForm && (
          <LoginForm onLoginSuccess={handleLoginSuccess} />
        )}
        {showRegisterForm && (
          <RegisterForm />
        )}
      </main>
    </div>

  );
};

export default App
