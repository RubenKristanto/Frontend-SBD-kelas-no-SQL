import swal from "sweetalert2";
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../elements/Navbar.jsx";


export default function LibraryPage() {
    const [games, setGames] = useState([{}]);
    
    const getData = async () => {
        try{
        const data = await axios.post("http://localhost:3000/games/getAllGames", {}); 

        setGames(data.data);
        console.log(data.data);
        console.log(games);

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
                    {/* <p className="text-left text-2xl font-bold mb-8 text-white">Total games: </p> */}
    
                    {/* Tambahkan konten spesifik LibraryPage Anda di sini */}
                    {/* Contoh: Grid game cards, dll. */}
                </div>
            </div>
        );
}