import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function HomePage() {
  const { isLoggedIn, logout } = useAuth();

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
            className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded hover:bg-gray-400 dark:hover:bg-gray-600 transition"
          >
            Sign up
          </Link>
        </div>
      ) : (
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Sign out
        </button>
      )}
    </div>
  );
}
