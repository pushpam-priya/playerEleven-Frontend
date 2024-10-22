import React from 'react';

const PlayerList = ({ players, addPlayerToTeam }) => {
  return (
    <div>
      <h3>Available Players</h3>
      <ul>
        {players.map((player) => (
          <li key={player._id}>
            {player.name} - {player.position} - {player.points} points
            <button onClick={() => addPlayerToTeam(player)}>Add to Team</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlayerList;
