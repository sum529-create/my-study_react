import { styled } from "styled-components";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { fetchCulturalInfo } from "../api";
import { Link, useOutletContext } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { ChangeEvent, useEffect, useRef, useState } from "react";

const Container = styled.div`
  margin: 0 auto;
  max-width: 1920px;
  overflow: hidden;
  position: relative;
  margin-bottom: 140px;
`;
const Background = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 295px;
  position: absolute;
  top: 0;
`;
const Header = styled.div`
  text-align: center;
  height: auto;
  width: 100%;
  padding: 10rem 0 2.9rem 0;
  background-color: #2f3640;
  background-image: url("/mainImg.jpeg");
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
  max-width: 1400px;
`;

const SearchArea = styled.div`
  display: flex;
  background-color: #f5f6fa;
  padding: 20px;
  justify-content: space-between;
  border: 1px solid #dcdde1;
  .btn {
    cursor: pointer;
  }
`;

const Total = styled.div`
  margin: 30px 0 16px 0;
  border-bottom: 2px solid #333;
  margin-bottom: 30px;
  padding: 19px 0;
  font-weight: 500;
  color: #333;
  strong {
    color: #ac2f30;
  }
`;
interface ICulturalResponse {
  list_total_count: number;
  row: IFestival[];
}
interface IFestival {
  CODENAME: string;
  GUNAME: string;
  TITLE: string;
  DATE: string;
  PLACE: string;
  ORG_NAME: string;
  USE_TRGT: string;
  USE_FEE: string;
  PLAYER: string;
  PROGRAM: string;
  ETC_DESC: string;
  ORG_LINK: string;
  MAIN_IMG: string;
  RGSTDATE: string;
  TICKET: string;
  STRTDATE: string;
  END_DATE: string;
  THEMECODE: string;
  LOT: string;
  LAT: string;
  IS_FREE: string;
  HMPG_ADDR: string;
}

interface RouteParams {
  startIdx: number;
  endIdx: number;
}
const CultureList = styled.div`
  ul {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    li {
      overflow: hidden;
      border-radius: 10px;
      padding: 20px 20px 54px 20px;
      border: 1px solid #e2e2e2;
      width: 30%;
      margin: 0 0 2.5% 3.33%;
      position: relative;
      p {
        font-size: 18px;
        font-weight: 500;
        color: #222;
        margin: 20px 0 25px;
      }
    }
  }
