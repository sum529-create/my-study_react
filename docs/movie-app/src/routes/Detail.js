import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// 날짜 구분값 추가
function YMDFormatter(num) {
  if (!num) return "";
  var formatNum = "";

  // 공백제거
  num = num.replace(/\s/gi, ""); // g: 모든 패턴체크 , i: 대소문자 구분x , /\s/:문자열 모든 공백 제거

  try {
    if (num.length === 8) {
      formatNum = num.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3"); // d : 숫자[0-9]
    }
  } catch (e) {
    formatNum = num;
  }
  return formatNum;
}

function Detail() {
  const x = useParams();
  const [movie, setMovie] = useState([]);
  const getMovieList = async () => {
    const json = await (
      await fetch(
        `http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key=f5eef3421c602c6cb7ea224104795888&movieCd=${x.id}`
      )
    ).json();
    if (json) setMovie(json.movieInfoResult.movieInfo);
  };
  useEffect(() => {
    getMovieList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <h1>{movie.movieNm}</h1>
      <h2>{movie.movieNmEn}</h2>
      <h2>{movie.movieNmOg}</h2>
      <div className="movie-detail-Info">
        <h3>주요정보</h3>
        <div className="line">
          <p>
            감독 : {movie.directors && movie.directors.map((e) => e.peopleNm)}
          </p>
          <p>장르 : {movie.genres && movie.genres.map((e) => e.genreNm)}</p>
          <p>국가 : {movie.nations && movie.nations.map((e) => e.nationNm)}</p>
          <p>
            등급 : {movie.audits && movie.audits.map((e) => e.watchGradeNm)}
          </p>
          <p>개봉연도 : {YMDFormatter(movie.openDt)}</p>
          <p>상영시간 : {movie.showTm}분</p>
          <div>
            출연진 :
            <ul>
              {movie.actors &&
                movie.actors.map((e, i) => (
                  <li key={i}>
                    {e.peopleNm + "(" + e.peopleNmEn + ") / " + e.cast}
                  </li>
                ))}
            </ul>
          </div>
          <div>
            상영형태
            <ul>
              {movie.showTypes &&
                movie.showTypes.map((e, i) => (
                  <li key={i}>
                    {e.showTypeGroupNm !== e.showTypeNm
                      ? e.showTypeGroupNm + " " + e.showTypeNm
                      : e.showTypeGroupNm}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
