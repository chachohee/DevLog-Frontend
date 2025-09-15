import RegisterForm from "../components/RegisterForm";

export default function RegisterPage() {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 text-gray-900">
            <div className="w-96">
                <RegisterForm />
            </div>
        </div>
    );
}