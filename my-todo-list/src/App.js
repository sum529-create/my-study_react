import { useState, useEffect } from "react";

function App() {
  const [toDo, setToDo] = useState("");
  const [toDos, setToDos] = useState([]);
  const onChange = (e) => setToDo(e.target.value);
  const onReset = () => setToDo("");
  const onSubmit = (e) => {
    e.preventDefault();
    if (toDo === "") return;
    setToDos((d) => [toDo, ...d]);
    /*
      const num = [1,2,3]
      add 4
      [num, 4] // [[1,2,3],4] (x)
      [...num, 4] // [1,2,3,4] (o)
    */
    setToDo("");
  };
  const onlistReset = () => setToDos([]);
  return (
    <div>
      <h1>My To Do List ({toDos.length})</h1>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={toDo}
          type="text"
          placeholder="Write your to do..."
        />
        <button>Add To Do</button>
        <button onClick={onReset}>Reset</button>
      </form>
      <button onClick={onlistReset}>list Reset</button>
      <ul>
        {toDos.map((e, i) => {
          return <li key={i}>{e}</li>;
        })}
      </ul>
    </div>
  );
}

export default App;
