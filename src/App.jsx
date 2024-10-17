import React, { useState, useEffect } from 'react';
import JoinGame from './components/JoinGame';
import BingoCardList from './components/BingoCardList';

const App = () => {
  const [gameCode, setGameCode] = useState('');
  const [cards, setCards] = useState([]);
  const [calledNumbers, setCalledNumbers] = useState([]);

  const handleJoin = (code) => {
    setGameCode(code);
    fetchCard(code);
  };

  const fetchCard = (code) => {
    fetch(`/api/getcard.php?bcode=${code}`)
      .then(response => response.json())
      .then(data => {
        if (data !== 0) {
          setCards(prev => [...prev, { playcard_token: data.playcard_token, card: data.card }]);
        }
      })
      .catch(() => {});
  };

  const handleAddCard = () => {
    fetchCard(gameCode);
  };

  const fetchCalledNumbers = () => {
    fetch(`/api/bingodashboard.php?bcode=${gameCode}`)
      .then(response => response.text())
      .then(htmlString => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');
        const buttons = Array.from(doc.querySelectorAll('button.btn-success'));
        const numbers = buttons.map(btn => parseInt(btn.textContent));
        setCalledNumbers(numbers);
      })
      .catch(() => {});
  };

  useEffect(() => {
    if (gameCode) {
      fetchCalledNumbers();
      const interval = setInterval(fetchCalledNumbers, 5000);
      return () => clearInterval(interval);
    }
  }, [gameCode]);

  return (
    <div className="app">
      <h1>E-Bingo</h1>
      {!gameCode && <JoinGame onJoin={handleJoin} />}
      {gameCode && (
        <>
          <button onClick={handleAddCard}>Add More Cards</button>
          <BingoCardList cards={cards} calledNumbers={calledNumbers} />
        </>
      )}
    </div>
  );
};

export default App;