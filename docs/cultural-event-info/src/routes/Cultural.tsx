import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { styled } from "styled-components";
import { fetchCulturalInfo } from "../api";
import Header from "../components/Header";
import { formateDate } from "../utils/helpers";

const Container = styled.div`
  position: relative;
  overflow: hidden;
  max-width: 1920px;
  margin: 0 auto;
`;
const Section = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  h1 {
    font-size: 2.125rem;
    word-break: keep-all;
    font-weight: 700;
    text-align: center;
    padding: 20px 0 40px 0;
  }
  .ico_btn {
    border: 1px solid #ccc;
    border-radius: 50%;
    width: 46px;
    height: 46px;
    display: inline-block;
    position: relative;
    color: #666;
    text-align: center;
    background-color: #f7f7f7;
    font-size: 20px;
    min-width: auto;
  }
  .prePage {
    top: 60px;
    cursor: pointer;
    i {
      position: relative;
      top: 5px;
      left: 3px;
    }
  }
  @media (max-width: 1400px) {
    margin: 0 1rem;
    h1 {
      font-size: 1.5rem;
      padding-left: 46px;
      padding-right: 46px;
    }
  }
  @media (max-width: 1024px) {
    .ico_btn {
      width: 36px;
      height: 36px;
      i {
        top: -1px;
        left: -1px;
        font-size: 20px;
      }
    }
    .prePage {
      top: 53px;
    }
  }
