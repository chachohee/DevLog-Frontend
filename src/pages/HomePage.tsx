import { Link } from "react-router-dom";

export default function HomePage() {
  const isLoggedIn = !!localStorage.getItem("accessToken");

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    window.location.href = "/";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white">
      <h1 className="text-4xl font-bold mb-6">DevLog Homepage</h1>

      {!isLoggedIn ? (
        <div className="flex gap-4">
          <Link
            to="/login"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Sign in
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 bg-gray-300 text-gray-900 rounded hover:bg-gray-400 transition"
          >
            Sign up
          </Link>
        </div>
      ) : (
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Sign out
        </button>
      )}
    </div>
  );
}
