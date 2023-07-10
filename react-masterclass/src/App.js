import styled from "styled-components";

const Father = styled.div`
  display: flex;
`;

// const Box = styled.div`
//   background-color: ${(p) => p.bgColor};
//   width: 100px;
//   height: 100px;
// `;

// const Circle = styled(Box)`
//   border-radius: ${(p) => p.bdRadius};
// `;
const Btn = styled.button`
  color: white;
  background-color: tomato;
  border: 0;
  border-radius: 15px;
`;

const Input = styled.input.attrs({ required: true, minLength: 10 })`
  background-color: aqua;
`;

function App() {
  return (
    <Father>
      {/* <Box bgColor="tomato" />
      <Circle bgColor="teal" bdRadius="50px" /> */}
      <Btn>Log in</Btn>
      <Btn as="a" href="/">
        notice
      </Btn>
      <Input />
      <Input />
      <Input />
    </Father>
  );
}

export default App;
