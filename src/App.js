import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Header from './components/Header';
import MatchList from './components/MatchList';
import MatchDetail from './components/MatchDetail';
import About from './components/About';

const App = () => {
  return (
    <Router>
      <div>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Header />
        </Link>
        <Routes>
          <Route path="/" element={<MatchList />} />
          <Route path="/matches/:matchId" element={<MatchDetail />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
