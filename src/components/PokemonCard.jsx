// src/components/PokemonCard.jsx
import React from 'react';

export default function PokemonCard({ pokemon, isBattleView = false, isFainted = false }) {
  if (!pokemon) return null;
  const hpPercent = (pokemon.hp / pokemon.maxHp) * 100;

  return (
    <div className={`w-44 h-64 bg-gradient-to-br ${pokemon.color} ${pokemon.shadow} rounded-2xl p-4 shadow-xl border border-white/20 flex flex-col justify-between relative overflow-hidden group transition duration-300 ${isFainted ? 'grayscale opacity-40 scale-95' : ''}`}>
      <div className="absolute -right-6 -top-6 w-20 h-20 bg-white/20 rounded-full blur-xl group-hover:scale-150 transition duration-500"></div>
      
      <div className="flex justify-between items-center z-10">
        <span className="font-extrabold text-sm tracking-wide text-white drop-shadow-md">{pokemon.name}</span>
        <span className="text-[10px] font-bold bg-black/30 text-white px-2 py-0.5 rounded-full uppercase tracking-wider">{pokemon.type}</span>
      </div>

      <div className="text-5xl text-center my-4 drop-shadow-2xl transform group-hover:scale-110 transition duration-300 z-10 select-none">
        {pokemon.img}
      </div>

      <div className="flex flex-col gap-2 z-10 bg-black/20 p-2 rounded-xl backdrop-blur-sm">
        {isBattleView && (
          <div className="w-full bg-black/40 h-2 rounded-full overflow-hidden p-[1px]">
            <div 
              style={{ width: `${hpPercent}%` }} 
              className={`h-full rounded-full transition-all duration-300 ${hpPercent > 50 ? 'bg-green-400' : hpPercent > 20 ? 'bg-yellow-400' : 'bg-red-500'}`}
            ></div>
          </div>
        )}
        <div className="flex justify-between items-center text-xs font-black text-white drop-shadow">
          <span>HP: {pokemon.hp}/{pokemon.maxHp}</span>
          <span>ATK: {pokemon.atk}</span>
        </div>
      </div>
    </div>
  );
}
