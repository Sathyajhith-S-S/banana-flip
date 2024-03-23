import React, { useState, useEffect, useContext } from "react";
import {
  IntroDiv,
  BgImage,
  PrevBtn,
  PrevBtnImage,
  BarBanana,
  BarImage,
} from "./Intro";
import { useNavigate } from "react-router-dom";
import Card from "./Card";
import styled from "@emotion/styled";
import { usePageState } from "./PageContext";

const CardsDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: absolute;
  left: 9vw;
  top: 26vh;
  width: 600px;
`;

const Activity = () => {
  const navigate = useNavigate();
  const [cards1, setCards1] = useState<
    { id: number; symbol: string; isFlipped: boolean; isMatched: boolean }[]
  >([]);
  const [cards2, setCards2] = useState<
    { id: number; symbol: string; isFlipped: boolean; isMatched: boolean }[]
  >([]);
  const [selectedCardIndices, setSelectedCardIndices] = useState<number[]>([]);
  const [showMatchOverlay, setShowMatchOverlay] = useState(false);
  const [matchedCards, setMatchedCards] = useState<string[]>([]); // Store matched symbols
  const { correctMatches, increaseMatches, setMatches } = usePageState(); // Track correct matches for progress
  const [noOfClicks, setNoOfClicks] = useState(20);
  const [cardsSet, setCardsSet] = useState("");
  useEffect(() => {
    // Generate initial cards with random symbols
    const symbols = ["🍎", "🍌", "🍒", "🍇", "🍊", "🍉"];
    //   const alphas=['A','B','C','G','O','W'];
    const alphas = ["🍎", "🍌", "🍒", "🍇", "🍊", "🍉"];
    const initialCards = symbols
      // Create pairs of symbols
      .map((symbol, index) => ({
        id: index,
        symbol,
        isFlipped: true,
        isMatched: false,
      }));
    setCards1(shuffleArray(initialCards));
    const alphaCards = alphas.map((symbol, index) => ({
      id: index,
      symbol,
      isFlipped: true,
      isMatched: false,
    }));
    setCards2(shuffleArray(alphaCards));
    setTimeout(() => {
      setCards1((prevCards) =>
        prevCards.map((card) => ({ ...card, isFlipped: false }))
      );
      setCards2((prevCards) =>
        prevCards.map((card) => ({ ...card, isFlipped: false }))
      );
    }, 2000);
  }, []);

  const handleClick = (index: number, cardSet: "cards1" | "cards2") => {
    if (noOfClicks === 0) {
      navigate("/rewards");
      return; // Added return to prevent further execution
    }

    const selectedCards = cardSet === "cards1" ? cards1 : cards2;
    if (
      (cardsSet === "" && cardSet === "cards1") ||
      (cardsSet === "cards1" && cardSet === "cards2")
    ) {
      setNoOfClicks(noOfClicks - 1);
      if (!selectedCards[index].isFlipped && selectedCardIndices.length < 2) {
        setSelectedCardIndices((prevIndices) => [...prevIndices, index]);
        if (cardSet === "cards1") {
          setCards1((prevCards) => {
            const newCards = [...prevCards];
            newCards[index].isFlipped = true;
            return newCards;
          });
        } else {
          setCards2((prevCards) => {
            const newCards = [...prevCards];
            newCards[index].isFlipped = true;
            return newCards;
          });
        }
      }
    }
    // Only allow clicking on unflipped cards and limit to two selected cards

    if (cardsSet === "" && cardSet === "cards1") {
      setCardsSet("cards1");
    }
    if (cardsSet === "cards1" && cardSet === "cards2") {
      setCardsSet("");
    }
  };

  useEffect(() => {
    if (selectedCardIndices.length === 2) {
      setTimeout(() => checkMatch(), 500); // Delay to show the second card before checking for a match
    }
  }, [selectedCardIndices]);

  useEffect(() => {
    if (showMatchOverlay) {
      setTimeout(() => setShowMatchOverlay(false), 1500); // Show the match overlay for 1 second
    }
  }, [showMatchOverlay]);

  const checkMatch = () => {
    if (selectedCardIndices.length === 2) {
      const [index1, index2] = selectedCardIndices;

      const card1 = cards1[index1];
      const card2 = cards2[index2];

      if (card1.symbol === card2.symbol) {
        // Matching cards
        const updatedCards1 = [...cards1];
        const updatedCards2 = [...cards2];

        updatedCards1[index1] = { ...updatedCards1[index1], isMatched: true };
        updatedCards2[index2] = { ...updatedCards2[index2], isMatched: true };

        setCards1(updatedCards1);
        setCards2(updatedCards2);

        setShowMatchOverlay(true);
        setMatchedCards((prevMatched) => [...prevMatched, card1.symbol]);

        increaseMatches(); // Increment correct matches

        if (correctMatches === 5) {
          navigate("/rewards");
        }
      } else {
        // Not matching cards
        setTimeout(() => {
          setCards1((prevCards) => {
            const newCards = [...prevCards];
            newCards[index1].isFlipped = false;
            return newCards;
          });
          setCards2((prevCards) => {
            const newCards = [...prevCards];
            newCards[index2].isFlipped = false;
            return newCards;
          });
        }, 500); // Delay to show both cards before flipping them back
      }

      setSelectedCardIndices([]);
    }
  };
  const shuffleArray = (array: any[]) => {
    return array.sort(() => Math.random() - 0.5);
  };

  return (
    <IntroDiv>
      <BgImage src={require("../assets/introbg.png")} alt="introbg" />
      <PrevBtn
        onClick={() => {
          setMatches();
          navigate("/");
        }}
      >
        <PrevBtnImage src={require("../assets/backbtn.png")} alt="prevbtn" />
      </PrevBtn>
      <BarImage src={require("../assets/bar.png")} alt="bar" />

      <div
        style={{
          position: "absolute",
          top: "4.58vh",
          left: "23vw",
          width: "51.38vw",
          height: "5.73vh",
          borderRadius: "10px",
          backgroundColor: "#FFFFFF",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: `${correctMatches * 16.66}%`,
            height: "100%",
            backgroundColor: "#FFC700",
            borderRadius: "10px",
          }}
        />
      </div>

      <BarBanana src={require("../assets/banana.png")} alt="barbanana" />
      {noOfClicks === 20 && (
        <div>
          <img
            src={require("../assets/activityarrow.png")}
            alt="activityarrow"
            style={{ position: "absolute", top: "10.5vh", left: "25vw" }}
          />
          <img
            src={require("../assets/askcloud.png")}
            alt="askcloud"
            style={{
              position: "absolute",
              top: "12.5vh",
              left: "41vw",
              width: "200px",
            }}
          />
          <p
            style={{
              position: "absolute",
              top: "12.5vh",
              left: "42.5vw",
              fontSize: "24px",
              fontWeight: "700",
              font: "nunito",
              color: "#11AEC6",
            }}
          >
            Select a card
          </p>
        </div>
      )}
      {noOfClicks===19 && <div>
        <img
            src={require("../assets/activityarrow.png")}
            alt="activityarrow"
            style={{ position: "absolute", bottom: "0.5vh", right: "30vw",transform:'rotate(180deg)' }}
          />
          <img
            src={require("../assets/askcloud.png")}
            alt="askcloud"
            style={{
                zIndex:'3',
              position: "absolute",
              bottom: "12.5vh",
              right: "43.5vw",
              width: "230px",
            }}
          />
          <p
            style={{
              position: "absolute",
              zIndex:'3',
              bottom: "17.5vh",
              right: "43.2vw",
              fontSize: "22px",
              fontWeight: "700",
              font: "nunito",
              color: "#11AEC6",
              width:'180px',
              margin:'0'
            }}
          >
            Now select second card
          </p>
        </div>}
      <CardsDiv>
        {cards1.map((card, index) => (
          <Card
            key={card.id}
            symbol={card.symbol}
            isFlipped={card.isFlipped}
            isClickable={!card.isFlipped}
            isMatched={card.isMatched}
            onClick={() => handleClick(index, "cards1")}
            color={"pink"}
          />
        ))}
      </CardsDiv>
      <CardsDiv style={{ left: "53vw" }}>
        {cards2.map((card, index) => (
          <Card
            key={card.id}
            symbol={card.symbol}
            isFlipped={card.isFlipped}
            isClickable={!card.isFlipped}
            isMatched={card.isMatched}
            onClick={() => handleClick(index, "cards2")}
            color={"blue"}
          />
        ))}
      </CardsDiv>
      {showMatchOverlay && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            fontSize: "2rem",
          }}
        ><div style={{font:'nunito',fontWeight:'600',fontSize:'76px',color:'#FCE492'}}>
          <div >Its a match !</div>
          <div>Matched Images: {matchedCards.join(", ")}</div>
          </div>

        </div>
      )}
      <div style={{ position: "absolute", top: 0, right: '20px',font:'nunito',fontWeight:'600',fontSize:'30px',color:'#00224D'}}>
        <p>No of clicks left:{noOfClicks}</p>
      </div>
    </IntroDiv>
  );
};

export default Activity;
