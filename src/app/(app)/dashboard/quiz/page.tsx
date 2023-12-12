import StartQuizForm from './start-quiz-form';

export default async function Quiz() {
  return (
    <div className="lg:pl-56 px-3 py-10 min-h-[93.4vh] bg-indigo-100 text-custom-black text-sm">
      <div className="shadow-sm p-7 bg-green-100 rounded-md">
        <h1 className="text-lg font-bold text-blue">Quiz Instructions</h1>
        <p>
          The quiz contains{' '}
          <span className="font-semibold text-blue">10 to 20</span> multiple
          choice questions of a category of your choosing.
        </p>
        <p>
          You have <span className="font-semibold text-blue">15 seconds </span>
          to answer each question. If you do not provide an answer after 15
          seconds, the question is marked as incorrect.
        </p>
        <ol className="list-decimal pl-5 mt-3">
          <li>Select an available quiz</li>
          <li>Choose the number of questions you want (10 to 20)</li>
          <li>Start the Quiz!</li>
          <li>View your results</li>
        </ol>
      </div>
      <StartQuizForm />
    </div>
  );
}
