import { styled } from "styled-components";
import { useQuery } from "react-query";
import { fetchCulturalInfo } from "../api";
import { Link, useOutletContext } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Header from "../components/Header";
import { formateDate } from "../utils/helpers";
import _ from "lodash"; // lodash 라이브러리 import

const Container = styled.div`
  margin: 0 auto;
  max-width: 1920px;
  overflow: hidden;
  position: relative;
  margin-bottom: 140px;
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
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border: 1px solid #dcdde1;
  .react-datepicker-wrapper {
    width: 20%;
    min-width: 120px;
    .date {
      width: 100%;
    }
    @media (max-width: 768px) {
      width: 100%;
    }
  }
  select#codeName {
    min-width: 100px;
  }
  @media (min-width: 768px) {
    input[type="text"] {
      flex: 1;
    }
  }
  .btn,
  .btn_reset {
    cursor: pointer;
  }
  .btn_reset {
    background-color: #aaa;
    border-color: #aaa;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    * {
      width: 100%;
    }
    .btn,
    .btn_reset {
      font-size: 16px;
    }
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
  @media (max-width: 768px) {
    font-size: 18px;
  }
`;
const Loading = styled.div`
  @keyframes rotate-loading {
    0% {
      transform: rotate(0deg);
      -ms-transform: rotate(0deg);
      -webkit-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
      -ms-transform: rotate(360deg);
      -webkit-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      -moz-transform: rotate(360deg);
    }
  }

  @-moz-keyframes rotate-loading {
    0% {
      transform: rotate(0deg);
      -ms-transform: rotate(0deg);
      -webkit-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
      -ms-transform: rotate(360deg);
      -webkit-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      -moz-transform: rotate(360deg);
    }
  }

  @-webkit-keyframes rotate-loading {
    0% {
      transform: rotate(0deg);
      -ms-transform: rotate(0deg);
      -webkit-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
      -ms-transform: rotate(360deg);
      -webkit-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      -moz-transform: rotate(360deg);
    }
  }

  @-o-keyframes rotate-loading {
    0% {
      transform: rotate(0deg);
      -ms-transform: rotate(0deg);
      -webkit-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
      -ms-transform: rotate(360deg);
      -webkit-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      -moz-transform: rotate(360deg);
    }
  }

  @keyframes rotate-loading {
    0% {
      transform: rotate(0deg);
      -ms-transform: rotate(0deg);
      -webkit-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
      -ms-transform: rotate(360deg);
      -webkit-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      -moz-transform: rotate(360deg);
    }
  }

  @-moz-keyframes rotate-loading {
    0% {
      transform: rotate(0deg);
      -ms-transform: rotate(0deg);
      -webkit-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
      -ms-transform: rotate(360deg);
      -webkit-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      -moz-transform: rotate(360deg);
    }
  }

  @-webkit-keyframes rotate-loading {
    0% {
      transform: rotate(0deg);
      -ms-transform: rotate(0deg);
      -webkit-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
      -ms-transform: rotate(360deg);
      -webkit-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      -moz-transform: rotate(360deg);
    }
  }

  @-o-keyframes rotate-loading {
    0% {
      transform: rotate(0deg);
      -ms-transform: rotate(0deg);
      -webkit-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
      -ms-transform: rotate(360deg);
      -webkit-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      -moz-transform: rotate(360deg);
    }
  }

  @keyframes loading-text-opacity {
    0% {
      opacity: 0;
    }
    20% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  @-moz-keyframes loading-text-opacity {
    0% {
      opacity: 0;
    }
    20% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  @-webkit-keyframes loading-text-opacity {
    0% {
      opacity: 0;
    }
    20% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  @-o-keyframes loading-text-opacity {
    0% {
      opacity: 0;
    }
    20% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  .loading-container,
  .loading {
    height: 100px;
    position: relative;
    width: 100px;
    border-radius: 100%;
  }

  .loading-container {
    margin: 50% auto;
  }

  .loading {
    border: 2px solid transparent;
    border-color: transparent #000 transparent #000;
    -moz-animation: rotate-loading 1.5s linear 0s infinite normal;
    -moz-transform-origin: 50% 50%;
    -o-animation: rotate-loading 1.5s linear 0s infinite normal;
    -o-transform-origin: 50% 50%;
    -webkit-animation: rotate-loading 1.5s linear 0s infinite normal;
    -webkit-transform-origin: 50% 50%;
    animation: rotate-loading 1.5s linear 0s infinite normal;
    transform-origin: 50% 50%;
  }

  .loading-container:hover .loading {
    border-color: transparent #e45635 transparent #e45635;
  }
  .loading-container:hover .loading,
  .loading-container .loading {
    -webkit-transition: all 0.5s ease-in-out;
    -moz-transition: all 0.5s ease-in-out;
    -ms-transition: all 0.5s ease-in-out;
    -o-transition: all 0.5s ease-in-out;
    transition: all 0.5s ease-in-out;
  }

  #loading-text {
    -moz-animation: loading-text-opacity 2s linear 0s infinite normal;
    -o-animation: loading-text-opacity 2s linear 0s infinite normal;
    -webkit-animation: loading-text-opacity 2s linear 0s infinite normal;
    animation: loading-text-opacity 2s linear 0s infinite normal;
    color: #000;
    font-family: "Helvetica Neue", "Helvetica", "arial";
    font-size: 10px;
    font-weight: bold;
    margin-top: 45px;
    opacity: 0;
    position: absolute;
    text-align: center;
    text-transform: uppercase;
    top: 0;
    width: 100px;
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
      font-size: 18px;
      font-weight: 500;
      color: #222;
      @media (max-width: 1025px) {
        width: 45%;
      }
      @media (max-width: 768px) {
        width: 100%;
        font-size: 20px;
        margin-left: 0;
      }
      p {
        margin: 20px 0 25px;
      }
      &:hover {
        border: 1px solid #3b3b3b;
        background-color: #f7f7f7;
        p {
          text-decoration: underline;
        }
        .cultural_img {
          transform: scale(1.1);
          -webkit-transform: scale(1.1);
          -moz-transform: scale(1.1);
          -o-transform: scale(1.1);
          transition: transform 0.3s ease;
        }
      }
    }
  }
`;
const ImgArea = styled.div<{ imgurl?: string }>`
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  transition: transform 0.3s ease;
  .cultural_img {
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
    transition: transfoqrm 0.3s ease;
    @media (max-width: 768px) {
      padding: 29%;
    }
  }
  .cultural_tag {
    position: absolute;
    z-index: 999;
    width: 35%;
    background-color: #e2e2e2;
    right: 0;
    font-size: 0.938rem;
    height: 45px;
    text-align: center;
    line-height: 49px;
    border-bottom-left-radius: 15px;
    font-weight: 500;
  }
`;
const NoData = styled.div`
  text-align: center;
  font-size: 18px;
  font-weight: 500;
  color: #aaa;
  height: 200px;
  padding: 115px 0;
`;
const Date = styled.div`
  line-height: 1;
  letter-spacing: 0;
  position: absolute;
  bottom: 20px;
  right: 6%;
  font-weight: 500;
  span {
    font-size: 16px;
    position: absolute;
    left: -20px;
    top: -1px;
  }
  @media (max-width: 768px) {
    font-size: 18px;
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
  @media (max-width: 768px) {
    display: none;
  }
`;
const TopArrowButton = styled.button<{ $isVisible: boolean }>`
  width: 40px;
  min-width: 40px;
  height: 40px;
  position: fixed;
  cursor: pointer;
  bottom: 20%;
  right: 0;
  border-radius: 50%;
  border: 2px solid #aaaaaa;
  background-color: #fff;
  color: #aaaaaa;
  opacity: ${(props) => (props.$isVisible ? "1" : "0")};
  transition: opacity 0.3s ease-in-out;
  z-index: 999;
  i {
    font-size: 30px;
    position: relative;
    right: 8.8px;
    bottom: 3px;
    font-size: 30px;
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
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  let searchTitle = useRef<HTMLInputElement>(document.createElement("input"));
  const { isLoading, data } = useQuery<ICulturalResponse>(
    ["allCulturals", startIdx, endIdx],
    async () => {
      var culturalDate = " ";
      if (selectedDate) {
        culturalDate = formateDate(selectedDate);
      }
      return fetchCulturalInfo(startIdx, endIdx, {
        codeNm: selectCodeNm ? selectCodeNm : " ",
        title: searchTitle.current.value ? searchTitle.current.value : " ",
        date: selectedDate ? culturalDate : " ",
      });
    }
  );

  let codeNames: { [key: string]: string } = {
    전체: "",
    클래식: "#0097e6",
    콘서트: "#8c7ae6",
    "축제-전통/역사": "#e1b12c",
    "축제-자연/경관": "#44bd32",
    "축제-시민화합": "#40739e",
    "축제-문화/예술": "#e84118",
    "축제-기타": "#7f8fa6",
    "전시/미술": "#D6A2E8",
    영화: "#FD7272",
    연극: "#78e08f",
    "뮤지컬/오페라": "#38ada9",
    무용: "#82ccdd",
    "독주/독창회": "#6a89cc",
    기타: "#f8c291",
    국악: "#b71540",
    "교육/체험": "#fa983a",
  };

  const handlePageChange = async ({ selected }: { selected: number }) => {
    const newStartIdx = selected * 9 + 1; // 처음 게시물의 인덱스를 구함
    const newEndIdx = newStartIdx + 8;

    setStartIdx(newStartIdx);
    setEndIdx(newEndIdx);
    setCurrentPage(selected);

    var culturalDate = " ";
    if (selectedDate) {
      culturalDate = formateDate(selectedDate);
    }
    const newData = await fetchCulturalInfo(newStartIdx, newEndIdx, {
      codeNm: selectCodeNm ? selectCodeNm : " ",
      title: searchTitle.current.value ? searchTitle.current.value : " ",
      date: selectedDate ? culturalDate : " ",
    });

    setFetchData(newData);
  };
  const handleSelectCodeNm = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectCodeNm(e.target.value);
  };
  const [isLoadingMoreData, setIsLoadingMoreData] = useState(false); // 추가 데이터 로딩 중 여부
  const [hasMoreData, setHasMoreData] = useState(true); // 더 이상 데이터가 없는지 여부

  useEffect(() => {
    const handleScroll = _.throttle(() => {
      if (isLoading || isLoadingMoreData || !hasMoreData) {
        return false;
      }
      const { scrollY, innerHeight } = window;
      const { scrollHeight } = document.documentElement;
      const showThreshold = 100;

      if (window.innerWidth <= 768) {
        if (scrollY > showThreshold) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
        if (scrollY + innerHeight >= scrollHeight - 200) {
          setIsLoadingMoreData(true); // 추가 데이터 로딩 중으로 설정
          var culturalDate = selectedDate ? formateDate(selectedDate) : "";
          // API 요청
          if (hasMoreData) {
            fetchCulturalInfo(startIdx, endIdx, {
              codeNm: selectCodeNm || " ",
              title: searchTitle.current.value || " ",
              date: culturalDate || " ",
            })
              .then((newData) => {
                if (newData && newData.row.length > 0) {
                  // setStartIdx((prevStartIdx) => prevStartIdx + 9);
                  setEndIdx((prevEndIdx) => prevEndIdx + 9);
                  setHasMoreData(true);
                } else {
                  setHasMoreData(false); // 더 이상 데이터가 없음을 설정
                }
              })
              .finally(() => {
                setIsLoadingMoreData(false); // 추가 데이터 로딩 종료
                window.scrollTo({
                  top: scrollY - 100,
                  behavior: "smooth",
                });
              });
          }
        }
      }
    }, 500);

    if (data) {
      setFetchData(data);
    }
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [
    data,
    endIdx,
    hasMoreData,
    isLoading,
    isLoadingMoreData,
    selectCodeNm,
    selectedDate,
    startIdx,
  ]);
  const onClickSearch = async () => {
    const searchTit = searchTitle.current.value;
    setStartIdx(1);
    setEndIdx(9);
    var culturalDate = " ";
    if (selectedDate) {
      culturalDate = formateDate(selectedDate);
    }
    const newData = await fetchCulturalInfo(startIdx, endIdx, {
      codeNm: selectCodeNm
        ? selectCodeNm === "전체"
          ? " "
          : encodeURIComponent(selectCodeNm)
        : " ",
      title: searchTit ? searchTit : " ",
      date: selectedDate ? culturalDate : " ",
    });

    setFetchData(newData);
    setCurrentPage(0);
  };
  const onClickSearchReset = async () => {
    setSelectedDate(null);
    setSelectCodeNm("전체");
    searchTitle.current.value = "";
    setStartIdx(1);
    setEndIdx(9);
    const newData = await fetchCulturalInfo(startIdx, endIdx, {
      codeNm: " ",
      title: " ",
      date: " ",
    });

    setFetchData(newData);
  };
  const goToPreviousPage = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (currentPage - 10 < 0) {
      setCurrentPage(0);
      handlePageChange({ selected: 0 });
    } else {
      setCurrentPage((prevPage) => Math.max(0, prevPage - 10));
      handlePageChange({ selected: currentPage - 10 });
    }
  };
  const goToNextPage = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    var maxPgNum = 0;
    if (data) maxPgNum = Math.ceil((fetchData?.list_total_count ?? 0) / 9);

    if (currentPage + 10 > maxPgNum) {
      setCurrentPage(maxPgNum - 1);
      handlePageChange({ selected: maxPgNum - 1 });
    } else {
      setCurrentPage((prePage) => Math.min(maxPgNum, prePage + 10));
      handlePageChange({ selected: currentPage + 10 });
    }
  };
  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };
  const moveTopBtn = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <Container>
      <Header />
      <Section>
        <SearchArea>
          <DatePicker
            className="date"
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
            placeholderText="날짜를 선택하세요"
          />
          <select
            value={selectCodeNm}
            onChange={handleSelectCodeNm}
            id="codeName"
            title="구분선택"
          >
            {Object.keys(codeNames).map((e: string, i: number) => (
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
          <button onClick={onClickSearchReset} className="btn_reset">
            초기화
          </button>
        </SearchArea>
        <Total>
          총{" "}
          <strong>
            {fetchData && fetchData.list_total_count > 0
              ? fetchData.list_total_count
              : 0}
          </strong>
          개
        </Total>
        {fetchData && fetchData.list_total_count > 0 ? (
          isLoading ? (
            <Loading>
              <div className="loading-container">
                <div className="loading"></div>
                <div id="loading-text">loading</div>
              </div>
            </Loading>
          ) : (
            <>
              <CultureList>
                <ul>
                  {fetchData?.row.map((e, i) => (
                    <li key={i}>
                      <Link
                        to={`/my-study_react/cultural-event-info/${currentPage}${String(
                          i + 1
                        ).padStart(3, "0")}`}
                        state={{ data: e }}
                      >
                        <ImgArea imgurl={e.MAIN_IMG}>
                          <span
                            className="cultural_tag"
                            style={{ backgroundColor: codeNames[e.CODENAME] }}
                          >
                            {e.CODENAME}
                          </span>
                          <div className="cultural_img" />
                        </ImgArea>
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
              <Pagination>
                <a
                  href="javascript;"
                  className="prePage"
                  onClick={goToPreviousPage}
                >
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
                <a
                  href="javacript;"
                  className="nextPage"
                  onClick={goToNextPage}
                >
                  &gt;&gt;
                </a>
              </Pagination>
            </>
          )
        ) : (
          <NoData>조회된 데이터가 없습니다.</NoData>
        )}
      </Section>
      <TopArrowButton
        onClick={moveTopBtn}
        $isVisible={isVisible}
        style={{ display: isVisible ? "block" : "none" }}
      >
        <i className="material-symbols-outlined">keyboard_arrow_up</i>
      </TopArrowButton>
    </Container>
  );
}

export default Culturals;
