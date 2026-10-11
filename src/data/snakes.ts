import { Snake } from '../types/game';

/**
 * Cute, short cartoon snakes inspired by classic activity-based learning game boards.
 * Reduced length: each snake spans approximately 1.5 to 2 rows (~15 to 20 squares)
 * instead of massive long drops.
 *
 * Color palette matches the reference board:
 * 1. Ruby Red (Top Left: 96 -> 78)
 * 2. Emerald Green (Top Right: 94 -> 74)
 * 3. Royal Purple (Mid Left: 58 -> 43)
 * 4. Ocean Blue (Mid Right: 63 -> 45)
 * 5. Sunny Gold (Bottom Center: 27 -> 8)
 *
 * Verified: ZERO overlap with any ladder bottom or top.
 */
export const SNAKES: Snake[] = [
  { from: 96, to: 78, color: 'red', name: 'Ruby the Red Snake' },
  { from: 94, to: 74, color: 'green', name: 'Oliver the Green Snake' },
  { from: 58, to: 43, color: 'purple', name: 'Pip the Purple Snake' },
  { from: 63, to: 45, color: 'blue', name: 'Barnaby the Blue Snake' },
  { from: 27, to: 8, color: 'gold', name: 'Sunny the Golden Snake' },
];

export function getSnakeForSquare(square: number): Snake | undefined {
  return SNAKES.find((s) => s.from === square);
}
