import styled from "styled-components";

interface ContainerProps {
  bgColor: string;
}

const Container = styled.div<ContainerProps>`
  width: 200px;
  height: 200px;
  background-color: ${(p) => p.bgColor};
  border-radius: 100px;
`;

interface CircleProps {
  // interface - object의 shagpe설명
  bgColor: string;
}

interface PlayerShape {
  name: string;
  age: number;
}

const sayHello = (p: PlayerShape) =>
  `Hello ${p.name} ypu are ${p.age} years old.`;

sayHello({ name: "sumin", age: 10 });

function Circle({ bgColor }: CircleProps) {
  return <Container bgColor={bgColor} />;
}

export default Circle;
