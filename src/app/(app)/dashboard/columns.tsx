'use client';

import { convertCategoryNumberToTitle, formatDate } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<QuizTaken>[] = [
  {
    accessorKey: 'rank',
    header: () => <div className="">Rank</div>,
    cell: (props) => {
      return (
        <div className="">
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
        <div className="">
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

      return <div className="font-medium text-blue">{amount.toFixed(2)}</div>;
    },
  },
];
