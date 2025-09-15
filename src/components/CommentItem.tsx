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

    return (
        <div
            className={`p-4 border rounded-lg shadow-sm bg-white dark:bg-gray-800 ${depth > 0 ? "ml-6 border-l-4 border-blue-300 dark:border-blue-600" : ""
                }`}
        >
            <div className="flex justify-between items-start">
                <div>
                    <p className="font-semibold text-gray-800 dark:text-gray-200">{comment.author}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                        {new Date(comment.createdAt).toLocaleString()}
                    </p>
                </div>
                {isLoggedIn && username === comment.author && (
                    <div className="flex gap-2 ml-4">
                        <button
                            onClick={() => {
                                const content = prompt("댓글 수정", comment.content);
                                if (content) onUpdate(comment.id, content);
                            }}
                            className="text-blue-500 hover:underline text-sm"
                        >
                            수정
                        </button>
                        <button
                            onClick={() => onDelete(comment.id)}
                            className="text-red-500 hover:underline text-sm"
                        >
                            삭제
                        </button>
                    </div>
                )}
            </div>
            <p className="mt-2 text-gray-700 dark:text-gray-300">{comment.content}</p>

            {/* 답글 */}
            {isLoggedIn && (
                <div className="mt-2">
                    {!isReplying ? (
                        <button
                            onClick={() => setIsReplying(true)}
                            className="text-sm text-blue-500 hover:underline"
                        >
                            답글 달기
                        </button>
                    ) : (
                        <div className="mt-2">
                            <CommentForm
                                placeholder="답글을 입력하세요..."
                                onSubmit={(content) => {
                                    onAdd(content, comment.id);
                                    setIsReplying(false);
                                }}
                            />
                            <button
                                onClick={() => setIsReplying(false)}
                                className="text-sm text-gray-500 mt-1 hover:underline"
                            >
                                취소
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* 자식 댓글 */}
            {comment.children &&
                comment.children.map((child) => (
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
    );
}
