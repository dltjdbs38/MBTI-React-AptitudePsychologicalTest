import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import React from "react";
import axios from "axios";

function TestPage() {
  const [progress, setProgress] = useState(0);
  const [saveData, setSaveData] = useState([]);
  useEffect(() => {
    //컴포넌트가 렌더링 될 떄마다 특정 작업을 실행할 수 있도록
    axios
      .get(
        "https://www.career.go.kr/inspct/openapi/test/questions?apikey=8611fd29678269e033bf421a0db5f770&q=6"
      )
      .then((res) => {
        console.log(res);
        setSaveData(res.data.RESULT);
        console.log(saveData);
      })
      .catch((err) => {
        console.log(err);
      }); //한번만 실행 원하면 ({함수},[]) 리렌더링시마다 실행하고싶으면 ({함수}) 특정 state가 바뀔떄마다 실행 ({함수},[name])
  }, []); //그렇다고 한번만 useEffect를 실행시키면 saveData에 아무것도 저장되지 않음.
  return (
    <div>
      <header>검사 진행</header>
      <h2>{progress}% 진행 중</h2>
      <ul>
        {/* {saveData.map((data) => {
          return <li>{data}</li>; //이 부분을 남기면 위와 같은 오류가 뜸.
        })} */}
      </ul>

      <div>문항 넣을 공간</div>
      <button
        onClick={() => {
          setProgress(progress - 10);
          console.log(progress);
        }}
      >
        이전
      </button>
      <button
        onClick={() => {
          setProgress(progress + 10);
          console.log(progress);
        }}
      >
        다음
      </button>
    </div>
  );
}

export default TestPage;
