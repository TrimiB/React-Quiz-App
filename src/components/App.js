import { useEffect, useReducer } from 'react';
import Header from './Header';
import Main from './Main';
import Loader from './Loader';
import Error from './Error';
import StartScreen from './StartScreen';
import Question from './Question';
import NextButton from './NextButton';
import Progress from './Progress';
import FinishScreen from './FinishScreen';
import Timer from './Timer';
import Footer from './Footer';

const SEC_PER_QUESTION = 10;

const initialState = {
  questions: [],
  status: 'loading', // 'loading', 'error', 'ready', 'active', 'finished'
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'dataRecieved':
      return { ...state, questions: action.payload, status: 'ready' };
    case 'dataFailed':
      return { ...state, status: 'error' };
    case 'startQuiz':
      return {
        ...state,
        status: 'active',
        secondsRemaining: state.questions.length * SEC_PER_QUESTION,
      };
    case 'newAnswer':
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption ? state.points + question.points : state.points,
      };
    case 'nextQuestion':
      return { ...state, index: state.index + 1, answer: null };
    case 'finished':
      return {
        ...state,
        status: 'finished',
        highscore: state.points > state.highscore ? state.points : state.highscore,
      };
    case 'reset':
      return {
        ...initialState,
        questions: state.questions,
        status: 'ready',
      };
    case 'timer':
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? 'finished' : state.status,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

export default function App() {
  const [{ questions, status, index, answer, points, highscore, secondsRemaining }, dispatch] =
    useReducer(reducer, initialState);
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((prev, qur) => prev + qur.points, 0);

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
        {status === 'active' && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Question question={questions[index]} answer={answer} dispatch={dispatch} />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                numQuestions={numQuestions}
                index={index}
              />
            </Footer>
          </>
        )}
        {status === 'finished' && (
          <>
            <FinishScreen
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              highscore={highscore}
            />
            <NextButton status={status} dispatch={dispatch} />
          </>
        )}
      </Main>
    </div>
  );
}
