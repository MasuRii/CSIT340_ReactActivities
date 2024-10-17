import React, { useState } from 'react';
import JoinGame from './components/JoinGame';
import BingoCardList from './components/BingoCardList';

const App = () => {
  const [gameCode, setGameCode] = useState('');
  const [cards, setCards] = useState([]);

  const handleJoin = (code) => {
    setGameCode(code);
    fetch(`http://www.hyeumine.com/getcard.php?bcode=${code}`)
      .then(response => response.json())
      .then(data => {
        if (data !== 0) {
          setCards(prev => [...prev, { playcard_token: data.playcard_token, card: data.card }]);
        }
      })
      .catch(() => {});
  };

  return (
    <div className="app">
      <h1>E-Bingo</h1>
      {!gameCode && <JoinGame onJoin={handleJoin} />}
      {gameCode && <BingoCardList cards={cards} />}
    </div>
  );
};

export default App;