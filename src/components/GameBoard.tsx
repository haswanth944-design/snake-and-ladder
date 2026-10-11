import React from 'react';
import { TeamStats, TeamId } from '../types/game';
import { LADDERS } from '../data/ladders';
import { SNAKES } from '../data/snakes';
import { getSquareCoords, getSquareBgColor } from '../utils/boardUtils';
import { LadderOverlay } from './LadderOverlay';
import { SnakeOverlay } from './SnakeOverlay';
import { Trophy, Sparkles } from 'lucide-react';

interface GameBoardProps {
  girls: TeamStats;
  boys: TeamStats;
  currentTeam: TeamId;
  activeLadder?: { from: number; to: number } | null;
  activeSnake?: { from: number; to: number } | null;
  animatingSquare?: { team: TeamId; square: number } | null;
}

export const GameBoard: React.FC<GameBoardProps> = ({
  girls,
  boys,
  currentTeam,
  activeLadder,
  activeSnake,
  animatingSquare,
}) => {
  // 100 squares: 100 down to 1
  const allSquares = Array.from({ length: 100 }, (_, i) => 100 - i);

  // Quick lookup for ladders
  const ladderStartMap = new Map<number, number>();
  const ladderEndMap = new Map<number, number>();
  LADDERS.forEach((l) => {
    ladderStartMap.set(l.from, l.to);
    ladderEndMap.set(l.to, l.from);
  });

  // Quick lookup for snakes
  const snakeHeadMap = new Map<number, number>();
  const snakeTailMap = new Map<number, number>();
  SNAKES.forEach((s) => {
    snakeHeadMap.set(s.from, s.to);
    snakeTailMap.set(s.to, s.from);
  });

  // Effective positions (use animating position if currently moving)
  const effectiveGirlsPos =
    animatingSquare && animatingSquare.team === 'girls'
      ? animatingSquare.square
      : girls.position;

  const effectiveBoysPos =
    animatingSquare && animatingSquare.team === 'boys'
      ? animatingSquare.square
      : boys.position;

  return (
    <div className="relative w-full aspect-square max-w-[620px] mx-auto select-none rounded-2xl p-2 bg-gradient-to-b from-slate-800 to-slate-900 shadow-2xl border-4 border-slate-700/80 flex flex-col">
      {/* Board Canvas Area */}
      <div className="relative flex-1 w-full h-full rounded-xl overflow-hidden bg-slate-100 grid grid-cols-10 grid-rows-10 border border-slate-300">
        {/* SVG Ladder Overlay */}
        <LadderOverlay activeLadder={activeLadder} />

        {/* SVG Snake Overlay */}
        <SnakeOverlay activeSnake={activeSnake} />

        {/* 100 Squares in 10x10 Grid */}
        {allSquares.map((sq) => {
          const coord = getSquareCoords(sq);
          const hasLadderStart = ladderStartMap.has(sq);
          const hasLadderEnd = ladderEndMap.has(sq);
          const ladderTarget = ladderStartMap.get(sq);

          const hasSnakeHead = snakeHeadMap.has(sq);
          const hasSnakeTail = snakeTailMap.has(sq);
          const snakeTarget = snakeHeadMap.get(sq);

          const isWinningSquare = sq === 100;

          // Check if either player is on this square
          const isGirlsHere = effectiveGirlsPos === sq;
          const isBoysHere = effectiveBoysPos === sq;
          const bothHere = isGirlsHere && isBoysHere;

          // Style based on coordinates in CSS grid
          // row 0 is top (row 1 in grid), col 0 is left (col 1 in grid)
          const gridStyle: React.CSSProperties = {
            gridRow: coord.row + 1,
            gridColumn: coord.col + 1,
          };

          return (
            <div
              key={sq}
              style={gridStyle}
              className={`relative flex flex-col justify-between p-0.5 sm:p-1 border border-slate-200/70 transition-colors duration-200 ${getSquareBgColor(
                sq
              )}`}
            >
              {/* Square Header: Number & Elements Indicators */}
              <div className="flex items-center justify-between leading-none w-full">
                <span
                  className={`text-[9px] sm:text-[11px] md:text-xs font-extrabold ${
                    isWinningSquare
                      ? 'text-amber-950 font-black scale-110'
                      : 'text-slate-600'
                  }`}
                >
                  {sq}
                </span>

                {isWinningSquare && (
                  <span className="flex items-center gap-0.5 px-1 py-0.2 rounded bg-amber-500 text-amber-950 text-[8px] font-black uppercase tracking-wider animate-bounce">
                    <Trophy className="w-2.5 h-2.5 text-amber-950" />
                    WIN
                  </span>
                )}

                {hasLadderStart && (
                  <span
                    className="flex items-center text-[7px] sm:text-[9px] font-bold text-emerald-800 bg-emerald-200/90 px-0.5 sm:px-1 rounded-sm shadow-xs"
                    title={`Ladder climbs to square ${ladderTarget}`}
                  >
                    🪜➔{ladderTarget}
                  </span>
                )}

                {hasSnakeHead && (
                  <span
                    className="flex items-center text-[7px] sm:text-[9px] font-bold text-rose-900 bg-rose-200/95 px-0.5 sm:px-1 rounded-sm shadow-xs animate-pulse"
                    title={`Snake drops down to square ${snakeTarget}`}
                  >
                    🐍➔{snakeTarget}
                  </span>
                )}

                {hasLadderEnd && (
                  <span
                    className="hidden sm:inline-block text-[7px] font-medium text-amber-700 bg-amber-100/80 px-0.5 rounded"
                    title={`Ladder top from square ${ladderEndMap.get(sq)}`}
                  >
                    ★ Top
                  </span>
                )}

                {hasSnakeTail && (
                  <span
                    className="hidden sm:inline-block text-[7px] font-medium text-rose-700 bg-rose-100/80 px-0.5 rounded"
                    title={`Snake tail from square ${snakeTailMap.get(sq)}`}
                  >
                    🐾 Tail
                  </span>
                )}
              </div>

              {/* Center decoration / special square emblems */}
              {isWinningSquare && (
                <div className="flex-1 flex items-center justify-center pointer-events-none">
                  <div className="text-center">
                    <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-amber-600 mx-auto animate-spin" />
                    <span className="hidden sm:block text-[9px] font-black text-amber-900 tracking-tight">
                      FINISH
                    </span>
                  </div>
                </div>
              )}

              {sq === 1 && (
                <div className="flex-1 flex items-center justify-center pointer-events-none">
                  <span className="text-[8px] sm:text-[10px] font-bold text-teal-800 bg-teal-200/60 px-1 py-0.5 rounded">
                    START
                  </span>
                </div>
              )}

              {/* Player Cursors / Tokens Container */}
              <div className="relative z-20 flex items-center justify-center gap-0.5 sm:gap-1 min-h-[14px] sm:min-h-[22px] mt-auto">
                {/* Girls Token */}
                {isGirlsHere && (
                  <div
                    className={`relative flex items-center justify-center w-4 h-4 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-full shadow-lg text-white font-extrabold text-[9px] sm:text-xs transition-transform duration-200 ${
                      girls.color.bg
                    } border-2 border-white ring-2 ${girls.color.ring} ${
                      currentTeam === 'girls'
                        ? 'scale-110 ring-4 animate-pulse'
                        : 'opacity-90'
                    }`}
                    style={{ backgroundColor: girls.color.hex }}
                    title={`Girls (Square ${sq})`}
                  >
                    <span>G</span>
                    {currentTeam === 'girls' && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-yellow-400 ring-1 ring-white animate-ping" />
                    )}
                  </div>
                )}

                {/* Boys Token */}
                {isBoysHere && (
                  <div
                    className={`relative flex items-center justify-center w-4 h-4 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-full shadow-lg text-white font-extrabold text-[9px] sm:text-xs transition-transform duration-200 ${
                      boys.color.bg
                    } border-2 border-white ring-2 ${boys.color.ring} ${
                      currentTeam === 'boys'
                        ? 'scale-110 ring-4 animate-pulse'
                        : 'opacity-90'
                    }`}
                    style={{ backgroundColor: boys.color.hex }}
                    title={`Boys (Square ${sq})`}
                  >
                    <span>B</span>
                    {currentTeam === 'boys' && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-yellow-400 ring-1 ring-white animate-ping" />
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Cute Wooden Banner matching reference image */}
      <div className="mt-2.5 mx-auto px-5 py-1.5 rounded-xl bg-gradient-to-r from-amber-800 via-amber-700 to-amber-800 border-2 border-amber-600/80 shadow-md text-amber-100 text-xs font-black tracking-wider flex items-center justify-center gap-2 select-none">
        <span>Learn</span>
        <span className="text-amber-400">•</span>
        <span>Answer</span>
        <span className="text-amber-400">•</span>
        <span>Climb to Victory!</span>
      </div>

      {/* Starting Yard / Basecamp (Position 0) */}
      {(girls.position === 0 || boys.position === 0) && (
        <div className="mt-2 py-1.5 px-3 rounded-xl bg-slate-800/90 border border-slate-700 flex items-center justify-between text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-400 uppercase text-[10px] tracking-wider">
              Starting Camp (Square 0):
            </span>
            <div className="flex items-center gap-2">
              {girls.position === 0 && (
                <span
                  className="px-2 py-0.5 rounded-full text-white font-bold text-[11px] shadow-sm flex items-center gap-1"
                  style={{ backgroundColor: girls.color.hex }}
                >
                  Girls at Base
                </span>
              )}
              {boys.position === 0 && (
                <span
                  className="px-2 py-0.5 rounded-full text-white font-bold text-[11px] shadow-sm flex items-center gap-1"
                  style={{ backgroundColor: boys.color.hex }}
                >
                  Boys at Base
                </span>
              )}
            </div>
          </div>
          <span className="text-[11px] text-slate-400 hidden sm:inline">
            Answer questions correctly & roll the dice to enter!
          </span>
        </div>
      )}
    </div>
  );
};
