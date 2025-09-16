import { useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

interface Props {
    onSubmit: (content: string) => void;
    placeholder?: string;
}

export default function CommentForm({
    onSubmit,
    placeholder = "댓글을 입력하세요...",
}: Props) {
    const [content, setContent] = useState("");

    const handleSubmit = () => {
        if (content.trim()) {
            onSubmit(content);
            setContent("");
        }
    };

    return (
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <div className="flex flex-col gap-3">
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder={placeholder}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 transition placeholder-gray-400 text-gray-800"
                    rows={3}
                />
                <div className="flex justify-end">
                    <button
                        onClick={handleSubmit}
                        className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm"
                    >
                        <PaperAirplaneIcon className="w-4 h-4 rotate-45" />
                        등록
                    </button>
                </div>
            </div>
        </div>
    );
}
