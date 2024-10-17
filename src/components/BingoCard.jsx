import React, { useEffect, useState } from 'react';

const BingoCard = ({ playcardToken, card }) => {
  const [isWinner, setIsWinner] = useState(false);
  const [highlighted, setHighlighted] = useState({});

  const checkWin = () => {
    fetch(`http://www.hyeumine.com/checkwin.php?playcard_token=${playcardToken}`)
      .then(response => response.json())
      .then(data => setIsWinner(data === 1))
      .catch(() => setIsWinner(false));
  };

  const toggleHighlight = (column, number) => {
    setHighlighted(prev => {
      const key = `${column}-${number}`;
      return { ...prev, [key]: !prev[key] };
    });
  };

  return (
    <div className="bingo-card">
      <div className="card-grid">
        {Object.keys(card).map((column) => (
          <div key={column} className="card-column">
            <div className="column-header">{column}</div>
            {card[column].map((number, index) => {
              const key = `${column}-${number}`;
              return (
                <div
                  key={index}
                  className={`card-cell ${highlighted[key] ? 'highlighted' : ''}`}
                  onClick={() => toggleHighlight(column, number)}
                >
                  {number}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <button onClick={checkWin}>Check Win</button>
      {isWinner && <div className="winner">You have a Bingo!</div>}
    </div>
  );
};

export default BingoCard;