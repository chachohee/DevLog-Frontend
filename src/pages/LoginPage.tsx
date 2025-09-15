import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-96 bg-white shadow-lg rounded-lg p-6">
        <LoginForm onLoginSuccess={() => window.history.back()} />
      </div>
    </div>
  );
}