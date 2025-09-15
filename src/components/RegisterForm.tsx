import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/auth";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // 비밀번호 유효성 검사 상태
  const [passwordMatch, setPasswordMatch] = useState<boolean | null>(null);
  const [passwordStrength, setPasswordStrength] = useState(0);
  
  // 비밀번호 일치 여부 실시간 확인
  useEffect(() => {
    if (confirmPassword.length > 0) {
      setPasswordMatch(password === confirmPassword);
    } else {
      setPasswordMatch(null);
    }
  }, [password, confirmPassword]);
  
  // 비밀번호 강도 계산
  useEffect(() => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    setPasswordStrength(strength);
  }, [password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 비밀번호 일치 여부 확인
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다!");
      return;
    }
    
    // 비밀번호 강도 확인
    if (passwordStrength < 3) {
      alert("비밀번호가 너무 약합니다. 더 강한 비밀번호를 사용해주세요.");
      return;
    }

    try {
      // 회원가입 API 호출
      await register(username, email, password, nickname);

      alert("회원가입이 완료되었습니다! 로그인해주세요.");
      setUsername("");
      setEmail("");
      setNickname("");
      setPassword("");
      setConfirmPassword("");
      setPasswordMatch(null);
      setPasswordStrength(0);
      
      // 로그인 페이지로 리다이렉트
      navigate("/login");
    } catch (err: any) {
      console.error("회원가입 에러:", err);
      
      // 에러 타입에 따른 메시지 분기
      if (err.response?.status === 409) {
        alert("이미 존재하는 사용자명 또는 이메일입니다.");
      } else if (err.response?.status === 400) {
        alert("입력 정보를 확인해주세요.");
      } else if (err.code === 'ERR_NETWORK') {
        alert("네트워크 연결을 확인해주세요. 백엔드 서버가 실행 중인지 확인해주세요.");
      } else if (err.response?.status >= 500) {
        alert("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      } else {
        alert("회원가입에 실패했습니다. 다시 시도해주세요.");
      }
    }
  };

  return (
    <div>
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
        {/* 비밀번호 입력 */}
        <div className="relative">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full px-3 py-2 pr-10 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-black ${
              password.length > 0 && passwordStrength < 3 
                ? 'border-red-300 focus:ring-red-300' 
                : password.length > 0 && passwordStrength >= 3 
                ? 'border-green-300 focus:ring-green-300' 
                : 'border-gray-300'
            }`}
            required
          />
          {password.length > 0 && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              {passwordStrength >= 3 ? (
                <CheckCircleIcon className="w-5 h-5 text-green-500" />
              ) : (
                <XCircleIcon className="w-5 h-5 text-red-500" />
              )}
            </div>
          )}
        </div>
        
        {/* 비밀번호 강도 표시 */}
        {password.length > 0 && (
          <div className="space-y-1">
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((level) => (
                <div
                  key={level}
                  className={`h-2 flex-1 rounded ${
                    level <= passwordStrength
                      ? passwordStrength < 3
                        ? 'bg-red-500'
                        : passwordStrength < 4
                        ? 'bg-yellow-500'
                        : 'bg-green-500'
                      : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
            <p className="text-xs text-gray-600">
              {passwordStrength < 3 && "비밀번호가 약합니다"}
              {passwordStrength === 3 && "비밀번호가 보통입니다"}
              {passwordStrength === 4 && "비밀번호가 강합니다"}
              {passwordStrength === 5 && "비밀번호가 매우 강합니다"}
            </p>
          </div>
        )}

        {/* 비밀번호 확인 입력 */}
        <div className="relative">
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`w-full px-3 py-2 pr-10 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-black ${
              confirmPassword.length > 0
                ? passwordMatch === true
                  ? 'border-green-300 focus:ring-green-300'
                  : passwordMatch === false
                  ? 'border-red-300 focus:ring-red-300'
                  : 'border-gray-300'
                : 'border-gray-300'
            }`}
            required
          />
          {confirmPassword.length > 0 && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              {passwordMatch === true ? (
                <CheckCircleIcon className="w-5 h-5 text-green-500" />
              ) : passwordMatch === false ? (
                <XCircleIcon className="w-5 h-5 text-red-500" />
              ) : null}
            </div>
          )}
        </div>
        
        {/* 비밀번호 일치 여부 메시지 */}
        {confirmPassword.length > 0 && (
          <p className={`text-sm ${
            passwordMatch === true 
              ? 'text-green-600' 
              : passwordMatch === false 
              ? 'text-red-600' 
              : 'text-gray-600'
          }`}>
            {passwordMatch === true && "✓ 비밀번호가 일치합니다"}
            {passwordMatch === false && "✗ 비밀번호가 일치하지 않습니다"}
          </p>
        )}

        <div className="flex gap-2">
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Sign Up
          </button>
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="w-full px-4 py-2 bg-gray-200 text-gray-900 rounded-md hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
      
      <div className="mt-4 text-center">
        <p className="text-gray-600">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;