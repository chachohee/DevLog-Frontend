import { Link } from "react-router-dom";

export default function HomePage() {
  const isLoggedIn = !!localStorage.getItem("accessToken");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6">
      <h1 className="text-4xl font-bold">DevLog Homepage</h1>

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
            className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-black dark:text-white rounded hover:bg-gray-400 dark:hover:bg-gray-600 transition"
          >
            Sign up
          </Link>
        </div>
      ) : (
        <button
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          onClick={() => {
            localStorage.removeItem("accessToken");
            window.location.href = "/";
          }}
        >
          Sign out
        </button>
      )}
    </div>
  );
}
