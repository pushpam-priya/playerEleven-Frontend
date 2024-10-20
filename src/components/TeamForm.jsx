// src/components/TeamForm.js
import React, { useState } from 'react';
import PlayerList from './PlayerList';
import Team from './Team';

const TeamForm = () => {
  // Hardcoded list of players
  const hardcodedPlayers = [
    { _id: 1, name: 'Player 1', position: 'Batsman', points: 50 },
    { _id: 2, name: 'Player 2', position: 'Bowler', points: 70 },
    { _id: 3, name: 'Player 3', position: 'All-rounder', points: 90 },
    { _id: 4, name: 'Player 4', position: 'Batsman', points: 40 },
    { _id: 5, name: 'Player 5', position: 'Bowler', points: 80 },
    { _id: 6, name: 'Player 6', position: 'Wicketkeeper', points: 60 },
    { _id: 7, name: 'Player 7', position: 'Batsman', points: 55 },
    { _id: 8, name: 'Player 8', position: 'Bowler', points: 75 },
    { _id: 9, name: 'Player 9', position: 'All-rounder', points: 95 },
    { _id: 10, name: 'Player 10', position: 'Batsman', points: 65 },
    { _id: 11, name: 'Player 11', position: 'Bowler', points: 85 },
    { _id: 12, name: 'Player 12', position: 'All-rounder', points: 92 }
  ];

  const [team, setTeam] = useState([]);
  const [teamName, setTeamName] = useState('');
  const [error, setError] = useState('');

  // Add a player to the team
  const addPlayerToTeam = (player) => {
    if (team.length >= 11) {
      setError('You can only add 11 players.');
      return;
    }
    if (!team.some(p => p._id === player._id)) {
      setTeam([...team, player]);
      setError('');
    } else {
      setError('Player is already in the team.');
    }
  };

  // Handle team creation (submission)
  const handleSubmit = () => {
    if (!teamName) {
      setError('Team name is required.');
      return;
    }
    if (team.length === 0) {
      setError('Select at least one player.');
      return;
    }
    alert(`Team "${teamName}" created with ${team.length} players!`);
  };

  return (
    <div>
      <h2>Create Your Fantasy Team</h2>
      <input
        type="text"
        placeholder="Enter Team Name"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
      />
      <PlayerList players={hardcodedPlayers} addPlayerToTeam={addPlayerToTeam} />
      <Team team={team} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleSubmit}>Create Team</button>
    </div>
  );
};

export default TeamForm;
