import React from 'react';

const Team = ({ team }) => {
  const totalPoints = team.reduce((acc, player) => acc + player.points, 0);

  return (
    <div>
      <h3>Your Team (Max 11 Players)</h3>
      <ul>
        {team.map((player) => (
          <li key={player._id}>
            {player.name} - {player.position} - {player.points} points
          </li>
        ))}
      </ul>
      <p>Total Points: {totalPoints}</p>
    </div>
  );
};

export default Team;
