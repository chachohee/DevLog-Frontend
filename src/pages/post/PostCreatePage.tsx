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

    return <PostForm onSubmit={handleSubmit} />;
}
