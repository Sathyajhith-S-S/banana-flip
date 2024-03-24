import React, { useState, useEffect, useContext } from "react";
import {
  IntroDiv,
  BgImage,
  PrevBtn,
  PrevBtnImage,
  BarBanana,
 Askcloud
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
  width: 41.66vw;
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
  const symbols = [["🍎",'A'], ["🍌",'B'], ["🍒",'C'], ["🍇",'G'], ["🍊",'O'], ["🍉",'W']];
  useEffect(() => {
    // Generate initial cards with random symbols
    const symbols = [["🍎",'A'], ["🍌",'B'], ["🍒",'C'], ["🍇",'G'], ["🍊",'O'], ["🍉",'W']];
    //   const alphas=['A','B','C','G','O','W'];
    const alphas = ['A','B','C','G','O','W'];
    const initialCards = symbols.map(([emoji], index) => ({
        id: index,
        symbol: emoji,
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
      console.log(card1," ",card2.symbol)
      const index = symbols.findIndex(([emoji]) => emoji === card1.symbol);
      if (symbols[index][1] === card2.symbol) {
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

      <div
        style={{
          position: "absolute",
          top: "4.58vh",
          left: "23vw",
          width: "51.38vw",
          height: "5.73vh",
          borderRadius: "0.69vw",
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
            borderRadius: "0.69vw",
          }}
        />
      </div>

      <BarBanana src={require("../assets/banana.png")} alt="barbanana" />
      {noOfClicks === 20 && (
        <div>
          <img
            src={require("../assets/activityarrow.png")}
            alt="activityarrow"
            style={{ position: "absolute", top: "11.5vh", left: "25vw" ,width:'16vw',height:'12.2vh'}}
          />
          <img
            src={require("../assets/askcloud.png")}
            alt="askcloud"
            style={{
              position: "absolute",
              top: "12.5vh",
              left: "41vw",
              width: "13.88vw",
            }}
          />
          <p
            style={{
              position: "absolute",
              top: "12.5vh",
              left: "42.5vw",
              fontSize: "1.66vw",
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
            style={{ position: "absolute", bottom: "1.5vh", right: "28vw",transform:'rotate(180deg)',width:'16vw',height:'12.2vh' }}
          />
          <img
            src={require("../assets/askcloud.png")}
            alt="askcloud"
            style={{
                zIndex:'3',
              position: "absolute",
              bottom: "12.5vh",
              right: "43.5vw",
              width: "15.97vw",
              height:'14.87vh'
            }}
          />
          <p
            style={{
              position: "absolute",
              zIndex:'3',
              top:'73.97vh',
              right: "43.2vw",
              fontSize: "1.52vw",
              fontWeight: "700",
              font: "nunito",
              color: "#11AEC6",
              width:'12.5vw',
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
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            zIndex: 999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            fontSize: "32px",
          }}
        ><div style={{font:'nunito',fontWeight:'600',fontSize:'5.27vw',color:'#FCE492'}}>
          <div style={{textAlign:'center'}}>Its a match ! 😉</div>
          <div>Matched Images: {matchedCards.join(", ")}</div>
          </div>

        </div>
      )}
      <Askcloud src={require("../assets/askcloud.png")} alt="askcloud" style={{left:'78vw',top:'-1.34vh',width:'23vw',height:'26.8vh'}}/>
      <div style={{ position: "absolute", top: '1.5vh', right: '1.38vw'}}>
        <p style={{font:'nunito',fontWeight:'700',fontSize:'2.08vw',color:'#11AEC6'}}>No of clicks left:{noOfClicks}</p>
      </div>
    </IntroDiv>
  );
};

export default Activity;
