import { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import UserInfo, { UserContext } from "./UserInfo";
export default function StartPage() {
  const [gender, setGender] = useState();
  const [userName, setUserName] = useState();
  const history = useHistory();
  const user = useContext(UserContext);
  localStorage.clear(); //localstorage 초기화
  return (
    <div>
      <header>서윤의 직업 심리 검사</header>
      <body>
        <>
          이름
          <input
            placeholder="이름을 입력하세요."
            onChange={(e) => {
              setUserName(e.target.value);
              console.log(userName);
            }}
          ></input>
        </>
        <button>입력</button>
        <br />
        <>
          남
          <input
            type="checkbox"
            value="100323"
            onClick={(e) => {
              setGender(e.target.value);
              console.log(gender);
            }}
          ></input>
          여
          <input
            type="checkbox"
            value="100324"
            onClick={(e) => {
              setGender(e.target.value);
              console.log(gender);
            }}
          ></input>
        </>
        <br />
        <button
          onClick={() => {
            history.push({
              pathname: "/test_example",
              state: { userName: userName, gender: gender },
            });
          }}
        >
          검사시작
        </button>
      </body>
    </div>
  );
}
