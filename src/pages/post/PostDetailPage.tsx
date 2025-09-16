import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getPost, deletePost } from "../../api/posts";
import type { Post } from "../../types/Post";
import { useAuth } from "../../context/useAuth";
import CommentPage from "./CommentPage";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

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

    const handleDelete = async () => {
        if (!token) return alert("로그인이 필요합니다.");
        if (confirm("정말 삭제하시겠습니까?")) {
            try {
                await deletePost(post!.id);
                navigate("/dashboard");
            } catch (err) {
                alert("삭제 실패");
                console.error(err);
            }
        }
    };

    if (!post) {
        return (
            <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                <p className="text-gray-600 text-lg">게시글을 불러오는 중...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-16 px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                {/* 제목 */}
                <h1 className="text-3xl font-bold text-gray-800 mb-4">{post.title}</h1>

                {/* 작성 정보 */}
                <div className="flex justify-between items-center text-sm text-gray-500 border-b border-gray-100 pb-4 mb-6">
                    <p>작성자: <span className="font-medium text-gray-700">{post.author}</span></p>
                    <p>{new Date(post.createdAt).toLocaleDateString()}</p>
                </div>

                {/* 본문 */}
                <div className="prose max-w-none text-gray-800 whitespace-pre-line mb-8">
                    {post.content}
                </div>

                {/* 수정/삭제 버튼 */}
                {isLoggedIn && username === post.author && (
                    <div className="flex gap-3 mb-10">
                        <Link
                            to={`/posts/${post.id}/edit`}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
                        >
                            <PencilIcon className="w-4 h-4" />
                            수정
                        </Link>
                        <button
                            onClick={handleDelete}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                        >
                            <TrashIcon className="w-4 h-4" />
                            삭제
                        </button>
                    </div>
                )}

                {/* 댓글 섹션 */}
                {/* <div className="border-t border-gray-300 pt-6"> */}
                <div className="pt-6">
                    <CommentPage postId={post.id} />
                </div>
            </div>
        </div>
    );
}
