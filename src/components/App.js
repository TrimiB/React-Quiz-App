import { useEffect, useReducer } from 'react';
import Header from './Header';
import Main from './Main';
import Loader from './Loader';
import Error from './Error';
import StartScreen from './StartScreen';
import Question from './Question';

const initialState = {
  questions: [],

  // 'loading', 'error', 'ready', 'active', 'finished'
  status: 'loading',
  index: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case 'dataRecieved':
      return { ...state, questions: action.payload, status: 'ready' };
    case 'dataFailed':
      return { ...state, status: 'error' };
    case 'startQuiz':
      return { ...state, status: 'active' };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

export default function App() {
  const [{ questions, status, index }, dispatch] = useReducer(reducer, initialState);
  const numQuestions = questions.length;

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await fetch('http://localhost:3001/questions');
        // console.log(response);
        if (!response.ok) throw new Error(`HTTP error ${response.status} | ${response.statusText}`);

        const data = await response.json();
        // console.log(data);
        // setQuestions(data);
        dispatch({ type: 'dataRecieved', payload: data });
      } catch (error) {
        // console.error('Error fetching questions:', error);
        dispatch({ type: 'dataFailed' });
      }
    }
    fetchQuestions();
  }, []);
  // console.log(questions);

  return (
    <div className='app'>
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <StartScreen numQuestions={numQuestions} dispatch={dispatch} />}
        {status === 'active' && <Question question={questions[index]} />}
      </Main>
    </div>
  );
}
