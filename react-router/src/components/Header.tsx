import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate(); // 변수로 선언 후 함수를 호출하는 이유? -> hook의 규칙에 따름
  const onAboutClick = () => {
    navigate("/about");
  };
  /* Link & useNavigate hook의 차이 */
  // 1. Link
  // - 클릭 시 바로 이동하는 로직 구현 시 사용 ex(상품 상세페이지)
  // 2. useNavigate
  // - 페이지 전환 시 추가로 처리해야 할 로직이 있을 경우 ex(로그인 버튼)

  return (
    <header>
      <ul>
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <button onClick={onAboutClick}>About</button>
        </li>
      </ul>
    </header>
  );
}
export default Header;
