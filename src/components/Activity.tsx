import { IntroDiv, BgImage,PrevBtn, PrevBtnImage, BarImage, BarBanana } from "./Intro";
import { useNavigate } from "react-router-dom";
const Activity=()=>{
    const navigate=useNavigate();
    return (
        <IntroDiv>
            <BgImage src={require("../assets/introbg.png")} alt="introbg" />
            <PrevBtn onClick={() => navigate('/')}>
                <PrevBtnImage src={require("../assets/backbtn.png")} alt="prevbtn" />
            </PrevBtn>
            <BarImage src={require("../assets/bar.png")} alt="bar" />
            <BarBanana src={require("../assets/barbanana.png")} alt="barbanana" />
        </IntroDiv>
    );
}
export default Activity;