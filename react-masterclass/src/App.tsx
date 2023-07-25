import React, { useState } from "react";

function App() {
  const [value, setValue] = useState("");
  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    // e -> any타입으로 지정되어 ts에게 무슨 타입인지 설명해야함
    const {
      currentTarget: { value },
    } = e;
    setValue(value); // setValue(e.currentTarget.value)
    // ** ES6 문법
    // 다중 props를 가져와야할 경우 이 문법이 유용
    // ex) value, tagName, width, id룰 가져와야 한다고 할 경우
    // const value = e.currentTarget.value ... 로 하나하나 작성해야 하지만
    // const {currentTarget:{value, tagName, width, id}} = e;
    // 와 같이 사용할 수 있기 때문
    // 만일 currentTarget이 없을 경우엔 const {x,y} = e 형태로 사용 가능함
    // **
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // preventDefault - input, button 등 클릭 이벤트가 발생했을 경우 페이지가 reload되는 현상을 막아줌
    console.log("hello", value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="input text"
          value={value}
          onChange={onChange}
        />
        <button>Log in</button>
      </form>
    </div>
  );
}

export default App;
