import { styled } from "styled-components";
import { useQuery } from "react-query";
import { fetchCulturalInfo } from "../api";
import { Link, useOutletContext } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Header from "../components/Header";

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
  justify-content: space-between;
  border: 1px solid #dcdde1;
  .btn,
  .btn_reset {
    cursor: pointer;
  }
  .btn_reset {
    background-color: #aaa;
    border-color: #aaa;
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
      .img_area {
        position: relative;
        overflow: hidden;
        border-radius: 10px;
        transition: transform 0.3s ease;
      }
      &:hover {
        border: 1px solid #3b3b3b;
        background-color: #f7f7f7;
        p {
          text-decoration: underline;
        }
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
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.1);
    -webkit-transform: scale(1.1);
    -moz-transform: scale(1.1);
    -o-transform: scale(1.1);
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
function formateDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
function Culturals() {
  const { startIdx: initialStartIdx = 1, endIdx: initialEndIdx = 9 } =
    useOutletContext<RouteParams>() || {};
  const [startIdx, setStartIdx] = useState(initialStartIdx);
  const [endIdx, setEndIdx] = useState(initialEndIdx);
  const [currentPage, setCurrentPage] = useState(0);
  const [fetchData, setFetchData] = useState<ICulturalResponse | null>(null);
  const [selectCodeNm, setSelectCodeNm] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
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
  useEffect(() => {
    if (data) {
      setFetchData(data);
    }
  }, [data]);
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
          : selectCodeNm
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
            "Loading..."
          ) : (
            <>
              <CultureList>
                <ul>
                  {fetchData?.row.map((e, i) => (
                    <li key={i}>
                      <Link
                        to={`/${currentPage + String(i + 1).padStart(3, "0")}`}
                        state={{ data: e }}
                      >
                        <div className="img_area">
                          <Img imgurl={e.MAIN_IMG} />
                        </div>
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
    </Container>
  );
}

export default Culturals;
