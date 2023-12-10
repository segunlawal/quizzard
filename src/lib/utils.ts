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

export const replaceSpecialCharacters = (str: string) => {
  // Replace /&#039; with '
  const stringWithSingleQuotes = str.replace(/&#039;/g, "'");
  // Replace /&quot; with "
  const finalString = stringWithSingleQuotes.replace(/&quot;/g, '"');
  // Replace &ouml; with ö
  const lastString = finalString.replace(/&ouml;/g, 'ö');
  // Replace &eacute; with é
  const lastString2 = lastString.replace(/&eacute;/g, 'é');
  // Replace &amp; with &
  const lastString3 = lastString.replace(/&amp;/g, '&');
  // Replace &aacute; with á
  const lastString4 = lastString.replace(/&aacute;/g, 'á');

  return lastString4;
};

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
