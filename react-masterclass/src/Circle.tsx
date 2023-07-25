import styled from "styled-components";

interface ContainerProps {
  bgColor: string;
  borderColor: string;
}

const Container = styled.div<ContainerProps>`
  width: 200px;
  height: 200px;
  background-color: ${(p) => p.bgColor};
  border-radius: 100px;
  border: 1px solid ${(p) => p.borderColor};
  text-align: center;
`;

interface CircleProps {
  // interface - object의 shagpe설명
  bgColor: string;
  borderColor?: string; // props값이 선택적일 경우 '?'를 붙여준다.
  text?: string;
}

interface PlayerShape {
  name: string;
  age: number;
}

const sayHello = (p: PlayerShape) =>
  `Hello ${p.name} ypu are ${p.age} years old.`;

sayHello({ name: "sumin", age: 10 });

function Circle({ bgColor, borderColor, text = "default text" }: CircleProps) {
  return (
    <Container bgColor={bgColor} borderColor={borderColor ?? bgColor}>
      {text}
    </Container>
  );
  // borderColor props error 발생 -> Circle props로는 optional값이지만, Container props론 required값이기 때문
  // 1) borderColor값이 없을 경우 white기본값으로 처리한다
  // ... borderColor = {borderColor ?? "white"}
  // 2) borderColor값이 없을 경우 bgColor와 동일시 한다
  // ... borderColor = {borderColor ?? bgColor}
}

export default Circle;
