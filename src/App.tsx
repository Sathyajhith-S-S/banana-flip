import React from 'react';
import './App.css';
import Intro from './components/Intro';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Activity from './components/Activity';
import Rewards from './components/Rewards';
import { PageStateProvider } from './components/PageContext'; // Import the context provider

const App: React.FC = () => {
  return (
    <Router>
      <PageStateProvider> {/* Wrap your routes with the context provider */}
        <Routes>
          <Route path='/' element={<Intro />} />
          <Route path='/activity' element={<Activity />} />
          <Route path='/rewards' element={<Rewards />} />
        </Routes>
      </PageStateProvider>
    </Router>
  );
}

export default App;

