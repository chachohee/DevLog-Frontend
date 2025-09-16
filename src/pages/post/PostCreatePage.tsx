import { useNavigate } from "react-router-dom";
import PostForm from "../../components/PostForm";
import { createPost } from "../../api/posts";
import { useAuth } from "../../context/useAuth";

export default function PostCreatePage() {
    const navigate = useNavigate();
    const { token } = useAuth();

    const handleSubmit = async (title: string, content: string) => {
        if (!token) return alert("로그인이 필요합니다.");
        try {
            const post = await createPost(title, content);
            navigate(`/posts/${post.id}`);
        } catch (err) {
            alert("게시글 작성 실패");
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-20 px-4">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">📝 새 게시글 작성</h1>
                    <p className="text-gray-600 text-lg">공유하고 싶은 내용을 자유롭게 작성해보세요</p>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                    <PostForm onSubmit={handleSubmit} />
                </div>
            </div>
        </div>
    );
}