`;
const Img = styled.div<{ imgurl?: string }>`
  overflow: hidden;
  border-radius: 10px;
  position: relative;
  padding: 49%;
  height: 0;
  border: 1px solid #bbb;
  background-image: ${({ imgurl }) => `url(${imgurl})`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  /* img {
    position: absolute;
    left: 0;
    top: -20%;
    right: 0;
    bottom: 0;
    width: 100%;
    display: block;
    margin: 0 auto;
  } */
`;
const Date = styled.div`
  line-height: 1;
  letter-spacing: 0;
  position: absolute;
  bottom: 20px;
  right: 6%;
  color: #a3a3a3;
  span {
    font-size: 16px;
    position: absolute;
    left: -20px;
    top: -1px;
  }
`;

const Pagination = styled.div`
  margin-top: 3.75em;
  display: flex;
  justify-content: center;
  font-weight: 500;
  font-size: 18px;
  ul {
    display: flex;
    li {
      cursor: pointer;
      margin: 0 4px;
      a {
        display: block;
        padding: 0 4px;
      }
      &:hover,
      &:active {
        font-weight: 600;
        color: #666666;
      }
    }
    li.active {
      font-weight: 600;
      color: #ac2f30;
      text-decoration: underline;
    }
  }
  .prePage,
  .nextPage,
  ul li.previous,
  ul li.next {
    border: 1px solid #ccc;
    border-radius: 50%;
    width: 34px;
    height: 34px;
    position: relative;
    bottom: 7px;
    color: #666;
    text-align: center;
    a {
      display: inline-block;
      position: relative;
      text-align: center;
      top: 7px;
      height: 24px;
      width: 24px;
    }
  }
  .prePage,
  .nextPage {
    padding-top: 7px;
  }
`;

function Culturals() {
  const { startIdx: initialStartIdx = 1, endIdx: initialEndIdx = 9 } =
    useOutletContext<RouteParams>() || {};
  const [startIdx, setStartIdx] = useState(initialStartIdx);
  const [endIdx, setEndIdx] = useState(initialEndIdx);
  const [currentPage, setCurrentPage] = useState(0);
  const [fetchData, setFetchData] = useState<ICulturalResponse | null>(null);
  const [selectCodeNm, setSelectCodeNm] = useState("");
  const searchTitle = useRef<HTMLInputElement>(document.createElement("input"));
  const { isLoading, data } = useQuery<ICulturalResponse>(
    ["allCulturals", startIdx, endIdx],
    async () => {
      return fetchCulturalInfo(startIdx, endIdx, {
        codeNm: selectCodeNm,
        title: searchTitle.current.value,
      });
    }
  );
  let codeNames = [
    "전체",
    "클래식",
    "콘서트",
    "축제-전통/역사",
    "축제-자연/경관",
    "축제-시민화합",
    "축제-문화/예술",
    "축제-기타",
    "전시/미술",
    "영화",
    "연극",
    "뮤지컬/오페라",
    "무용",
    "독주/독창회",
    "기타",
    "국악",
    "교육/체험",
  ];

  const handlePageChange = async ({ selected }: { selected: number }) => {
    const newStartIdx = selected * 9 + 1; // 처음 게시물의 인덱스를 구함
    const newEndIdx = newStartIdx + 8;

    setStartIdx(newStartIdx);
    setEndIdx(newEndIdx);
    setCurrentPage(selected);

    const newData = await fetchCulturalInfo(newStartIdx, newEndIdx, {
      codeNm: selectCodeNm,
      title: searchTitle.current.value,
    });

    setFetchData(newData);
  };
  const handleSelectCodeNm = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectCodeNm(e.target.value);
  };
  useEffect(() => {
    if (data) {
      setFetchData(data);
    }
  }, [data]);
  const onClickSearch = async () => {
    const searchTit = searchTitle.current.value;
    setStartIdx(1);
    setEndIdx(9);

    const newData = await fetchCulturalInfo(startIdx, endIdx, {
      codeNm: selectCodeNm,
      title: searchTit,
    });

    setFetchData(newData);
    setCurrentPage(0);
  };
  const goToPreviousPage = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    setCurrentPage((prevPage) => Math.max(0, prevPage - 10));

    handlePageChange({ selected: currentPage - 10 });
  };
  const goToNextPage = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();

    setCurrentPage((prePage) =>
      Math.min(
        Math.ceil(data?.list_total_count ? data.list_total_count / 9 : 0),
        prePage + 10
      )
    );
    handlePageChange({ selected: currentPage + 10 });
  };

  return (
    <Container>
      <Helmet>
        <title>서울 문화 정보</title>
      </Helmet>
      <Header>
        <Background />
        <Title>문화 행사 정보</Title>
        <SubTitle>서울의 문화행사를 한눈에</SubTitle>
      </Header>
      <Section>
        <SearchArea>
          <input type="text" className="date" placeholder="YYYY-MM-DD" />
          <select
            value={selectCodeNm}
            onChange={handleSelectCodeNm}
            id="codeName"
            title="구분선택"
          >
            {codeNames.map((e, i) => (
              <option key={i} value={e}>
                {e}
              </option>
            ))}
          </select>
          <input
            ref={searchTitle}
            type="text"
            placeholder="검색어를 입력하세요."
          />
          <button onClick={onClickSearch} className="btn">
            검색
          </button>
        </SearchArea>
        <Total>
          총 <strong>{fetchData && fetchData.list_total_count}</strong>개
        </Total>
        {isLoading ? (
          "Loading..."
        ) : (
          <>
            <CultureList>
              <ul>
                {fetchData?.row.map((e, i) => (
                  <li key={i}>
                    <Link to={`/${i}`} state={{ name: e.TITLE }}>
                      <Img imgurl={e.MAIN_IMG} />
                      {/* <img src={e.MAIN_IMG} alt="mainImg" /> */}
                      <p>{e.TITLE}</p>
                      <Date>
                        <span className="material-symbols-outlined">
                          schedule
                        </span>
                        {e.DATE}
                      </Date>
                    </Link>
                  </li>
                ))}
              </ul>
            </CultureList>
          </>
        )}
        <Pagination>
          <a href="javascript;" className="prePage" onClick={goToPreviousPage}>
            &lt;&lt;
          </a>
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            pageCount={Math.ceil((fetchData?.list_total_count ?? 0) / 9)} // 전체 페이지 수
            marginPagesDisplayed={1}
            pageRangeDisplayed={9}
            onPageChange={handlePageChange}
            containerClassName={"pagination"}
            activeClassName={"active"}
            forcePage={currentPage}
          />
          <a href="javacript;" className="nextPage" onClick={goToNextPage}>
            &gt;&gt;
          </a>
        </Pagination>
      </Section>
    </Container>
  );
}

export default Culturals;
