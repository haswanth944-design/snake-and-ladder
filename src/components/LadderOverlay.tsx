import React from 'react';
import { LADDERS } from '../data/ladders';
import { getSquareCoords } from '../utils/boardUtils';

interface LadderOverlayProps {
  activeLadder?: { from: number; to: number } | null;
}

export const LadderOverlay: React.FC<LadderOverlayProps> = ({ activeLadder }) => {
  const railHalfWidth = 1.3; // percentage units

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <defs>
        {/* Ladder rail gradients */}
        <linearGradient id="ladderRailGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="50%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>

        <linearGradient id="ladderActiveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="50%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>

        <filter id="ladderDropShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0.4" dy="0.6" stdDeviation="0.4" floodOpacity="0.35" />
        </filter>
        <filter id="ladderActiveGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="0" stdDeviation="0.8" floodColor="#34d399" floodOpacity="0.8" />
        </filter>
      </defs>

      {LADDERS.map((ladder) => {
        const start = getSquareCoords(ladder.from);
        const end = getSquareCoords(ladder.to);

        const x1 = start.xPercent;
        const y1 = start.yPercent;
        const x2 = end.xPercent;
        const y2 = end.yPercent;

        const dx = x2 - x1;
        const dy = y2 - y1;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist === 0) return null;

        const nx = (-dy / dist) * railHalfWidth;
        const ny = (dx / dist) * railHalfWidth;

        const leftX1 = x1 + nx;
        const leftY1 = y1 + ny;
        const leftX2 = x2 + nx;
        const leftY2 = y2 + ny;

        const rightX1 = x1 - nx;
        const rightY1 = y1 - ny;
        const rightX2 = x2 - nx;
        const rightY2 = y2 - ny;

        const rungCount = Math.max(3, Math.floor(dist / 3.2));
        const rungs = [];

        for (let i = 1; i < rungCount; i++) {
          const t = i / rungCount;
          const cx = x1 + dx * t;
          const cy = y1 + dy * t;
          rungs.push({
            x1: cx + nx,
            y1: cy + ny,
            x2: cx - nx,
            y2: cy - ny,
          });
        }

        const isActive = activeLadder && activeLadder.from === ladder.from;

        return (
          <g
            key={`${ladder.from}-${ladder.to}`}
            filter={isActive ? 'url(#ladderActiveGlow)' : 'url(#ladderDropShadow)'}
            className={`transition-all duration-300 ${isActive ? 'scale-[1.02]' : ''}`}
          >
            {/* Left Rail */}
            <line
              x1={leftX1}
              y1={leftY1}
              x2={leftX2}
              y2={leftY2}
              stroke={isActive ? 'url(#ladderActiveGrad)' : 'url(#ladderRailGrad)'}
              strokeWidth={isActive ? '1.2' : '0.9'}
              strokeLinecap="round"
            />

            {/* Right Rail */}
            <line
              x1={rightX1}
              y1={rightY1}
              x2={rightX2}
              y2={rightY2}
              stroke={isActive ? 'url(#ladderActiveGrad)' : 'url(#ladderRailGrad)'}
              strokeWidth={isActive ? '1.2' : '0.9'}
              strokeLinecap="round"
            />

            {/* Rungs */}
            {rungs.map((rung, idx) => (
              <line
                key={idx}
                x1={rung.x1}
                y1={rung.y1}
                x2={rung.x2}
                y2={rung.y2}
                stroke={isActive ? '#6ee7b7' : '#fbbf24'}
                strokeWidth={isActive ? '0.9' : '0.6'}
                strokeLinecap="round"
              />
            ))}

            {/* Ladder Start Marker (Base) */}
            <circle
              cx={x1}
              cy={y1}
              r="1.4"
              fill={isActive ? '#10b981' : '#d97706'}
              stroke="#ffffff"
              strokeWidth="0.4"
            />

            {/* Ladder Top Marker (Destination) */}
            <circle
              cx={x2}
              cy={y2}
              r="1.6"
              fill={isActive ? '#059669' : '#f59e0b'}
              stroke="#ffffff"
              strokeWidth="0.4"
            />
          </g>
        );
      })}
    </svg>
  );
};
