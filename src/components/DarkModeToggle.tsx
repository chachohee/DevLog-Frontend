import { useState, useEffect } from "react";

export default function DarkModeToggle() {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const html = document.documentElement;
        if (darkMode) html.classList.add("dark");
        else html.classList.remove("dark");
    }, [darkMode]);

    return (
        <button
            onClick={() => setDarkMode(!darkMode)}
            className="fixed top-4 right-4 px-3 py-1 bg-gray-300 dark:bg-gray-700 rounded"
        >
            {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
    );
}
