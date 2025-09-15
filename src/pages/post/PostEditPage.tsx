import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PostForm from "../../components/PostForm";
import { getPost, updatePost } from "../../api/posts";
import { useAuth } from "../../context/useAuth";

export default function PostEditPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { token } = useAuth();
    const [initialTitle, setInitialTitle] = useState("");
    const [initialContent, setInitialContent] = useState("");

    useEffect(() => {
        if (id) {
            getPost(Number(id))
                .then((post) => {
                    setInitialTitle(post.title);
                    setInitialContent(post.content);
                })
                .catch(console.error);
        }
    }, [id]);

    const handleSubmit = async (title: string, content: string) => {
        if (!token || !id) return alert("로그인이 필요합니다.");
        try {
            await updatePost(Number(id), title, content);
            navigate(`/posts/${id}`);
        } catch (err) {
            alert("게시글 수정 실패");
            console.error(err);
        }
    };

    return <PostForm initialTitle={initialTitle} initialContent={initialContent} onSubmit={handleSubmit} />;
}
