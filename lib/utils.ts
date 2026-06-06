import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function getSpotsColor(spotsLeft: number, spotsTotal: number): string {
  const pct = spotsLeft / spotsTotal;
  if (pct <= 0.15) return 'text-red-400';
  if (pct <= 0.4) return 'text-amber-400';
  return 'text-emerald-400';
}

export function getSpotsBarColor(spotsLeft: number, spotsTotal: number): string {
  const pct = spotsLeft / spotsTotal;
  if (pct <= 0.15) return 'bg-red-500';
  if (pct <= 0.4) return 'bg-amber-500';
  return 'bg-emerald-500';
}

export function getSpotsLabel(spotsLeft: number): string {
  if (spotsLeft <= 0) return 'Sold Out';
  if (spotsLeft <= 3) return `Only ${spotsLeft} left!`;
  if (spotsLeft <= 8) return `${spotsLeft} spots left`;
  return `${spotsLeft} spots available`;
}

export function getCategoryEmoji(category: string): string {
  const map: Record<string, string> = {
    Football: '⚽',
    Cricket: '🏏',
    Basketball: '🏀',
    Tennis: '🎾',
    Running: '🏃',
    Yoga: '🧘',
    Social: '🥂',
    Music: '🎵',
    Workshop: '🛠️',
  };
  return map[category] || '🎯';
}

export function getCategoryGradient(category: string): string {
  const map: Record<string, string> = {
    Football: 'from-green-600/20 to-emerald-900/20',
    Cricket: 'from-yellow-600/20 to-amber-900/20',
    Basketball: 'from-orange-600/20 to-red-900/20',
    Tennis: 'from-lime-600/20 to-green-900/20',
    Running: 'from-blue-600/20 to-indigo-900/20',
    Yoga: 'from-purple-600/20 to-violet-900/20',
    Social: 'from-pink-600/20 to-rose-900/20',
    Music: 'from-indigo-600/20 to-purple-900/20',
    Workshop: 'from-cyan-600/20 to-blue-900/20',
  };
  return map[category] || 'from-indigo-600/20 to-purple-900/20';
}
