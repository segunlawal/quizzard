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
