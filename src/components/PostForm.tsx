import React, { useState, useEffect } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/solid";

interface PostFormProps {
    initialTitle?: string;
    initialContent?: string;
    onSubmit: (title: string, content: string) => void;
}

const PostForm: React.FC<PostFormProps> = ({
    initialTitle = "",
    initialContent = "",
    onSubmit,
}) => {
    const [title, setTitle] = useState(initialTitle);
    const [content, setContent] = useState(initialContent);

    useEffect(() => {
        setTitle(initialTitle);
        setContent(initialContent);
    }, [initialTitle, initialContent]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(title, content);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6 text-gray-800"
        >
            {/* 타이틀 필드 */}
            <div>
                <label className="block text-sm font-medium mb-1">제목</label>
                <input
                    type="text"
                    placeholder="게시글 제목을 입력하세요"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                    required
                />
            </div>

            {/* 내용 필드 */}
            <div>
                <label className="block text-sm font-medium mb-1">내용</label>
                <textarea
                    placeholder="내용을 입력하세요..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition resize-y min-h-[200px]"
                    required
                />
            </div>

            {/* 제출 버튼 */}
            <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 transition"
            >
                <PencilSquareIcon className="w-5 h-5" />
                게시글 등록
            </button>
        </form>
    );
};

export default PostForm;
