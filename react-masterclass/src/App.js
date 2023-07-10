import styled from "styled-components";

const Father = styled.div`
  display: flex;
`;

const Box = styled.div`
  background-color: ${(p) => p.bgColor};
  width: 100px;
  height: 100px;
`;

const Circle = styled(Box)`
  border-radius: ${(p) => p.bdRadius};
`;

function App() {
  return (
    <Father>
      <Box bgColor="tomato" />
      <Circle bgColor="teal" bdRadius="50px" />
    </Father>
  );
}

export default App;
