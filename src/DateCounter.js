import { useReducer, useState } from 'react';

function reducer(state, action) {
  if (action.type === 'DECREMENT') return state - action.payload;
  if (action.type === 'INCREMENT') return state + action.payload;
  if (action.type === 'SET_COUNT') return action.payload;
  if (action.type === 'RESET-COUNT') return action.payload;
}

function DateCounter() {
  // const [count, setCount] = useState(0);
  const [count, dispatch] = useReducer(reducer, 0);
  const [step, setStep] = useState(1);

  // This mutates the date object.
  const date = new Date('june 21 2027');
  date.setDate(date.getDate() + count);

  const dec = function () {
    // setCount((count) => count - 1);
    // setCount((count) => count - step);
    dispatch({ type: 'DECREMENT', payload: 1 });
  };

  const inc = function () {
    // setCount((count) => count + 1);
    // setCount((count) => count + step);
    dispatch({ type: 'INCREMENT', payload: 1 });
  };

  const defineCount = function (e) {
    // setCount(Number(e.target.value));
    dispatch({ type: 'SET', payload: Number(e.target.value) });
  };

  const defineStep = function (e) {
    setStep(Number(e.target.value));
  };

  const reset = function () {
    // setCount(0);
    dispatch({ type: 'RESET-COUNT', payload: 0 });
    setStep(1);
  };

  return (
    <div className='counter'>
      <div>
        <input type='range' min='0' max='10' value={step} onChange={defineStep} />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
