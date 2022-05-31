import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Home from './routes/Home.jsx'
import Team from './routes/Team.jsx'
import Demo from './routes/Demo.jsx'
import './styles/index.css'

function App() {
  return(
    <div className='App'>
        <Routes>
            <Route path ='/' element = {<Home/>} />
            <Route path ='/Team' element = {<Team />} />
            <Route path ='/Demo' element = {<Demo />} />
        </Routes>
    </div>
  );
}

export default App;