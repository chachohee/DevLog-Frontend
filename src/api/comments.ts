import type { Comment } from "../types/Comment";
import api from "./axios";

// 댓글 목록 조회
export const getComments = async (postId: number): Promise<Comment[]> => {
    try {
        const res = await api.get<Comment[]>(`/posts/${postId}/comments`);
        return res.data;
    } catch (err) {
        console.error(err);
        throw new Error("댓글 불러오기 실패");
    }
};

// 댓글 작성 (parentId 없으면 일반 댓글, 있으면 대댓글)
export const createComment = async (
    postId: number,
    content: string,
    parentId?: number
): Promise<Comment> => {
    try {
        const res = await api.post<Comment>(
            `/posts/${postId}/comments${parentId ? `?parentId=${parentId}` : ""}`,
            { content }
        );
        return res.data;
    } catch (err) {
        console.error(err);
        throw new Error("댓글 작성 실패");
    }
};

// 댓글 수정
export const updateComment = async (
    postId: number,
    commentId: number,
    content: string
): Promise<Comment> => {
    try {
        const res = await api.put<Comment>(
            `/posts/${postId}/comments/${commentId}`,
            { content }
        );
        return res.data;
    } catch (err) {
        console.error(err);
        throw new Error("댓글 수정 실패");
    }
};

// 댓글 삭제
export const deleteComment = async (
    postId: number,
    commentId: number
): Promise<void> => {
    try {
        await api.delete(`/posts/${postId}/comments/${commentId}`);
    } catch (err) {
        console.error(err);
        throw new Error("댓글 삭제 실패");
    }
};
