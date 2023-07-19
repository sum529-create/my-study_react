import styled, { keyframes } from "styled-components";

const Title = styled.h1`
  color: ${(props) =>
    props.theme
      .textColor}; // index.js ThemeProvider가 상위 컴포넌트 object에 접근
`;

const Wrapper = styled.div`
  margin: 0;
  display: flex;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.backgroundColor};
`;

const rotation = keyframes`
  0%{
    transform:rotate(0deg);
    border-radius: 0px;
  }
  50%{
    transform:rotate(180deg);
  }
  100%{
    transform: rotate(360deg);
    border-radius: 100px;
  }
`;

const Emoji = styled.span`
  font-size: 36px;
`;

const Box = styled.div`
  height: 200px;
  width: 200px;
  background-color: tomato;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${rotation} 1s linear infinite;
  ${Emoji} {
    &:hover {
      font-size: 98px;
    }
    &:active {
      opacity: 0;
    }
  }
`;

function App() {
  return (
    <Wrapper>
      {/* <Box>
        <Emoji as="p">🥰</Emoji>
      </Box> */}
      <Title>hello</Title>
    </Wrapper>
  );
}

export default App;
