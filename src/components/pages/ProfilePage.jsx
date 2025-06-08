import { useState, useEffect } from "react";
import swal from "sweetalert2";
import axios from "axios";
import Navbar from "../elements/Navbar.jsx";

export default function ProfilePage() {
    
    const [user, setUser] = useState({});
    const [games, setGames] = useState([{}]);
    const [achievement, setAchievement] = useState([{}]);

    const handleProfile = async () => {
        try {
            const user_id = localStorage.getItem("id");
            const response = await axios.post("http://localhost:3000/account/byId", {
                user_id: user_id
            });
            setUser(response.data.data);
            setGames(response.data.data.games);
            setAchievement(response.data.data.achievements);
            console.log("Resp:",response.data.data);
        } catch (error) {
            console.error(error);
        }
    }
    
    useEffect(() => {
        handleProfile();
    }, []);

    // console.log("User:",user);
    // console.log("Games:",games);
    // console.log("Achvs:",achievement);
    return (
        <div className="flex min-h-screen bg-gray-900 text-white">
            <Navbar />

            {/* Konten utama LibraryPage */}
            {/*
                flex-1: Agar div ini mengambil sisa ruang horizontal yang tersedia.
                p-4: Padding untuk konten.
                ml-64: Margin kiri ini adalah kuncinya. Ini akan membuat ruang kosong
                        sebesar 64 unit Tailwind (256px) di sebelah kiri konten.
                        Ini mengasumsikan lebar maksimum dari Navbar (saat diperluas).
                        Ini mengatasi masalah tumpang tindih dengan Navbar yang `fixed`.
                transition-all duration-200 ease-in-out: Untuk animasi yang halus.
            */}
            <div
                className="flex-1 p-4 ml-64 transition-all duration-200 ease-in-out"
            >
                {/* Judul dan konten halaman Library */}
                <p className="text-4xl font-bold mb-8 text-center text-white">Profile</p>
                
                <div className="flex flex-col mx-auto mt-2">
                    <div className="flex flex-row justify-center">
                        <span className="mr-1 text-[25px]">Name: </span>
                        <span className="ml-1 rounded-2x1 text-white text-[25px]">
                        {user.username}
                        </span>
                    </div>
                    <div className="flex flex-row justify-center">
                        <span className="mr-1 text-[25px]">Email: </span>
                        <span className="ml-1 rounded-2x1 text-white text-[25px]">
                        {user.email}
                        </span>
                    </div>
                </div>
                <p className="text-left text-2xl font-bold mb-8 text-white">Total games: {games.length}</p>
                <p className="text-left text-2xl font-bold mb-8 text-white">Total achievements: {achievement.length}</p>
                {/* Tambahkan konten spesifik LibraryPage Anda di sini */}
                {/* Contoh: Grid game cards, dll. */}
                <ol>
                    {achievement.map((achievement) => (
                        <li
                            key={achievement._id}
                            className="text-[20px] p-3 flex flex-row bg-[#04071f] m-2 rounded-2xl bg-opacity-100 hover:bg-opacity-50"
                        >
                            <img src={achievement.image} className="w-[80px] h-[80px] mx-2 my-auto object-contain"/>
                            <div className="flex flex-col ml-2 my-auto text-justify">
                                <p className="font-bold underline">{achievement.name}</p>
                                <p>{achievement.description}</p>
                                <p>Date Achieved: {achievement.createdAt}</p>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
}
