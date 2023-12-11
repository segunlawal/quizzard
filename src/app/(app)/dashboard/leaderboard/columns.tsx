'use client';

import { convertCategoryNumberToTitle } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<QuizTaken>[] = [
  {
    accessorKey: 'id',
    header: () => <div className="">Rank</div>,
    cell: (props) => {
      return (
        <div className="font-medium">
          {props?.table?.getSortedRowModel()?.flatRows?.indexOf(props?.row) + 1}
        </div>
      );
    },
  },
  {
    accessorKey: 'takerName',
    header: 'Username',
  },
  {
    accessorKey: 'quizTitle',
    header: () => <div className="">Quiz Title</div>,
    cell: ({ row }) => {
      return (
        <div className="font-medium">
          {convertCategoryNumberToTitle(row.getValue('quizTitle'))}
        </div>
      );
    },
  },
  {
    accessorKey: 'percentageScored',
    header: 'Score (%)',
    cell: ({ row }) => {
      const amount = row.getValue('percentageScored') as number;

      return <div className="font-medium">{amount.toFixed(2)}</div>;
    },
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
