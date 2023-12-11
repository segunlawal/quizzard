interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  choices: string[];
}

interface Session {
  user: {
    email: string;
    name: string;
    id: string;
  };
}

interface QuizTaken {
  id: number;
  takerId: number | null;
  quizTitle: String;
  numberOfQuestions: number;
  numberOfCorrectAnswers: number;
  percentageScored: number;
  takenAt: Date;
}

interface QuizSummary {
  quizTitle: string;
  total: number;
  averagePercentage: number;
  highestPercentage: number;
  lowestPercentage: number;
}
