import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile, changePassword } from "../api/auth";
import { useAuth } from "../context/useAuth";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { logout, isLoggedIn, token, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState<{ username: string; email: string; nickname: string } | null>(null);
  const [loading, setLoading] = useState(true);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [passwordError, setPasswordError] = useState("");
  
  // 비밀번호 유효성 검사 상태
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isSamePassword, setIsSamePassword] = useState<boolean | null>(null);
  
  // 비밀번호 강도 계산
  useEffect(() => {
    let strength = 0;
    if (newPassword.length >= 8) strength++;
    if (/[A-Z]/.test(newPassword)) strength++;
    if (/[a-z]/.test(newPassword)) strength++;
    if (/[0-9]/.test(newPassword)) strength++;
    if (/[^A-Za-z0-9]/.test(newPassword)) strength++;
    setPasswordStrength(strength);
  }, [newPassword]);
  
  // 현재 비밀번호와 새 비밀번호 일치 여부 확인
  useEffect(() => {
    if (currentPassword.length > 0 && newPassword.length > 0) {
      setIsSamePassword(currentPassword === newPassword);
    } else {
      setIsSamePassword(null);
    }
  }, [currentPassword, newPassword]);

  useEffect(() => {
    const fetchProfile = async () => {
      console.log("ProfilePage useEffect 실행:", { authLoading, isLoggedIn, token: !!token });
      
      // AuthProvider의 로딩이 완료될 때까지 대기
      if (authLoading) {
        console.log("AuthProvider 로딩 중...");
        return;
      }

      // AuthProvider에서 관리하는 인증 상태를 확인
      if (!isLoggedIn || !token) {
        console.log("인증되지 않은 상태 - 로그인 페이지로 이동");
        navigate("/login");
        return;
      }

      console.log("프로필 데이터 로드 시작");
      try {
        const data = await getProfile();
        console.log("프로필 데이터 로드 성공:", data);
        setProfile(data);
      } catch (err) {
        console.error("프로필 불러오기 실패", err);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate, isLoggedIn, token, authLoading]);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordSuccess("");
    setPasswordError("");

    // 현재 비밀번호와 새 비밀번호가 같은지 확인
    if (isSamePassword === true) {
      setPasswordError("현재 비밀번호와 동일한 비밀번호는 사용할 수 없습니다.");
      return;
    }

    // 비밀번호 강도 확인
    if (newPassword.length > 0 && passwordStrength < 3) {
      setPasswordError("새 비밀번호가 너무 약합니다. 더 강한 비밀번호를 사용해주세요.");
      return;
    }

    try {
      await changePassword(currentPassword, newPassword);
      setPasswordSuccess("비밀번호가 성공적으로 변경되었습니다. 다시 로그인 해주세요.");
      setCurrentPassword("");
      setNewPassword("");
      setPasswordStrength(0);
      setIsSamePassword(null);

      setTimeout(() => logout(), 1500);
    } catch (err) {
      console.error(err);
      setPasswordError("비밀번호 변경 실패. 현재 비밀번호를 확인하세요.");
    }
  };

  if (authLoading || loading) return <div className="text-center text-gray-500 mt-20">Loading...</div>;
  if (!profile) return <div className="text-center text-gray-500 mt-20">No profile data</div>;

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow rounded-lg text-gray-900">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      <div className="space-y-2">
        <p><strong>ID:</strong> {profile.username}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Nickname:</strong> {profile.nickname}</p>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">비밀번호 변경</h2>
        <form onSubmit={handleChangePassword} className="space-y-4">
          {/* 현재 비밀번호 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              현재 비밀번호
            </label>
            <input
              type="password"
              placeholder="현재 비밀번호를 입력하세요"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>

          {/* 새 비밀번호 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              새 비밀번호
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder="새 비밀번호를 입력하세요"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={`w-full px-3 py-2 pr-10 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 ${
                  isSamePassword === true
                    ? 'border-red-300 focus:ring-red-300'
                    : newPassword.length > 0 && passwordStrength < 3 
                    ? 'border-red-300 focus:ring-red-300' 
                    : newPassword.length > 0 && passwordStrength >= 3 
                    ? 'border-green-300 focus:ring-green-300' 
                    : 'border-gray-300'
                }`}
                required
              />
              {newPassword.length > 0 && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  {isSamePassword === true ? (
                    <XCircleIcon className="w-5 h-5 text-red-500" />
                  ) : passwordStrength >= 3 ? (
                    <CheckCircleIcon className="w-5 h-5 text-green-500" />
                  ) : (
                    <XCircleIcon className="w-5 h-5 text-red-500" />
                  )}
                </div>
              )}
            </div>
            
            {/* 비밀번호 일치 여부 메시지 */}
            {isSamePassword === true && (
              <p className="text-sm text-red-600 mt-1">
                ✗ 현재 비밀번호와 동일한 비밀번호는 사용할 수 없습니다
              </p>
            )}
            
            {/* 비밀번호 강도 표시 */}
            {newPassword.length > 0 && isSamePassword !== true && (
              <div className="mt-2 space-y-1">
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
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors font-medium"
          >
            비밀번호 변경
          </button>
        </form>
        
        {/* 성공/에러 메시지 */}
        {passwordSuccess && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
            <p className="text-green-700 text-sm">{passwordSuccess}</p>
          </div>
        )}
        {passwordError && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-700 text-sm">{passwordError}</p>
          </div>
        )}
      </div>
    </div>
  );
}