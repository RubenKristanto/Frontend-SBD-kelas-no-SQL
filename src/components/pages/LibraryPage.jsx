import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../elements/Navbar.jsx"; 

export default function LibraryPage() {
    const [games, setGames] = useState([{}]);
    const [gamesLength, setGamesLength] = useState(0);


    const userId = localStorage.getItem("id");
    console.log(userId);
    const getData = async () => {
        try{
        const data = await axios.post("http://localhost:3000/account/byId", {
            user_id: userId,
        },   
        {   
            headers: { 
        "Content-Type": "application/x-www-form-urlencoded"
        }}); 
        console.log(data);
        setGames(data.data.games);
        console.log(data.data.games);
        console.log(games);
        setGamesLength(data.games.length);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        getData();
    }, []);


    return (
        <div className="flex min-h-screen bg-gray-900 text-white">
            <Navbar />
            <div
                className="flex-1 p-4 ml-64 transition-all duration-200 ease-in-out"
            >
                {/* Judul dan konten halaman Library */}
                <p className="text-4xl font-bold mb-8 text-center text-white">Library</p>
                <p className="text-left text-2xl font-bold mb-8 text-white">Total games: {gamesLength}</p>


                {/* Tambahkan konten spesifik LibraryPage Anda di sini */}
                {/* Contoh: Grid game cards, dll. */}

                {/* tampilkan game dalam bentuk card */}

            </div>
        </div>
    );
}