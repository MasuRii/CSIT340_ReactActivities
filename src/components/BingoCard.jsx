import React, { useEffect, useState } from 'react';

const BingoCard = ({ playcardToken, card, calledNumbers }) => {
  const [isWinner, setIsWinner] = useState(false);
  const [highlightedManual, setHighlightedManual] = useState({});
  const [highlightedAuto, setHighlightedAuto] = useState([]);

  useEffect(() => {
    const autoHighlights = [];
    Object.keys(card).forEach(column => {
      card[column].forEach(number => {
        if (calledNumbers.includes(number)) {
          autoHighlights.push(`${column}-${number}`);
        }
      });
    });
    setHighlightedAuto(autoHighlights);
  }, [calledNumbers, card]);

  const checkWin = () => {
    fetch(`http://www.hyeumine.com/checkwin.php?playcard_token=${playcardToken}`)
      .then(response => response.text())
      .then(data => setIsWinner(parseInt(data) === 1))
      .catch(() => setIsWinner(false));
  };

  const toggleHighlightManual = (column, number) => {
    setHighlightedManual(prev => {
      const key = `${column}-${number}`;
      const newHighlights = { ...prev };
      if (newHighlights[key]) {
        delete newHighlights[key];
      } else {
        newHighlights[key] = true;
      }
      return newHighlights;
    });
  };

  const isHighlighted = (column, number) => {
    const key = `${column}-${number}`;
    return highlightedManual[key] || highlightedAuto.includes(key);
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
                  className={`card-cell ${isHighlighted(column, number) ? 'highlighted' : ''}`}
                  onClick={() => toggleHighlightManual(column, number)}
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