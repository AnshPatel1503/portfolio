// src/components/PokemonGame.jsx
import React, { useState } from 'react';
import { POKEMON_POOL } from '../data/pokemonData';
import PokemonCard from './PokemonCard';
import GameLog from './GameLog';

export default function PokemonGame() {
  const [playerDeck, setPlayerDeck] = useState([]);
  const [enemyDeck, setEnemyDeck] = useState([]);
  const [activePlayer, setActivePlayer] = useState(null);
  const [activeEnemy, setActiveEnemy] = useState(null);
  const [gameLog, setGameLog] = useState('Build your squad! Select 3 Pokemon cards.');
  const [gameState, setGameState] = useState('DECK_BUILDING'); 
  const [isAttacking, setIsAttacking] = useState(false);

  const handleSelectDeck = (pokemon) => {
    if (playerDeck.some(p => p.id === pokemon.id)) return;
    
    if (playerDeck.length < 3) {
      const updatedDeck = [...playerDeck, { ...pokemon, uid: Math.random() }];
      setPlayerDeck(updatedDeck);

      if (updatedDeck.length === 3) {
        const shuffled = [...POKEMON_POOL].sort(() => 0.5 - Math.random());
        const cpuDeck = shuffled.slice(0, 3).map(p => ({ ...p, uid: Math.random() }));
        setEnemyDeck(cpuDeck);
        
        setActivePlayer({ ...updatedDeck[0] });
        setActiveEnemy({ ...cpuDeck[0] });
        setGameState('BATTLE');
        setGameLog('Match verified. Execute attack to begin combat!');
      }
    }
  };

  const handleAttack = () => {
    if (gameState !== 'BATTLE' || isAttacking || !activePlayer || !activeEnemy) return;
    setIsAttacking(true);

    let damage = activePlayer.atk;
    if (activePlayer.type === 'Electric' && activeEnemy.type === 'Water') damage = Math.floor(damage * 1.5);
    if (activePlayer.type === 'Fire' && activeEnemy.type === 'Grass') damage = Math.floor(damage * 1.5);

    const nextEnemyHp = Math.max(0, activeEnemy.hp - damage);
    const updatedEnemy = { ...activeEnemy, hp: nextEnemyHp };
    setActiveEnemy(updatedEnemy);
    setGameLog(`Your ${activePlayer.name} dealt ${damage} DMG to ${activeEnemy.name}!`);

    if (nextEnemyHp <= 0) {
      const remainingEnemyDeck = enemyDeck.slice(1);
      setEnemyDeck(remainingEnemyDeck);
      
      if (remainingEnemyDeck.length === 0) {
        setTimeout(() => {
          setGameState('END');
          setGameLog('VICTORY! All CPU opponents defeated! 🏆');
          setIsAttacking(false);
        }, 800);
        return;
      } else {
        setTimeout(() => {
          setActiveEnemy({ ...remainingEnemyDeck[0] });
          setGameLog(`Enemy ${activeEnemy.name} fainted! CPU deployed ${remainingEnemyDeck[0].name}.`);
          setIsAttacking(false);
        }, 1000);
        return;
      }
    }

    setTimeout(() => {
      let enemyDamage = updatedEnemy.atk;
      if (updatedEnemy.type === 'Psychic') enemyDamage += 12;

      const nextPlayerHp = Math.max(0, activePlayer.hp - enemyDamage);
      const updatedPlayer = { ...activePlayer, hp: nextPlayerHp };
      setActivePlayer(updatedPlayer);
      setGameLog(`CPU ${updatedEnemy.name} counter-attacked: Dealt ${enemyDamage} DMG to ${activePlayer.name}!`);

      if (nextPlayerHp <= 0) {
        const remainingPlayerDeck = playerDeck.slice(1);
        setPlayerDeck(remainingPlayerDeck);

        if (remainingPlayerDeck.length === 0) {
          setGameState('END');
          setGameLog('GAME OVER: All your squad modules fainted. 💀');
        } else {
          setActivePlayer({ ...remainingPlayerDeck[0] });
          setGameLog(`Your ${activePlayer.name} fainted! Deploying ${remainingPlayerDeck[0].name}.`);
        }
      }
      setIsAttacking(false);
    }, 1200);
  };

  const restartGame = () => {
    setPlayerDeck([]);
    setEnemyDeck([]);
    setActivePlayer(null);
    setActiveEnemy(null);
    setGameState('DECK_BUILDING');
    setGameLog('Build your squad! Select 3 Pokemon cards.');
  };

  return (
    <div className="w-full bg-slate-900 text-slate-100 flex flex-col justify-between p-6 rounded-3xl border border-slate-800 shadow-2xl">
      <header className="text-center flex flex-col gap-2">
        <h4 className="text-2xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
          POKÉMON MINI BATTLE ARENA
        </h4>
        <GameLog log={gameLog} />
      </header>

      {gameState === 'DECK_BUILDING' && (
        <main className="w-full my-6 flex flex-col items-center">
          <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-4">
            Selected: <span className="text-amber-400 font-black">{playerDeck.length}</span> / 3
          </p>
          <div className="flex flex-wrap gap-4 justify-center items-center">
            {POKEMON_POOL.map((poke) => {
              const isSelected = playerDeck.some(p => p.id === poke.id);
              return (
                <div 
                  key={poke.id} 
                  onClick={() => handleSelectDeck(poke)}
                  className={`transform transition duration-300 ${isSelected ? 'pointer-events-none' : 'hover:-translate-y-2 cursor-pointer'}`}
                >
                  <PokemonCard pokemon={poke} isFainted={isSelected} />
                </div>
              );
            })}
          </div>
        </main>
      )}

      {gameState === 'BATTLE' && (
        <main className="w-full my-6 flex flex-col sm:flex-row items-center justify-around gap-6">
          <div className="flex flex-col items-center gap-2 bg-slate-800/40 p-4 rounded-2xl border border-slate-700/30">
            <span className="text-[9px] font-black tracking-widest text-green-400 uppercase">Your Active Mon</span>
            <PokemonCard pokemon={activePlayer} isBattleView />
          </div>

          <div>
            <button 
              onClick={handleAttack}
              disabled={isAttacking}
              className={`font-black text-xs tracking-wider px-6 py-3.5 rounded-xl shadow-lg transform transition-all duration-150 uppercase
                ${isAttacking 
                  ? 'bg-slate-800 text-slate-500 scale-95 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white active:translate-y-0.5'
                }`}
            >
              {isAttacking ? 'Processing...' : '💥 ATTACK'}
            </button>
          </div>

          <div className="flex flex-col items-center gap-2 bg-slate-800/40 p-4 rounded-2xl border border-slate-700/30">
            <span className="text-[9px] font-black tracking-widest text-red-400 uppercase">Enemy CPU</span>
            <PokemonCard pokemon={activeEnemy} isBattleView />
          </div>
        </main>
      )}

      {gameState === 'END' && (
        <main className="text-center my-8 flex flex-col items-center">
          <button 
            onClick={restartGame}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs tracking-wider px-8 py-3 rounded-xl transition transform hover:scale-105 uppercase"
          >
            Play Again
          </button>
        </main>
      )}
    </div>
  );
}
