import { users } from "../db";

function Home() {
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((e) => (
          <li key={e.id}>{e.name}</li>
        ))}
        <li>commit test</li>
      </ul>
    </div>
  );
}
export default Home;
