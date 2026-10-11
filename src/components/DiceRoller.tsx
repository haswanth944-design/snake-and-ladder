import React, { useState, useEffect } from 'react';
import { soundManager } from '../utils/audio';
import { Dices, Sparkles } from 'lucide-react';

interface DiceRollerProps {
  onRollComplete: (roll: number) => void;
  disabled?: boolean;
  autoRoll?: boolean;
  targetDiceValue?: number; // Pre-determined or determined upon roll
  teamColorHex?: string;
  currentPosition?: number;
}

export const DiceRoller: React.FC<DiceRollerProps> = ({
  onRollComplete,
  disabled = false,
  autoRoll = false,
  targetDiceValue,
  teamColorHex = '#4f46e5',
  currentPosition = 0,
}) => {
  const [displayValue, setDisplayValue] = useState<number>(1);
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [hasRolled, setHasRolled] = useState<boolean>(false);

  const startRolling = () => {
    if (disabled || isRolling || hasRolled) return;

    setIsRolling(true);
    soundManager.playDiceRoll();

    const finalRoll =
      targetDiceValue || Math.floor(Math.random() * 6) + 1;

    let rollTicks = 0;
    const maxTicks = 12;

    const interval = setInterval(() => {
      rollTicks++;
      const randomFace = Math.floor(Math.random() * 6) + 1;
      setDisplayValue(randomFace);

      if (rollTicks >= maxTicks) {
        clearInterval(interval);
        setDisplayValue(finalRoll);
        setIsRolling(false);
        setHasRolled(true);
        setTimeout(() => {
          onRollComplete(finalRoll);
        }, 0);
      }
    }, 70);
  };

  useEffect(() => {
    if (autoRoll && !hasRolled && !disabled) {
      const timer = setTimeout(() => {
        startRolling();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [autoRoll, hasRolled, disabled]);

  // Render dots on the dice face
  const renderPips = (val: number) => {
    // 3x3 grid positioning for classic dice pips
    const pipsPositions: Record<number, number[]> = {
      1: [4],
      2: [0, 8],
      3: [0, 4, 8],
      4: [0, 2, 6, 8],
      5: [0, 2, 4, 6, 8],
      6: [0, 2, 3, 5, 6, 8],
    };

    const activeIndices = pipsPositions[val] || [4];

    return (
      <div className="grid grid-cols-3 grid-rows-3 w-14 h-14 p-2 bg-white rounded-xl shadow-lg border-2 border-slate-300 transform transition-all duration-150">
        {Array.from({ length: 9 }).map((_, idx) => (
          <div key={idx} className="flex items-center justify-center">
            {activeIndices.includes(idx) && (
              <div
                className="w-2.5 h-2.5 rounded-full shadow-inner"
                style={{ backgroundColor: teamColorHex }}
              />
            )}
          </div>
        ))}
      </div>
    );
  };

  const neededForWin = 100 - currentPosition;

  return (
    <div className="flex flex-col items-center justify-center gap-3 p-4 bg-slate-900/90 border border-slate-700 rounded-2xl shadow-xl">
      <div className="text-center">
        <span className="text-xs uppercase font-extrabold tracking-wider text-slate-400">
          Turn Movement Roll
        </span>
        <div className="text-[11px] text-slate-400">
          Roll 1–6 to move forward{' '}
          {neededForWin <= 6 && neededForWin > 0 && (
            <span className="text-amber-400 font-bold">
              (Need exact {neededForWin} to win!)
            </span>
          )}
        </div>
      </div>

      {/* Animated 3D-styled Dice */}
      <div
        className={`relative cursor-pointer transition-transform duration-200 ${
          isRolling
            ? 'animate-spin scale-110'
            : hasRolled
            ? 'scale-105 ring-4 ring-amber-400/80 rounded-xl'
            : 'hover:scale-105'
        }`}
        onClick={startRolling}
      >
        {renderPips(displayValue)}

        {isRolling && (
          <Sparkles className="absolute -top-2 -right-2 w-5 h-5 text-amber-400 animate-bounce" />
        )}
      </div>

      {/* Action Button */}
      {!hasRolled ? (
        <button
          type="button"
          onClick={startRolling}
          disabled={disabled || isRolling}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-extrabold text-sm text-white shadow-lg transition-all duration-200 cursor-pointer ${
            disabled || isRolling
              ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 hover:shadow-amber-500/30 active:scale-95'
          }`}
        >
          <Dices className={`w-4 h-4 ${isRolling ? 'animate-spin' : ''}`} />
          {isRolling ? 'Rolling...' : 'Roll Dice (1–6)'}
        </button>
      ) : (
        <div className="text-center">
          <div className="text-base font-black text-amber-400">
            Rolled a {displayValue}!
          </div>
          <div className="text-[11px] text-slate-400">
            Advancing {displayValue} square{displayValue > 1 ? 's' : ''} on the board
          </div>
        </div>
      )}
    </div>
  );
};
