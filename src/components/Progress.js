import { useQuestions } from '../context/QuestionsProvider';

function Progress() {
  const { index, numQuestions, points, maxPossiblePoints, answer } = useQuestions();
  return (
    <header className='progress'>
      <progress value={index + Number(answer !== null)} max={numQuestions} />
      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {maxPossiblePoints}
      </p>
    </header>
  );
}

export default Progress;
