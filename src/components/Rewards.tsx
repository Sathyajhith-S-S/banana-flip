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

const Rewards = () => {
  const { correctMatches } = usePageState();
  const navigate=useNavigate();
  return (
    <IntroDiv>
      <BgImage src={require("../assets/introbg.png")} alt="introbg" />
      <BarImage src={require("../assets/bar.png")} alt="bar" />
    <div style={{ position: "absolute",top:'4.58vh',left:'23vw', width: "51.38vw", height: "5.73vh", borderRadius: "10px", backgroundColor: "#FFFFFF" }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: `${correctMatches * 16.66}%`, height: "100%", backgroundColor: "#FFC700", borderRadius: "10px" }} />
    </div>
      <BarBanana src={require("../assets/barbanana.png")} alt="barbanana" />
      <PrevBtn onClick={() => navigate("/activity")} style={{zIndex:3}}>
        <PrevBtnImage src={require("../assets/backbtn.png")} alt="prevbtn" />
      </PrevBtn>
      <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 2, display: "flex", justifyContent: "center", alignItems: "center", color: "white", fontSize: "2rem" }}>
        
        <div>{correctMatches}</div>
      </div>
    </IntroDiv>
  );
};
export default Rewards;
