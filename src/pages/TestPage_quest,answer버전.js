import React, { useState, useEffect, useContext, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router";
import axios from "axios";
import { InfoContext } from "./UserInfo";
import { Radio } from "antd";
import { tupleExpression } from "@babel/types";

export default function TestPage() {
  const [saveData, setSaveData] = useState([]); //state가 바뀔때마다 재랜더링
  const [pageCount, setPageCount] = useState(0);
  const history = useHistory();
  const totalQ = [];
  const [quest, setQuest] = useState("");
  const [answer, setAnswer] = useState("");
  const [getAnswerStorage, setGetAnswerStorage] = useState([]);
  //데이터 처음 한번만 받아오는 함수
  useEffect(() => {
    async function fetchData() {
      await axios
        .get(
          "https://www.career.go.kr/inspct/openapi/test/questions?apikey=8611fd29678269e033bf421a0db5f770&q=6"
        )
        .then((res) => {
          setSaveData(res.data.RESULT);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    fetchData();
  }, []);
  //28개짜리 saveData를 5개짜리 6개의 totalQ로 만들기
  for (let i = 0; i < saveData.length; i = i + 5) {
    totalQ.push(saveData.slice(i, i + 5));
  }
  //데이터 잘 받아왔는지 확인용 console.log
  if (saveData && saveData.length > 0) {
    console.log(saveData);
  }
  if (totalQ && totalQ.length > 0) {
    console.log(totalQ);
  }
  //페이지 이동 함수 처음 페이지는 test_example로 이동
  function PrevPage() {
    if (0 < pageCount) {
      setPageCount(pageCount - 1);
    } else if (pageCount === 0) {
      history.go(1);
    }
  }
  //페이지 이동 함수 마지막 페이지는 결과페이지로 이동
  function NextPage() {
    if (pageCount < totalQ.length - 1) {
      setPageCount(pageCount + 1);
    } else if (pageCount === totalQ.length - 1) {
      history.push("/test_result");
    }
  }
  // useCallback = 메모제이션 된 콜백을 반환 ,
  // .filter = 어떤 조건 성립하는 요소만 배열에 넣어 그 배열 반환

  //change 이벤트가 일어나면 -> saveStorage를 해라!

  const changeHandler = (e) => {
    setQuest(e.target.name);
    setAnswer(e.target.value);
    // const newAnswers = [...getAnswerStorage];
    // for (let i = 0; i <= localStorage.length; i++) {
    //   newAnswers[i] = localStorage.getItem(i);
    //   setGetAnswerStorage(newAnswers);
    //   console.log(getAnswerStorage);
    // }
    console.log(getAnswerStorage);
  };

  useEffect(() => {
    window.localStorage.setItem(quest, answer);
    const newAnswers = [...getAnswerStorage];
    for (let i = 0; i <= localStorage.length; i++) {
      newAnswers[i] = localStorage.getItem(i);
      setGetAnswerStorage(newAnswers);
    }
  }, [quest, answer]);
  // function checkRadio1(i) {
  //   if (window.localStorage.getItem(totalQ[pageCount][i].qitemNo)) {
  //     // 만약 localStorage에 이 질문번호에 대한 value가 있으면
  //     if (
  //       window.localStorage.getItem(totalQ[pageCount][i].qitemNo) ===
  //       totalQ[pageCount][i].answerScore01
  //     ) {
  //       return "answer01"; //그 value가 1번이라면 true를 띄운다.
  //     } else {
  //       return "answer02"; //값은 있는데 value가 2번이라면
  //     }
  //   } else {
  //     //값조차 없으면
  //     return false;
  //   }
  // }

  function countProgress() {
    const progressRate = Math.round((window.localStorage.length * 100) / 28);
    return progressRate;
  }

  function printQuestions() {
    const printQuest5 = [];
    if (pageCount === 5) {
      //마지막 페이지일 경우 결과 페이지로 이동
      for (let i = 0; i < totalQ[pageCount].length; i++) {
        if (totalQ && totalQ.length > 0) {
          printQuest5.push(
            <div>
              <h3>
                {totalQ[pageCount][i].qitemNo}번.{" "}
                {totalQ[pageCount][i].question}
              </h3>
              <form>
                <div>
                  <p>
                    {totalQ[pageCount][i].answer01} :{" "}
                    {totalQ[pageCount][i].answer03}
                  </p>
                  <input
                    type="radio"
                    name={totalQ[pageCount][i].qitemNo}
                    value={totalQ[pageCount][i].answerScore01}
                    onChange={changeHandler}
                    checked={
                      localStorage.getItem(totalQ[pageCount][i].qitemNo) ===
                      totalQ[pageCount][i].answerScore01
                        ? true
                        : false
                    }
                    // readOnly
                  ></input>
                </div>
                <div>
                  <p>
                    {totalQ[pageCount][i].answer02} :{" "}
                    {totalQ[pageCount][i].answer04}
                  </p>
                  <input
                    type="radio"
                    name={totalQ[pageCount][i].qitemNo}
                    value={totalQ[pageCount][i].answerScore02}
                    onChange={changeHandler}
                    checked={
                      localStorage.getItem(totalQ[pageCount][i].qitemNo) ===
                      totalQ[pageCount][i].answerScore02
                        ? true
                        : false
                    }
                    // readOnly
                  ></input>
                </div>
              </form>
            </div>
          );
        }
      }
    } else if (pageCount <= 4) {
      for (let i = 0; i < 5; i++) {
        if (totalQ && totalQ.length > 0) {
          printQuest5.push(
            <div>
              <h3>
                {totalQ[pageCount][i].qitemNo}번.{" "}
                {totalQ[pageCount][i].question}
              </h3>
              <form>
                <div>
                  <p>
                    {totalQ[pageCount][i].answer01} :{" "}
                    {totalQ[pageCount][i].answer03}
                  </p>
                  <input
                    type="radio"
                    name={totalQ[pageCount][i].qitemNo}
                    value={totalQ[pageCount][i].answerScore01}
                    onChange={changeHandler}
                    checked={
                      localStorage.getItem(totalQ[pageCount][i].qitemNo) ===
                      totalQ[pageCount][i].answerScore01
                        ? true
                        : false
                    }
                    // readOnly
                  ></input>
                </div>
                <div>
                  <p>
                    {totalQ[pageCount][i].answer02} :{" "}
                    {totalQ[pageCount][i].answer04}
                  </p>
                  <input
                    type="radio"
                    name={totalQ[pageCount][i].qitemNo}
                    value={totalQ[pageCount][i].answerScore02}
                    onChange={changeHandler}
                    checked={
                      localStorage.getItem(totalQ[pageCount][i].qitemNo) ===
                      totalQ[pageCount][i].answerScore02
                        ? true
                        : false
                    }
                    // readOnly
                  ></input>
                </div>
              </form>
            </div>
          );
        }
      }
    }
    return printQuest5;
  }

  return (
    <div>
      <header>검사 진행</header>
      <h2>{countProgress()}% 진행 중</h2>
      <div>현재 페이지는 {pageCount}입니다.</div>
      <div className="question_block">{printQuestions()}</div>
      <button onClick={PrevPage}>이전</button>
      <button onClick={NextPage}>
        {pageCount === 5 ? "결과보기" : "다음"}
      </button>
    </div>
  );
}
