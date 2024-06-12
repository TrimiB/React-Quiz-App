import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import { QuestionsProvider } from './context/QuestionsProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QuestionsProvider>
      <App />
    </QuestionsProvider>
  </React.StrictMode>
);
