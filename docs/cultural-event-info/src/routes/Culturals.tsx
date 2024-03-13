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
import { ICulturalResponse } from "../cultural";

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
  input {
    min-width: 100px;
  }
  .react-datepicker-popper {
    z-index: 999 !important;
    position: relative;
  }
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
    width: 13%;
    min-width: 100px;
    .date {
      width: 100%;
    }
    @media (max-width: 768px) {
      width: 100%;
    }
  }
  select#codeName {
    min-width: 80px;
  }
  @media (min-width: 768px) {
    input[type="text"] {
      flex: auto;
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

const TopArea = styled.div`
  margin: 30px 0 16px 0;
  border-bottom: 2px solid #333;
  margin-bottom: 30px;
  padding: 19px 0;
  font-weight: 500;
  color: #333;
  display: flex;
  justify-content: space-between;
  .sort {
    ul {
      display: flex;
      li {
        cursor: pointer;
        &:hover {
          color: #ac2f30;
        }
        &:not(:last-of-type)::after {
          content: "|";
          margin: 4px;
          color: #333;
        }
      }
    }
  }
  strong {
    color: #ac2f30;
  }
  @media (max-width: 768px) {
    font-size: 18px;
  }
`;
const Loading = styled.div`
  clear: both;
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

interface RouteParams {
  startIdx: number;
  endIdx: number;
}
const CultureList = styled.div`
  clear: both;
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
      margin: 0 1.66% 3.33%;
      position: relative;
      font-size: 18px;
      font-weight: 500;
      color: #222;
      @media (max-width: 1025px) {
        width: 46.68%;
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
    z-index: 3;
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
  const [selectedStrDate, setSelectedStrDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isSelectSort, setIsSelectSort] = useState(false);
  const [isSelectRegSort, setIsSelectRegSort] = useState(false);
  const isMounted = useRef(false);
  const isRegMounted = useRef(false);
  let searchTitle = useRef<HTMLInputElement>(document.createElement("input"));
  const onClickSearch = async (): Promise<ICulturalResponse> => {
    const searchTit = searchTitle.current.value;
    const match = searchTit.match(/\[([^\]]+)\]/);
    let schList_totalCnt = 0;
    var culturalDate = " ";
    if (selectedStrDate && selectedEndDate) {
      culturalDate =
        formateDate(selectedStrDate) + "~" + formateDate(selectedEndDate);
    } else if (selectedStrDate && !selectedEndDate) {
      alert("종료날짜를 입력해주세요.");
      return Promise.reject("종료날짜를 입력해주세요.");
    } else if (!selectedStrDate && selectedEndDate) {
      alert("시작날짜를 입력해주세요.");
      return Promise.reject("시작날짜를 입력해주세요.");
    }
    if ((culturalDate || selectCodeNm || searchTit) && isSelectRegSort) {
      try {
        const newData = await fetchCulturalInfo(1, 9, {
          codeNm: selectCodeNm
            ? selectCodeNm === "전체" ||
              selectCodeNm === "" ||
              selectCodeNm === " "
              ? " "
              : selectCodeNm.split("/")[0].trim()
            : " ",
          title: searchTit ? (match ? match[1] : searchTit) : " ",
          date: selectedStrDate && selectedEndDate ? culturalDate : " ",
        });
        schList_totalCnt = newData?.list_total_count;
      } catch (error) {
        console.error("Lastest searching Error", error);
      }
    }
    try {
      const lastIdx = schList_totalCnt !== 0 ? schList_totalCnt : endIdx;
      const firstIdx = schList_totalCnt !== 0 ? lastIdx - 8 : startIdx;
      const newData = await fetchCulturalInfo(firstIdx, lastIdx, {
        codeNm: selectCodeNm
          ? selectCodeNm === "전체" ||
            selectCodeNm === "" ||
            selectCodeNm === " "
            ? " "
            : selectCodeNm.split("/")[0].trim()
          : " ",
        title: searchTit ? (match ? match[1] : searchTit) : " ",
        date: selectedStrDate && selectedEndDate ? culturalDate : " ",
      });

      setFetchData(newData);
      return newData;
    } catch (error) {
      console.error("Error during search:", error);
      return Promise.reject(error);
    }
  };
  const { isLoading, data } = useQuery<ICulturalResponse | null>(
    ["allCulturals", startIdx, endIdx],
    onClickSearch,
    {
      enabled: startIdx === 1, // enabled -> 값이 존재할때만 쿼리 요청 (자동실행 방지)
    }
  );

  let codeNames: { [key: string]: string } = {
    전체: " ",
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
    try {
      window.scrollTo(0, 300);
      let newStartIdx = 1;

      if (isSelectRegSort && fetchData) {
        newStartIdx =
          fetchData?.list_total_count - 8 * (selected + 1) - selected;
      } else {
        newStartIdx = selected * 9 + 1;
      }

      let newEndIdx = newStartIdx + 8;
      if (newEndIdx <= 9) newEndIdx = 9;
      if (newStartIdx < 1) newStartIdx = 1;

      setStartIdx(newStartIdx);
      setEndIdx(newEndIdx);
      setCurrentPage(selected);

      var culturalDate = " ";
      if (selectedStrDate && selectedEndDate) {
        culturalDate =
          formateDate(selectedStrDate) + "~" + formateDate(selectedEndDate);
      }
      const searchTit = searchTitle.current.value;
      const match = searchTit.match(/\[([^\]]+)\]/);
      const newData = await fetchCulturalInfo(newStartIdx, newEndIdx, {
        codeNm: selectCodeNm ? selectCodeNm.split("/")[0].trim() : " ",
        title: searchTit ? (match ? match[1] : searchTit) : " ",
        date: selectedStrDate && selectedEndDate ? culturalDate : " ",
      });

      setFetchData(newData);
    } catch (error) {
      console.error("Error during page change:", error);
    }
  };
  const handleSelectCodeNm = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectCodeNm(e.target.value);
  };
  const [isLoadingMoreData, setIsLoadingMoreData] = useState(false); // 추가 데이터 로딩 중 여부
  const [hasMoreData, setHasMoreData] = useState(true); // 더 이상 데이터가 없는지 여부
  // 이번달
  const toggleIsSelectSort = () => {
    setSelectedStrDate(null);
    setSelectedEndDate(null);
    if (isSelectRegSort) {
      setIsSelectRegSort(false);
    }
    setIsSelectSort((prevValue) => !prevValue);
  };
  const sortByCurrentMonth = async () => {
    let thisMonth = "";

    if (isSelectSort) {
      const currentDate = new window.Date();

      const thisStrMonth = new window.Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      );
      const thisEndMonth = new window.Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
      );
      setSelectedStrDate(thisStrMonth);
      setSelectedEndDate(thisEndMonth);
      thisMonth = formateDate(thisStrMonth) + "~" + formateDate(thisEndMonth);
    } else {
      setSelectedStrDate(null);
      setSelectedEndDate(null);
      thisMonth = " ";
    }
    if (!isSelectRegSort) {
      try {
        const newData = await fetchCulturalInfo(1, 9, {
          codeNm: " ",
          title: " ",
          date: thisMonth,
        });

        setFetchData(newData);
      } catch (error) {
        console.error("Error during search:", error);
        return Promise.reject(error);
      }
    }
  };
  const sortByRegDt = () => {
    handlePageChange({ selected: 0 });
  };
  // 최신순으로 정렬
  const toggleRegSort = async () => {
    setSelectedStrDate(null);
    setSelectedEndDate(null);
    if (isSelectSort) {
      setIsSelectSort(false);
      setStartIdx(1);
      setEndIdx(9);
      await onClickSearch();
      // await onClickSearchReset(); //
    }
    setIsSelectRegSort((e) => !e);
  };
  useEffect(() => {
    async function fetchSortByCurMon() {
      await sortByCurrentMonth();
    }
    if (isMounted.current) {
      fetchSortByCurMon();
    } else {
      isMounted.current = true;
    }
  }, [isSelectSort]);
  useEffect(() => {
    if (isRegMounted.current) sortByRegDt();
    else {
      isRegMounted.current = true;
    }
  }, [isSelectRegSort]);
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
          var culturalDate =
            selectedStrDate && selectedEndDate
              ? formateDate(selectedStrDate) +
                "~" +
                formateDate(selectedEndDate)
              : "";
          // API 요청
          const searchTit = searchTitle.current.value;
          const match = searchTit.match(/\[([^\]]+)\]/);
          if (hasMoreData) {
            fetchCulturalInfo(startIdx, endIdx, {
              codeNm: selectCodeNm.split("/")[0].trim() || " ",
              title: match ? match[1] : searchTit || " ",
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
    selectedStrDate,
    selectedEndDate,
    startIdx,
  ]);
  const onClickSearchReset = async () => {
    if (isSelectSort) {
      toggleIsSelectSort();
    }
    if (isSelectRegSort) {
      toggleRegSort();
    }
    setSelectedStrDate(null);
    setSelectedEndDate(null);
    setSelectCodeNm(" ");
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
    // if (currentPage - 10 < 0) {
    setCurrentPage(0);
    handlePageChange({ selected: 0 });
    // } else {
    //   setCurrentPage((prevPage) => Math.max(0, prevPage - 10));
    //   handlePageChange({ selected: currentPage - 10 });
    // }
  };
  const goToNextPage = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    var maxPgNum = 0;
    if (data || fetchData)
      maxPgNum = Math.ceil((fetchData?.list_total_count ?? 0) / 9);

    // if (currentPage + 10 > maxPgNum) {
    setCurrentPage(maxPgNum - 1);
    handlePageChange({ selected: maxPgNum - 1 });
    // } else {
    //   setCurrentPage((prePage) => Math.min(maxPgNum, prePage + 10));
    //   handlePageChange({ selected: currentPage + 10 });
    // }
  };
  const handleStrDateChange = (date: Date) => {
    setSelectedStrDate(date);
  };
  const handleEndDateChange = (date: Date) => {
    setSelectedEndDate(date);
  };
  const moveTopBtn = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      onClickSearch();
    }
  };
  return (
    <Container>
      <Header />
      <Section>
        <SearchArea>
          <DatePicker
            className="date"
            selected={selectedStrDate}
            onChange={handleStrDateChange}
            dateFormat="yyyy-MM-dd"
            placeholderText="날짜를 선택하세요"
          />
          ~
          <DatePicker
            className="date"
            selected={selectedEndDate}
            onChange={handleEndDateChange}
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
            onKeyPress={handleOnKeyPress}
          />
          <button onClick={onClickSearch} className="btn">
            검색
          </button>
          <button onClick={onClickSearchReset} className="btn_reset">
            초기화
          </button>
        </SearchArea>
        <TopArea>
          <div className="total">
            총{" "}
            <strong>
              {fetchData && fetchData.list_total_count > 0
                ? fetchData.list_total_count
                : 0}
            </strong>
            개
          </div>
          <div className="sort">
            <ul>
              <li
                onClick={toggleIsSelectSort}
                style={isSelectSort ? { color: "#ac2f30" } : {}}
              >
                이번달
              </li>
              <li
                onClick={toggleRegSort}
                style={isSelectRegSort ? { color: "#ac2f30" } : {}}
              >
                최신순
              </li>
            </ul>
          </div>
        </TopArea>
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
                        to={`/${encodeURIComponent(
                          "title=" +
                            e.TITLE +
                            "&codename=" +
                            e.CODENAME +
                            "&date=" +
                            e.DATE
                        )}`}
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
                  breakLabel={""}
                  pageCount={Math.ceil((fetchData?.list_total_count ?? 0) / 9)} // 전체 페이지 수
                  marginPagesDisplayed={0}
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
