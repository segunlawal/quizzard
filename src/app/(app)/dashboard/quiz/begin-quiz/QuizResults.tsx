import { useRouter } from 'next/navigation';
import { decode } from 'html-entities';

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
  const centScored = ((result.score / data.length) * 100).toFixed(2);
  const router = useRouter();

  const correctionsMade = data.map((oneQuestion, index) => (
    <div key={`${oneQuestion.correct_answer} ${index}`} className="">
      <h3 className="font-semibold">
        {index + 1}. {decode(oneQuestion.question)}
      </h3>

      {oneQuestion.choices.map((answer) => (
        <ul key={answer}>
          <li className="border-2 py-3 border-custom-black px-5 my-3 rounded-md">
            <span className="flex gap-3">
              {decode(answer)}
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
                <div className="flex gap-x-2">
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
                  <p className="text-xs text-red-400">time ran out</p>
                </div>
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
      <div className="shadow-lg grid sm:grid-cols-2 rounded-xl overflow-hidden xl:mx-64 lg:mx-40 sm:mx-16">
        <div className="bg-custom-black flex justify-center flex-col items-center text-white py-5 sm:py-0">
          <h3>Your Result</h3>
          <div className="rounded-full bg-indigo-50 text-blue shadow-inner flex flex-col justify-center items-center p-5 text-2xl w-24 h-24 font-bold my-5">
            {centScored}%
          </div>
          <p className="text-lg font-semibold">Good job</p>
          <p>You have completed the quiz!</p>
        </div>
        <div className="bg-white p-5">
          <h3 className="font-semibold text-lg">Summary</h3>
          <div className="flex flex-col gap-4 mt-2">
            <div className="flex justify-between items-center bg-indigo-50 px-3 py-1 rounded-sm">
              <p className="text-blue font-semibold">Questions</p>
              <p>{data.length}</p>
            </div>
            <div className="flex justify-between items-center bg-indigo-50 px-3 py-1 rounded-sm">
              <p className="text-green-600 font-semibold">Correct Answers</p>
              <p>{result.score}</p>
            </div>
            <div className="flex justify-between items-center bg-indigo-50 px-3 py-1 rounded-sm">
              <p className="text-red-600 font-semibold">Wrong Answers</p>
              <p>{result.wrongAnswers}</p>
            </div>
          </div>
          <button
            onClick={() => router.push('/dashboard')}
            className="bg-custom-black text-white rounded-2xl py-3 mt-4 w-full"
          >
            Continue
          </button>
        </div>
      </div>

      <div className="my-7">
        <button type="button">SUMMARY</button>
        <div className="grid sm:grid-cols-2 gap-5">{correctionsMade}</div>
      </div>
    </div>
  );
};

export default QuizResults;
