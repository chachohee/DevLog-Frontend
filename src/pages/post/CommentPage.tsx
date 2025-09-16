import { useEffect, useState } from "react";
import { getComments, createComment, updateComment, deleteComment } from "../../api/comments";
import type { Comment } from "../../types/Comment";
import { useAuth } from "../../context/useAuth";
import CommentForm from "../../components/CommentForm";
import CommentItem from "../../components/CommentItem";

interface Props {
    postId: number;
}

export default function CommentPage({ postId }: Props) {
    const [comments, setComments] = useState<Comment[]>([]);
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
        <ul className="space-y-4">
            {list.map((c) => (
                <li
                    key={c.id}
                    className={`p-4 border rounded-lg shadow-sm bg-white dark:bg-gray-800 ${depth > 0 ? "ml-6 border-l-4 border-blue-300 dark:border-blue-600" : ""
                        }`}
                >
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="font-semibold text-gray-800 dark:text-gray-200">{c.author}</p>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">
                                {new Date(c.createdAt).toLocaleString()}
                            </p>
                        </div>
                        {isLoggedIn && username === c.author && (
                            <div className="flex gap-2 ml-4">
                                <button
                                    onClick={() => {
                                        const content = prompt("댓글 수정", c.content);
                                        if (content) handleUpdate(c.id, content);
                                    }}
                                    className="text-blue-500 hover:underline text-sm"
                                >
                                    수정
                                </button>
                                <button
                                    onClick={() => handleDelete(c.id)}
                                    className="text-red-500 hover:underline text-sm"
                                >
                                    삭제
                                </button>
                            </div>
                        )}
                    </div>
                    <p className="mt-2 text-gray-700 dark:text-gray-300">{c.content}</p>

                    {/* 답글 버튼 */}
                    {isLoggedIn && (
                        <div className="mt-2">
                            <button
                                onClick={() => {
                                    const content = prompt("답글 입력");
                                    if (content) handleAdd(content, c.id);
                                }}
                                className="text-sm text-blue-500 hover:underline"
                            >
                                답글 달기
                            </button>
                        </div>
                    )}

                    {/* 자식 댓글 */}
                    {c.children && c.children.length > 0 && renderComments(c.children, depth + 1)}
                </li>
            ))}
        </ul>
    );

    return (
        <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">댓글</h3>
            {comments.map((comment) => (
                <CommentItem
                    key={comment.id}
                    comment={comment}
                    depth={0}
                    onAdd={handleAdd}
                    onUpdate={handleUpdate}
                    onDelete={handleDelete}
                    isLoggedIn={isLoggedIn}
                    username={username}
                />
            ))}
            {isLoggedIn && <CommentForm onSubmit={(content) => handleAdd(content)} />}
        </div>
    );
}
