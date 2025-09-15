import { useEffect, useState } from "react";
import { getComments, createComment, updateComment, deleteComment } from "../api/comments";
import type { Comment } from "../types/Comment";
import { useAuth } from "../context/useAuth";

interface Props {
    postId: number;
}

export default function CommentSection({ postId }: Props) {
    const [comments, setComments] = useState<Comment[]>([]);
    const [newContent, setNewContent] = useState("");
    const { isLoggedIn, token, username } = useAuth();

    useEffect(() => {
        loadComments();
    }, [postId]);

    const loadComments = async () => {
        try {
            const data = await getComments(postId);
            setComments(data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleAdd = async (content: string, parentId?: number) => {
        if (!token) return alert("로그인이 필요합니다.");
        try {
            await createComment(postId, content, parentId);
            await loadComments();
        } catch (err) {
            console.error(err);
        }
    };

    const handleUpdate = async (commentId: number, content: string) => {
        if (!token) return alert("로그인이 필요합니다.");
        try {
            await updateComment(postId, commentId, content);
            await loadComments();
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (commentId: number) => {
        if (!token) return alert("로그인이 필요합니다.");
        if (!confirm("댓글을 삭제하시겠습니까?")) return;
        try {
            await deleteComment(postId, commentId);
            await loadComments();
        } catch (err) {
            console.error(err);
        }
    };

    const renderComments = (list: Comment[], depth = 0) => (
        <ul className="space-y-2" style={{ marginLeft: depth * 20 }}>
            {list.map((c) => (
                <li key={c.id} className="p-2 border rounded bg-gray-100 dark:bg-gray-700">
                    <div className="flex justify-between items-center">
                        <span>
                            <b>{c.author}</b> ({new Date(c.createdAt).toLocaleString()})
                        </span>
                        {isLoggedIn && username === c.author && (
                            <div className="flex gap-2">
                                <button
                                    onClick={() => {
                                        const content = prompt("댓글 수정", c.content);
                                        if (content) handleUpdate(c.id, content);
                                    }}
                                    className="text-blue-600"
                                >
                                    수정
                                </button>
                                <button
                                    onClick={() => handleDelete(c.id)}
                                    className="text-red-600"
                                >
                                    삭제
                                </button>
                            </div>
                        )}
                    </div>
                    <p className="mt-1">{c.content}</p>
                    {isLoggedIn && (
                        <button
                            onClick={() => {
                                const content = prompt("답글 입력");
                                if (content) handleAdd(content, c.id);
                            }}
                            className="text-sm text-gray-500 mt-1"
                        >
                            답글 달기
                        </button>
                    )}
                    {c.children && c.children.length > 0 && renderComments(c.children, depth + 1)}
                </li>
            ))}
        </ul>
    );

    return (
        <div className="mt-6">
            <h3 className="text-lg font-bold mb-2">댓글</h3>
            {renderComments(comments)}
            {isLoggedIn && (
                <div className="mt-4">
                    <textarea
                        value={newContent}
                        onChange={(e) => setNewContent(e.target.value)}
                        placeholder="댓글을 입력하세요..."
                        className="w-full border rounded p-2"
                    />
                    <button
                        onClick={() => {
                            if (newContent.trim()) {
                                handleAdd(newContent);
                                setNewContent("");
                            }
                        }}
                        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
                    >
                        댓글 등록
                    </button>
                </div>
            )}
        </div>
    );
}
