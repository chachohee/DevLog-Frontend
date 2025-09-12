import type { Post } from "../types/Post";
import api from "./axios";

export const getPosts = async (): Promise<Post[]> => {
    try {
        const res = await api.get<Post[]>("/posts");
        return res.data;
    } catch (err) {
        console.error(err);
        throw new Error("게시글 불러오기 실패");
    }
};

export const getPost = async (id: number): Promise<Post> => {
    try {
        const res = await api.get<Post>(`/posts/${id}`);
        return res.data;
    } catch (err) {
        console.error(err);
        throw new Error("게시글 상세 불러오기 실패");
    }
};

export const createPost = async (title: string, content: string): Promise<Post> => {
    try {
        const res = await api.post<Post>("/posts", { title, content });
        return res.data;
    } catch (err) {
        console.error(err);
        throw new Error("게시글 작성 실패");
    }
};

export const updatePost = async (id: number, title: string, content: string): Promise<Post> => {
    try {
        const res = await api.put<Post>(`/posts/${id}`, { title, content });
        return res.data;
    } catch (err) {
        console.error(err);
        throw new Error("게시글 수정 실패");
    }
};

export const deletePost = async (id: number): Promise<void> => {
    try {
        await api.delete(`/posts/${id}`);
    } catch (err) {
        console.error(err);
        throw new Error("게시글 삭제 실패");
    }
};
