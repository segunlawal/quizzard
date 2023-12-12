import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const categoryOptions = [
  { value: 'all', label: 'Mixed Topics' },
  { value: 'general', label: 'General Knowledge' },
  { value: 'sports', label: 'Sports' },
  { value: 'history', label: 'History' },
  { value: 'science', label: 'Science' },
  { value: 'entertainment', label: 'Entertainment' },
];

export const categoryOptions2 = [
  { value: 'all', label: 'All' },
  { value: '0', label: 'Mixed Topics' },
  { value: '9', label: 'General Knowledge' },
  { value: '21', label: 'Sports' },
  { value: '23', label: 'History' },
  { value: '17', label: 'Science' },
  { value: '12', label: 'Entertainment' },
];

export function addShuffledChoices(questions: any[]): any[] {
  // Helper function to shuffle an array
  const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Iterate through each question and add shuffled choices
  const questionsWithChoices = questions.map((question) => {
    const choices = shuffleArray([
      question.correct_answer,
      ...question.incorrect_answers,
    ]);

    return {
      ...question,
      choices,
    };
  });

  return questionsWithChoices;
}

export function convertCategoryNumberToTitle(category: string) {
  switch (category) {
    case '0':
      return 'Mixed';
    case '9':
      return 'General Knowledge';
    case '21':
      return 'Sports';
    case '23':
      return 'History';
    case '17':
      return 'Science';
    case '12':
      return 'Entertainment';
    default:
      return 'Others';
  }
}

export function formatDate(inputDate: string): string {
  const date = new Date(inputDate);

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  return date.toLocaleString('en-US', options);
}

export function sortByPercentageScore(results: QuizTaken[]): QuizTaken[] {
  const sortedResults = results.sort((a, b) => {
    if (b.percentageScored !== a.percentageScored) {
      // If percentages are different, sort by percentageScored in descending order
      return b.percentageScored - a.percentageScored;
    } else {
      // If percentages are the same, sort by takenAt in descending order
      return b.takenAt.getTime() - a.takenAt.getTime();
    }
  });

  return sortedResults;
}
