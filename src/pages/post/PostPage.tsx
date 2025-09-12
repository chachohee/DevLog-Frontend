import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPosts } from "../../api/posts";
import type { Post } from "../../types/Post";

export default function PostsPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getPosts()
            .then(setPosts)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="text-center mt-20">Loading...</div>;

    return (
        <div className="max-w-3xl mx-auto mt-8 space-y-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Posts</h1>
                <Link to="/posts/create" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Create Post</Link>
            </div>
            {posts.length === 0 && <p>No posts yet.</p>}
            {posts.map((post) => (
                <Link
                    key={post.id}
                    to={`/posts/${post.id}`}
                    className="block p-4 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                >
                    <h2 className="text-xl font-semibold">{post.title}</h2>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">By {post.author} | {new Date(post.createdAt).toLocaleDateString()}</p>
                </Link>
            ))}
        </div>
    );
}
