// import swal from "sweetalert2";
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../elements/Navbar.jsx";
import GameCard from "../elements/GameCard.jsx";

export default function LibraryPage() {
    const [games, setGames] = useState([{}]);
    const [selectedGame, setSelectedGame] = useState(null);
    
    const getData = async () => {
        try{
        const data = await axios.get("http://localhost:3000/game/getAllGames"); 

        setGames(data.data.data);
        console.log(data.data.data);
        console.log(games);

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
            <div className="flex min-h-screen bg-gray-900 text-white">
                <Navbar />
                <div
                    className="flex-1 p-4 ml-64 transition-all duration-200 ease-in-out"
                >
                    <p className="text-4xl font-bold mb-8 text-center text-white">Library</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {games.map((game) => (
                            <GameCard
                                key={game.id} 
                                game={game}
                                onClick={handleGameCardClick}
                            />
                        ))}
                    </div>
            
    
                    {/* Tambahkan konten spesifik LibraryPage Anda di sini */}
                    {/* Contoh: Grid game cards, dll. */}
                </div>
            </div>
        );
}