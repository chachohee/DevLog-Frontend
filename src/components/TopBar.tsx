import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SunIcon, MoonIcon, HomeIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { useAuth } from "../context/AuthContext";
import { useDarkMode } from "../context/DarkModeContext";

const TopBar: React.FC = () => {
    const navigate = useNavigate();
    const { isLoggedIn, logout } = useAuth();
    const { darkMode, toggleDarkMode } = useDarkMode();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="fixed top-0 left-0 right-0 flex justify-between items-center z-50 px-4 py-2 bg-gray-100 dark:bg-gray-900 shadow">
            <div className="flex items-center gap-2">
                <button
                    className="flex items-center gap-1 px-3 py-1 bg-gray-300 dark:bg-gray-700 rounded hover:bg-gray-400 dark:hover:bg-gray-600 transition"
                    onClick={() => navigate("/")}
                >
                    <HomeIcon className="w-5 h-5" />
                    Home
                </button>
                <button
                    className="flex items-center gap-1 px-3 py-1 bg-gray-300 dark:bg-gray-700 rounded hover:bg-gray-400 dark:hover:bg-gray-600 transition"
                    onClick={toggleDarkMode}
                >
                    {darkMode ? <SunIcon className="w-5 h-5 text-yellow-400" /> : <MoonIcon className="w-5 h-5 text-gray-800" />}
                    {darkMode ? "Light" : "Dark"}
                </button>
            </div>

            {isLoggedIn && (
                <div className="flex gap-4">
                    <button onClick={() => navigate("/dashboard")} className="hover:underline">Dashboard</button>
                    <button onClick={() => navigate("/projects")} className="hover:underline">Projects</button>
                    <button onClick={() => navigate("/menu1")} className="hover:underline">menu1</button>
                    <button onClick={() => navigate("/menu2")} className="hover:underline">menu2</button>
                </div>
            )}

            {isLoggedIn && (
                <div className="relative">
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="px-3 py-1 bg-gray-300 dark:bg-gray-700 rounded hover:bg-gray-400 dark:hover:bg-gray-600 transition"
                    >
                        <Bars3Icon className="w-6 h-6 text-gray-800 dark:text-white" />
                    </button>

                    {menuOpen && (
                        <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-700 rounded shadow-lg py-1 z-50">
                            <button
                                onClick={() => {
                                    setMenuOpen(false);
                                    navigate("/profile");
                                }}
                                className="block w-full text-left px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
                            >
                                My Profile
                            </button>
                            <button
                                onClick={() => {
                                    setMenuOpen(false);
                                    navigate("/settings");
                                }}
                                className="block w-full text-left px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
                            >
                                Settings
                            </button>
                            <button
                                onClick={() => {
                                    logout();
                                    setMenuOpen(false);
                                }}
                                className="block w-full text-left px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
                            >
                                Sign out
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default TopBar;


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//     SunIcon,
//     MoonIcon,
//     HomeIcon,
//     Squares2X2Icon,
//     FolderIcon,
//     ListBulletIcon,
//     Cog6ToothIcon,
//     Bars3Icon,
//     UserIcon,
//     ArrowRightOnRectangleIcon
// } from "@heroicons/react/24/outline";
// import { useAuth } from "../context/AuthContext";
// import { useDarkMode } from "../context/DarkModeContext";

// const TopBar: React.FC = () => {
//     const navigate = useNavigate();
//     const { isLoggedIn, logout } = useAuth();
//     const { darkMode, toggleDarkMode } = useDarkMode();
//     const [menuOpen, setMenuOpen] = useState(false);

//     const navButtons = [
//         { icon: Squares2X2Icon, label: "Dashboard", path: "/dashboard" },
//         { icon: FolderIcon, label: "Projects", path: "/projects" },
//         { icon: ListBulletIcon, label: "Menu1", path: "/menu1" },
//         { icon: Cog6ToothIcon, label: "Menu2", path: "/menu2" },
//     ];

//     return (
//         <div className="fixed top-0 left-0 right-0 flex justify-between items-center z-50 px-4 py-2 bg-gray-100 dark:bg-gray-900 shadow">
//             {/* 왼쪽: 홈 + 다크 모드 */}
//             <div className="flex items-center gap-2">
//                 <button
//                     className="flex items-center gap-1 px-3 py-1 bg-gray-300 dark:bg-gray-700 rounded hover:bg-gray-400 dark:hover:bg-gray-600 transition"
//                     onClick={() => navigate("/")}
//                 >
//                     <HomeIcon className="w-5 h-5" />
//                     Home
//                 </button>
//                 <button
//                     className="flex items-center gap-1 px-3 py-1 bg-gray-300 dark:bg-gray-700 rounded hover:bg-gray-400 dark:hover:bg-gray-600 transition"
//                     onClick={toggleDarkMode}
//                 >
//                     {darkMode ? <SunIcon className="w-5 h-5 text-yellow-400" /> : <MoonIcon className="w-5 h-5 text-gray-800" />}
//                     {darkMode ? "Light" : "Dark"}
//                 </button>
//             </div>

//             {/* 가운데: 내비게이션 버튼 */}
//             {isLoggedIn && (
//                 <div className="flex gap-4">
//                     {navButtons.map((btn) => (
//                         <button
//                             key={btn.label}
//                             onClick={() => navigate(btn.path)}
//                             className="flex items-center gap-1 px-3 py-1 bg-gray-300 dark:bg-gray-700 rounded hover:bg-gray-400 dark:hover:bg-gray-600 transition"
//                         >
//                             <btn.icon className="w-5 h-5" />
//                             {btn.label}
//                         </button>
//                     ))}
//                 </div>
//             )}

//             {/* 오른쪽: 유저 메뉴 */}
//             {isLoggedIn && (
//                 <div className="relative">
//                     <button
//                         onClick={() => setMenuOpen(!menuOpen)}
//                         className="px-3 py-1 bg-gray-300 dark:bg-gray-700 rounded hover:bg-gray-400 dark:hover:bg-gray-600 transition"
//                     >
//                         <Bars3Icon className="w-6 h-6 text-gray-800 dark:text-white" />
//                     </button>

//                     {menuOpen && (
//                         <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-700 rounded shadow-lg py-1 z-50">
//                             <button
//                                 onClick={() => {
//                                     setMenuOpen(false);
//                                     navigate("/profile");
//                                 }}
//                                 className="flex items-center gap-2 w-full text-left px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
//                             >
//                                 <UserIcon className="w-5 h-5" />
//                                 My Profile
//                             </button>
//                             <button
//                                 onClick={() => {
//                                     setMenuOpen(false);
//                                     navigate("/settings");
//                                 }}
//                                 className="flex items-center gap-2 w-full text-left px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
//                             >
//                                 <Cog6ToothIcon className="w-5 h-5" />
//                                 Settings
//                             </button>
//                             <button
//                                 onClick={() => {
//                                     logout();
//                                     setMenuOpen(false);
//                                 }}
//                                 className="flex items-center gap-2 w-full text-left px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
//                             >
//                                 <ArrowRightOnRectangleIcon className="w-5 h-5" />
//                                 Sign out
//                             </button>
//                         </div>
//                     )}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default TopBar;

