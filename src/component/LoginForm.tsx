import { useState } from "react";
import { login } from "../api/auth";

interface LoginFromProps {
    onLoginSuccess: () => void;
}

const LoginForm: React.FC<LoginFromProps> = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(username, password);
            onLoginSuccess();
        } catch (err) {
            alert(`로그인 실패`);
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <h2>Sign in to DevLog</h2>
            <input type="text" placeholder="ID" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Sign In</button>
        </form>
    );

};

export default LoginForm