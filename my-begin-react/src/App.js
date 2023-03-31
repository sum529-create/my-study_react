import { useEffect, useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [counter, setCounter] = useState(0); // useState : 변수를 제어하는 함수, 동적인 값 처리
  const onClick = () => setCounter((e) => e + 1);
  console.log("rendering");
  useEffect(() => {
    // state를 변화시킬 때 component를 재 실행
    console.log("CALL THE API..."); // useEffect -> 한번의 렌더링이 필요한 경우 사용 Ex) api..
  }, []);
  useEffect(() => {
    // useEffect : 코드 실행 시점을 관리할 수 있는 선택권을 얻는 방어막같운 존재
    if (text !== "") console.log("I run when 'text' changes.");
  }, [text]); // deps[디펜던시] : 특정 데이타가 변화될 경우에만 렌더링
  useEffect(() => {
    console.log("I run when 'text' && 'counter' changes.");
  }, [text, counter]); // deps[디펜던시] : 배열형태로 다수의 값 지정 가능
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