`;
const InfoArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 60px;
  padding: 40px 0;
  @media (max-width: 1024px) {
    padding: 0;
  }
`;
const AboutArea = styled.div`
  display: block;
  padding-bottom: 140px;
`;
const ImgBox = styled.div`
  flex-basis: 41%;
  img {
    width: 100%;
    position: relative;
    top: 0;
    left: 0;
    max-width: 100%;
  }
  @media (max-width: 1024px) {
    flex-basis: 100% !important;
  }
`;
const TxtBox = styled.div`
  flex-basis: 53%;
  .event_top {
    display: flex;
    justify-content: space-between;
  }
  .btnContainer {
    position: relative;
    .share {
      right: 46px;
      line-height: 1;
      z-index: 999;
      cursor: pointer;
      i {
        position: relative;
        right: 2.5px;
        top: 1.5px;
      }
    }
    .additionalBtns {
      position: absolute;
      right: 228%;
      /* left: -50%; 버튼 위치 조절 */
      top: 0;
      display: flex;
      /* flex-direction: column; */
      opacity: 0;
      visibility: hidden;
      /* transition: all ease-in-out 0.3s; */
      transform: translateX(30%);
      transition: opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease;
      border-radius: 100px;
      border: 1px solid #ddd;
      height: 46px;
      padding-right: 46px;
      padding-left: 13px;
      button {
        background: none;
        border: none;
        min-width: 50px;
        width: 50px;
        height: 46px;
        padding: 0;
        cursor: pointer;
        &:not(:last-child) {
          opacity: 0.5;
        }
        &:not(:last-child)::after {
          content: "|";
          display: inline-block;
          position: absolute;
          width: 1px;
          height: 10px;
          top: 12px;
          color: #ccc;
        }
      }
    }
    &:hover .additionalBtns,
    &:focus-within .additionalBtns {
      opacity: 1;
      visibility: visible;
      transform: translateX(25%);
    }
  }
  p {
    color: #4f29ee;
    font-size: 20px;
    font-weight: 500;
    &::after {
      content: "";
      display: block;
      width: 35px;
      height: 3px;
      background: #4f29ee;
      margin: 15px 0;
    }
  }
  /* h1 {
    font-size: 2.125rem;
    word-break: keep-all;
    font-weight: 700;
    text-align: center;
    padding: 20px 0 40px 0;
  } */
  li {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    .type-th {
      min-width: 120px;
      text-align: center;
      font-weight: 500;
      font-size: 18px;
      background-color: #f7f7f7;
      border: 1px solid #ccc;
      padding: 20px;
    }
    .type-td {
      padding: 20px;
      margin-left: 12px;
      border-bottom: 1px solid #ccc;
      width: 100%;
      min-height: 63px;
      word-break: keep-all;
      letter-spacing: -0.05rem;
    }
    &:last-child {
      margin-top: 30px;
    }
  }
  .caution {
    color: #cc3434;
    font-weight: 500;
  }
  .button {
    margin-top: 30px;
    width: 33%;
    line-height: 2.5;
    height: 50px;
  }
  @media (max-width: 1024px) {
    flex-basis: 100% !important;
    margin-top: 30px;
    .btnContainer {
      .share {
        right: 0;
        i {
          top: 1px;
          left: -6px;
          font-size: 20px;
        }
      }
      .additionalBtns {
        right: 146%;
        height: 36px;
        padding-right: 36px;
        button {
          height: 36px;
          width: 40px;
          img {
            height: 35px;
          }
          &:not(:last-child)::after {
            top: 8px;
          }
        }
      }
    }
    li {
      .type-th {
        font-size: 16px;
      }
      .type-td,
      .caution {
        font-size: 14px;
      }
    }
    .button {
      font-size: 14px;
      width: 100%;
    }
    p {
      font-size: 18px;
    }
  }
`;
const Content = styled.div`
  overflow: hidden;
  margin-top: 5rem;
  height: 10rem;
  padding-left: 1.2rem;
  h3 {
    margin-bottom: 2rem;
    font-size: 1.5rem;
    font-weight: bold;
    line-height: 120%;
  }
  * {
    font-weight: 400;
  }
  ul {
    margin-top: 2rem;
  }
  @media (max-width: 1024px) {
    h3 {
      font-size: 1.25rem;
    }
    p {
      font-size: 1rem;
    }
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
interface ICultural {
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
  STRTDATE: Date;
  END_DATE: Date;
  THEMECODE: string;
  LOT: string;
  LAT: string;
  IS_FREE: string;
  HMPG_ADDR: string;
}
function Cultural() {
  const location = useLocation();
  const { culturalIdx } = useParams();
  const culIdx = Number(culturalIdx);
  const data = location.state?.data || null;
  const [subData, setSubData] = useState<ICultural>(data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchCulturalInfo(culIdx, culIdx, {
          codeNm: " ",
          title: " ",
          date: " ",
        });
        // console.log("Fetch successful:", result);

        if (result && result.RESULT && result.RESULT.CODE === "INFO-000") {
          const rowData = result.row;

          if (rowData && rowData.length > 0) {
            setSubData(rowData[0]);
            setLoading(true);
            // console.log("Data set successfully:", rowData[0]);
          } else {
            console.error("No data found in the result:", result);
          }
        } else {
          console.error("Unexpected result structure:", result);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (culturalIdx && !data) {
      // console.log("Fetching data...");
      fetchData();
    }
  }, []);
  const [loading, setLoading] = useState(false);
  const [showBtns, setShowBtns] = useState(false);
  const goBack = () => {
    if (window.location.host === "sum529-create.github.io")
      window.location.href =
        "https://sum529-create.github.io/my-study_react/cultural-event-info/";
    else {
      window.location.href =
        window.location.origin + "/my-study_react/cultural-event-info/";
    }
  };
  const handleButtonClick = () => {
    setShowBtns(!showBtns);
  };
  const handleBtnHover = () => {
    setShowBtns(true);
  };
  const handleBtnLeave = () => {
    setShowBtns(false);
  };
  const isPreparing = () => {
    alert("기능 준비중입니다...");
  };
  const copyUrl = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      alert("URL이 복사되었습니다.");
    } catch (error) {
      alert("URL 복사 실패");
    }
  };
  const facebookShare = () => {
    const location = window.location.href;
    window.open("http://www.facebook.com/sharer.php?u=" + location);
  };
  return (
    <>
      <Container>
        <Header />
        {!loading ? (
          <Loading>
            <div className="loading-container">
              <div className="loading"></div>
              <div id="loading-text">loading</div>
            </div>
          </Loading>
        ) : (
          <Section>
            <button onClick={goBack} className="ico_btn prePage">
              <i className="material-symbols-outlined">arrow_back_ios</i>
            </button>
            <h1>{data ? data.TITLE : subData ? subData.TITLE : ""}</h1>
            <InfoArea>
              <ImgBox>
                <img
                  src={`${
                    data ? data.MAIN_IMG : subData ? subData.MAIN_IMG : ""
                  }`}
                  alt="culturalImg"
                />
              </ImgBox>
              <TxtBox>
                <div className="event_top">
                  <p>
                    {data ? data.CODENAME : subData ? subData.CODENAME : ""}
                  </p>
                  <div className="btnContainer">
                    <button
                      onClick={handleButtonClick}
                      onMouseEnter={handleBtnHover}
                      onMouseLeave={handleBtnLeave}
                      className="ico_btn share"
                    >
                      <i className="material-symbols-outlined">share</i>
                    </button>
                    <div id="buttonGroup" className="additionalBtns">
                      <button onClick={facebookShare}>
                        <img
                          src={require("../assets/icons/sns_face.png")}
                          alt="facebook"
                        />
                      </button>
                      <button onClick={isPreparing}>
                        <img
                          src={require("../assets/icons/sns_kakao.png")}
                          alt="kakao"
                        />
                      </button>
                      <button onClick={copyUrl}>
                        <img
                          src={require("../assets/icons/sns_copy.png")}
                          alt="url"
                        />
                      </button>
                    </div>
                  </div>
                </div>
                {/* <h1>{data.TITLE}</h1> */}
                <ul>
                  <li>
                    <div className="type-th">주관기관</div>
                    <div className="type-td">
                      {(data ? data.GUNAME : subData ? subData.GUNAME : "") +
                        " / " +
                        (data
                          ? data.ORG_NAME
                          : subData
                          ? subData.ORG_NAME
                          : "")}
                    </div>
                  </li>
                  <li>
                    <div className="type-th">축제기간</div>
                    <div className="type-td">
                      {data ? data.DATE : subData ? subData.DATE : ""}
                    </div>
                  </li>
                  <li>
                    <div className="type-th">장소</div>
                    <div className="type-td">
                      {data ? data.PLACE : subData ? subData.PLACE : ""}
                    </div>
                  </li>
                  <li>
                    <div className="type-th">신청기간</div>
                    <div className="type-td">
                      {data ? data.RGSTDATE : subData ? subData.RGSTDATE : ""}
                    </div>
                  </li>
                  <li>
                    <div className="type-th">이용대상</div>
                    <div className="type-td">
                      {data ? data.USE_TRGT : subData ? subData.USE_TRGT : ""}
                    </div>
                  </li>
                  <li>
                    <div className="type-th">이용가격</div>
                    <div className="type-td">
                      {data ? data.USE_FEE : subData ? subData.USE_FEE : "무료"}
                    </div>
                  </li>
                  <li>
                    <span className="caution">
                      ※ 축제 진행 현황에 따라 상세 내용은 달라질 수 있습니다.
                    </span>
                  </li>
                </ul>
                <a
                  className="button"
                  href={
                    data?.ORG_LINK
                      ? data.ORG_LINK
                      : subData
                      ? subData.ORG_LINK
                      : ":javascript;"
                  }
                  target="blank"
                >
                  홈페이지 바로가기
                </a>
              </TxtBox>
            </InfoArea>
            <AboutArea>
              <Content>
                <h3>출연자</h3>
                <div>
                  {data?.PLAYER ? data.PLAYER : subData ? subData.PLAYER : "-"}
                </div>
              </Content>
              <Content>
                <h3>공연시간 정보</h3>
                <p>
                  예매가능시간:{" "}
                  {data ? data.RGSTDATE : subData ? subData.RGSTDATE : ""}
                </p>
                <ul>
                  <li>
                    시작일:{" "}
                    {data?.STRTDATE
                      ? formateDate(data.STRTDATE)
                      : subData?.STRTDATE
                      ? formateDate(subData.STRTDATE)
                      : "-"}
                  </li>
                  <li>
                    종료일:{" "}
                    {data?.END_DATE
                      ? formateDate(data.END_DATE)
                      : subData?.END_DATE
                      ? formateDate(subData.END_DATE)
                      : "-"}
                  </li>
                </ul>
              </Content>
              <Content>
                <h3>공연정보</h3>
                <p>
                  {data
                    ? data.PROGRAM
                    : subData?.PROGRAM
                    ? subData.PROGRAM
                    : "-"}
                </p>
              </Content>
              <Content>
                <h3>기타</h3>
                <p>
                  {data
                    ? data.ETC_DESC
                    : subData?.ETC_DESC
                    ? subData.ETC_DESC
                    : "-"}
                </p>
              </Content>
            </AboutArea>
          </Section>
        )}
      </Container>
    </>
  );
}

export default Cultural;
