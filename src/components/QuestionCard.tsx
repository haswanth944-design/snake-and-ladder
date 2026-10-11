import React, { useState, useEffect, useRef } from 'react';
import { Question, TeamStats, TurnPhase } from '../types/game';
import { soundManager } from '../utils/audio';
import {
  Clock,
  Award,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  Send,
  AlertTriangle,
} from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  assignedMarks: number;
  currentTeam: TeamStats;
  turnPhase: TurnPhase;
  turnTimerSeconds: number; // 0 for unlimited
  onAnswerSubmit: (answer: string, isCorrect: boolean) => void;
  onTimeExpired: () => void;
  isPaused?: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  assignedMarks,
  currentTeam,
  turnPhase,
  turnTimerSeconds,
  onAnswerSubmit,
  onTimeExpired,
  isPaused = false,
}) => {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [textAnswer, setTextAnswer] = useState<string>('');
  const [timeLeft, setTimeLeft] = useState<number>(
    turnTimerSeconds > 0 ? turnTimerSeconds : 30
  );
  const [submittedAnswer, setSubmittedAnswer] = useState<string | null>(null);

  // Store onTimeExpired callback in ref to prevent stale closures and effect churn
  const onTimeExpiredRef = useRef(onTimeExpired);
  useEffect(() => {
    onTimeExpiredRef.current = onTimeExpired;
  });

  // Reset local state when question changes
  useEffect(() => {
    setSelectedOption('');
    setTextAnswer('');
    setSubmittedAnswer(null);
    setTimeLeft(turnTimerSeconds > 0 ? turnTimerSeconds : 30);
  }, [question, turnTimerSeconds]);

  // Countdown timer effect: ticks once per second while answering
  useEffect(() => {
    if (turnPhase !== 'answering' || turnTimerSeconds <= 0 || isPaused) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          // Safely trigger expiration on next tick outside this component's render/state-update cycle
          setTimeout(() => {
            soundManager.playWrong();
            onTimeExpiredRef.current();
          }, 0);
          return 0;
        }
        if (prev <= 6 && prev > 1) {
          soundManager.playTick();
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [turnPhase, turnTimerSeconds, isPaused, question]);

  const handleSubmit = (chosenAnswer: string) => {
    if (turnPhase !== 'answering') return;

    const trimmed = chosenAnswer.trim();
    if (!trimmed) return;

    setSubmittedAnswer(trimmed);

    // Validate answer
    const isMcq = question.type === 'mcq';
    let isCorrect = false;

    if (isMcq) {
      isCorrect =
        trimmed.trim().toLowerCase() ===
        question.correctAnswer.trim().toLowerCase();
    } else {
      // For text answers, flexible normalized match
      const normInput = trimmed.toLowerCase().replace(/[^a-z0-9]/g, '');
      const normCorrect = question.correctAnswer
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '');
      isCorrect =
        normInput === normCorrect ||
        normCorrect.includes(normInput) && normInput.length >= 3;
    }

    if (isCorrect) {
      soundManager.playCorrect();
    } else {
      soundManager.playWrong();
    }

    onAnswerSubmit(trimmed, isCorrect);
  };

  const optionLetters = ['A', 'B', 'C', 'D'];
  const timerPercentage =
    turnTimerSeconds > 0 ? (timeLeft / turnTimerSeconds) * 100 : 100;

  const isAnswering = turnPhase === 'answering';
  const isPostSubmission = turnPhase !== 'answering';
  const isAnswerCorrect =
    submittedAnswer !== null &&
    (question.type === 'mcq'
      ? submittedAnswer.trim().toLowerCase() ===
        question.correctAnswer.trim().toLowerCase()
      : submittedAnswer
          .toLowerCase()
          .replace(/[^a-z0-9]/g, '') ===
        question.correctAnswer.toLowerCase().replace(/[^a-z0-9]/g, ''));

  return (
    <div className="flex flex-col w-full bg-slate-900 border border-slate-750 rounded-2xl shadow-xl overflow-hidden">
      {/* Top Header: Team Indicator, Timer, Marks */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 bg-slate-800/90 border-b border-slate-700">
        {/* Active Team Badge */}
        <div className="flex items-center gap-2">
          <span
            className="flex items-center justify-center w-7 h-7 rounded-full text-white font-black text-sm shadow-md"
            style={{ backgroundColor: currentTeam.color.hex }}
          >
            {currentTeam.id === 'girls' ? 'G' : 'B'}
          </span>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs uppercase font-extrabold tracking-wider text-slate-400">
                Current Turn:
              </span>
              <span
                className="text-sm font-black tracking-wide"
                style={{ color: currentTeam.color.accent }}
              >
                {currentTeam.name}
              </span>
            </div>
            <div className="text-[11px] text-slate-400">
              Square {currentTeam.position} / 100
            </div>
          </div>
        </div>

        {/* Question Marks & Topic Badges */}
        <div className="flex items-center gap-2">
          {/* Question Value (1-6 Marks) */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-300 font-extrabold text-xs shadow-xs">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Worth {assignedMarks} Mark{assignedMarks > 1 ? 's' : ''}</span>
          </div>

          {/* Turn Timer */}
          {turnTimerSeconds > 0 && (
            <div
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-mono font-bold text-xs border shadow-xs transition-colors duration-200 ${
                timeLeft <= 5
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500 animate-pulse'
                  : timeLeft <= 10
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500'
                  : 'bg-slate-700/80 text-slate-200 border-slate-600'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>{timeLeft}s</span>
            </div>
          )}
        </div>
      </div>

      {/* Visual Timer Progress Bar */}
      {turnTimerSeconds > 0 && (
        <div className="w-full h-1 bg-slate-800">
          <div
            className={`h-full transition-all duration-1000 ${
              timeLeft <= 5
                ? 'bg-rose-500'
                : timeLeft <= 10
                ? 'bg-amber-400'
                : 'bg-emerald-500'
            }`}
            style={{ width: `${Math.max(0, timerPercentage)}%` }}
          />
        </div>
      )}

      {/* Question Details Area */}
      <div className="p-4 sm:p-5 flex flex-col gap-4">
        {/* Topic, Question Number & Difficulty Badges */}
        <div className="flex items-center justify-between text-xs gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md font-black bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 text-[11px] shadow-sm tracking-wide">
              Q{question.id} of 160
            </span>
            <span className="px-2.5 py-0.5 rounded-md font-semibold bg-indigo-950/80 text-indigo-300 border border-indigo-700/50">
              {question.topic}
            </span>
          </div>
          <span
            className={`px-2 py-0.5 rounded-md font-bold text-[11px] ${
              question.difficulty === 'Easy'
                ? 'bg-emerald-950/70 text-emerald-400 border border-emerald-700/50'
                : question.difficulty === 'Medium'
                ? 'bg-amber-950/70 text-amber-400 border border-amber-700/50'
                : 'bg-rose-950/70 text-rose-400 border border-rose-700/50'
            }`}
          >
            {question.difficulty}
          </span>
        </div>

        {/* Question Text */}
        <h3 className="text-base sm:text-lg font-bold text-slate-100 leading-snug">
          {question.question}
        </h3>

        {/* Multiple Choice Options */}
        {question.type === 'mcq' && question.options && (
          <div className="grid grid-cols-1 gap-2.5 mt-1">
            {question.options.map((opt, idx) => {
              const letter = optionLetters[idx] || `${idx + 1}`;
              const isSelected = selectedOption === opt;
              const isCorrectAnswer =
                opt.trim().toLowerCase() ===
                question.correctAnswer.trim().toLowerCase();

              let buttonStyle =
                'bg-slate-800/80 hover:bg-slate-750 text-slate-200 border-slate-700';

              if (isPostSubmission) {
                if (isCorrectAnswer) {
                  buttonStyle =
                    'bg-emerald-950/80 border-emerald-500 text-emerald-100 ring-2 ring-emerald-500/50';
                } else if (isSelected && !isCorrectAnswer) {
                  buttonStyle =
                    'bg-rose-950/80 border-rose-500 text-rose-200 line-through opacity-75';
                } else {
                  buttonStyle =
                    'bg-slate-800/40 text-slate-500 border-slate-800 opacity-60';
                }
              } else if (isSelected) {
                buttonStyle =
                  'bg-indigo-600 text-white border-indigo-400 ring-2 ring-indigo-400';
              }

              return (
                <button
                  key={idx}
                  type="button"
                  disabled={!isAnswering}
                  onClick={() => {
                    if (isAnswering) {
                      soundManager.playClick();
                      setSelectedOption(opt);
                      handleSubmit(opt);
                    }
                  }}
                  className={`flex items-start gap-3 p-3 text-left rounded-xl border text-sm sm:text-base font-medium transition-all duration-150 cursor-pointer ${buttonStyle}`}
                >
                  <span
                    className={`flex items-center justify-center shrink-0 w-6 h-6 rounded-lg text-xs font-black ${
                      isPostSubmission && isCorrectAnswer
                        ? 'bg-emerald-500 text-white'
                        : isSelected
                        ? 'bg-white text-indigo-900'
                        : 'bg-slate-700 text-slate-300'
                    }`}
                  >
                    {letter}
                  </span>
                  <span className="flex-1 leading-snug">{opt}</span>
                  {isPostSubmission && isCorrectAnswer && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  )}
                  {isPostSubmission && isSelected && !isCorrectAnswer && (
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Text Input Mode for Conceptual/Fill-in questions */}
        {question.type === 'text' && (
          <div className="flex flex-col gap-3 mt-1">
            <div className="flex gap-2">
              <input
                type="text"
                disabled={!isAnswering}
                value={textAnswer}
                onChange={(e) => setTextAnswer(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSubmit(textAnswer);
                }}
                placeholder="Type your answer here..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
              />
              <button
                type="button"
                disabled={!isAnswering || !textAnswer.trim()}
                onClick={() => handleSubmit(textAnswer)}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-600 text-white font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer text-sm shadow-md"
              >
                <Send className="w-4 h-4" />
                Submit
              </button>
            </div>
          </div>
        )}

        {/* Answer Feedback & Short Explanation (Rule 7) */}
        {isPostSubmission && (
          <div
            className={`p-4 rounded-xl border flex flex-col gap-2 mt-2 transition-all ${
              isAnswerCorrect
                ? 'bg-emerald-950/60 border-emerald-500/80 text-emerald-100'
                : 'bg-rose-950/60 border-rose-500/80 text-rose-100'
            }`}
          >
            <div className="flex items-center gap-2">
              {isAnswerCorrect ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span className="font-extrabold text-sm sm:text-base text-emerald-300">
                    Correct Answer! +{assignedMarks} Mark{assignedMarks > 1 ? 's' : ''} Awarded!
                  </span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
                  <span className="font-extrabold text-sm sm:text-base text-rose-300">
                    {submittedAnswer === null
                      ? 'Time Expired! (0 Marks Awarded)'
                      : 'Incorrect Answer! (0 Marks Awarded)'}
                  </span>
                </>
              )}
            </div>

            {!isAnswerCorrect && (
              <div className="text-xs sm:text-sm text-slate-200">
                <span className="font-bold text-emerald-400">Correct Answer: </span>
                <span className="font-semibold">{question.correctAnswer}</span>
              </div>
            )}

            <div className="text-xs text-slate-300 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
              <span className="font-bold text-amber-300 flex items-center gap-1 mb-0.5">
                <HelpCircle className="w-3.5 h-3.5" /> Explanation:
              </span>
              {question.explanation}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
