export function calculateAveragePercentage(quizResults: QuizTaken[]): number {
  if (quizResults.length === 0) {
    return 0;
  }
  const totalPercentage = quizResults.reduce(
    (sum, result) => sum + result.percentageScored,
    0,
  );
  const averagePercentage = totalPercentage / quizResults.length;
  return parseFloat(averagePercentage.toFixed(2)); // Round to 2 decimal places
}

export function findHighestPercentage(quizResults: QuizTaken[]): number {
  if (quizResults.length === 0) {
    return 0;
  }
  const highestPercentage = Math.max(
    ...quizResults.map((result) => result.percentageScored),
  );
  return highestPercentage;
}

export function findLowestPercentage(quizResults: QuizTaken[]): number {
  if (quizResults.length === 0) {
    return 0;
  }
  const lowestPercentage = Math.min(
    ...quizResults.map((result) => result.percentageScored),
  );
  return lowestPercentage;
}

// export function groupQuizResultsByTitle(
//   quizResults: QuizTaken[],
// ): QuizSummary[] {
//   const categories = ['0', '9', '21', '23', '17', '12'];

//   const groupedResults = quizResults.reduce(
//     (result, quiz) => {
//       const titleIndex = categories.indexOf(quiz.quizTitle as string);
//       const title = titleIndex !== -1 ? categories[titleIndex] : '0';

//       if (!result[title]) {
//         result[title] = {
//           quizTitle: title,
//           total: 0,
//           averagePercentage: 0,
//           highestPercentage: 0,
//           lowestPercentage: 0,
//         };
//       }

//       result[title].total += 1;
//       result[title].averagePercentage += quiz.percentageScored;
//       result[title].highestPercentage = Math.max(
//         result[title].highestPercentage,
//         quiz.percentageScored,
//       );
//       result[title].lowestPercentage =
//         result[title].total === 1
//           ? quiz.percentageScored
//           : Math.min(result[title].lowestPercentage, quiz.percentageScored);

//       return result;
//     },
//     {} as Record<
//       string,
//       {
//         quizTitle: string;
//         total: number;
//         averagePercentage: number;
//         highestPercentage: number;
//         lowestPercentage: number;
//       }
//     >,
//   );

//   const allCategories = categories.map((category) => ({
//     quizTitle: category,
//     total: 0,
//     averagePercentage: 0,
//     highestPercentage: 0,
//     lowestPercentage: 0,
//   }));

//   return allCategories.map((category) => ({
//     ...category,
//     ...groupedResults[category.quizTitle],
//     averagePercentage:
//       category.total > 0
//         ? +(
//             groupedResults[category.quizTitle].averagePercentage /
//             category.total
//           ).toFixed(2)
//         : 0,
//   }));
// }

export function groupQuizResultsByTitle(
  quizResults: QuizTaken[],
): QuizSummary[] {
  const categories = ['0', '9', '21', '23', '17', '12'];

  const updateQuizTitle = (category: string): string => {
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
  };

  const groupedResults = quizResults.reduce(
    (result, quiz) => {
      const titleIndex = categories.indexOf(quiz.quizTitle as string);
      const title = titleIndex !== -1 ? categories[titleIndex] : '0';
      const updatedTitle = updateQuizTitle(title);

      if (!result[updatedTitle]) {
        result[updatedTitle] = {
          quizTitle: updatedTitle,
          total: 0,
          averagePercentage: 0,
          highestPercentage: 0,
          lowestPercentage: 0,
        };
      }

      result[updatedTitle].total += 1;
      result[updatedTitle].averagePercentage += quiz.percentageScored;
      result[updatedTitle].highestPercentage = Math.max(
        result[updatedTitle].highestPercentage,
        quiz.percentageScored,
      );
      result[updatedTitle].lowestPercentage =
        result[updatedTitle].total === 1
          ? quiz.percentageScored
          : Math.min(
              result[updatedTitle].lowestPercentage,
              quiz.percentageScored,
            );

      return result;
    },
    {} as Record<
      string,
      {
        quizTitle: string;
        total: number;
        averagePercentage: number;
        highestPercentage: number;
        lowestPercentage: number;
      }
    >,
  );

  const allCategories = categories.map((category) => ({
    quizTitle: updateQuizTitle(category),
    total: 0,
    averagePercentage: 0,
    highestPercentage: 0,
    lowestPercentage: 0,
  }));

  return allCategories.map((category) => ({
    ...category,
    ...groupedResults[category.quizTitle],
  }));
}
