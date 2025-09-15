import { useState } from "react";

interface Props {
    onSubmit: (content: string) => void;
    placeholder?: string;
}

export default function CommentForm({ onSubmit, placeholder = "댓글을 입력하세요..." }: Props) {
    const [content, setContent] = useState("");

    const handleSubmit = () => {
        if (content.trim()) {
            onSubmit(content);
            setContent("");
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={placeholder}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 dark:bg-gray-700 dark:text-white"
                rows={3}
            />
            <button
                onClick={handleSubmit}
                className="self-end px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
                등록
            </button>
        </div>
    );
}
