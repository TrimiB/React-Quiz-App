function NextButton({ dispatch, answer, numQuestions, index, status }) {
  if (answer === null) return null;

  if (index < numQuestions - 1) {
    return (
      <button className='btn btn-ui' onClick={() => dispatch({ type: 'nextQuestion' })}>
        Next
      </button>
    );
  }

  if (index === numQuestions - 1) {
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
