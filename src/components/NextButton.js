import { useQuestions } from '../context/QuestionsProvider';

function NextButton() {
  const { answer, numQuestions, index, status, dispatch } = useQuestions();

  if (answer === null) return null;

  if (index < numQuestions - 1) {
    return (
      <button className='btn btn-ui' onClick={() => dispatch({ type: 'nextQuestion' })}>
        Next
      </button>
    );
  }

  if (index === numQuestions - 1 && status === 'active') {
    return (
      <button className='btn btn-ui' onClick={() => dispatch({ type: 'finished' })}>
        Finish
      </button>
    );
  }

  if (status === 'finished') {
    return (
      <button className='btn btn-ui' onClick={() => dispatch({ type: 'reset' })}>
        Reset quiz
      </button>
    );
  }
}

export default NextButton;
