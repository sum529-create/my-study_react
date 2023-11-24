import { useLocation } from "react-router-dom";
import { styled } from "styled-components";
import Header from "../components/Header";

const Section = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const SubTitle = styled.h1`
  font-size: 24px;
  font-weight: 500;
  text-align: center;
  padding: 60px 0 40px 0;
`;
const Img = styled.img`
  width: 100%;
  position: relative;
  top: 0;
  left: 0;
  max-width: 100%;
`;

function Cultural() {
  const location = useLocation();
  const data = location.state?.data;

  return (
    <>
      <Header />
      <Section>
        <SubTitle>{data.TITLE}</SubTitle>
        <Img src={`${data.MAIN_IMG}`} />
      </Section>
    </>
  );
}

export default Cultural;
