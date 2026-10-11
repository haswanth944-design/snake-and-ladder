/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  TeamStats,
  TeamId,
  Question,
  GameSettings,
  TurnPhase,
  TurnHistoryItem,
} from './types/game';
import { DWDM_QUESTIONS, getShuffledQuestions } from './data/dwdmQuestions';
import { getLadderForSquare } from './data/ladders';
import { getSnakeForSquare } from './data/snakes';
import { getTwoRandomDistinctColors } from './utils/colors';
import { soundManager } from './utils/audio';

import { Header } from './components/Header';
import { GameBoard } from './components/GameBoard';
import { ScoreBoard } from './components/ScoreBoard';
import { QuestionCard } from './components/QuestionCard';
import { DiceRoller } from './components/DiceRoller';
import { WelcomeScreen } from './components/WelcomeScreen';
import { ResultsModal } from './components/ResultsModal';
import { ArrowRight, Trophy, Sparkles } from 'lucide-react';

const STORAGE_KEY = 'DWDM_SNAKE_LADDER_GAME_STATE_V1';

export default function App() {
  // Game Phase: 'welcome' | 'playing' | 'gameover'
  const [gamePhase, setGamePhase] = useState<'welcome' | 'playing' | 'gameover'>('welcome');

  // Match Settings
  const [settings, setSettings] = useState<GameSettings>({
    turnTimerSeconds: 30,
    matchDurationMinutes: 0, // 0 = unlimited / to finish
    soundEnabled: true,
    autoRollDice: false,
  });

  // Team configurations
  const [initialColors, setInitialColors] = useState(() => getTwoRandomDistinctColors());
  const [girls, setGirls] = useState<TeamStats>({
    id: 'girls',
    name: 'Girls',
    color: initialColors[0],
    position: 0,
    marks: 0,
    correctAnswers: 0,
    attemptedQuestions: 0,
  });

  const [boys, setBoys] = useState<TeamStats>({
    id: 'boys',
    name: 'Boys',
    color: initialColors[1],
    position: 0,
    marks: 0,
    correctAnswers: 0,
    attemptedQuestions: 0,
  });

  // Turn management: Girls take the first turn by default
  const [currentTeam, setCurrentTeam] = useState<TeamId>('girls');
  const [turnPhase, setTurnPhase] = useState<TurnPhase>('answering');
  const [turnCount, setTurnCount] = useState<number>(1);

  // Question selection (sequential order Q1 to Q160)
  const [questionPool, setQuestionPool] = useState<Question[]>(() => DWDM_QUESTIONS);
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [assignedMarks, setAssignedMarks] = useState<number>(() => Math.floor(Math.random() * 6) + 1);

  // Dice and Board Animation
  const [diceRoll, setDiceRoll] = useState<number | null>(null);
  const [animatingSquare, setAnimatingSquare] = useState<{ team: TeamId; square: number } | null>(null);
  const [activeLadder, setActiveLadder] = useState<{ from: number; to: number } | null>(null);
  const [activeSnake, setActiveSnake] = useState<{ from: number; to: number } | null>(null);
  const [movementFeedback, setMovementFeedback] = useState<string | null>(null);

  // Match Timer
  const [matchSecondsLeft, setMatchSecondsLeft] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // History & Results
  const [turnHistory, setTurnHistory] = useState<TurnHistoryItem[]>([]);
  const [winner, setWinner] = useState<'girls' | 'boys' | 'draw'>('draw');
  const [winReason, setWinReason] = useState<string>('');

  // Active question
  const currentQuestion = questionPool[questionIndex] || questionPool[0];

  // Try recovering from localStorage on first mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.gamePhase === 'playing') {
          setGamePhase(parsed.gamePhase);
          setSettings(parsed.settings);
          setGirls(parsed.girls);
          setBoys(parsed.boys);
          setCurrentTeam(parsed.currentTeam);
          setTurnPhase(parsed.turnPhase);
          setTurnCount(parsed.turnCount);
          setQuestionIndex(parsed.questionIndex);
          setAssignedMarks(parsed.assignedMarks);
          setMatchSecondsLeft(parsed.matchSecondsLeft);
          setTurnHistory(parsed.turnHistory || []);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  // Save state on change
  useEffect(() => {
    if (gamePhase === 'playing') {
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            gamePhase,
            settings,
            girls,
            boys,
            currentTeam,
            turnPhase,
            turnCount,
            questionIndex,
            assignedMarks,
            matchSecondsLeft,
            turnHistory,
          })
        );
      } catch {
        // ignore
      }
    }
  }, [
    gamePhase,
    settings,
    girls,
    boys,
    currentTeam,
    turnPhase,
    turnCount,
    questionIndex,
    assignedMarks,
    matchSecondsLeft,
    turnHistory,
  ]);

  // Handle Match Timer Expiry (Rule 11)
  const handleMatchTimeExpired = useCallback(() => {
    let matchWinner: 'girls' | 'boys' | 'draw' = 'draw';
    let reason = '';

    if (girls.position > boys.position) {
      matchWinner = 'girls';
      reason = `Match time expired! Girls reached square ${girls.position} vs Boys at square ${boys.position}.`;
    } else if (boys.position > girls.position) {
      matchWinner = 'boys';
      reason = `Match time expired! Boys reached square ${boys.position} vs Girls at square ${girls.position}.`;
    } else {
      // Positions equal -> compare total marks
      if (girls.marks > boys.marks) {
        matchWinner = 'girls';
        reason = `Tied on square ${girls.position}! Girls won with ${girls.marks} marks vs Boys with ${boys.marks} marks.`;
      } else if (boys.marks > girls.marks) {
        matchWinner = 'boys';
        reason = `Tied on square ${boys.position}! Boys won with ${boys.marks} marks vs Girls with ${girls.marks} marks.`;
      } else {
        matchWinner = 'draw';
        reason = `Both teams tied at square ${girls.position} and identical ${girls.marks} marks!`;
      }
    }

    setWinner(matchWinner);
    setWinReason(reason);
    setGamePhase('gameover');
    localStorage.removeItem(STORAGE_KEY);
  }, [girls.position, boys.position, girls.marks, boys.marks]);

  // Match countdown timer
  useEffect(() => {
    if (gamePhase !== 'playing' || isPaused || matchSecondsLeft === null) return;

    if (matchSecondsLeft <= 0) {
      setTimeout(() => {
        handleMatchTimeExpired();
      }, 0);
      return;
    }

    const timer = setInterval(() => {
      setMatchSecondsLeft((prev) => {
        if (prev === null) return null;
        if (prev <= 1) {
          clearInterval(timer);
          setTimeout(() => {
            handleMatchTimeExpired();
          }, 0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gamePhase, isPaused, matchSecondsLeft, handleMatchTimeExpired]);

  // Reshuffle Colors in Welcome Screen
  const handleShuffleColors = () => {
    const [c1, c2] = getTwoRandomDistinctColors();
    setInitialColors([c1, c2]);
    setGirls((prev) => ({ ...prev, color: c1 }));
    setBoys((prev) => ({ ...prev, color: c2 }));
  };

  // Start new match
  const handleStartGame = () => {
    // Generate fresh distinct random colors
    const [c1, c2] = getTwoRandomDistinctColors();

    setGirls({
      id: 'girls',
      name: 'Girls',
      color: c1,
      position: 0,
      marks: 0,
      correctAnswers: 0,
      attemptedQuestions: 0,
    });

    setBoys({
      id: 'boys',
      name: 'Boys',
      color: c2,
      position: 0,
      marks: 0,
      correctAnswers: 0,
      attemptedQuestions: 0,
    });

    setQuestionPool(DWDM_QUESTIONS);
    setQuestionIndex(0);
    setAssignedMarks(Math.floor(Math.random() * 6) + 1);
    setCurrentTeam('girls'); // Girls take first turn by default
    setTurnPhase('answering');
    setTurnCount(1);
    setDiceRoll(null);
    setAnimatingSquare(null);
    setActiveLadder(null);
    setActiveSnake(null);
    setMovementFeedback(null);
    setTurnHistory([]);

    if (settings.matchDurationMinutes > 0) {
      setMatchSecondsLeft(settings.matchDurationMinutes * 60);
    } else {
      setMatchSecondsLeft(null);
    }

    setIsPaused(false);
    setGamePhase('playing');
    localStorage.removeItem(STORAGE_KEY);
  };

  // Reset/Restart match with confirmation
  const handleRestartMatch = () => {
    localStorage.removeItem(STORAGE_KEY);
    handleStartGame();
  };

  // Answer Submission Handler
  const handleAnswerSubmit = (chosenAnswer: string, isCorrect: boolean) => {
    const activeTeamStats = currentTeam === 'girls' ? girls : boys;
    const startPos = activeTeamStats.position;

    // Update attempts & marks
    if (isCorrect) {
      // Award assigned marks to the team
      if (currentTeam === 'girls') {
        setGirls((prev) => ({
          ...prev,
          marks: prev.marks + assignedMarks,
          correctAnswers: prev.correctAnswers + 1,
          attemptedQuestions: prev.attemptedQuestions + 1,
        }));
      } else {
        setBoys((prev) => ({
          ...prev,
          marks: prev.marks + assignedMarks,
          correctAnswers: prev.correctAnswers + 1,
          attemptedQuestions: prev.attemptedQuestions + 1,
        }));
      }

      setTurnPhase('rolling');
    } else {
      // Wrong Answer: award 0 marks, record attempt, cursor stays in place
      if (currentTeam === 'girls') {
        setGirls((prev) => ({
          ...prev,
          attemptedQuestions: prev.attemptedQuestions + 1,
        }));
      } else {
        setBoys((prev) => ({
          ...prev,
          attemptedQuestions: prev.attemptedQuestions + 1,
        }));
      }

      // Record in history
      setTurnHistory((prev) => [
        ...prev,
        {
          turnNumber: turnCount,
          team: currentTeam,
          question: currentQuestion,
          assignedMarks,
          userAnswer: chosenAnswer,
          isCorrect: false,
          diceRoll: 0,
          startPos,
          endPos: startPos,
          climbedLadder: false,
        },
      ]);

      setTurnPhase('feedback');
    }
  };

  // Turn Timeout Handler
  const handleTimeExpired = () => {
    handleAnswerSubmit('(Time Expired)', false);
  };

  // Dice Roll Completed Handler
  const handleRollComplete = (roll: number) => {
    setDiceRoll(roll);
    setTurnPhase('moving');

    const activeTeamStats = currentTeam === 'girls' ? girls : boys;
    const startPos = activeTeamStats.position;
    const targetPos = startPos + roll;

    // Exact roll to land on 100 rule
    if (targetPos > 100) {
      // Overshoot leaves cursor in place!
      soundManager.playWrong();
      setMovementFeedback(
        `Overshot square 100! Rolled ${roll}, needed exact ${100 - startPos}. Cursor stays on ${startPos}.`
      );

      // Record history
      setTurnHistory((prev) => [
        ...prev,
        {
          turnNumber: turnCount,
          team: currentTeam,
          question: currentQuestion,
          assignedMarks,
          userAnswer: currentQuestion.correctAnswer,
          isCorrect: true,
          diceRoll: roll,
          startPos,
          endPos: startPos,
          climbedLadder: false,
        },
      ]);

      setTimeout(() => {
        setTurnPhase('turn_end');
      }, 1500);
      return;
    }

    // Stepped animated movement square by square
    let stepCurrent = startPos;
    const stepInterval = setInterval(() => {
      stepCurrent += 1;
      soundManager.playStep();
      setAnimatingSquare({ team: currentTeam, square: stepCurrent });

      if (stepCurrent >= targetPos) {
        clearInterval(stepInterval);
        setAnimatingSquare(null);

        // Update real position
        if (currentTeam === 'girls') {
          setGirls((prev) => ({ ...prev, position: targetPos }));
        } else {
          setBoys((prev) => ({ ...prev, position: targetPos }));
        }

        // Check for ladder or snake
        const ladder = getLadderForSquare(targetPos);
        const snake = getSnakeForSquare(targetPos);

        if (ladder) {
          // Trigger Ladder Climb
          setTurnPhase('ladder_climb');
          setActiveLadder(ladder);
          soundManager.playLadder();
          setMovementFeedback(
            `🪜 AWESOME! Landed on ladder at square ${ladder.from} ➔ Climbed up to square ${ladder.to}!`
          );

          setTimeout(() => {
            // Move cursor to ladder destination
            if (currentTeam === 'girls') {
              setGirls((prev) => ({ ...prev, position: ladder.to }));
            } else {
              setBoys((prev) => ({ ...prev, position: ladder.to }));
            }

            // Record in history
            setTurnHistory((prev) => [
              ...prev,
              {
                turnNumber: turnCount,
                team: currentTeam,
                question: currentQuestion,
                assignedMarks,
                userAnswer: currentQuestion.correctAnswer,
                isCorrect: true,
                diceRoll: roll,
                startPos,
                endPos: ladder.to,
                climbedLadder: true,
                ladderFrom: ladder.from,
                ladderTo: ladder.to,
              },
            ]);

            // Check if climbed ladder to win (though ladders don't go to 100, just in case)
            if (ladder.to === 100) {
              handleWin(currentTeam, `Reached square 100 via ladder ascent!`);
            } else {
              setTurnPhase('turn_end');
            }
          }, 1400);
        } else if (snake) {
          // Trigger Snake Bite & Slide Down!
          setTurnPhase('snake_bite');
          setActiveSnake(snake);
          soundManager.playSnake();
          setMovementFeedback(
            `🐍 OH NO! Bitten by a snake at square ${snake.from} ➔ Slid down to square ${snake.to}!`
          );

          setTimeout(() => {
            // Move cursor down to snake tail destination
            if (currentTeam === 'girls') {
              setGirls((prev) => ({ ...prev, position: snake.to }));
            } else {
              setBoys((prev) => ({ ...prev, position: snake.to }));
            }

            // Record in history
            setTurnHistory((prev) => [
              ...prev,
              {
                turnNumber: turnCount,
                team: currentTeam,
                question: currentQuestion,
                assignedMarks,
                userAnswer: currentQuestion.correctAnswer,
                isCorrect: true,
                diceRoll: roll,
                startPos,
                endPos: snake.to,
                climbedLadder: false,
                bittenBySnake: true,
                snakeFrom: snake.from,
                snakeTo: snake.to,
              },
            ]);

            setTurnPhase('turn_end');
          }, 1400);
        } else {
          // No ladder
          setMovementFeedback(`Moved forward ${roll} square${roll > 1 ? 's' : ''} to square ${targetPos}!`);

          // Record in history
          setTurnHistory((prev) => [
            ...prev,
            {
              turnNumber: turnCount,
              team: currentTeam,
              question: currentQuestion,
              assignedMarks,
              userAnswer: currentQuestion.correctAnswer,
              isCorrect: true,
              diceRoll: roll,
              startPos,
              endPos: targetPos,
              climbedLadder: false,
            },
          ]);

          // Check for win
          if (targetPos === 100) {
            handleWin(currentTeam, `Landed exactly on Square 100!`);
          } else {
            setTurnPhase('turn_end');
          }
        }
      }
    }, 180);
  };

  // Winning Handler (Rule 10)
  const handleWin = (winningTeam: TeamId, reason: string) => {
    setWinner(winningTeam);
    setWinReason(
      `${winningTeam === 'girls' ? girls.name : boys.name} reached Square 100! ${reason}`
    );
    setGamePhase('gameover');
    localStorage.removeItem(STORAGE_KEY);
  };

  // Advance to Next Turn
  const handleNextTurn = () => {
    soundManager.playClick();
    setActiveLadder(null);
    setActiveSnake(null);
    setMovementFeedback(null);
    setDiceRoll(null);

    // Switch team
    setCurrentTeam((prev) => (prev === 'girls' ? 'boys' : 'girls'));
    setTurnCount((prev) => prev + 1);

    // Circulate to next question in sequential order (Q1 -> Q160 -> Q1)
    setQuestionIndex((prev) => {
      const nextIdx = prev + 1;
      if (nextIdx >= questionPool.length) {
        return 0; // wrap around sequentially to the beginning
      }
      return nextIdx;
    });

    // Assign new random marks between 1 and 6 (Rule 2)
    setAssignedMarks(Math.floor(Math.random() * 6) + 1);

    // Reset turn phase to answering
    setTurnPhase('answering');
  };

  const activeTeamStats = currentTeam === 'girls' ? girls : boys;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Welcome Screen Phase */}
      {gamePhase === 'welcome' && (
        <WelcomeScreen
          girlsColor={initialColors[0]}
          boysColor={initialColors[1]}
          onShuffleColors={handleShuffleColors}
          settings={settings}
          onUpdateSettings={(newS) => setSettings((prev) => ({ ...prev, ...newS }))}
          onStartGame={handleStartGame}
        />
      )}

      {/* Main Game Screen Phase */}
      {gamePhase === 'playing' && (
        <>
          <Header
            settings={settings}
            onUpdateSettings={(newS) => setSettings((prev) => ({ ...prev, ...newS }))}
            matchTimeLeftSeconds={matchSecondsLeft}
            isPaused={isPaused}
            onTogglePause={() => setIsPaused((prev) => !prev)}
            onRestartGame={handleRestartMatch}
          />

          <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-5 flex flex-col lg:flex-row gap-5 items-start">
            {/* Left Column: Snake & Ladder Game Board */}
            <div className="w-full lg:w-[55%] flex flex-col gap-3">
              <GameBoard
                girls={girls}
                boys={boys}
                currentTeam={currentTeam}
                activeLadder={activeLadder}
                activeSnake={activeSnake}
                animatingSquare={animatingSquare}
              />

              {/* Movement / Ladder announcement toast */}
              {movementFeedback && (
                <div className="p-3 rounded-xl bg-amber-500/15 border border-amber-400/40 text-amber-200 text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md animate-fade-in">
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{movementFeedback}</span>
                </div>
              )}
            </div>

            {/* Right Column: Scorecards, Question, Dice Roller */}
            <div className="w-full lg:w-[45%] flex flex-col gap-4">
              {/* Dual Team Scorecards */}
              <ScoreBoard girls={girls} boys={boys} currentTeam={currentTeam} />

              {/* Paused Overlay Notice */}
              {isPaused && (
                <div className="p-4 rounded-2xl bg-amber-950/80 border border-amber-500 text-amber-200 text-center font-bold text-sm">
                  ⏸ Match is Paused. Click Resume in the header bar to continue!
                </div>
              )}

              {/* Question Card */}
              {!isPaused && (
                <QuestionCard
                  question={currentQuestion}
                  assignedMarks={assignedMarks}
                  currentTeam={activeTeamStats}
                  turnPhase={turnPhase}
                  turnTimerSeconds={settings.turnTimerSeconds}
                  onAnswerSubmit={handleAnswerSubmit}
                  onTimeExpired={handleTimeExpired}
                  isPaused={isPaused}
                />
              )}

              {/* Dice Roller (shown when answer was correct) */}
              {!isPaused && turnPhase === 'rolling' && (
                <DiceRoller
                  onRollComplete={handleRollComplete}
                  disabled={turnPhase !== 'rolling'}
                  autoRoll={settings.autoRollDice}
                  teamColorHex={activeTeamStats.color.hex}
                  currentPosition={activeTeamStats.position}
                />
              )}

              {/* Next Turn Button */}
              {!isPaused && (turnPhase === 'feedback' || turnPhase === 'turn_end') && (
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={handleNextTurn}
                    className="w-full py-3.5 px-6 rounded-2xl font-black text-sm sm:text-base text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:to-purple-500 shadow-xl shadow-indigo-600/30 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>
                      Pass Turn to{' '}
                      <strong>{currentTeam === 'girls' ? boys.name : girls.name}</strong>
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </main>
        </>
      )}

      {/* Results Modal */}
      {gamePhase === 'gameover' && (
        <ResultsModal
          girls={girls}
          boys={boys}
          winner={winner}
          winReason={winReason}
          turnHistory={turnHistory}
          onPlayAgain={handleStartGame}
        />
      )}
    </div>
  );
}
