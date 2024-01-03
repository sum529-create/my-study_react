import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Movie({ id, movieNm, rank, openDt, showCnt }) {
  return (
    <div>
      {/* Link - 브라우저 새로고침이 없이도 다른페이지돌 이동시켜줌(렌더링되지 않음) || html a 태그 사용시 리렌더링 */}
      <h3>
        <Link to={`movie/${id}`}>{rank + ". " + movieNm}</Link>
      </h3>
      <ul>
        <li>개봉일 : {openDt}</li>
        <li>관람객수 : {showCnt}</li>
      </ul>
      <hr />
    </div>
  );
}
Movie.protoTypes = {
  id: PropTypes.number.isRequired,
  movieNm: PropTypes.string.isRequired,
  rank: PropTypes.string,
  openDt: PropTypes.openDt,
  showCnt: PropTypes.showCnt,
};

export default Movie;
