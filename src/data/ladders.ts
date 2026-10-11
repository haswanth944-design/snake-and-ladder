import { Ladder } from '../types/game';

/**
 * Ladders placed strategically on the 100-square board.
 * NOTE: As per project requirements, there are LADDERS ONLY. NO SNAKES!
 */
export const LADDERS: Ladder[] = [
  { from: 4, to: 25 },
  { from: 12, to: 33 },
  { from: 22, to: 44 },
  { from: 28, to: 55 },
  { from: 37, to: 66 },
  { from: 48, to: 72 },
  { from: 59, to: 80 },
  { from: 65, to: 87 },
  { from: 73, to: 93 },
  { from: 82, to: 97 },
];

export function getLadderForSquare(square: number): Ladder | undefined {
  return LADDERS.find((l) => l.from === square);
}
