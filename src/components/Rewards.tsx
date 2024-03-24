import { usePageState } from "./PageContext";
import {
  IntroDiv,
  BgImage,
  PrevBtn,
  PrevBtnImage,
  BarBanana,
  BarImage,
} from "./Intro";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
const RewardsDiv = styled.div`
  position: absolute;
  width: 32.12vw;
  height: 62.41vh;
  top: 23.58vh;
  border-radius: 3.15vw;
  background-color: #fff5d1;
`;
const Monkey = styled.img`
  margin-left: 6.94vw;
  margin-top: 13.4vh;
  width: 20.83vw;
  height: 37.53vh;
`;
const Ribbon = styled.img`
  margin-left: 2.43vw;
  margin-top: -8.04vh;
  position: absolute;
  width:28.54vw;
  height:21.31vh;
`;
const YayBtn = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: transform 0.2s ease; /* Add transition for transform property */
  &:hover {
    transform: scale(1.1); /* Scale up on hover */
  }
`;
const YayImage = styled.img`
  width: 20.83vw;
  height: 8.04vh;
  margin-left: 5.55vw;
`;
const Glow = styled.img`
  position: absolute;
  top: 0;
  width:38.47vw;
  height:38.2vh;
`;
const RibbonSide = styled.img`
  position: absolute;
  top: -2.68vh;
  left: 25.99vw;
  z-index: 0;
  width:8.33vw;
  height:18.76vh;
`;
const RibbonText = styled.div`
  position: absolute;
  top: -5.02vh;
  left: 4.21vw;
  font-family: "Nunito", sans-serif;
  color: white;
  font-size: 2.5vw;
  font-weight: 700;
  line-height: 3.4vw;
`;
const Rewards = () => {
  const { correctMatches, setMatches } = usePageState();
  const navigate = useNavigate();
  return (
    <IntroDiv>
      <BgImage src={require("../assets/introbg.png")} alt="introbg" />
      <BarImage src={require("../assets/bar.png")} alt="bar" />
      <div
        style={{
          position: "absolute",
          top: "4.58vh",
          left: "23vw",
          width: "51.38vw",
          height: "5.73vh",
          borderRadius: "0.69vw",
          backgroundColor: "#FFFFFF",
          zIndex: 3,
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
      <BarBanana
        src={require("../assets/banana.png")}
        alt="barbanana"
        style={{ zIndex: 3 }}
      />
      <PrevBtn onClick={() => {
                setMatches();
                navigate("/activity");
              }} style={{ zIndex: 3 }}>
        <PrevBtnImage src={require("../assets/backbtn.png")} alt="prevbtn" />
      </PrevBtn>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          fontSize: "2.22vw",
        }}
      >
        <Glow src={require("../assets/glow.png")} alt="glow" />

        <RewardsDiv>
          <RibbonSide src={require("../assets/ribbonside.png")} alt="ribbon" />
          <RibbonSide
            src={require("../assets/ribbonside.png")}
            alt="ribbon"
            style={{ transform: "rotate(160deg)", left: "-1.87vw" }}
          />
          <Ribbon
            src={require("../assets/ribbonmid.png")}
            alt="rewardsribbon"
          />
          <RibbonText>
            <div>
              <p style={{ margin: "0 0 0 7.63vw" }}>Earned</p>{" "}
              <p style={{ margin: 0, fontSize: "4.86vw" }}>
                {correctMatches} Bananas
              </p>
            </div>
          </RibbonText>
          <Monkey
            src={require("../assets/rewardsmonkey.png")}
            alt="rewardsmonkey"
          />
          <YayBtn>
            <YayImage
              src={require("../assets/yaybtn.png")}
              alt="yaybtn"
              onClick={() => {
                setMatches();
                navigate("/activity");
              }}
            />
          </YayBtn>
        </RewardsDiv>
        <img
          src={require("../assets/banana.png")}
          alt="banana"
          style={{
            position: "absolute",
            top: "13.4vh",
            left: "20.13vw",
            height: "24.12vh",
            width: "12.5vw",
            transform: "rotate(20deg)",
          }}
        />
        <img
          src={require("../assets/banana.png")}
          alt="banana"
          style={{
            position: "absolute",
            top: "50.93vh",
            left: "17.36vw",
            height: "24.12vh",
            width: "12.5vw",
            transform: "rotate(90deg",
          }}
        />
        <img
          src={require("../assets/banana.png")}
          alt="banana"
          style={{
            position: "absolute",
            top: "16.08vh",
            left: "79.86vw",
            height: "24.12vh",
            width: "12.5vw",
            transform: "rotate(50deg)",
          }}
        />
        <img
          src={require("../assets/banana.png")}
          alt="banana"
          style={{
            position: "absolute",
            top: "37.53vh",
            left: "76.38vw",
            height: "24.12vh",
            width: "12.5vw",
            transform: "rotate(130deg)",
          }}
        />
        <img
          src={require("../assets/banana.png")}
          alt="banana"
          style={{
            position: "absolute",
            top: "64.34vh",
            left: "72.91vw",
            height: "24.12vh",
            width: "12.5vw",
            transform: "rotate(160deg)",
          }}
        />
      </div>
    </IntroDiv>
  );
};
export default Rewards;
