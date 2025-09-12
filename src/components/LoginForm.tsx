import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { login } from "../api/auth";
import { useAuth } from "../context/AuthContext";

interface LoginFormProps {
    onLoginSuccess: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const { login: doLogin } = useAuth();

    const from = (location.state as { from?: string })?.from || "/";

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await login(username, password);
            doLogin(res.token, res.username);
            onLoginSuccess();
            navigate(from === "/login" || from === "/register" ? "/" : from, { replace: true });
        } catch (err) {
            alert("로그인 실패");
            console.error(err);
        }
    };

    return (
        <form
            onSubmit={handleLogin}
            className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 space-y-4 w-full max-w-md mx-auto text-gray-900 dark:text-white"
        >
            <h2 className="text-2xl font-bold text-center mb-4">Sign in to DevLog</h2>
            <input
                type="text"
                placeholder="ID"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600"
            />
            <div className="space-y-2">
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                >
                    Sign in
                </button>
                <button
                    type="button"
                    onClick={() => navigate("/register")}
                    className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                >
                    Sign up
                </button>
            </div>
        </form>
    );
};

export default LoginForm;
