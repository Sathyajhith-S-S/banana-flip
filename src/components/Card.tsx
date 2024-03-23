import React from 'react';
import styled from '@emotion/styled';

const StyledCard = styled.div<{ isFlipped: boolean; isClickable: boolean; isMatched: boolean }>`
  width: 100px;
  height: 100px;
  background-color: ${({ isFlipped }) => (isFlipped ? 'white' : '#ccc')};
  border-radius: 10px;
  margin-right: 50px;
  margin-bottom: 50px;
  cursor: ${({ isClickable }) => (isClickable ? 'pointer' : 'default')};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  opacity: ${({ isMatched }) => (isMatched ? 0 : 1)};
`;

interface CardProps {
  symbol: string;
  isFlipped: boolean;
  isClickable: boolean;
  isMatched: boolean;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ symbol, isFlipped, isClickable, isMatched, onClick }) => {
  const handleCardClick = () => {
    // Check if the card is clickable before handling the click event
    if (isClickable && !isMatched) {
      onClick(); // Call the onClick prop to handle card click in the parent component
    }
  };

  return (
    <StyledCard isFlipped={isFlipped} isClickable={isClickable} isMatched={isMatched} onClick={handleCardClick}>
      {isFlipped ? <div>{symbol}</div> : null}
    </StyledCard>
  );
};

export default Card;

