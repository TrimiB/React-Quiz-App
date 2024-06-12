import { createContext, useContext } from 'react';

const QuestionsContext = createContext();

function QuestionsProvider({ children }) {
  return <QuestionsContext.Provider value={{}}>{children}</QuestionsContext.Provider>;
}

function useQuestions() {
  const context = useContext(QuestionsContext);
  if (context === undefined) {
    throw new Error('useQuestions must be used within a QuestionsProvider');
  }
  return context;
}
export { QuestionsProvider, useQuestions };
