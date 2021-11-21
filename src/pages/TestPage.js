import React, { useState, useEffect, useContext, createContext } from "react";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router";
import axios from "axios";
import TestResultPage from "./TestResultPage";
//useContext 이용. export function 밖에서 써야함.
export const AnswerContext = createContext();

export default function TestPage() {
  const [saveData, setSaveData] = useState([]); //state가 바뀔때마다 재랜더링
  const [pageCount, setPageCount] = useState(0);
  const totalQ = [];
  const history = useHistory();
  const location = useLocation();
  //useLocation으로 StartPage에 있던 값 history로 /test까지 옮겨옴. 여기서 출력했음.
  const name = location.state.userName;
  const gender = location.state.gender;
  //useContext
  const [userAnswer, setUserAnswer] = useState({
    apikey: "8611fd29678269e033bf421a0db5f770",
    qestrnSeq: "6",
    trgetSe: "100208",
    name: name,
    gender: gender,
    grade: "1",
    startDtm: new Date().getTime(),
    answers: "",
  });
  //첫 렌더링에만 호출하는 useEffect 사용, 만약 여러 개의 state에 대해 여러 개의 개별적인 동작을 실행시키려면 useEffect 여러개 쓰고 []에 해당 state쓰면 됨.
  useEffect(async () => {
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
  }, []);
  //28개짜리 saveData를 5개짜리 6개의 totalQ로 만들기
  for (let i = 0; i < saveData.length; i = i + 5) {
    totalQ.push(saveData.slice(i, i + 5));
  }

  if (saveData && saveData.length > 0) {
    console.log("saveData 받기 성공");
    console.log(saveData);
  }
  if (totalQ && totalQ.length > 0) {
    console.log("totalQ : 5개씩 6묶음 성공");
    console.log(totalQ);
  }
  //페이지 이동 함수 마지막 페이지는 결과페이지로 이동
  function PrevPage() {
    if (0 < pageCount) {
      setPageCount(pageCount - 1);
    } else if (pageCount === 0) {
      history.go(1);
    }
  }

  function NextPage() {
    if (pageCount < totalQ.length - 1) {
      setPageCount(pageCount + 1);
    } else if (pageCount === totalQ.length - 1) {
      history.push("/test_result");
    }
  }
  //History에서 가져온 state
  function printNameandGender() {
    return (
      <>
        이름: {name} 성별: {gender}
      </>
    );
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
                    value={totalQ[pageCount][i].answerScore01}
                  ></input>
                </div>
                <div>
                  <p>
                    {totalQ[pageCount][i].answer02} :{" "}
                    {totalQ[pageCount][i].answer04}
                  </p>
                  <input
                    type="radio"
                    value={totalQ[pageCount][i].answerScore02}
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
                    type="checkbox"
                    value={totalQ[pageCount][i].answerScore01}
                  ></input>
                </div>
                <div>
                  <p>
                    {totalQ[pageCount][i].answer02} :{" "}
                    {totalQ[pageCount][i].answer04}
                  </p>
                  <input
                    type="checkbox"
                    value={totalQ[pageCount][i].answerScore02}
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
      <AnswerContext value={userAnswer}>
        <header>검사 진행</header>
        <h2>0 % 진행 중</h2>
        <div>현재 페이지는 {pageCount}입니다.</div>
        <div className="question_block">{printQuestions()}</div>
        <div>{printNameandGender()}</div>
        <button onClick={PrevPage}>이전</button>
        <button onClick={NextPage}>
          {pageCount === 5 ? "결과보기" : "다음"}
        </button>
      </AnswerContext>
    </div>
  );
}
