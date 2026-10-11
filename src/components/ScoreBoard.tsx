import React from 'react';
import { TeamStats, TeamId } from '../types/game';
import { Trophy, Target, Award, CheckCircle, Percent } from 'lucide-react';

interface ScoreBoardProps {
  girls: TeamStats;
  boys: TeamStats;
  currentTeam: TeamId;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({
  girls,
  boys,
  currentTeam,
}) => {
  const renderTeamCard = (team: TeamStats, isCurrent: boolean) => {
    const accuracy =
      team.attemptedQuestions > 0
        ? Math.round((team.correctAnswers / team.attemptedQuestions) * 100)
        : 0;

    return (
      <div
        className={`relative flex-1 p-3.5 rounded-2xl border transition-all duration-300 ${
          isCurrent
            ? 'bg-slate-850 border-amber-400/80 shadow-lg ring-2 ring-amber-400/30 -translate-y-0.5'
            : 'bg-slate-900/90 border-slate-750 opacity-90'
        }`}
      >
        {/* Active Turn Floating Ribbon */}
        {isCurrent && (
          <div className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black text-[10px] uppercase tracking-wider shadow-md animate-pulse">
            Active Turn
          </div>
        )}

        {/* Team Identity */}
        <div className="flex items-center gap-2.5 mb-2.5">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white font-black text-sm shadow-md ring-2 ring-white/40"
            style={{ backgroundColor: team.color.hex }}
          >
            {team.id === 'girls' ? 'G' : 'B'}
          </div>
          <div>
            <h4
              className="font-black text-base leading-tight tracking-wide"
              style={{ color: team.color.accent }}
            >
              {team.name}
            </h4>
            <div className="text-[11px] text-slate-400">
              Color: {team.color.name}
            </div>
          </div>
        </div>

        {/* Board Progress Indicator */}
        <div className="mb-3 p-2 rounded-xl bg-slate-950/70 border border-slate-800">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-slate-400 font-semibold flex items-center gap-1">
              <Target className="w-3.5 h-3.5 text-slate-400" /> Board Position
            </span>
            <span className="font-extrabold text-white text-sm">
              Square {team.position}
              <span className="text-slate-500 font-medium text-xs"> / 100</span>
            </span>
          </div>
          {/* Progress bar */}
          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500 shadow-sm"
              style={{
                width: `${Math.min(100, team.position)}%`,
                backgroundColor: team.color.hex,
              }}
            />
          </div>
        </div>

        {/* 3 Metric Pills: Marks, Correct, Accuracy */}
        <div className="grid grid-cols-3 gap-1.5 text-center">
          {/* Total Marks */}
          <div className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30">
            <div className="text-[10px] text-amber-300 font-medium flex items-center justify-center gap-0.5">
              <Award className="w-3 h-3 text-amber-400" /> Marks
            </div>
            <div className="text-base font-black text-amber-300 leading-tight">
              {team.marks}
            </div>
          </div>

          {/* Correct Count */}
          <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
            <div className="text-[10px] text-emerald-300 font-medium flex items-center justify-center gap-0.5">
              <CheckCircle className="w-3 h-3 text-emerald-400" /> Solved
            </div>
            <div className="text-base font-black text-emerald-300 leading-tight">
              {team.correctAnswers}
              <span className="text-[10px] text-slate-400 font-normal">
                /{team.attemptedQuestions}
              </span>
            </div>
          </div>

          {/* Accuracy */}
          <div className="p-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/30">
            <div className="text-[10px] text-indigo-300 font-medium flex items-center justify-center gap-0.5">
              <Percent className="w-3 h-3 text-indigo-400" /> Acc.
            </div>
            <div className="text-base font-black text-indigo-300 leading-tight">
              {accuracy}%
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full">
      {renderTeamCard(girls, currentTeam === 'girls')}
      {renderTeamCard(boys, currentTeam === 'boys')}
    </div>
  );
};
