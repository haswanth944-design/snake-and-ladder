import { TeamColor } from '../types/game';

export const CURSOR_PALETTES: TeamColor[] = [
  {
    name: 'Electric Purple',
    bg: 'bg-purple-600',
    border: 'border-purple-300',
    ring: 'ring-purple-400',
    text: 'text-purple-600',
    badgeBg: 'bg-purple-100 text-purple-900 border-purple-300',
    hex: '#9333ea',
    accent: '#c084fc',
  },
  {
    name: 'Emerald Green',
    bg: 'bg-emerald-600',
    border: 'border-emerald-300',
    ring: 'ring-emerald-400',
    text: 'text-emerald-600',
    badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    hex: '#059669',
    accent: '#34d399',
  },
  {
    name: 'Coral Orange',
    bg: 'bg-orange-600',
    border: 'border-orange-300',
    ring: 'ring-orange-400',
    text: 'text-orange-600',
    badgeBg: 'bg-orange-100 text-orange-900 border-orange-300',
    hex: '#ea580c',
    accent: '#fb923c',
  },
  {
    name: 'Deep Cyan',
    bg: 'bg-cyan-600',
    border: 'border-cyan-300',
    ring: 'ring-cyan-400',
    text: 'text-cyan-600',
    badgeBg: 'bg-cyan-100 text-cyan-900 border-cyan-300',
    hex: '#0891b2',
    accent: '#22d3ee',
  },
  {
    name: 'Rose Pink',
    bg: 'bg-rose-600',
    border: 'border-rose-300',
    ring: 'ring-rose-400',
    text: 'text-rose-600',
    badgeBg: 'bg-rose-100 text-rose-900 border-rose-300',
    hex: '#e11d48',
    accent: '#fb7185',
  },
  {
    name: 'Golden Amber',
    bg: 'bg-amber-600',
    border: 'border-amber-300',
    ring: 'ring-amber-400',
    text: 'text-amber-600',
    badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
    hex: '#d97706',
    accent: '#fcd34d',
  },
  {
    name: 'Indigo Velvet',
    bg: 'bg-indigo-600',
    border: 'border-indigo-300',
    ring: 'ring-indigo-400',
    text: 'text-indigo-600',
    badgeBg: 'bg-indigo-100 text-indigo-900 border-indigo-300',
    hex: '#4f46e5',
    accent: '#818cf8',
  },
  {
    name: 'Teal Forest',
    bg: 'bg-teal-600',
    border: 'border-teal-300',
    ring: 'ring-teal-400',
    text: 'text-teal-600',
    badgeBg: 'bg-teal-100 text-teal-900 border-teal-300',
    hex: '#0d9488',
    accent: '#2dd4bf',
  },
];

/**
 * Returns two distinct random colors for Girls and Boys
 */
export function getTwoRandomDistinctColors(): [TeamColor, TeamColor] {
  const shuffled = [...CURSOR_PALETTES].sort(() => Math.random() - 0.5);
  return [shuffled[0], shuffled[1]];
}
