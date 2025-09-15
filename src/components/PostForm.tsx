import React, { useState, useEffect } from "react";

interface PostFormProps {
    initialTitle?: string;
    initialContent?: string;
    onSubmit: (title: string, content: string) => void;
}

const PostForm: React.FC<PostFormProps> = ({ initialTitle = "", initialContent = "", onSubmit }) => {
    const [title, setTitle] = useState(initialTitle);
    const [content, setContent] = useState(initialContent);

    // initialTitle과 initialContent가 변경될 때 state 업데이트
    useEffect(() => {
        setTitle(initialTitle);
        setContent(initialContent);
    }, [initialTitle, initialContent]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(title, content);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-6 p-6 bg-white dark:bg-gray-800 shadow rounded-lg space-y-4 text-gray-900 dark:text-white">
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600"
                required
            />
            <textarea
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600"
                rows={6}
                required
            />
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                Submit
            </button>
        </form>
    );
};

export default PostForm;
