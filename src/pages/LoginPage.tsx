import LoginForm from "../components/LoginForm";

export default function LoginPage({ setIsLoggedIn }: { setIsLoggedIn: (value: boolean) => void }) {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-96">
        <LoginForm
          onLoginSuccess={() => {
            window.history.back(); // 이전 페이지로 돌아가기
          }}
          setIsLoggedIn={setIsLoggedIn}
        />
      </div>
    </div>
  );
}
