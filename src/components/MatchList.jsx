import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import '../App.css';


const MatchList = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      const response = await fetch(`${API_BASE_URL}/api/matches`);
      const data = await response.json();
      setMatches(data);
    };

    fetchMatches();
  }, []);

  return (
    <div className="match-list">
      <h1>Match List</h1>
      <div className="match-cards">
        {matches.map((match) => (
          <div key={match._id} className="match-card">
            <Link to={`/matches/${match._id}`} style={{ textDecoration: 'none' }}>
              <h2>{`${match.team1} vs ${match.team2}`}</h2>
              <p>{`Venue: ${match.venue}`}</p>
              <p>{`Time: ${new Date(match.time).toLocaleString()}`}</p>
              <p className="status">{`Status: ${match.status}`}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchList;
