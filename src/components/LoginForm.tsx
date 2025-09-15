import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import { useAuth } from "../context/useAuth";

interface LoginFormProps {
  onLoginSuccess?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const { login: setAuthState } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const loginRes = await login(username, password);
      
      // AuthProvider의 login 함수를 호출하여 인증 상태 업데이트
      setAuthState(loginRes.token, loginRes.username);
      
      alert("로그인 성공!");
      setUsername("");
      setPassword("");
      
      if (onLoginSuccess) {
        onLoginSuccess();
      } else {
        // 기본적으로 홈페이지로 이동
        navigate("/");
      }
    } catch (err: any) {
      console.error("로그인 에러:", err);
      
      // 에러 타입에 따른 메시지 분기
      if (err.response?.status === 403 || err.response?.status === 401) {
        alert("아이디 또는 비밀번호가 올바르지 않습니다.");
      } else if (err.code === 'ERR_NETWORK') {
        alert("네트워크 연결을 확인해주세요. 백엔드 서버가 실행 중인지 확인해주세요.");
      } else if (err.response?.status >= 500) {
        alert("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      } else {
        alert("로그인에 실패했습니다. 다시 시도해주세요.");
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
              type="text"
              placeholder="ID"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 bg-white text-gray-900"
              required
          />
          <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 bg-white text-gray-900"
              required
          />
        <div className="flex gap-2">
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="w-full px-4 py-2 bg-gray-200 text-gray-900 rounded-md hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
      
      <div className="mt-4 text-center">
        <p className="text-gray-600">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;