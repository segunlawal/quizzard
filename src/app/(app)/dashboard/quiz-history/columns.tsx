'use client';

import { convertCategoryNumberToTitle, formatDate } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';

export const columns: ColumnDef<QuizTaken>[] = [
  {
    accessorKey: 'quizTitle',
    header: () => <div className="">Quiz Title</div>,
    cell: ({ row }) => {
      return (
        <div className="">
          {convertCategoryNumberToTitle(row.getValue('quizTitle'))}
        </div>
      );
    },
  },
  {
    accessorKey: 'percentageScored',
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Score (%)
          <ArrowUpDown className="h-4 w-4" />
        </button>
      );
    },
    cell: ({ row }) => {
      const amount = row.getValue('percentageScored') as number;

      return <div className="font-medium text-blue">{amount.toFixed(2)}</div>;
    },
  },
  {
    accessorKey: 'takenAt',
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Date Taken (GMT +1)
          <ArrowUpDown className="h-4 w-4" />
        </button>
      );
    },
    cell: ({ row }) => {
      const amount = row.getValue('takenAt');
      const formatted = amount as Date;

      return <div className="">{formatDate(formatted.toString())}</div>;
    },
  },
];
