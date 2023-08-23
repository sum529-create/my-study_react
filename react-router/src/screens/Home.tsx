import { Link, useSearchParams } from "react-router-dom";
import { users } from "../db";

function Home() {
  // const [readSearchParams, setSearchParams] = useSearchParams();
  // console.log(readSearchParams.has("followers"));
  // setTimeout(() => {
  //   setSearchParams({
  //     day: "0823",
  //     week: "wed",
  //   });
  // }, 3000);
  // console.log(readSearchParams.get("day"));

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((e) => (
          <li key={e.id}>
            <Link to={`/users/${e.id}`}>{e.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Home;
