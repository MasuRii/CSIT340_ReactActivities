import React from 'react';
import BingoCard from './BingoCard';

const BingoCardList = ({ cards, calledNumbers }) => {
  return (
    <div className="bingo-card-list">
      {cards.map(({ playcard_token, card }) => (
        <BingoCard key={playcard_token} playcardToken={playcard_token} card={card} calledNumbers={calledNumbers} />
      ))}
    </div>
  );
};

export default BingoCardList;