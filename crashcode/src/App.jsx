import MainContainer from './components/Main/MainContainer.jsx';
import React, { useState } from 'react';
import { Link, Route, BrowserRouter, Routes } from 'react-router-dom';
import './index.css';
import SignInOutContainer from './components/Authentication/SignInOutContainer.jsx';
import QuizPage from './components/Quiz/QuizPage.jsx';
import { Switch } from '@mui/material';

function App() {
  const [flashcards, setFlashCards] = useState(SAMPLE_FLASHCARDS);
  const [account, setAccount] = useState('');
  const [token, setToken] = useState();

  if (!token) {
    return (
      <>
        {/* <Link to="/main">Main Page</Link> */}
        <SignInOutContainer setToken={setToken} />
      </>
    );
  }

  return (
    <div className="App">
      {/* <Link to="/main">Main Page</Link> */}

      <SignInOutContainer userId={account} setAccount={setAccount} />
    </div>
  );
}

const SAMPLE_FLASHCARDS = [
  {
    id: 1,
    question: "What is Andrew's last name?",
    answer: 'Widjaja',
  },
  {
    id: 2,
    question: "What is Em's last name?",
    answer: 'Podhorcer',
  },
  {
    id: 3,
    question: "What is Kevin's last name?",
    answer: 'Le',
  },
  {
    id: 4,
    question: "What is Anna's last name?",
    answer: 'Shen',
  },
];

export default App;
