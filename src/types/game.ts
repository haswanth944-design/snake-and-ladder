export type TeamId = 'girls' | 'boys';

export type QuestionDifficulty = 'Easy' | 'Medium' | 'Hard';

export type QuestionType = 'mcq' | 'text';

export interface Question {
  id: number;
  topic: string;
  difficulty: QuestionDifficulty;
  type: QuestionType;
  question: string;
  options?: string[]; // for mcq (4 options)
  correctAnswer: string;
  explanation: string;
}

export interface TeamColor {
  name: string;
  bg: string;
  border: string;
  ring: string;
  text: string;
  badgeBg: string;
  hex: string;
  accent: string;
}

export interface TeamStats {
  id: TeamId;
  name: string;
  color: TeamColor;
  position: number; // 0 (start) to 100
  marks: number;
  correctAnswers: number;
  attemptedQuestions: number;
}

export interface TurnHistoryItem {
  turnNumber: number;
  team: TeamId;
  question: Question;
  assignedMarks: number;
  userAnswer: string;
  isCorrect: boolean;
  diceRoll: number;
  startPos: number;
  endPos: number;
  climbedLadder: boolean;
  ladderFrom?: number;
  ladderTo?: number;
  bittenBySnake?: boolean;
  snakeFrom?: number;
  snakeTo?: number;
}

export interface Ladder {
  from: number;
  to: number;
}

export interface Snake {
  from: number; // Head square (higher number)
  to: number; // Tail square (lower number)
  color?: 'red' | 'green' | 'purple' | 'blue' | 'gold';
  name?: string;
}

export interface GameSettings {
  turnTimerSeconds: number; // e.g. 30, 45, 60, or 0 for unlimited
  matchDurationMinutes: number; // e.g. 15, 20, 30, or 0 for unlimited
  soundEnabled: boolean;
  autoRollDice: boolean;
}

export type TurnPhase =
  | 'answering' // Waiting for team to pick/type answer
  | 'feedback' // Showing if answer was correct/wrong + explanation
  | 'rolling' // Ready to roll or currently rolling dice
  | 'moving' // Animating cursor moving
  | 'ladder_climb' // Animating ladder ascent
  | 'snake_bite' // Animating snake descent
  | 'turn_end'; // Ready to pass turn to next team
