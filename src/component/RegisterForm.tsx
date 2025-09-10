import { useState } from "react";
import { register } from "../api/auth";

export default function RegisterForm() {
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        nickname: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await register(form.username, form.email, form.password, form.nickname);
            alert('회원가입 성공!');
        } catch (err) {
            alert('회원가입 실패');
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text"
                name="username"
                placeholder="ID"
                value={form.username}
                onChange={handleChange} />
            <input type="email"
                name="email"
                placeholder="E-mail"
                value={form.email}
                onChange={handleChange} />
            <input type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange} />
            <input type="text"
                name="nickname"
                placeholder="Nickname"
                value={form.nickname}
                onChange={handleChange} />

            <button type="submit">Sign Up</button>
        </form>
    )
}