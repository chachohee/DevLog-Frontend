import RegisterForm from "../components/RegisterForm";

export default function RegisterPage() {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
            <div className="w-96">
                <RegisterForm />
            </div>
        </div>
    );
}
