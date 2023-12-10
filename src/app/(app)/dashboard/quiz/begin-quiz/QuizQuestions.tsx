'use client';

import { replaceSpecialCharacters } from '@/lib/utils';
import { useState } from 'react';
import QuizResults from './QuizResults';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { useToast } from '@/components/ui/use-toast';

type Props = {
  data: Question[];
  category: string | string[] | undefined;
  authorId: string;
};

const QuizQuestions = ({ data, category, authorId }: Props) => {
  const { toast } = useToast();
  const [isTimerPlaying, setIsTimerPlaying] = useState<boolean>(true);
  const [timerOver, setTimerOver] = useState<boolean>(false);
  const [timerDuration, setTimerDuration] = useState<number>(0);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(
    null,
  );
  const [checked, setChecked] = useState(false);
  const [userChoice, setUserChoice] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });

  const { question, correct_answer, choices } = data[activeQuestion];

  const onAnswerSelected = (answer: string, index: number) => {
    setChecked(true);
    setSelectedAnswerIndex(index);
    setIsTimerPlaying(false);
    if (answer === correct_answer) {
      setSelectedAnswer(true);
    } else {
      setSelectedAnswer(false);
    }
    // setSelectedAnswer(answer);
  };

  const handleNextQuestion = async () => {
    setChecked(false);
    setTimerDuration((prev) => prev + 1);
    setIsTimerPlaying(true);
    setTimerOver(false);

    setSelectedAnswer(null);
    setSelectedAnswerIndex(null);
    setUserChoice([...userChoice, choices[selectedAnswerIndex!]]);
    setResult((prev) =>
      selectedAnswer
        ? {
            ...prev,
            score: prev.score + 1,
            correctAnswers: prev.correctAnswers + 1,
          }
        : { ...prev, wrongAnswers: prev.wrongAnswers + 1 },
    );

    if (activeQuestion !== data.length - 1) {
      setActiveQuestion(activeQuestion + 1);
    } else {
      const percentageScored = (result.score / data.length) * 100;

      try {
        const res = await fetch('/api/submit-quiz', {
          method: 'POST',
          body: JSON.stringify({
            quizTitle: category as string,
            numberOfQuestions: data.length,
            numberOfCorrectAnswers: result.score,
            percentageScored,
            authorId: Number(authorId),
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (res.ok) {
          toast({
            action: (
              <span className="text-blue w-full flex items-center">
                You have completed the quiz
              </span>
            ),
          });
        } else {
          throw await res.json();
        }
      } catch (error: any) {
        toast({
          variant: 'destructive',
          description: error.error || 'Network Error',
        });
      }

      setShowResult(true);
    }
  };

  return (
    <div className="lg:pl-56 px-3 py-10 min-h-[92.9vh] bg-indigo-100 text-custom-black">
      {!showResult ? (
        <div>
          <div className="xl:mx-56 lg:mx-36 sm:mx-5 flex justify-end">
            <CountdownCircleTimer
              isPlaying={isTimerPlaying}
              duration={20}
              colors={['#004777', '#F7B801', '#A30000', '#A30000']}
              colorsTime={[20, 10, 5, 0]}
              onComplete={() => {
                setChecked(true);
                setTimerOver(true);
                return { shouldRepeat: false };
              }}
              size={50}
              strokeWidth={2}
              key={timerDuration}
            >
              {({ remainingTime }) => (
                <h1 className="text-lg ">{remainingTime}</h1>
              )}
            </CountdownCircleTimer>
          </div>
          <div className="shadow-xl p-7 bg-white rounded-xl xl:mx-56 lg:mx-36 sm:mx-5 mt-2">
            <div className="flex justify-between items-center">
              <div>
                <span className="font-semibold">{activeQuestion + 1}</span> of{' '}
                <span className="font-semibold">{data.length}</span> questions
              </div>
              {timerOver && <p className="text-red-400">Time up!</p>}
            </div>
            <div>
              <h3 className="font-bold text-xl">
                {replaceSpecialCharacters(data[activeQuestion].question)}
              </h3>
              {choices.map((answer, index) => (
                <ul
                  key={`${index} ${answer}`}
                  className={`${
                    selectedAnswerIndex === index && selectedAnswer
                      ? 'bg-green-400 border-2 py-3 my-3 rounded-md'
                      : 'border-2 py-3 my-3 rounded-md cursor-pointer'
                  } ${checked && 'pointer-events-none'} ${
                    checked &&
                    !selectedAnswer &&
                    selectedAnswerIndex === index &&
                    'bg-red-400'
                  } ${answer === correct_answer && checked && 'bg-green-400'}`}
                  onClick={() => onAnswerSelected(answer, index)}
                >
                  <li className="px-5">{replaceSpecialCharacters(answer)}</li>
                </ul>
              ))}
            </div>
            <button type="button" onClick={() => handleNextQuestion()}>
              Next
            </button>
          </div>
        </div>
      ) : (
        <QuizResults data={data} result={result} userChoice={userChoice} />
      )}
    </div>
  );
};

export default QuizQuestions;
