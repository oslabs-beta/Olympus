import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Home from './routes/Home'
import Team from './routes/Team'
import Demo from './routes/Demo'
import './styles/Index.css'

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