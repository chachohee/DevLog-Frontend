import { useState } from "react";
import CommentForm from "./CommentForm";
import type { Comment } from "../types/Comment";

interface Props {
    comment: Comment;
    depth: number;
    onAdd: (content: string, parentId?: number) => void;
    onUpdate: (commentId: number, content: string) => void;
    onDelete: (commentId: number) => void;
    isLoggedIn: boolean;
    username: string | null;
}

export default function CommentItem({
    comment,
    depth,
    onAdd,
    onUpdate,
    onDelete,
    isLoggedIn,
    username,
}: Props) {
    const [isReplying, setIsReplying] = useState(false);
    const [showChildren, setShowChildren] = useState(false);

    return (
        <div
            className={`relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-md p-4 shadow-sm ${depth > 0 ? "ml-4 pl-4 border-l-4 border-blue-200 dark:border-blue-500" : ""
                }`}
        >
            <div className="flex justify-between items-start">
                <div>
                    <p className="font-medium text-gray-800 dark:text-gray-200">{comment.author}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(comment.createdAt).toLocaleString()}
                    </p>
                </div>

                {isLoggedIn && username === comment.author && (
                    <div className="flex gap-2">
                        <button
                            onClick={() => {
                                const content = prompt("댓글 수정", comment.content);
                                if (content) onUpdate(comment.id, content);
                            }}
                            className="text-sm text-blue-500 hover:underline"
                        >
                            수정
                        </button>
                        <button
                            onClick={() => onDelete(comment.id)}
                            className="text-sm text-red-500 hover:underline"
                        >
                            삭제
                        </button>
                    </div>
                )}
            </div>

            <p className="mt-2 text-gray-700 dark:text-gray-300 whitespace-pre-line">{comment.content}</p>

            {/* 답글 달기 */}
            {isLoggedIn && (
                <div className="mt-3">
                    {!isReplying ? (
                        <button
                            onClick={() => setIsReplying(true)}
                            className="text-sm text-blue-500 hover:underline"
                        >
                            답글 달기
                        </button>
                    ) : (
                        <div className="mt-2 space-y-2">
                            <CommentForm
                                placeholder="답글을 입력하세요..."
                                onSubmit={(content) => {
                                    onAdd(content, comment.id);
                                    setIsReplying(false);
                                }}
                            />
                            <button
                                onClick={() => setIsReplying(false)}
                                className="text-sm text-gray-500 hover:underline"
                            >
                                취소
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* 대댓글 보기 토글 */}
            {comment.children && comment.children.length > 0 && (
                <div className="mt-4">
                    <button
                        onClick={() => setShowChildren(!showChildren)}
                        className="text-sm text-gray-500 hover:text-blue-500 transition"
                    >
                        {showChildren ? "답글 숨기기" : `답글 보기 (${comment.children.length})`}
                    </button>

                    {showChildren && (
                        <div className="mt-4 space-y-4">
                            {comment.children.map((child) => (
                                <CommentItem
                                    key={child.id}
                                    comment={child}
                                    depth={depth + 1}
                                    onAdd={onAdd}
                                    onUpdate={onUpdate}
                                    onDelete={onDelete}
                                    isLoggedIn={isLoggedIn}
                                    username={username}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
