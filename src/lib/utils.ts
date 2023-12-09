import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const categoryOptions = [
  { value: 'all', label: 'All Categories' },
  { value: 'general', label: 'General Knowledge' },
  { value: 'sports', label: 'Sports' },
  { value: 'history', label: 'History' },
  { value: 'science', label: 'Science' },
  { value: 'entertainment', label: 'Entertainment' },
];
