import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-96">
        <LoginForm onLoginSuccess={() => window.history.back()} />
      </div>
    </div>
  );
}
