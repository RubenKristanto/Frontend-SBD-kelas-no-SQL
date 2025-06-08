// import swal from "sweetalert2";
// import axios from "axios";
// import Navbar from "../elements/Navbar.jsx";


// export default function LibraryPage() {
//     return (
//         <div className="flex min-h-screen">
//             <Navbar />
//             <div className="container">
//                 <h1 className="text-center text-white">Library</h1>
//                 <p className="text-center text-white">Coming Soon!</p>
//             </div>
//         </div>
//     );
// }

// src/pages/LibraryPage.jsx

import React from 'react';
// Pastikan path ke Navbar (yang Anda sebut Navigation) sudah benar
import Navbar from "../elements/Navbar.jsx"; // Pastikan ini mengarah ke file Navigation.jsx Anda

export default function LibraryPage() {


    
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
                <p className="text-4xl font-bold mb-8 text-center text-white">Library</p>
                <p className="text-left text-2xl font-bold mb-8 text-white">Total games: </p>

                {/* Tambahkan konten spesifik LibraryPage Anda di sini */}
                {/* Contoh: Grid game cards, dll. */}
            </div>
        </div>
    );
}