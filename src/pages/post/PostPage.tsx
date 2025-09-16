import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPosts } from "../../api/posts";
import type { Post } from "../../types/Post";
import { PlusIcon, DocumentTextIcon } from "@heroicons/react/24/outline";

export default function PostsPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getPosts()
            .then(setPosts)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                <p className="text-gray-500 text-lg">Loading...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-20 px-4">
            {/* 타이틀 섹션 */}
            <div className="max-w-4xl mx-auto text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">📚 내 게시글</h1>
                <p className="text-lg text-gray-600">작성한 게시글을 확인하고 관리하세요</p>
            </div>

            {/* 게시글 카드들 */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* 새 글 작성 카드 */}
                <Link
                    to="/posts/create"
                    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition border border-gray-100 flex flex-col justify-between"
                >
                    <div className="flex items-center mb-4">
                        <PlusIcon className="w-8 h-8 text-green-600 mr-3" />
                        <h3 className="text-xl font-semibold text-gray-800">새 글 작성</h3>
                    </div>
                    <p className="text-gray-600">
                        새로운 게시글을 작성해보세요
                    </p>
                </Link>

                {/* 게시글 카드 */}
                {posts.length === 0 ? (
                    <div className="col-span-full bg-white rounded-xl p-6 shadow-md text-center border border-gray-100">
                        <p className="text-gray-600 text-lg">아직 게시글이 없습니다. 새 글을 작성해보세요!</p>
                    </div>
                ) : (
                    posts.map((post) => (
                        <Link
                            key={post.id}
                            to={`/posts/${post.id}`}
                            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition border border-gray-100"
                        >
                            <div className="flex items-center mb-3">
                                <DocumentTextIcon className="w-8 h-8 text-blue-600 mr-3" />
                                <h3 className="text-lg font-semibold text-gray-800">{post.title}</h3>
                            </div>
                            <p className="text-sm text-gray-600">
                                By {post.author} · {new Date(post.createdAt).toLocaleDateString()}
                            </p>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
}
