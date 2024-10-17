import React, { useState } from 'react';

const JoinGame = ({ onJoin }) => {
  const [gameCode, setGameCode] = useState('');

  const handleJoin = () => {
    onJoin(gameCode);
  };

  return (
    <div className="join-game">
      <input
        type="text"
        value={gameCode}
        onChange={e => setGameCode(e.target.value)}
        placeholder="Enter Game Code"
      />
      <button onClick={handleJoin}>Join Game</button>
    </div>
  );
};

export default JoinGame;