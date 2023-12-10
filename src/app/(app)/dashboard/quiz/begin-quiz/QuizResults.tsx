import { replaceSpecialCharacters } from '@/lib/utils';

type Props = {
  data: Question[];
  result: {
    score: number;
    correctAnswers: number;
    wrongAnswers: number;
  };
  userChoice: string[];
};

const QuizResults = (props: Props) => {
  const { data, result, userChoice } = props;
  // console.log(userChoice);
  const centScored = (result.score / data.length) * 100;

  const correctionsMade = data.map((oneQuestion, index) => (
    <div key={`${oneQuestion.correct_answer} ${index}`} className="mx-auto">
      <p>{replaceSpecialCharacters(oneQuestion.question)}</p>

      {oneQuestion.choices.map((answer) => (
        <ul key={answer}>
          <li className="border-b-2 border-x-2">
            <span className="flex justify-center gap-3">
              {replaceSpecialCharacters(answer)}
              {answer === data[index].correct_answer && userChoice[index] && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 bg-green-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              )}
              {answer === data[index].correct_answer && !userChoice[index] && (
                <p>no answer</p>
              )}
              {answer !== data[index].correct_answer &&
                answer === userChoice[index] && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 bg-red-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
            </span>
          </li>
        </ul>
      ))}
    </div>
  ));

  return (
    <div>
      <p>Results</p>
      <p>You scored {centScored}%</p>
      <p className="font-semibold text-lg">
        You got {result.score} out of {data.length} questions
      </p>
      {correctionsMade}
    </div>
  );
};

export default QuizResults;
