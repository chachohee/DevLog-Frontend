import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/auth";

export default function RegisterForm() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ username: "", email: "", password: "", nickname: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await register(form.username, form.email, form.password, form.nickname);
            alert("회원가입 성공!");
            navigate("/login", { state: { from: "/" }, replace: true });
        } catch (err) {
            alert("회원가입 실패");
            console.error(err);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 space-y-4 w-full max-w-md mx-auto text-gray-900 dark:text-white"
        >
            <h2 className="text-2xl font-bold text-center mb-4">Sign up to DevLog</h2>
            <input
                type="text"
                name="username"
                placeholder="ID"
                value={form.username}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600"
            />
            <input
                type="email"
                name="email"
                placeholder="E-mail"
                value={form.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600"
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600"
            />
            <input
                type="text"
                name="nickname"
                placeholder="Nickname"
                value={form.nickname}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600"
            />
            <div className="space-y-2">
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                >
                    Sign up
                </button>
                <button
                    type="button"
                    onClick={() => navigate("/login")}
                    className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                >
                    Sign in
                </button>
            </div>
        </form>
    );
}
