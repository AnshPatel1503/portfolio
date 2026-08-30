// src/components/GameLog.jsx
import React from 'react';

export default function GameLog({ log }) {
  return (
    <div className="w-full max-w-xl mx-auto my-2 bg-slate-950 border border-slate-800 rounded-xl p-3 shadow-inner text-center">
      <div className="flex items-center justify-center gap-2 mb-1">
        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
        <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Battle Engine Log</span>
      </div>
      <p className="text-sm font-semibold text-emerald-400 tracking-wide font-mono">{log}</p>
    </div>
  );
}
