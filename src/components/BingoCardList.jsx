import React from 'react';
import BingoCard from './BingoCard';

const BingoCardList = ({ cards }) => {
  return (
    <div className="bingo-card-list">
      {cards.map(({ playcard_token, card }) => (
        <BingoCard key={playcard_token} playcardToken={playcard_token} card={card} />
      ))}
    </div>
  );
};

export default BingoCardList;