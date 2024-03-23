import React from 'react';
import './App.css';
import Intro from './components/Intro';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Activity from './components/Activity';
import Rewards from './components/Rewards';

const App:React.FC=()=> {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Intro/>}/>
        <Route path='/intro' element={<Intro/>}/>
        <Route path='/activity' element={<Activity/>}/>
        <Route path='/rewards' element={<Rewards/>}/>
      </Routes>
    </Router>
  );
}

export default App;
