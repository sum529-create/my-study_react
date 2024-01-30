import { Helmet } from "react-helmet";
import { styled } from "styled-components";

const MyHeader = styled.div`
  text-align: center;
  height: auto;
  width: 100%;
  padding: 10rem 0 2.9rem 0;
  background-color: #2f3640;
  background-image: url("/my-study_react/cultural-event-info/mainImg.jpeg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  h1,
  span {
    position: relative;
    z-index: 1000;
  }
  span {
    font-style: italic;
    font-weight: 600;
  }
  @media (max-width: 768px) {
    padding-bottom: 3.9rem;
  }
`;

const Background = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 295px;
  position: absolute;
  top: 0;
`;

const Title = styled.h1`
  font-size: 3rem;
  display: block;
  line-height: 1;
  font-weight: 600;
  color: #f5f6fa;
  @media (max-width: 768px) {
    font-size: 2.25rem;
  }
`;

const SubTitle = styled.span`
  font-size: 1.25rem;
  color: #dcdde1;
  padding-top: 20px;
  letter-spacing: -0.03em;
  line-height: 1;
  display: block;
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Header = () => {
  return (
    <>
      <Helmet>
        <title>서울 문화 정보</title>
        <meta property="og:title" content="서울 문화 정보" />
        <meta
          property="og:desciption"
          content="서울 문화 정보 리스트를 조회/검색 할 수 있는 사이트입니다."
        />
        <meta
          property="og:image"
          content="https://sum529-create.github.io/my-study_react/cultural-event-info/mainImg.jpeg"
        />
      </Helmet>
      <MyHeader>
        <Background />
        <Title>문화 행사 정보</Title>
        <SubTitle>서울의 문화행사를 한눈에</SubTitle>
      </MyHeader>
    </>
  );
};

export default Header;
