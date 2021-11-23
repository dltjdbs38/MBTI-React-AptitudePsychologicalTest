import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router";
import axios from "axios";
import { InfoContext } from "./UserInfo";
import { Radio } from "antd";

export default function TestPage() {
  const [saveData, setSaveData] = useState([]); //state가 바뀔때마다 재랜더링
  const [pageCount, setPageCount] = useState(0);
  const history = useHistory();
  const totalQ = [];
  const [currUserAnswer, setCurrUserAnswer] = useState("");
  const [currQuestionNum, setCurrQuestionNum] = useState("");
  const [userAnswerArray, setUserAnswerArray] = useState(new Array(29));
  const [finalTotalAnsStr, setFinalTotalAnsStr] = useState("");
  const [isChecked, setIsChecked] = useState(false);
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

  //변화 시 체크 해제/등록 & AnswerArray에 e.target.name과 e.target.value가 추가되어야 함.
  const changeHandler = (e) => {
    e.preventDefault();
    setIsChecked(!isChecked);
    if (e.target.checked === true) {
      setCurrQuestionNum(Number(e.target.name)); //1
      setCurrUserAnswer(e.target.value); //'1'
      console.log(currUserAnswer);
      // 2. [undefined, '1', '3', '5', '7', '9', '11', '13', '15', '18', '19', '21', '23', '26', '27', '30', '31', '33', '35', '38', '39', '41', '43', '46', '47', '49', '51', '53', '55']
      let newAnswers = [...userAnswerArray];
      newAnswers[currQuestionNum] = currUserAnswer;
      setUserAnswerArray(newAnswers);
    }
  };
  // 2.
  // useEffect(() => {
  //   function makeAnswerStr() {
  //     const AnsStr = [];
  //     for (let i = 1; i < userAnswerArray.length; i++) {
  //       AnsStr.push("B" + String(i) + "=" + userAnswerArray[i]);
  //     }
  //     const totalAnsStr = AnsStr.join(" ");
  //     setFinalTotalAnsStr(totalAnsStr);
  //     console.log(finalTotalAnsStr);
  //     return finalTotalAnsStr;
  //   }
  //   makeAnswerStr();
  // }, [currUserAnswer, userAnswerArray, finalTotalAnsStr]);
  function makeAnswerStr() {
    const AnsStr = [];
    for (let i = 1; i < userAnswerArray.length; i++) {
      AnsStr.push("B" + String(i) + "=" + userAnswerArray[i]);
    }
    const totalAnsStr = AnsStr.join(" ");
    setFinalTotalAnsStr(totalAnsStr);
    console.log(finalTotalAnsStr);
    return finalTotalAnsStr;
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
                    checked={isChecked}
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
                    checked={isChecked}
                  ></input>
                </div>
              </form>
            </div>
          );
        }
      }
    } else if (pageCount <= 4) {
      for (let i = 0; i < 5; i++) {
        console.log(userAnswerArray[pageCount * 5 + i + 1]);
        const isChecked =
          userAnswerArray[pageCount * 5 + i + 1] !== undefined ? true : false;
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
                    checked={isChecked}
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
                    checked={isChecked}
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
      <h2>0 % 진행 중</h2>
      <div>현재 페이지는 {pageCount}입니다.</div>
      <div className="question_block">{printQuestions()}</div>
      <button onClick={PrevPage}>이전</button>
      <button onClick={NextPage}>
        {pageCount === 5 ? "결과보기" : "다음"}
      </button>
    </div>
  );
}
