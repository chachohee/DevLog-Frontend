import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getPost, deletePost } from "../../api/posts";
import type { Post } from "../../types/Post";
import { useAuth } from "../../context/useAuth";
import CommentPage from "./CommentPage";

export default function PostDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { isLoggedIn, token, username } = useAuth();
    const [post, setPost] = useState<Post | null>(null);

    useEffect(() => {
        if (id) {
            getPost(Number(id))
                .then(setPost)
                .catch(console.error);
        }
    }, [id]);

    if (!post) return <div className="text-center mt-20">Loading...</div>;

    const handleDelete = async () => {
        if (!token) return alert("로그인이 필요합니다.");
        if (confirm("삭제하시겠습니까?")) {
            await deletePost(post.id);
            navigate("/dashboard");
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-8 p-6 bg-white dark:bg-gray-800 shadow rounded-lg text-gray-900 dark:text-white">
            <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-4">By {post.author} | {new Date(post.createdAt).toLocaleDateString()}</p>
            <p className="whitespace-pre-line">{post.content}</p>
            {isLoggedIn && username === post.author && (
                <div className="flex gap-2 mt-6">
                    <Link
                        to={`/posts/${post.id}/edit`}
                        className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                    >
                        Edit
                    </Link>
                    <button
                        onClick={handleDelete}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                    >
                        Delete
                    </button>
                </div>
            )}
            {/* 댓글 섹션 */}
            <div className="mt-10">
                <CommentPage postId={post.id} />
            </div>
        </div>
    );
}
