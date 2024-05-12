import { useEffect, useReducer } from 'react';
import Header from './Header';
import Main from './Main';
import Loader from './Loader';
import Error from './Error';

const initialState = {
  questions: [],

  // 'loading', 'error', 'ready', 'active', 'finished'
  status: 'loading',
};

function reducer(state, action) {
  switch (action.type) {
    case 'dataRecieved':
      return { ...state, questions: action.payload, status: 'ready' };
    case 'dataFailed':
      return { ...state, status: 'error' };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

export default function App() {
  const [{ questions, status }, dispatch] = useReducer(reducer, initialState);

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

  return (
    <div className='app'>
      <Header />

      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
      </Main>
    </div>
  );
}
