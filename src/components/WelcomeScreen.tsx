import React from 'react';
import { GameSettings, TeamColor } from '../types/game';
import { soundManager } from '../utils/audio';
import {
  Sparkles,
  Trophy,
  Clock,
  Volume2,
  VolumeX,
  Shuffle,
  Play,
  HelpCircle,
  ShieldCheck,
  Dices,
  Flame,
} from 'lucide-react';

interface WelcomeScreenProps {
  girlsColor: TeamColor;
  boysColor: TeamColor;
  onShuffleColors: () => void;
  settings: GameSettings;
  onUpdateSettings: (newSettings: Partial<GameSettings>) => void;
  onStartGame: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  girlsColor,
  boysColor,
  onShuffleColors,
  settings,
  onUpdateSettings,
  onStartGame,
}) => {
  return (
    <div className="flex flex-col items-center max-w-4xl mx-auto px-4 py-6 sm:py-8 text-slate-100">
      {/* Title & Badge */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-400/30 text-indigo-300 font-extrabold text-xs uppercase tracking-wider mb-3 shadow-xs">
          <Flame className="w-4 h-4 text-orange-400" />
          Activity-Based Learning Session • College DWDM
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-2">
          DWDM Snake & Ladder Quiz
        </h1>
        <p className="text-base sm:text-xl font-bold bg-gradient-to-r from-amber-300 via-rose-300 to-indigo-300 bg-clip-text text-transparent">
          ⚡ Boys vs Girls Championship ⚡
        </p>
      </div>

      {/* Team Color Assignment Cards */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {/* Girls Card */}
        <div
          className="p-4 sm:p-5 rounded-2xl border-2 flex items-center justify-between shadow-lg relative overflow-hidden bg-slate-900/90"
          style={{ borderColor: girlsColor.hex }}
        >
          <div className="flex items-center gap-3 z-10">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg ring-4 ring-white/20"
              style={{ backgroundColor: girlsColor.hex }}
            >
              G
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-xl text-white">Girls</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-bold border border-amber-400/40">
                  Starts First
                </span>
              </div>
              <div className="text-xs text-slate-400">
                Random Color: <strong style={{ color: girlsColor.accent }}>{girlsColor.name}</strong>
              </div>
            </div>
          </div>
          <div
            className="w-20 h-20 rounded-full blur-2xl opacity-20 absolute -right-4 -bottom-4 pointer-events-none"
            style={{ backgroundColor: girlsColor.hex }}
          />
        </div>

        {/* Boys Card */}
        <div
          className="p-4 sm:p-5 rounded-2xl border-2 flex items-center justify-between shadow-lg relative overflow-hidden bg-slate-900/90"
          style={{ borderColor: boysColor.hex }}
        >
          <div className="flex items-center gap-3 z-10">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg ring-4 ring-white/20"
              style={{ backgroundColor: boysColor.hex }}
            >
              B
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-xl text-white">Boys</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-400/20 text-indigo-300 font-bold border border-indigo-400/40">
                  Second Turn
                </span>
              </div>
              <div className="text-xs text-slate-400">
                Random Color: <strong style={{ color: boysColor.accent }}>{boysColor.name}</strong>
              </div>
            </div>
          </div>
          <div
            className="w-20 h-20 rounded-full blur-2xl opacity-20 absolute -right-4 -bottom-4 pointer-events-none"
            style={{ backgroundColor: boysColor.hex }}
          />
        </div>
      </div>

      {/* Reshuffle Colors Button */}
      <div className="mb-6">
        <button
          type="button"
          onClick={() => {
            soundManager.playClick();
            onShuffleColors();
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700 text-xs font-bold transition-all shadow-sm cursor-pointer"
        >
          <Shuffle className="w-3.5 h-3.5 text-indigo-400" />
          Reroll Random Team Colors
        </button>
      </div>

      {/* Match Configuration Settings */}
      <div className="w-full p-5 rounded-2xl bg-slate-900/80 border border-slate-750 shadow-xl mb-6">
        <h3 className="text-sm uppercase font-extrabold tracking-wider text-slate-400 mb-4 flex items-center gap-2">
          <Clock className="w-4 h-4 text-indigo-400" /> Match Configuration & Timers
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Turn Timer */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Turn Answering Timer:
            </label>
            <div className="flex gap-1.5 flex-wrap">
              {[15, 30, 45, 60, 0].map((sec) => (
                <button
                  key={sec}
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    onUpdateSettings({ turnTimerSeconds: sec });
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    settings.turnTimerSeconds === sec
                      ? 'bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-400'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-750'
                  }`}
                >
                  {sec === 0 ? 'No Limit' : `${sec}s`}
                </button>
              ))}
            </div>
          </div>

          {/* Match Duration Timer */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Match Duration:
            </label>
            <div className="flex gap-1.5 flex-wrap">
              {[10, 15, 20, 30, 0].map((mins) => (
                <button
                  key={mins}
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    onUpdateSettings({ matchDurationMinutes: mins });
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    settings.matchDurationMinutes === mins
                      ? 'bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-400'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-750'
                  }`}
                >
                  {mins === 0 ? 'To Finish (100)' : `${mins}m`}
                </button>
              ))}
            </div>
          </div>

          {/* Audio & Auto-Roll Toggles */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Controls & Audio:
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  const next = !settings.soundEnabled;
                  soundManager.setEnabled(next);
                  onUpdateSettings({ soundEnabled: next });
                }}
                className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  settings.soundEnabled
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                {settings.soundEnabled ? (
                  <>
                    <Volume2 className="w-3.5 h-3.5" /> Sound On
                  </>
                ) : (
                  <>
                    <VolumeX className="w-3.5 h-3.5" /> Sound Off
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  onUpdateSettings({ autoRollDice: !settings.autoRollDice });
                }}
                className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  settings.autoRollDice
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-800 text-slate-300'
                }`}
              >
                <Dices className="w-3.5 h-3.5" />
                {settings.autoRollDice ? 'Auto-Roll' : 'Manual Roll'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Core Rules Guide Card */}
      <div className="w-full p-5 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 mb-8 space-y-2">
        <h4 className="font-bold text-slate-200 text-sm flex items-center gap-1.5 mb-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          ABL Tournament Gameplay Rules:
        </h4>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
          <li className="flex items-start gap-2">
            <span className="text-amber-400 font-bold">1.</span>
            <span>Girls take the 1st turn by default, then teams alternate turns.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-400 font-bold">2.</span>
            <span>Each question is randomly assigned <strong>1 to 6 marks</strong>.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-400 font-bold">3.</span>
            <span>
              <strong>Correct answer:</strong> earn question marks AND roll dice (1–6) to move ahead!
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-rose-400 font-bold">4.</span>
            <span>
              <strong>Wrong or Timeout:</strong> earn 0 marks & cursor stays in place.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-indigo-400 font-bold">5.</span>
            <span>
              <strong>Snakes & Ladders!</strong> Ladders shoot you upward 🪜; beware of snakes that slide you down 🐍!
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-400 font-bold">6.</span>
            <span>
              <strong>Winning:</strong> Reach square 100 with an exact roll, or lead if match timer ends!
            </span>
          </li>
        </ul>
      </div>

      {/* Start Button */}
      <button
        type="button"
        onClick={() => {
          soundManager.playCorrect();
          onStartGame();
        }}
        className="w-full max-w-md py-4 px-8 rounded-2xl font-black text-lg sm:text-xl text-white bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-600 hover:from-emerald-400 hover:via-teal-400 hover:to-indigo-500 shadow-xl shadow-emerald-500/20 active:scale-98 transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer group"
      >
        <Play className="w-6 h-6 fill-current group-hover:scale-110 transition-transform" />
        START DWDM BATTLE
      </button>
    </div>
  );
};
