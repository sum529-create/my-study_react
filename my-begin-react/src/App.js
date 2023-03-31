import { useEffect, useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [counter, setCounter] = useState(0); // 렌더링 될때 마다 출력 (동적인 작업)
  const onClick = () => setCounter((e) => e + 1);
  console.log("rendering");
  useEffect(() => {
    console.log("CALL THE API..."); // useEffect 한번의 렌더링이 필요한 경우 사용 Ex) api..
  }, []);
  useEffect(() => {
    if (text !== "") console.log("I run when 'text' changes.");
  }, [text]);
  useEffect(() => {
    console.log("I run when 'text' && 'counter' changes.");
  }, [text, counter]);
  const onChange = (e) => {
    setText(e.target.value);
  };
  const onReset = () => {
    setText("");
  };
  return (
    <div className="App">
      <input value={text} onChange={onChange} type="text" />
      <button onClick={onReset}>Reset</button>
      <h2>{text || "null Text"}</h2>
      <h1>{counter}</h1>

      <button onClick={onClick}> Click me </button>
    </div>
  );
}

export default App;
