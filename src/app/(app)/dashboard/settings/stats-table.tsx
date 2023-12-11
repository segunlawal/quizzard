'use client';

import React from 'react';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import {
  calculateAveragePercentage,
  findHighestPercentage,
  findLowestPercentage,
} from './helper';

type Props = {
  allQuizzes: QuizTaken[];
};

const StatsTable = ({ allQuizzes }: Props) => {
  return (
    <div>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className="">Total Number</TableCell>
            <TableCell className="text-gray">{allQuizzes.length}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="">Average score</TableCell>
            <TableCell className="text-gray">
              {calculateAveragePercentage(allQuizzes)}%
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="">Highest score</TableCell>
            <TableCell className="text-gray">
              {findHighestPercentage(allQuizzes)}%
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="">Lowest score</TableCell>
            <TableCell className="text-gray">
              {findLowestPercentage(allQuizzes)}%
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default StatsTable;
