import styled from "@emotion/styled";

const InstructionDiv = styled.div`
  position: absolute;
  display: flex;
  top: 32.51vh;
  left: 8.31vw;
`;

const Line = styled.img`
  position: absolute;
  top: 35.5vh;
  //top:18.18vw;
  left: 16.86vw;
  width: 67.44vw;
  //height: 38.2vh;
  height:17.56vw
`;

const Card = styled.div`
  width: 25vw;
  //height: 45.57vh;
  height:20.83vw;
  border-radius: 4.51vw;
  background-color: white;
  margin-right: 5.23vw;
`;

const Shadow = styled.img`
  position: absolute;
  top: 73.39vh;
  left: 6.4vw;
  width: 89.38vw;
  height: 8.31vh;
`;

const CardImage = styled.img`
  margin-left: 25%;
  height: 70%;
  width: 45%;
`;

const BlueNPinkCardsImage = styled.img`
  margin-left: 20%;
  height: 85%;
  width: 60%;
`;

const H1 = styled.h1`
  font-family: "Nunito";
  font-weight: 800;
  font-size: 2vw;
  text-align: center;
  color: #11aec6;
  margin:0
`;

const H2 = styled.h2`
font-family: Nunito;
font-size: 1.27vw;
font-weight: 800;
text-align: center;
color:#A6C930;
margin:0px;
`;

const Instruction = () => {
  return (
    <>
      <Line src={require("../assets/line.png")} alt="line" />
      <Shadow src={require("../assets/instructionshadow.png")} alt="shadow" />
      <InstructionDiv>
        <Card>
          <CardImage src={require("../assets/pinkcard.png")} alt="pink" />
          <H1>Select a pink card.</H1>
          <H2>It has images.</H2>
        </Card>
        <Card>
          <CardImage src={require("../assets/bluecard.png")} alt="blue" />
          <H1>Select a blue card.</H1>
          <H2>It has alphabets.</H2>
        </Card>
        <Card>
          <BlueNPinkCardsImage
            src={require("../assets/bluenpinkcards.png")}
            alt="bluenpink"
          />
          <div style={{marginTop:'-4.76vw'}}>
          <H2>If they're the same</H2>
          <H1>It's a match!</H1>
          <H2>Otherwise, retry :(</H2>
          </div>
        </Card>
      </InstructionDiv>
    </>
  );
};

export default Instruction;
