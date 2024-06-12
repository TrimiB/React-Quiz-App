import { useEffect } from 'react';
import { useQuestions } from '../context/QuestionsProvider';

function Timer() {
  const { secondsRemaining, dispatch } = useQuestions();

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: 'timer' });
    }, 1000);

    return () => clearInterval(id);
  }, [dispatch]);

  return (
    <div className='timer'>
      {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
    </div>
  );
}

export default Timer;
