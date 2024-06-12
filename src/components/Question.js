import { useQuestions } from '../context/QuestionsProvider';
import Options from './Options';

function Question() {
  const { questions, index } = useQuestions();
  const question = questions.at(index);
  // console.log(question);
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} />
    </div>
  );
}

export default Question;
