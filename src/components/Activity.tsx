import React, { useState, useEffect, useContext } from "react";
import { IntroDiv, BgImage, PrevBtn, PrevBtnImage, BarBanana ,BarImage } from "./Intro";
import { useNavigate } from "react-router-dom";
import Card from "./Card";
import styled from "@emotion/styled";
import { usePageState } from "./PageContext";

const CardsDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: absolute;
  left: 23vw;
  top: 26vh;
`;

const Activity = () => {
    const navigate = useNavigate();
    const [cards, setCards] = useState<{ id: number; symbol: string; isFlipped: boolean; isMatched: boolean }[]>([]);
    const [selectedCardIndices, setSelectedCardIndices] = useState<number[]>([]);
    const [showMatchOverlay, setShowMatchOverlay] = useState(false);
    const [matchedCards, setMatchedCards] = useState<string[]>([]); // Store matched symbols
    const {correctMatches,increaseMatches}=usePageState();// Track correct matches for progress
    const [noOfClicks,setNoOfClicks] = useState(20);
    useEffect(() => {
      // Generate initial cards with random symbols
      const symbols = ['🍎', '🍌', '🍒', '🍇', '🍊', '🍉'];
      const initialCards = symbols
        .concat(symbols) // Create pairs of symbols
        .map((symbol, index) => ({ id: index, symbol, isFlipped: true, isMatched: false }));
      setCards(shuffleArray(initialCards));

      setTimeout(() => {
        setCards((prevCards) => prevCards.map((card) => ({ ...card, isFlipped: false })));
        
      }, 2000);
    }, []);
  
    const handleClick = (index: number) => {
        if(noOfClicks===0){
            navigate('/rewards');
        }
        setNoOfClicks(noOfClicks-1);
      // Only allow clicking on unflipped cards and limit to two selected cards
      if (!cards[index].isFlipped && selectedCardIndices.length < 2) {
        setSelectedCardIndices((prevIndices) => [...prevIndices, index]);
        setCards((prevCards) => {
          const newCards = [...prevCards];
          newCards[index].isFlipped = true;
          return newCards;
        });
      }
    };
  
    useEffect(() => {
      if (selectedCardIndices.length === 2) {
        setTimeout(() => checkMatch(), 500); // Delay to show the second card before checking for a match
      }
    }, [selectedCardIndices]);
  
    useEffect(() => {
      if (showMatchOverlay) {
        setTimeout(() => setShowMatchOverlay(false), 1000); // Show the match overlay for 1 second
      }
    }, [showMatchOverlay]);
  
    const checkMatch = () => {
      const [index1, index2] = selectedCardIndices;
      if (cards[index1]?.symbol === cards[index2]?.symbol) {
        // Matching cards
        setCards((prevCards) => {
          const newCards = [...prevCards];
          newCards[index1].isMatched = true;
          newCards[index2].isMatched = true;
          console.log("Match!");
          return newCards;
        });
        setShowMatchOverlay(true);
        setMatchedCards((prevMatched) => [...prevMatched, cards[index1].symbol]);
        increaseMatches(); // Increment correct matches
        if(correctMatches===5){    
            navigate('/rewards');
        }
        
      } else {
        // Not matching cards
        setTimeout(() => {
          setCards((prevCards) => {
            const newCards = [...prevCards];
            newCards[index1].isFlipped = false;
            newCards[index2].isFlipped = false;
            return newCards;
          });
        }, 500); // Delay to show both cards before flipping them back
      }
      setSelectedCardIndices([]);
    };
  
    const shuffleArray = (array: any[]) => {
      return array.sort(() => Math.random() - 0.5);
    };

  return (
    <IntroDiv>
    <BgImage src={require("../assets/introbg.png")} alt="introbg" />
    <PrevBtn onClick={() => navigate('/')}>
      <PrevBtnImage src={require("../assets/backbtn.png")} alt="prevbtn" />
    </PrevBtn>
    <BarImage src={require("../assets/bar.png")} alt="bar" />
    
    <div style={{ position: "absolute",top:'4.58vh',left:'23vw', width: "51.38vw", height: "5.73vh", borderRadius: "10px", backgroundColor: "#FFFFFF" }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: `${correctMatches * 16.66}%`, height: "100%", backgroundColor: "#FFC700", borderRadius: "10px" }} />
    </div>
    
    <BarBanana src={require("../assets/barbanana.png")} alt="barbanana" />
    
    
    <CardsDiv>
      {cards.map((card, index) => (
        <Card
          key={card.id}
          symbol={card.symbol}
          isFlipped={card.isFlipped}
          isClickable={!selectedCardIndices.includes(index) && !card.isFlipped}
          isMatched={card.isMatched}
          onClick={() => handleClick(index)}
        />
      ))}
    </CardsDiv>
    {showMatchOverlay && (
      <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 999, display: "flex", justifyContent: "center", alignItems: "center", color: "white", fontSize: "2rem" }}>
        <div>Match Found!</div>
        <div>Matched Cards: {matchedCards.join(', ')}</div>
      </div>
    )}
    <div style={{position:'absolute',top:0,left:0}}>
        <p>No of clicks left:{noOfClicks}</p>
    </div>
  </IntroDiv>
  );
};

export default Activity;
