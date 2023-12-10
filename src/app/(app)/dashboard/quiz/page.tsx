import StartQuizForm from './StartQuizForm';

export default async function Quiz() {
  return (
    <div className="lg:pl-56 px-3 py-10 min-h-[92.9vh] bg-indigo-100 text-custom-black">
      <h1 className="text-lg font-bold">Quiz Instructions</h1>
      <p>
        The quiz contains <span className="font-semibold">10 to 20</span>{' '}
        multiple choice questions of a category of your choosing.
      </p>
      <p>
        You have <span className="font-semibold">45 seconds </span>
        to answer each question. If you do not provide an answer after 45
        seconds, the question is marked as incorrect.
      </p>
      <ol className="list-decimal pl-5">
        <li>Select a category</li>
        <li>Choose the number of questions you want (10 to 20)</li>
        <li>Start the Quiz!</li>
      </ol>
      <StartQuizForm />
    </div>
  );
}
