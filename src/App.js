import logo from "./logo.svg";
import "./App.css";
import { userState } from "react";
import styled from "styled-components";
function Username() {
  return <input placeholder="이름을 입력하세요."></input>;
}

function ButtonComponent({ idx, type, text, onclick }) {
  const onClickBtn = () => {
    onclick(idx);
  };

  return (
    <div type={type} onClick={onClickBtn}>
      {text}
    </div>
  );
}

function CheckBox() {
  return;
}

function App() {
  return (
    <div className="App">
      <header>MBTI 직업 심리 검사</header>
      <body>
        <Username></Username>
        <ButtonComponent></ButtonComponent>
      </body>
    </div>
  );
}

export default App;
