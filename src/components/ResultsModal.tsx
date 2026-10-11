import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { TeamStats, TurnHistoryItem } from '../types/game';
import { soundManager } from '../utils/audio';
import {
  Trophy,
  Award,
  RotateCcw,
  CheckCircle2,
  XCircle,
  BarChart3,
  ListOrdered,
  Sparkles,
  Target,
  Percent,
} from 'lucide-react';

interface ResultsModalProps {
  girls: TeamStats;
  boys: TeamStats;
  winner: 'girls' | 'boys' | 'draw';
  winReason: string;
  turnHistory: TurnHistoryItem[];
  onPlayAgain: () => void;
}

export const ResultsModal: React.FC<ResultsModalProps> = ({
  girls,
  boys,
  winner,
  winReason,
  turnHistory,
  onPlayAgain,
}) => {
  useEffect(() => {
    soundManager.playWin();

    // Trigger confetti
    try {
      const end = Date.now() + 3000;
      const frame = () => {
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
        });
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
        });
        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    } catch {
      // ignore
    }
  }, []);

  const girlsAccuracy =
    girls.attemptedQuestions > 0
      ? Math.round((girls.correctAnswers / girls.attemptedQuestions) * 100)
      : 0;

  const boysAccuracy =
    boys.attemptedQuestions > 0
      ? Math.round((boys.correctAnswers / boys.attemptedQuestions) * 100)
      : 0;

  // Calculate topic-wise breakdown
  const topicMap: Record<
    string,
    { attempted: number; correct: number; girlsCorrect: number; boysCorrect: number }
  > = {};

  turnHistory.forEach((h) => {
    const t = h.question.topic;
    if (!topicMap[t]) {
      topicMap[t] = { attempted: 0, correct: 0, girlsCorrect: 0, boysCorrect: 0 };
    }
    topicMap[t].attempted += 1;
    if (h.isCorrect) {
      topicMap[t].correct += 1;
      if (h.team === 'girls') topicMap[t].girlsCorrect += 1;
      else topicMap[t].boysCorrect += 1;
    }
  });

  const topicsList = Object.entries(topicMap);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="w-full max-w-3xl my-auto bg-slate-900 border-2 border-slate-700 rounded-3xl shadow-2xl p-6 sm:p-8 text-slate-100 flex flex-col gap-6">
        {/* Header & Winner Announcement */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-amber-500/20 text-amber-400 border-2 border-amber-400/50 shadow-lg mb-3">
            <Trophy className="w-8 h-8 sm:w-10 sm:h-10 animate-bounce" />
          </div>

          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white mb-1">
            {winner === 'girls' ? (
              <span style={{ color: girls.color.accent }}>Girls Victory! 🏆</span>
            ) : winner === 'boys' ? (
              <span style={{ color: boys.color.accent }}>Boys Victory! 🏆</span>
            ) : (
              <span className="text-amber-400">Honorable Draw! 🤝</span>
            )}
          </h2>

          <p className="text-sm sm:text-base text-slate-300 font-medium">
            {winReason}
          </p>
        </div>

        {/* Head-to-Head Comparison Scorecards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Girls Final Summary */}
          <div
            className={`p-5 rounded-2xl border-2 bg-slate-850/90 relative ${
              winner === 'girls'
                ? 'border-amber-400 shadow-xl shadow-amber-500/10'
                : 'border-slate-700'
            }`}
          >
            {winner === 'girls' && (
              <div className="absolute -top-3 right-4 px-3 py-0.5 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider shadow-sm">
                Champions
              </div>
            )}
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-lg"
                style={{ backgroundColor: girls.color.hex }}
              >
                G
              </div>
              <div>
                <h3
                  className="font-black text-lg"
                  style={{ color: girls.color.accent }}
                >
                  {girls.name}
                </h3>
                <div className="text-xs text-slate-400">
                  Finished on Square {girls.position} / 100
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400 font-bold block">Marks</span>
                <span className="text-lg font-black text-amber-300">
                  {girls.marks}
                </span>
              </div>
              <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400 font-bold block">Solved</span>
                <span className="text-lg font-black text-emerald-300">
                  {girls.correctAnswers} / {girls.attemptedQuestions}
                </span>
              </div>
              <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400 font-bold block">Accuracy</span>
                <span className="text-lg font-black text-indigo-300">
                  {girlsAccuracy}%
                </span>
              </div>
            </div>
          </div>

          {/* Boys Final Summary */}
          <div
            className={`p-5 rounded-2xl border-2 bg-slate-850/90 relative ${
              winner === 'boys'
                ? 'border-amber-400 shadow-xl shadow-amber-500/10'
                : 'border-slate-700'
            }`}
          >
            {winner === 'boys' && (
              <div className="absolute -top-3 right-4 px-3 py-0.5 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider shadow-sm">
                Champions
              </div>
            )}
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-lg"
                style={{ backgroundColor: boys.color.hex }}
              >
                B
              </div>
              <div>
                <h3
                  className="font-black text-lg"
                  style={{ color: boys.color.accent }}
                >
                  {boys.name}
                </h3>
                <div className="text-xs text-slate-400">
                  Finished on Square {boys.position} / 100
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400 font-bold block">Marks</span>
                <span className="text-lg font-black text-amber-300">
                  {boys.marks}
                </span>
              </div>
              <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400 font-bold block">Solved</span>
                <span className="text-lg font-black text-emerald-300">
                  {boys.correctAnswers} / {boys.attemptedQuestions}
                </span>
              </div>
              <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400 font-bold block">Accuracy</span>
                <span className="text-lg font-black text-indigo-300">
                  {boysAccuracy}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Topic-Wise Performance Breakdown */}
        {topicsList.length > 0 && (
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4 text-indigo-400" />
              Topic-Wise DWDM Mastery Summary
            </h4>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {topicsList.map(([topic, stats]) => {
                const topicPct = Math.round((stats.correct / stats.attempted) * 100);
                return (
                  <div
                    key={topic}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800 text-xs gap-1"
                  >
                    <div className="font-semibold text-slate-200">
                      {topic}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-slate-400">
                        {stats.correct} / {stats.attempted} correct ({topicPct}%)
                      </span>
                      <div className="w-20 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className="h-full bg-indigo-500 rounded-full"
                          style={{ width: `${topicPct}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Question History Review for classroom teaching debrief */}
        {turnHistory.length > 0 && (
          <details className="text-xs group bg-slate-950/50 p-3 rounded-2xl border border-slate-800">
            <summary className="font-bold text-slate-300 cursor-pointer flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <ListOrdered className="w-4 h-4 text-slate-400" /> Review All Questions Answered in this Match ({turnHistory.length})
              </span>
              <span className="text-[11px] text-indigo-400 group-open:hidden">Click to expand</span>
            </summary>
            <div className="mt-3 space-y-2.5 max-h-56 overflow-y-auto pr-1">
              {turnHistory.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-2.5 rounded-lg border text-xs ${
                    item.isCorrect
                      ? 'bg-emerald-950/30 border-emerald-800/40'
                      : 'bg-rose-950/30 border-rose-800/40'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold mb-1">
                    <span className="capitalize text-slate-300">
                      Turn {item.turnNumber}: {item.team} ({item.question.topic})
                    </span>
                    <span
                      className={
                        item.isCorrect ? 'text-emerald-400' : 'text-rose-400'
                      }
                    >
                      {item.isCorrect
                        ? `✓ +${item.assignedMarks} pts • Dice: ${item.diceRoll}`
                        : '✗ Wrong (0 pts)'}
                    </span>
                  </div>
                  <div className="text-slate-200 mb-1">{item.question.question}</div>
                  <div className="text-slate-400 text-[11px]">
                    <strong>Correct:</strong> {item.question.correctAnswer} —{' '}
                    <em>{item.question.explanation}</em>
                  </div>
                </div>
              ))}
            </div>
          </details>
        )}

        {/* Play Again Button */}
        <button
          type="button"
          onClick={() => {
            soundManager.playClick();
            onPlayAgain();
          }}
          className="w-full py-4 px-6 rounded-2xl font-black text-base sm:text-lg text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 shadow-xl shadow-indigo-600/30 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <RotateCcw className="w-5 h-5" />
          PLAY AGAIN (NEW MATCH & NEW COLORS)
        </button>
      </div>
    </div>
  );
};
