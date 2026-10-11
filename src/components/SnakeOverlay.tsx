import React from 'react';
import { SNAKES } from '../data/snakes';
import { getSquareCoords } from '../utils/boardUtils';

interface SnakeOverlayProps {
  activeSnake?: { from: number; to: number } | null;
}

interface SnakeColorTheme {
  body: string;
  bodyDark: string;
  outline: string;
  belly: string;
  bellyDark: string;
  accent: string;
  glow: string;
}

const COLOR_THEMES: Record<string, SnakeColorTheme> = {
  red: {
    body: '#ef4444',
    bodyDark: '#b91c1c',
    outline: '#7f1d1d',
    belly: '#fef08a',
    bellyDark: '#fde047',
    accent: '#fca5a5',
    glow: '#f87171',
  },
  green: {
    body: '#16a34a',
    bodyDark: '#15803d',
    outline: '#14532d',
    belly: '#fef08a',
    bellyDark: '#bef264',
    accent: '#86efac',
    glow: '#4ade80',
  },
  purple: {
    body: '#9333ea',
    bodyDark: '#7e22ce',
    outline: '#581c87',
    belly: '#fef08a',
    bellyDark: '#fde047',
    accent: '#d8b4fe',
    glow: '#c084fc',
  },
  blue: {
    body: '#0284c7',
    bodyDark: '#0369a1',
    outline: '#075985',
    belly: '#fef08a',
    bellyDark: '#fde047',
    accent: '#7dd3fc',
    glow: '#38bdf8',
  },
  gold: {
    body: '#d97706',
    bodyDark: '#b45309',
    outline: '#78350f',
    belly: '#fef9c3',
    bellyDark: '#fef08a',
    accent: '#fde68a',
    glow: '#fbbf24',
  },
};

export const SnakeOverlay: React.FC<SnakeOverlayProps> = ({ activeSnake }) => {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <defs>
        {/* Clean drop shadow */}
        <filter id="snakeShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0.4" dy="0.7" stdDeviation="0.5" floodColor="#0f172a" floodOpacity="0.4" />
        </filter>

        {/* Glow when active */}
        <filter id="snakeActiveGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="0" stdDeviation="1.2" floodColor="#f43f5e" floodOpacity="0.85" />
        </filter>
      </defs>

      {SNAKES.map((snake) => {
        const start = getSquareCoords(snake.from); // Head (top square)
        const end = getSquareCoords(snake.to); // Tail (lower square)

        const x1 = start.xPercent;
        const y1 = start.yPercent;
        const x2 = end.xPercent;
        const y2 = end.yPercent;

        const dx = x2 - x1;
        const dy = y2 - y1;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist === 0) return null;

        // Controlled curvature for short, balanced bodies
        const waveAmp = Math.min(3.5, Math.max(1.8, dist * 0.09));
        const sign = (snake.from % 2 === 0) ? 1 : -1;
        const nx = (-dy / dist) * waveAmp * sign;
        const ny = (dx / dist) * waveAmp * sign;

        // Smooth natural curve control points
        const cp1x = x1 + dx * 0.28 + nx;
        const cp1y = y1 + dy * 0.28 + ny;
        const midx = x1 + dx * 0.52;
        const midy = y1 + dy * 0.52;
        const cp2x = x1 + dx * 0.78 - nx * 0.7;
        const cp2y = y1 + dy * 0.78 - ny * 0.7;

        const mainPath = `M ${x1} ${y1} Q ${cp1x} ${cp1y}, ${midx} ${midy} Q ${cp2x} ${cp2y}, ${x2} ${y2}`;

        const theme = COLOR_THEMES[snake.color || 'red'] || COLOR_THEMES.red;
        const isActive = activeSnake && activeSnake.from === snake.from;

        // Tangent angle at head for aligning the sleek snake head
        const headAngle = (Math.atan2(cp1y - y1, cp1x - x1) * 180) / Math.PI;

        return (
          <g
            key={`snake-${snake.from}-${snake.to}`}
            filter={isActive ? 'url(#snakeActiveGlow)' : 'url(#snakeShadow)'}
            className={`transition-all duration-300 ${isActive ? 'scale-[1.02]' : ''}`}
          >
            {/* 1. Dark Outline for crisp board visibility */}
            <path
              d={mainPath}
              fill="none"
              stroke={theme.outline}
              strokeWidth={isActive ? '3.0' : '2.4'}
              strokeLinecap="round"
            />

            {/* 2. Main Colorful Snake Body */}
            <path
              d={mainPath}
              fill="none"
              stroke={theme.body}
              strokeWidth={isActive ? '2.4' : '1.8'}
              strokeLinecap="round"
            />

            {/* 3. Underbelly Pattern Stripe */}
            <path
              d={mainPath}
              fill="none"
              stroke={theme.belly}
              strokeWidth={isActive ? '1.0' : '0.7'}
              strokeDasharray="0.9, 1.2"
              strokeLinecap="round"
            />

            {/* 4. Tapered Tail */}
            <circle
              cx={x2}
              cy={y2}
              r="0.8"
              fill={theme.bodyDark}
              stroke={theme.outline}
              strokeWidth="0.25"
            />

            {/* 5. Sleek Stylized Snake Head (No tongue, clean polished form) */}
            <g transform={`translate(${x1}, ${y1}) rotate(${headAngle})`}>
              {/* Head Base: Streamlined aerodynamic contour */}
              <path
                d="M -0.8 -1.3 C 0.8 -1.4, 2.2 -0.8, 2.5 0 C 2.2 0.8, 0.8 1.4, -0.8 1.3 C -1.4 0.8, -1.4 -0.8, -0.8 -1.3 Z"
                fill={theme.body}
                stroke={theme.outline}
                strokeWidth="0.32"
              />

              {/* Top Brow & Scale Ridge */}
              <path
                d="M -0.2 -0.6 Q 1.0 -0.4 1.8 0 Q 1.0 0.4 -0.2 0.6"
                fill={theme.bodyDark}
                opacity="0.55"
              />

              {/* Sleek Almond Eyes with Slit Pupils (Top) */}
              <ellipse
                cx="0.7"
                cy="-0.65"
                rx="0.45"
                ry="0.35"
                fill="#fde047"
                stroke={theme.outline}
                strokeWidth="0.18"
              />
              <line
                x1="0.7"
                y1="-0.9"
                x2="0.7"
                y2="-0.4"
                stroke="#0f172a"
                strokeWidth="0.2"
                strokeLinecap="round"
              />

              {/* Sleek Almond Eyes with Slit Pupils (Bottom) */}
              <ellipse
                cx="0.7"
                cy="0.65"
                rx="0.45"
                ry="0.35"
                fill="#fde047"
                stroke={theme.outline}
                strokeWidth="0.18"
              />
              <line
                x1="0.7"
                y1="0.4"
                x2="0.7"
                y2="0.9"
                stroke="#0f172a"
                strokeWidth="0.2"
                strokeLinecap="round"
              />

              {/* Snout highlight */}
              <circle
                cx="2.0"
                cy="0"
                r="0.25"
                fill={theme.accent}
                opacity="0.8"
              />
            </g>
          </g>
        );
      })}
    </svg>
  );
};
