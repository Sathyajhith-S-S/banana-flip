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
  width: 462.56px;
  height: 465.6px;
  top: 175.93px;
  border-radius: 45.5px;
  background-color: #fff5d1;
`;
const Monkey = styled.img`
  margin-left: 100px;
  margin-top: 100px;
  width: 300px;
  height: 280px;
`;
const Ribbon = styled.img`
  margin-left: 25px;
  margin-top: -60px;
  //   z-index: 5;
  position: absolute;
`;
const YayBtn = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;
const YayImage = styled.img`
  width: 300px;
  height: 60px;
  margin-left: 80px;
`;
const Glow = styled.img`
  position: absolute;
  top: 0;
`;
const RibbonSide = styled.img`
  position: absolute;
  top: -20px;
  left: 370px;
  z-index: 0;
`;
const RibbonText = styled.div`
  position: absolute;
  top: -30px;
  left: 65px;
  font-family: "Nunito", sans-serif;
  color: white;
  font-size: 36px;
  font-weight: 700;
  line-height: 49.1px;
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
          borderRadius: "10px",
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
            borderRadius: "10px",
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
          fontSize: "2rem",
        }}
      >
        <Glow src={require("../assets/glow.png")} alt="glow" />

        <RewardsDiv>
          <RibbonSide src={require("../assets/ribbonside.png")} alt="ribbon" />
          <RibbonSide
            src={require("../assets/ribbonside.png")}
            alt="ribbon"
            style={{ transform: "rotate(160deg)", left: "-27px" }}
          />
          <Ribbon
            src={require("../assets/ribbonmid.png")}
            alt="rewardsribbon"
          />
          <RibbonText>
            <div>
              <p style={{ margin: "0 0 0 110px" }}>Earned</p>{" "}
              <p style={{ margin: 0, fontSize: "70px" }}>
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
            top: "100px",
            left: "290px",
            height: "180px",
            width: "180px",
            transform: "rotate(20deg",
          }}
        />
        <img
          src={require("../assets/banana.png")}
          alt="banana"
          style={{
            position: "absolute",
            top: "380px",
            left: "250px",
            height: "180px",
            width: "180px",
            transform: "rotate(90deg",
          }}
        />
        <img
          src={require("../assets/banana.png")}
          alt="banana"
          style={{
            position: "absolute",
            top: "120px",
            left: "1150px",
            height: "180px",
            width: "180px",
            transform: "rotate(50deg",
          }}
        />
        <img
          src={require("../assets/banana.png")}
          alt="banana"
          style={{
            position: "absolute",
            top: "280px",
            left: "1100px",
            height: "180px",
            width: "180px",
            transform: "rotate(130deg",
          }}
        />
        <img
          src={require("../assets/banana.png")}
          alt="banana"
          style={{
            position: "absolute",
            top: "480px",
            left: "1050px",
            height: "180px",
            width: "180px",
            transform: "rotate(160deg",
          }}
        />
      </div>
    </IntroDiv>
  );
};
export default Rewards;
