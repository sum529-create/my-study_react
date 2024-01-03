import { useState, useEffect } from "react";
import Movie from "../components/Movie";
function getDate() {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1 + "";
  var day = date.getDate() - 1 + "";
  var nowDate =
    year +
    "" +
    (month.length !== 2 ? "0" + month : month) +
    (day.length !== 2 ? "0" + day : day);
  return nowDate;
}

function Home() {
  const [loading, setLoading] = useState(true);
  const [searchDt, setSearchDt] = useState("");
  const [inputDt, setInputDt] = useState("");
  const [movies, setMovies] = useState([]);

  const onChange = (e) => {
    setInputDt(e.target.value);
  };
  const onSearch = () => {
    var text = Number(inputDt);
    var nowDtTxt = Number(getDate());
    var regex = RegExp(/^\d{4}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])$/);
    var isTest = regex.test(inputDt);
    if (text && inputDt.length === 8 && isTest) {
      if (text > nowDtTxt) {
        alert("현재 날짜 이 후는 검색할 수 없습니다.");
        onReset();
      } else if (Number(inputDt.substr(0, 4)) < 2000) {
        alert("2000년 이전으론 검색할 수 없습니다.");
        onReset();
      } else {
        getMovies(inputDt);
      }
    } else {
      alert("날짜형식을 기입해주세요.");
      onReset();
    }
  };
  const onReset = () => {
    setInputDt("");
  };
  // then 대체 async-await 사용법
  const getMovies = async (date) => {
    const json = await (
      await fetch(
        `https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=f5eef3421c602c6cb7ea224104795888&targetDt=${date}`
        // "http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=f5eef3421c602c6cb7ea224104795888&targetDt=20230401"
      )
    ).json();
    setMovies(json.boxOfficeResult);
    setLoading(false);
  };
  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") onSearch();
  };
  useEffect(() => {
    // fetch(
    //   "http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=f5eef3421c602c6cb7ea224104795888&targetDt=20120101"
    // )
    //   .then((r) => r.json())
    //   .then((d) => {
    //     setMovies(d.boxOfficeResult.dailyBoxOfficeList);
    //     console.log(d);
    //     setLoading(false);
    //   });
    // then보단 async await 방식 선호
    setSearchDt(() => getDate());
    getMovies(searchDt);
  }, [searchDt]);
  return (
    <div>
      {!movies || movies.length === 0 || loading ? (
        <h2>Loading..</h2>
      ) : (
        <div>
          <h1>
            {movies.boxofficeType} Top 10 <br />
          </h1>
          <h2>
            {movies.showRange.substr(0, 4) +
              "년 " +
              movies.showRange.substr(4, 2) +
              "월 " +
              movies.showRange.substr(6, 2) +
              "일 날짜를 조회 하였습니다."}
          </h2>
          <input
            type="text"
            placeholder="YYYYMMDD"
            maxLength={8}
            value={inputDt}
            onChange={onChange}
            onKeyPress={handleOnKeyPress}
          />
          <button onClick={onSearch}>검색</button>
          <button onClick={onReset}>초기화</button>
          <br />
          {movies.dailyBoxOfficeList.length === 0 ? (
            <div>조회된 결과 값이 없습니다.</div>
          ) : (
            <div>
              {movies.dailyBoxOfficeList.map((e) => (
                <div key={e.movieCd}>
                  <Movie
                    key={e.movieCd}
                    id={e.movieCd}
                    movieNm={e.movieNm}
                    rank={e.rank}
                    openDt={e.openDt}
                    showCnt={e.showCnt}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
