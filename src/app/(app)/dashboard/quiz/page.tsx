import StartQuizForm from './StartQuizForm';

export default async function Quiz() {
  return (
    <div className="lg:pl-56 px-3 py-10 min-h-[92.9vh] bg-indigo-100 text-custom-black">
      <h1 className="text-lg font-bold">Quiz Instructions</h1>
      <p>
        The quiz contains 10 to 20 multiple choice questions of a category of
        your choosing.
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
