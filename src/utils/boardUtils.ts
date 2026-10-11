/**
 * Board layout utilities for 10x10 serpentine Snake & Ladder
 */

export interface SquareCoord {
  square: number;
  row: number; // 0 (top) to 9 (bottom)
  col: number; // 0 (left) to 9 (right)
  xPercent: number; // Center X in percentage (5% to 95%)
  yPercent: number; // Center Y in percentage (5% to 95%)
}

/**
 * Returns grid row, col and center percentages for a given square (1 to 100)
 */
export function getSquareCoords(square: number): SquareCoord {
  const sq = Math.max(1, Math.min(100, square));
  const rowFromBottom = Math.floor((sq - 1) / 10);
  const row = 9 - rowFromBottom; // 0 is top row, 9 is bottom row

  const isLeftToRight = rowFromBottom % 2 === 0;
  const colInRow = (sq - 1) % 10;
  const col = isLeftToRight ? colInRow : 9 - colInRow;

  return {
    square: sq,
    row,
    col,
    xPercent: (col + 0.5) * 10,
    yPercent: (row + 0.5) * 10,
  };
}

/**
 * Vibrant, colorful tile palette ensuring high visibility and cheerful aesthetics
 */
const TILE_PALETTE = [
  'bg-amber-100 text-amber-950 border-amber-300/70',
  'bg-sky-100 text-sky-950 border-sky-300/70',
  'bg-emerald-100 text-emerald-950 border-emerald-300/70',
  'bg-purple-100 text-purple-950 border-purple-300/70',
  'bg-orange-100 text-orange-950 border-orange-300/70',
  'bg-rose-100 text-rose-950 border-rose-300/70',
  'bg-cyan-100 text-cyan-950 border-cyan-300/70',
  'bg-indigo-100 text-indigo-950 border-indigo-300/70',
];

export function getSquareBgColor(sq: number): string {
  if (sq === 100) {
    return 'bg-gradient-to-br from-amber-400 via-yellow-300 to-amber-500 text-amber-950 font-black shadow-inner border-amber-400';
  }
  if (sq === 1) {
    return 'bg-gradient-to-br from-emerald-200 to-teal-200 text-teal-950 font-bold border-teal-300';
  }

  const coord = getSquareCoords(sq);
  // Vibrant checker distribution
  const colorIndex = (coord.row * 3 + coord.col * 2 + sq) % TILE_PALETTE.length;
  return TILE_PALETTE[colorIndex];
}
