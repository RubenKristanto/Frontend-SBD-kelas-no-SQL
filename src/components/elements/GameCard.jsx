// src/components/GameCard.js
import React from 'react';

export default function GameCard({ game, onClick }) { // game adalah objek game, onClick adalah handler saat card diklik
    return (
        <div
        className="bg-gray-800 rounded-lg shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition duration-300"
        onClick={() => onClick(game)}
        >
            {/* <img src={game.imageUrl} alt={game.name} className="w-full h-48 object-cover" /> */}
            <div className="p-4">
                <h3 className="text-xl font-semibold mb-2 text-blue-400">{game.name}</h3>
                <p className="text-gray-400 text-sm">{game.genre}</p>
            </div>
        </div>
    );
}
