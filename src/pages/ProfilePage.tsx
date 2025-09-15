import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile, changePassword } from "../api/auth";
import { useAuth } from "../context/useAuth";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { logout, isLoggedIn, token, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState<{ username: string; email: string; nickname: string } | null>(null);
  const [loading, setLoading] = useState(true);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [passwordError, setPasswordError] = useState("");

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

    try {
      await changePassword(currentPassword, newPassword);
      setPasswordSuccess("비밀번호가 성공적으로 변경되었습니다. 다시 로그인 해주세요.");
      setCurrentPassword("");
      setNewPassword("");

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
        <h2 className="text-xl font-semibold mb-2">Change Password</h2>
        <form onSubmit={handleChangePassword} className="space-y-3">
          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Change Password
          </button>
        </form>
        {passwordSuccess && <p className="text-green-500 mt-2">{passwordSuccess}</p>}
        {passwordError && <p className="text-red-500 mt-2">{passwordError}</p>}
      </div>
    </div>
  );
}