import { Link, Outlet, useParams } from "react-router-dom";
import { users } from "../../db";

function User() {
  const { userId } = useParams();

  return (
    <>
      <h1>
        User with id {userId} is named: {users[Number(userId) - 1].name}
      </h1>
      <hr />
      {/* 
        * Link에 '/'를 포함하지 않는 이유
        - '/'를 사용하게 되면 절대주소로 변환이 되어 -> ../followers로 바뀌게 되기 때문
       */}
      <Link to="followers">see followers</Link>
      <Outlet context={{ nameOfMyUser: users[Number(userId) - 1].name }} />
      {/* Outlet만 적어둘 경우 react-router-dom이 자동으로 인식(따로 표시할 필요없음) */}
      {/* Outlet context-> 자식 컴포넌트에서 사용할 수 있도록 값을 전달함 */}
    </>
  );
}

export default User;
