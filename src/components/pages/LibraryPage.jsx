import axios from "axios";
import swal from "sweetalert2";
import { useEffect, useState } from "react";
import Navbar from "../elements/Navbar.jsx"; 
import { useNavigate } from "react-router-dom";
import GameCard from "../elements/GameCard.jsx"; // Import komponen GameCard

export default function LibraryPage() {
    const [games, setGames] = useState([{}]);
    const [gamesLength, setGamesLength] = useState(0);
    const [selectedGame, setSelectedGame] = useState(null);

    const navigate = useNavigate();
    const userId = localStorage.getItem("id");
    console.log(userId);
    const getData = async () => {
        try{

        if(!userId){
            await swal.fire({
            icon: "error",
            iconColor: "#FFFFFF",
            text: "Silahkan login terlebih dahulu",
            color: "#FFFFFF",
            background: "#303655",
            });
            navigate("/login");
            return;
        }
        const response = await axios.post("http://localhost:3000/account/byId", {
            user_id: userId,
        })
        console.log(response);
        console.log(response.data.data);

        setGames(response.data.data.games);
        setGames(response.data.data.games);
        console.log(response.data.data.games);
        console.log(games);
        setGamesLength(response.data.data.games.length);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
            getData();
    }, []);

    const handleGameCardClick = (game) => {
        setSelectedGame(game);
    };

    const handleCloseModal = () => {
        setSelectedGame(null);
    };

    return (
        <div className="flex min-h-screen w-full bg-gray-900 text-white">
            <Navbar />
            <div className="flex-1 p-4 ml-64 transition-all duration-200 ease-in-out"
            >
                {/* Judul dan konten halaman Library */}
                <p className="text-4xl font-bold mb-8 text-center text-white">Library</p>
                <p className="text-left text-2xl font-bold mb-8 text-white">Total games: {gamesLength}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {games.map((game) => (
                        <GameCard
                            key={game.id} // Gunakan ID unik untuk setiap game
                            game={game}
                            onClick={handleGameCardClick}
                        />
                    ))}
                </div>
                

                {/* Tambahkan konten spesifik LibraryPage Anda di sini */}
                {/* Contoh: Grid game cards, dll. */}

                {/* tampilkan game dalam bentuk card */}

            </div>
        </div>
    );
}