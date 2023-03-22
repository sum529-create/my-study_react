import { useEffect, useState } from "react";

function App() {
  const [counter, setCounter] = useState(0); // 렌더링 될때 마다 출력
  const onClick = () => setCounter((e) => e + 1);
  console.log("render");
  useEffect(() => {
    console.log("CALL THE API...");
  }, []);
  return (
    <div className="App">
      <h1>{counter}</h1>
      <button onClick={onClick}> Click me </button>
    </div>
  );
}

export default App;
