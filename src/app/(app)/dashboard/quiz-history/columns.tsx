'use client';

import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<QuizTaken>[] = [
  {
    accessorKey: '',
    header: 'S/N',
  },
  {
    accessorKey: 'quizTitle',
    header: 'Quiz Title',
  },
  {
    accessorKey: 'percentageScored',
    header: 'Score',
  },
  {
    accessorKey: 'takenAt',
    // header: 'Date Taken',
    header: () => <div className="">Date Taken</div>,
    cell: ({ row }) => {
      const amount = row.getValue('takenAt');
      const formatted = amount as Date;

      return <div className="font-medium">{formatted.toString()}</div>;
    },
  },
];
