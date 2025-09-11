import axios from "axios";

const api = axios.create({
    baseURL: '/api',    // vite.config.js에서 proxy가 /api -> http://localhost:8080/api
    withCredentials: false, // JWT 토큰만 헤더에 넣을 거라 false
});

// 요청 시 토큰 자동 추가
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;