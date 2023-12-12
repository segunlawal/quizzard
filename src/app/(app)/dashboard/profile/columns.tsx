'use client';

import { convertCategoryNumberToTitle, formatDate } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';

export const columns: ColumnDef<QuizSummary>[] = [
  {
    accessorKey: 'quizTitle',
    header: 'Quiz Title',
  },
  {
    accessorKey: 'total',
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Quizzes taken
          <ArrowUpDown className="h-4 w-4" />
        </button>
      );
    },
  },
  {
    accessorKey: 'highestPercentage',
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Highest Score
          <ArrowUpDown className="h-4 w-4" />
        </button>
      );
    },
  },
  {
    accessorKey: 'lowestPercentage',
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Lowest Score
          <ArrowUpDown className="h-4 w-4" />
        </button>
      );
    },
  },
];
