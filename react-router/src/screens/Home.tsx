import { Link } from "react-router-dom";
import { users } from "../db";

function Home() {
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
