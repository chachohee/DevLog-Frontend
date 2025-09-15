import { useState } from "react";
import { register, login as loginApi } from "../api/auth";
import { useAuth } from "../context/useAuth";

const RegisterForm: React.FC = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      // 회원가입 API 호출
      await register(username, email, password, nickname);

      // 회원가입 후 로그인 API 호출
      const loginRes = await loginApi(username, password);

      // 로그인 상태 갱신
      login(loginRes.token, loginRes.username);

      alert("Registration successful!");
      setUsername("");
        setEmail("");
        setNickname("");
        setPassword("");
        setConfirmPassword("");
      window.history.back(); // 이전 페이지로 이동
    } catch (err) {
      console.error(err);
      alert("Registration failed.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-gray-900">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-black"
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-black"
        required
      />
      <input
        type="text"
        placeholder="Nickname"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-black"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-black"
        required
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-black"
        required
      />

      <div className="flex gap-2">
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Sign Up
        </button>
        <button
          type="button"
          onClick={() => window.history.back()}
          className="w-full px-4 py-2 bg-gray-200 text-gray-900 rounded-md hover:bg-gray-300 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;