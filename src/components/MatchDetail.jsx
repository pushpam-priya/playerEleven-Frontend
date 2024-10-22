// MatchDetail.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import '../App.css';

const MatchDetail = () => {
  const { matchId } = useParams();
  const [match, setMatch] = useState(null);
  const [team1Players, setTeam1Players] = useState([]);
  const [team2Players, setTeam2Players] = useState([]);
  const [userTeam, setUserTeam] = useState([]);
  const [remainingPoints, setRemainingPoints] = useState(100);

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/matches/${matchId}`);
        const data = await response.json();
        setMatch(data);
        fetchPlayers(data.team1, data.team2);
      } catch (error) {
        console.error('Error fetching match:', error);
      }
    };

    fetchMatch();
  }, [matchId]);

  const fetchPlayers = async (team1, team2) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/teams`);
      const teams = await response.json();

      const team1Data = teams.find((team) => team.team_name === team1);
      const team2Data = teams.find((team) => team.team_name === team2);

      if (team1Data) {
        const playersWithDetails = await Promise.all(
          team1Data.players.map(fetchPlayerDetails)
        );
        setTeam1Players(playersWithDetails);
      }

      if (team2Data) {
        const playersWithDetails = await Promise.all(
          team2Data.players.map(fetchPlayerDetails)
        );
        setTeam2Players(playersWithDetails);
      }
    } catch (error) {
      console.error('Error fetching players:', error);
    }
  };

  const fetchPlayerDetails = async (playerName) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/players`);
      const players = await response.json();
      const player = players.find((p) => p.name === playerName);
      return player || { name: playerName, age: 'N/A', points: 'N/A' };
    } catch (error) {
      console.error('Error fetching player details:', error);
      return { name: playerName, age: 'N/A', points: 'N/A' };
    }
  };

  const addToUserTeam = (player) => {
    if (userTeam.length >= 11) {
      alert('Your team is full! You can only have 11 players.');
      return;
    }
    if (remainingPoints - player.points >= 0) {
      setUserTeam([...userTeam, player]);
      setRemainingPoints(remainingPoints - player.points);
    } else {
      alert('Not enough points!');
    }
  };

  const removeFromUserTeam = (player) => {
    setUserTeam(userTeam.filter((p) => p.name !== player.name));
    setRemainingPoints(remainingPoints + player.points);
  };

  const createTeam = () => {
    if (userTeam.length === 11) {
      alert('Team Created (Note: This team is created on temporary basis just to show functionality)');
    } else {
      alert('Please select 11 players!');
    }
  };

  const isPlayerInUserTeam = (playerName) => {
    return userTeam.some(player => player.name === playerName);
  };

  const isTeamFull = userTeam.length >= 11;

  if (!match) {
    return <p>Loading match details...</p>;
  }

  return (
    <div className="match-detail">
      <h1>{`${match.team1} vs ${match.team2}`}</h1>
      <div className="user-team">
        <h2>Your Team (Remaining Points: {remainingPoints})</h2>
        <p>Players: {userTeam.length}/11</p>
        <ul>
          {userTeam.map((player, index) => (
            <li key={index}>
              {player.name} (Points: {player.points})
              <button onClick={() => removeFromUserTeam(player)}>Remove</button>
            </li>
          ))}
        </ul>
        <button 
          className="create-team-btn" 
          onClick={createTeam}
        >
          {userTeam.length === 11 ? 'Create Team' : 'Please select 11 players!'}
        </button>
      </div>
      <div className="teams-container">
        <div className="team">
          <h2>{match.team1}</h2>
          <ul className="player-list">
            {team1Players.map((player, index) => (
              <li key={index} className="player-item">
                <span>{player.name} (Age: {player.age}, Points: {player.points})</span>
                <button 
                  onClick={() => addToUserTeam(player)}
                  disabled={isPlayerInUserTeam(player.name) || isTeamFull}
                  className={isPlayerInUserTeam(player.name) || isTeamFull ? 'disabled' : ''}
                >
                  {isPlayerInUserTeam(player.name) ? 'Added' : isTeamFull ? 'Team Full' : 'Add to Team'}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="team">
          <h2>{match.team2}</h2>
          <ul className="player-list">
            {team2Players.map((player, index) => (
              <li key={index} className="player-item">
                <span>{player.name} (Age: {player.age}, Points: {player.points})</span>
                <button 
                  onClick={() => addToUserTeam(player)}
                  disabled={isPlayerInUserTeam(player.name) || isTeamFull}
                  className={isPlayerInUserTeam(player.name) || isTeamFull ? 'disabled' : ''}
                >
                  {isPlayerInUserTeam(player.name) ? 'Added' : isTeamFull ? 'Team Full' : 'Add to Team'}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Link to="/" className="back-link">Back to Match List</Link>
    </div>
  );
};

export default MatchDetail;
