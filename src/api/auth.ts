import api from './axios';

export const register = async (
    username: string,
    email: string,
    password: string,
    nickname: string) => {
    const response = await api.post('/auth/register', {
        username,
        email,
        password,
        nickname,
    });

    return response.data;
}

export const login = async (username: string, password: string) => {
    const response = await api.post('/auth/login', { username, password });
    const { token, username: loggedInUser } = response.data;

    // 로컬스토리지에 토큰 저장
    localStorage.setItem('accessToken', token);

    return response.data;
};

export const logout = async () => {
    const token = localStorage.getItem('accessToken');
    await api.post('/auth/logout', {}, {
        headers: { Authorization: `Bearer ${token}` }
    });

    localStorage.removeItem('accessToken');
}

// 프로필 정보 가져오기
export const getProfile = async () => {
    const token = localStorage.getItem("accessToken");
    const response = await api.get("/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

// 비밀번호 변경
export const changePassword = async (currentPassword: string, newPassword: string) => {
    const token = localStorage.getItem("accessToken");
    const response = await api.put(
        "/auth/change-password",
        { currentPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
};
