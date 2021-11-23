import { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import UserInfo, { UserContext } from "./UserInfo";
export default function StartPage() {
  const [gender, setGender] = useState();
  const [userName, setUserName] = useState();
  const history = useHistory();
  const context = useContext(UserContext);
  localStorage.clear(); //localstorage 초기화

  useEffect(() => {
    context.name = userName;
    // delete context.answer;
    context.gender = gender;
    console.log(context);
    console.log(gender);
    console.log(userName);
  }, [userName, gender]);

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
        <br />
        <>
          남
          <input
            type="radio"
            value="100323"
            onChange={(e) => {
              setGender(e.target.value);
              console.log(gender);
            }}
            checked={gender === "100323" ? true : false}
          ></input>
          여
          <input
            type="radio"
            value="100324"
            onChange={(e) => {
              setGender(e.target.value);
              console.log(gender);
            }}
            checked={gender === "100324" ? true : false}
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
