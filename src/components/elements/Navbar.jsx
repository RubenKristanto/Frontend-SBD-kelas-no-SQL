import { useNavigate, useLocation } from "react-router-dom";
import { Home, ShoppingBag, Library, User, Settings, LogOut, Menu, X, ChevronsLeft, ChevronsRight } from "lucide-react"; 
import { useState } from "react";

export default function Navigation() {
    const navigate = useNavigate();
    const location = useLocation();
    const pathname = location.pathname;

    const [isOpen, setIsOpen] = useState(false); // State untuk mobile sidebar
    const [isMinimized, setIsMinimized] = useState(false); // State untuk minimize/maximize desktop sidebar

    const userName = localStorage.getItem("user");

    const navItems = [
        { name: "Home", href: "/home", icon: Home },
        { name: "Store", href: "/store", icon: ShoppingBag },
        { name: "Library", href: "/library", icon: Library },
        { name: "Profile", href: "/profile", icon: User },
    ];

    const handleNavigation = (href) => {
        navigate(href);
        setIsOpen(false); // Tutup sidebar mobile saat navigasi
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    const toggleMinimize = () => {
        setIsMinimized(!isMinimized);
    };

    return (
        <>
        {/* Mobile navigation toggle (terlihat di layar kecil) */}
        <button
            className="fixed top-4 left-4 z-50 md:hidden p-2 rounded-md text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => setIsOpen(!isOpen)}
        >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Navigation sidebar */}
        <div
            className={`fixed inset-y-0 left-0 z-40 bg-gray-800 text-white transform transition-all duration-200 ease-in-out ${
            // Mobile state
            isOpen ? "translate-x-0 w-64" : "-translate-x-full w-64"
            } ${
            // Desktop state (override mobile state jika di desktop)
            isMinimized ? "md:w-20" : "md:w-64"
            } md:translate-x-0`} // md:translate-x-0 agar selalu terlihat di desktop
        >
            <div className="flex flex-col h-full">
            {/* Logo and Minimize Toggle */}
            <div className="p-4 border-b border-gray-700 flex items-center justify-between">
                <div
                className={`flex items-center gap-2 cursor-pointer ${isMinimized ? "justify-center w-full" : ""}`}
                onClick={() => handleNavigation("/home")}
                >
                <svg viewBox="0 0 24 24" className="w-8 h-8 text-blue-500 flex-shrink-0" fill="currentColor">
                    <path d="M12 1.5C6.201 1.5 1.5 6.201 1.5 12S6.201 22.5 12 22.5 22.5 17.799 22.5 12 17.799 1.5 12 1.5zM9.75 17.357V6.643L15.75 12l-6 5.357z" />
                </svg>
                {!isMinimized && <span className="text-xl font-bold whitespace-nowrap">steam.me</span>}
                </div>
                {/* Tombol Minimize/Maximize (hanya terlihat di desktop) */}
                <button
                onClick={toggleMinimize}
                className="hidden md:block p-1 rounded-md text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                title={isMinimized ? "Maximize Sidebar" : "Minimize Sidebar"}
                >
                {isMinimized ? <ChevronsRight size={20} /> : <ChevronsLeft size={20} />}
                </button>
            </div>

            {/* User info */}
            <div className="p-4 border-b border-gray-700">
                <div className="flex items-center gap-3">
                {!isMinimized && (
                    <div className="px-3 mx-auto">
                    <p className="font-medium whitespace-nowrap">{userName}</p>
                    <p className="text-xs text-gray-400 whitespace-nowrap">Online</p>
                    </div>
                )}
                </div>
            </div>

            {/* Navigation links */}
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {navItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;

                return (
                    <div
                    key={item.name}
                    onClick={() => handleNavigation(item.href)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors cursor-pointer ${
                        isActive ? "bg-gray-700 text-white" : "text-gray-400 hover:bg-gray-700 hover:text-white"
                    } ${isMinimized ? "justify-center px-0 py-3" : ""}`}
                    >
                    <Icon size={20} className={isMinimized ? "flex-shrink-0" : ""} />
                    {!isMinimized && <span className="whitespace-nowrap">{item.name}</span>}
                    </div>
                );
                })}
            </nav>

            {/* Bottom actions */}
            <div className="p-4 border-t border-gray-700">
                <div className="space-y-1">
                <div
                    onClick={() => handleLogout("")}
                    className={`flex items-center gap-3 px-3 py-2 text-gray-400 rounded-md hover:bg-gray-700 hover:text-white transition-colors cursor-pointer ${
                    isMinimized ? "justify-center px-0 py-3" : ""
                    }`}
                >
                    <LogOut size={20} className={isMinimized ? "flex-shrink-0" : ""} />
                    {!isMinimized && <span className="whitespace-nowrap">Log Out</span>}
                </div>
                </div>
            </div>
            </div>
        </div>

        {/* Overlay for mobile */}
        {isOpen && <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setIsOpen(false)} />}
        </>
    );
}


// import { useNavigate } from "react-router-dom";

// export default function Navbar() {
//     const navigate = useNavigate();

//     const handleLogout = () => {
//         localStorage.clear();
//         navigate("/login");
//     }

//     return (
//         <nav className="bg-black text-white p-4 flex items-center justify-between fixed top-0 left-0 w-full z-10">
//             <div className="flex  transform transition duration-400 hover:scale-105">
//                 <span className="ml-4 text-xl font-semibold  flex-1" onClick={() => navigate("/home")}>Steam</span>
//             </div>
//             <ul className="flex space-x-4 text-white text-xl">
//                 <a className="text-white hover:text-[#525869] hover:scale-105 w-32 flex-1" onClick={() => navigate("/store")}>store</a>
//                 <a className="text-white hover:text-[#525869] hover:scale-105 w-32 flex-1" onClick={() => navigate("/library")}>library</a>
//                 <a className="text-white hover:text-[#525869] hover:scale-105 w-32 flex-1" onClick={() => navigate("/profile")}>Profile</a>
//                 <a className="text-white hover:text-[#c0cae3] hover:scale-105 w-32 flex-1 bg-red-600 rounded-xl"onClick={() => handleLogout}>Log Out</a>
//             </ul>
//         </nav>
//     );
// }

