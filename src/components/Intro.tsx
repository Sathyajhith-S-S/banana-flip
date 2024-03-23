import styled from "@emotion/styled";
// import { useState } from "react";
import startBtn from "../assets/startbtn.png";
import nextBtn from "../assets/nextbtn.png";
import yesBtn from "../assets/yesbtn.png";
import playBtn from "../assets/playbtn.png";
import Instruction from "./Instruction";
import { useNavigate } from "react-router-dom";
import { usePageState } from './PageContext';
export const IntroDiv = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  position: relative;
`;

export const BgImage = styled.img`
  height: 100%;
  width: 100%;
`;

const Monkey = styled.img`
  position: absolute;
  left: 34vw;
  top: 26vh;
  height: 67vh;
  width: 33.72vw;
`;

const Shadow = styled.img`
  position: absolute;
  left: 18.9vw;
  top: 63.8vh;
  height: 29.39vh;
  width: 40.72vw;
`;

const Askcloud = styled.img`
  position: absolute;
  left: 51.69vw;
  top: 12.72vh;
  width: 28vw;
  height: 13.88vw;
`;

const AskDiv = styled.div`
  position: absolute;
  left: 55.5vw;
  top: 14.4vh;
  width: 20.83vw;
`;

const H1 = styled.h1`
  font-family: "Nunito", sans-serif;
  font-weight: 800;
  font-size: 2.24vw;
  color: #11aec6;
`;

const NextBtn = styled.button`
  position: absolute;
  left: 72vw;
  top: 81.76vh;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const NextBtnImage = styled.img`
  width: 18vw;
  height: 12.4vh;
`;
export const PrevBtn = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  position: absolute;
  left: 2.84vw;
  top: 4.58vh;
`;
export const PrevBtnImage = styled.img`
  width: 9.83vw;
  height: 19.75vh;
`;
export const BarImage = styled.img`
  position: absolute;
  left: 23vw;
  top: 4.58vh;
  width: 51.38vw;
  height: 5.73vh;
`;
export const BarBanana = styled.img`
  position: absolute;
  left: 67.7vw;
  width: 9.72vw;
  height: 18.09vh;
  top: 0px;
`;
const Dust1 = styled.img`
  position: absolute;
  left: 10.41vw;
  top: 75.41vh;
  width: 2.08vw;
  height: 3.01vh;
`;
const Dust2 = styled.img`
  position: absolute;
  left: 3.81vw;
  top: 90.49vh;
  width: 1.11vw;
  height: 1.5vh;
`;
const Dust3 = styled.img`
  position: absolute;
  left: 5.55vw;
  top: 79.18vh;
  width: 4.44vw;
  height: 9.65vh;
`;
const Dust4 = styled.img`
  position: absolute;
  left: 20.83vw;
  top: 79.18vh;
  width: 4.44vw;
  height: 9.65vh;
`;
const Intro = () => {
  const { currentPage, increasePage,decreasePage } = usePageState();
  const nextBtns = [startBtn, nextBtn, yesBtn, playBtn];
  const intros = [
    "Welcome Kiddo !",
    "Hi , I am Mizo ! and I love bananas ",
    "Can you help me get some ? ",
  ];
  const navigate=useNavigate();
  const handleNext = () => {
    if (currentPage === 3) {
      navigate("/activity"); // Navigate to "/activity" route
    } else {
      increasePage(); // Increase currentPage using context API
    }
  };
  return (
    <IntroDiv>
      <BgImage src={require("../assets/introbg.png")} alt="introbg" />
      {currentPage === 3 ? (
        <Instruction />
      ) : (
        <div className="into-div">
          <Shadow src={require("../assets/shadow.png")} alt="shadow" />
          <Monkey
            src={require("../assets/intromonkey.png")}
            alt="intromonkey"
          />
          <Askcloud src={require("../assets/askcloud.png")} alt="askcloud" />
          <AskDiv>
            <H1>{intros[currentPage]}</H1>
          </AskDiv>
          <Dust1 src={require("../assets/dust1.png")} alt="dust1" />
          <Dust2 src={require("../assets/dust2.png")} alt="dust2" />
          <Dust3 src={require("../assets/dust3.png")} alt="dust3" />
          <Dust4 src={require("../assets/dust4.png")} alt="dust4" />
          <Dust1
            src={require("../assets/dust1.png")}
            alt="dust1"
            style={{ left: "25.69vw" }}
          />
          <Dust2
            src={require("../assets/dust2.png")}
            alt="dust2"
            style={{ left: "18.75vw" }}
          />
        </div>
      )}
      <NextBtn onClick={handleNext}>
        <NextBtnImage src={nextBtns[currentPage]} alt="next button" />
      </NextBtn>
      {currentPage !== 0 && (
        <PrevBtn onClick={() => decreasePage()}>
          <PrevBtnImage
            src={require("../assets/backbtn.png")}
            alt="back button"
          />
        </PrevBtn>
      )}
      {currentPage >= 2 && (
        <div className="bar">
          <BarImage src={require("../assets/bar.png")} alt="bar" />
          <BarBanana src={require("../assets/barbanana.png")} alt="barbanana" />
        </div>
      )}

    </IntroDiv>
  );
};
export default Intro;