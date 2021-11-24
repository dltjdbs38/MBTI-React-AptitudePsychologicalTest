import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router";
import axios from "axios";
import { UserContext } from "./UserInfo";
import { Radio } from "antd";
import { tupleExpression } from "@babel/types";
import ProgressBar from "react-bootstrap/ProgressBar";

export default function TestPage() {
  const context = useContext(UserContext); //useContext(컨텍스트 이름 파일명X)를 쓰면 <.Consumer> 를 안 감싸줘도 됨
  const [saveData, setSaveData] = useState([]); //state가 바뀔때마다 재랜더링
  const [pageCount, setPageCount] = useState(0);
  const history = useHistory();
  const totalQ = [];
  const [getAnswerStorage, setGetAnswerStorage] = useState([]);
  //데이터 처음 한번만 받아오는 함수
  useEffect(() => {
    async function fetchData() {
      await axios
        .get(
          `https://www.career.go.kr/inspct/openapi/test/questions?apikey=${context.apikey}&q=6`
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
    //state덕분에 클릭할때마다 재랜더링이 된다.
    window.localStorage.setItem(e.target.name, e.target.value);
    const newAnswers = [...getAnswerStorage];
    for (let i = 0; i <= localStorage.length; i++) {
      //다행히도 localStorage의 key와 index가 같다.
      newAnswers[i] = localStorage.getItem(i);
      setGetAnswerStorage(newAnswers);
    }
  };
  useEffect(() => {
    //한 박자씩 느리게 console출력되는 건 출력만 그런거라 문제 X
    //출력 이쁘게 하고 싶으면 이렇게 해라
    console.log(getAnswerStorage);
  }, [getAnswerStorage]); // [null, '1', '3', '6', '7', '9', '11', '14', '15', '18', '19', '21', '23', '25', '27', '29', '32', '33', '36', '37', '39', '41', '43', '46', '47', '49', '51', '53', '55']

  useEffect(() => {
    const makeAnsStr = [];
    for (let i = 1; i <= getAnswerStorage.length - 1; i++) {
      makeAnsStr.push("B" + String(i) + "=" + getAnswerStorage[i]);
    }
    const totalAnsStr = makeAnsStr.join(" ");
    console.log(totalAnsStr);
    context.answers = totalAnsStr;
    // delete context.answer;
    console.log(context);
  }, [getAnswerStorage]);

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
      <h2>
        {countProgress() !== 100
          ? `${countProgress()}% 진행 중`
          : `${countProgress()}% 진행 완료`}
      </h2>
      {/* <ProgressBar animated now={60} /> */}
      <div>현재 페이지는 {pageCount}입니다.</div>
      <div className="question_block">{printQuestions()}</div>
      <button onClick={PrevPage}>이전</button>
      <button onClick={NextPage}>
        {pageCount === 5 ? "결과보기" : "다음"}
      </button>
    </div>
  );
}
