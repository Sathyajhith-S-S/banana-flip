import React from "react";
import styled from "@emotion/styled";
import bluecard from "../assets/bluecard.png";
import pinkcard from "../assets/pinkcard.png";
const StyledCard = styled.div<{
  isFlipped: boolean;
  isClickable: boolean;
  isMatched: boolean;
}>`
  width: 150px; /* Set a fixed width for the card */
  height: 190px; /* Set a fixed height for the card */
  background-color: ${({ isFlipped }) => (isFlipped ? "white" : "transparent")};
  border-radius: 10px;
  cursor: ${({ isClickable }) => (isClickable ? "pointer" : "default")};
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s ease; /* Add a smooth transition for flipping */
  margin-right: 50px; /* Add margin to the right */
  margin-bottom: 50px; /* Add margin to the bottom */
  &:hover {
    transform: ${({ isClickable }) => (isClickable ? "scale(1.05)" : "none")};
  }
`;

interface CardProps {
  symbol: string;
  isFlipped: boolean;
  isClickable: boolean;
  isMatched: boolean;
  onClick: () => void;
  color: string;
}

const Card: React.FC<CardProps> = ({
  symbol,
  isFlipped,
  isClickable,
  isMatched,
  onClick,
  color,
}) => {
  const handleCardClick = () => {
    // Check if the card is clickable before handling the click event
    if (isClickable && !isMatched) {
      onClick(); // Call the onClick prop to handle card click in the parent component
    }
  };

  return (
    <StyledCard
      isFlipped={isFlipped}
      isClickable={isClickable && !isMatched}
      isMatched={isMatched}
      onClick={handleCardClick}
      style={isMatched?{visibility:"hidden"}:{}}
    >
      {isFlipped ? (
        <div style={{ fontSize: "3rem" }}>{symbol}</div>
      ) : (
        <img src={color === "pink" ? pinkcard : bluecard} alt="Blue Card" />
      )}
    </StyledCard>
  );
};

export default Card;
