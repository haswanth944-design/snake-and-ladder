import React, { useState } from 'react';
import { GameSettings } from '../types/game';
import { soundManager } from '../utils/audio';
import {
  Volume2,
  VolumeX,
  RotateCcw,
  Pause,
  Play,
  HelpCircle,
  Timer,
  AlertCircle,
  X,
} from 'lucide-react';

interface HeaderProps {
  settings: GameSettings;
  onUpdateSettings: (s: Partial<GameSettings>) => void;
  matchTimeLeftSeconds?: number | null;
  isPaused: boolean;
  onTogglePause: () => void;
  onRestartGame: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  settings,
  onUpdateSettings,
  matchTimeLeftSeconds,
  isPaused,
  onTogglePause,
  onRestartGame,
}) => {
  const [showConfirmRestart, setShowConfirmRestart] = useState(false);
  const [showRulesModal, setShowRulesModal] = useState(false);

  const formatMatchTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <>
      <header className="w-full bg-slate-900/90 border-b border-slate-800 px-4 py-3 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          {/* Logo & Game Title */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-400 to-indigo-600 flex items-center justify-center text-white font-black text-sm shadow-md">
              🪜
            </div>
            <div>
              <h1 className="text-sm sm:text-base font-black text-white leading-tight">
                DWDM Snake & Ladder Quiz
              </h1>
              <span className="text-[10px] sm:text-[11px] font-bold text-amber-400">
                Boys vs Girls Championship
              </span>
            </div>
          </div>

          {/* Center: Match Countdown Timer (if configured) */}
          {matchTimeLeftSeconds !== null && matchTimeLeftSeconds !== undefined && (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-200 font-mono text-xs sm:text-sm font-extrabold shadow-inner">
              <Timer className="w-3.5 h-3.5 text-amber-400" />
              <span>Match: {formatMatchTime(matchTimeLeftSeconds)}</span>
            </div>
          )}

          {/* Action Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Rules Quick Help */}
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                setShowRulesModal(true);
              }}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
              title="Game Rules"
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            {/* Pause / Resume */}
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                onTogglePause();
              }}
              className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                isPaused
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500'
                  : 'bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700'
              }`}
              title={isPaused ? 'Resume Match' : 'Pause Match'}
            >
              {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
            </button>

            {/* Sound Toggle */}
            <button
              type="button"
              onClick={() => {
                const next = !settings.soundEnabled;
                soundManager.setEnabled(next);
                onUpdateSettings({ soundEnabled: next });
              }}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
              title={settings.soundEnabled ? 'Mute Sounds' : 'Unmute Sounds'}
            >
              {settings.soundEnabled ? (
                <Volume2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-500" />
              )}
            </button>

            {/* Restart Match */}
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                setShowConfirmRestart(true);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-800/60 text-xs font-bold transition-colors cursor-pointer"
              title="Restart Match"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </div>
      </header>

      {/* Confirmation Modal to prevent accidental restart */}
      {showConfirmRestart && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-slate-900 border border-slate-700 rounded-2xl p-5 shadow-2xl flex flex-col gap-4 text-slate-100">
            <div className="flex items-center gap-3 text-rose-400">
              <AlertCircle className="w-6 h-6 shrink-0" />
              <h3 className="font-bold text-base text-white">Restart Current Match?</h3>
            </div>
            <p className="text-xs text-slate-300">
              All ongoing team scores, cursor positions, and answered questions will be reset.
              Are you sure?
            </p>
            <div className="flex gap-2 justify-end mt-2">
              <button
                type="button"
                onClick={() => setShowConfirmRestart(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowConfirmRestart(false);
                  onRestartGame();
                }}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-black cursor-pointer shadow-md"
              >
                Yes, Reset Game
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rules Popup Modal */}
      {showRulesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl p-5 shadow-2xl flex flex-col gap-4 text-slate-100">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="font-black text-base text-white flex items-center gap-2">
                🪜 DWDM Tournament Rules
              </h3>
              <button
                type="button"
                onClick={() => setShowRulesModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <ul className="text-xs text-slate-300 space-y-2">
              <li>
                <strong>1. Turn Order:</strong> Girls take the 1st turn by default. Teams alternate after every turn.
              </li>
              <li>
                <strong>2. Question Value:</strong> Every question is worth a random 1–6 marks.
              </li>
              <li>
                <strong>3. Correct Answer:</strong> Awards marks, then unlocks the dice roll (1–6) to advance along the 100-square board.
              </li>
              <li>
                <strong>4. Wrong Answer / Timeout:</strong> Awards 0 marks and the team cursor stays in place.
              </li>
              <li>
                <strong>5. Snakes & Ladders:</strong> Landing on a ladder base transports you to the top 🪜! Beware of snakes, which bite and slide you down to their tail 🐍.
              </li>
              <li>
                <strong>6. Winning:</strong> The first team to land exactly on square 100 wins! (Overshoot stays in place). If match timer expires, the team farther along the board wins.
              </li>
            </ul>
            <button
              type="button"
              onClick={() => setShowRulesModal(false)}
              className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};
