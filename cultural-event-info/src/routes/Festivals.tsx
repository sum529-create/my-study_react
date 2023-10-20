import { styled } from "styled-components";
import { Helmet } from "react-helmet";

const Container = styled.div`
  margin: 0 auto;
  max-width: 1920px;
  overflow: hidden;
  position: relative;
`;

const Header = styled.div`
  text-align: center;
  height: auto;
  padding: 10rem 0 2.9rem 0;
  background-color: #2f3640;
  background-image: url();
`;

const Title = styled.h1`
  font-size: 3rem;
  display: block;
  line-height: 1;
  font-weight: 600;
  color: #f5f6fa;
`;

const SubTitle = styled.span`
  font-size: 1.25rem;
  color: #dcdde1;
  padding-top: 20px;
  letter-spacing: -0.03em;
  line-height: 1;
  display: block;
`;

const Section = styled.div`
  margin: 0 auto;
  padding: 1.25rem;
`;

const SearchArea = styled.div`
  display: flex;
  background-color: #f5f6fa;
  padding: 20px;
  justify-content: space-between;
  border: 1px solid #dcdde1;
`;

const Total = styled.div`
  margin: 30px 0 16px 0;
  border-bottom: 2px solid #333;
  margin-bottom: 30px;
  padding: 19px 0;
  font-weight: 500;
  color: #333;
`;

const CultureList = styled.div``;

const Pagination = styled.div``;

function Festivals() {
  return (
    <Container>
      <Helmet>
        <title>서울 문화 정보</title>
      </Helmet>
      <Header>
        <Title>문화 행사 정보</Title>
        <SubTitle>서울의 문화행사를 한눈에</SubTitle>
      </Header>
      <Section>
        <SearchArea>
          <input type="text" className="date" />
          <select id="codeName" title="구분선택">
            <option value="0">콘서트</option>
          </select>
          <input type="text" />
          <button className="btn">검색</button>
        </SearchArea>
        <Total>총 0개</Total>
        <CultureList />
        <Pagination />
      </Section>
    </Container>
  );
}

export default Festivals;
