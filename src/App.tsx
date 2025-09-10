// import React, { useState } from "react";
// import RegisterForm from "./component/RegisterForm";
// import LoginForm from "./component/LoginForm";

// const App: React.FC = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [showLoginForm, setShowLoginForm] = useState(false);
//   const [showRegisterForm, setShowRegisterForm] = useState(false);

//   const handleLoginSuccess = () => {
//     setIsLoggedIn(true);
//     setShowLoginForm(false);
//   };

//   const handleLogout = () => {
//     setIsLoggedIn(false);
//     setShowLoginForm(false);
//     setShowLoginForm(false);
//     localStorage.removeItem("accessToken");
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       {/* 상단 네비게이션 */}
//       <header style={{ marginBottom: "20px" }}>
//         {!isLoggedIn ? (
//           <>
//             <button onClick={() => { setShowLoginForm(true); setShowRegisterForm(false); }}>Sign in</button>
//             <button onClick={() => { setShowLoginForm(false); setShowRegisterForm(true); }}>Sign up</button>
//           </>
//         ) : (
//           <>
//             <button onClick={handleLogout}>Sign out</button>
//             <button onClick={() => { setShowLoginForm(false); setShowRegisterForm(true); }}>Sign Up</button>
//           </>
//         )}
//       </header>

//       {/* 메인 화면 */}
//       <main>
//         {!showLoginForm && !showRegisterForm && (
//           <h1>DevLog Homepage</h1>
//         )}
//         {showLoginForm && (
//           <LoginForm onLoginSuccess={handleLoginSuccess} />
//         )}
//         {showRegisterForm && (
//           <RegisterForm />
//         )}
//       </main>
//     </div>
//   );
// };

// export default App


import React, { useState } from "react";
import RegisterForm from "./component/RegisterForm";
import LoginForm from "./component/LoginForm";

// ✅ Heroicons를 여기서 import
import {
  UserIcon,
  ArrowRightOnRectangleIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";

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
    setShowRegisterForm(false);
    localStorage.removeItem("accessToken");
  };

  return (
    <div className="p-5 max-w-3xl mx-auto">
      <header className="mb-6 flex justify-end gap-3">
        {!isLoggedIn ? (
          <>
            <button
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              onClick={() => {
                setShowLoginForm(true);
                setShowRegisterForm(false);
              }}
            >
              <UserIcon className="w-5 h-5" />
              Sign in
            </button>
            <button
              className="flex items-center gap-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
              onClick={() => {
                setShowLoginForm(false);
                setShowRegisterForm(true);
              }}
            >
              <PlusCircleIcon className="w-5 h-5" />
              Sign up
            </button>
          </>
        ) : (
          <>
            <button
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              onClick={handleLogout}
            >
              <ArrowRightOnRectangleIcon className="w-5 h-5" />
              Sign out
            </button>
            <button
              className="flex items-center gap-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
              onClick={() => {
                setShowLoginForm(false);
                setShowRegisterForm(true);
              }}
            >
              <PlusCircleIcon className="w-5 h-5" />
              Sign Up
            </button>
          </>
        )}
      </header>

      <main>
        {!showLoginForm && !showRegisterForm && (
          <h1 className="text-4xl font-bold text-center">DevLog Homepage</h1>
        )}
        {showLoginForm && <LoginForm onLoginSuccess={handleLoginSuccess} />}
        {showRegisterForm && <RegisterForm />}
      </main>
    </div>
  );
};

export default App;

