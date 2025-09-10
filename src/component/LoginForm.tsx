import { useState } from "react";
import { login } from "../api/auth";

export default function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const data = await login(username, password);
            alert(`로그인 성공! 토큰: ${data.token}`);
        } catch (err) {
            alert(`로그인 실패`);
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="ID" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Sign In</button>
        </form>
    )
}