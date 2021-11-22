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
  // const [userAnswerList, setUserAnswerList] = useState({});
  const [userAnswerArray, setUserAnswerArray] = useState(new Array(28));
  const [finalRadio, setFinalRadio] = useState(false);
  const [finalTotalAnsStr, setFinalTotalAnsStr] = useState("");
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

  if (saveData && saveData.length > 0) {
    console.log(saveData); //saveData 받기
  }
  if (totalQ && totalQ.length > 0) {
    console.log(totalQ); //totalQ 5개묶음 6개 받기
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
  const checkHandler = (e) => {
    e.preventDefault();
  };
  const clickHandler = (e) => {
    e.preventDefault();
    // setCurrQuestionNum("B" + e.target.name); //'B1'
    setCurrQuestionNum(Number(e.target.name)); //인덱스로 쓰려고 1 숫자로 바꿈
    setCurrUserAnswer(e.target.value); //'1'
    // 1. {"": '', B1: '1', B2: '3', B3: '5'}
    // let newAnswers = { ...userAnswerList }; //임시 배열
    // newAnswers[currQuestionNum] = currUserAnswer; //중복 키 알아서 갱신됨
    // setUserAnswerList(newAnswers);
    //... 전개연산자 기존의 객체 안에 있는 내용을 해당 위치에 풀어준다. 즉, userAnswerList를 바꾸는 게 아닌 복사해다가 거기에 추가하는 느낌

    // 2. [undefined, '1', '3', '5', '7', '9', '11', '13', '15', '18', '19', '21', '23', '26', '27', '30', '31', '33', '35', '38', '39', '41', '43', '46', '47', '49', '51', '53', '55']
    let newAnswers = [...userAnswerArray];
    newAnswers[currQuestionNum] = currUserAnswer;
    setUserAnswerArray(newAnswers);
    console.log("클릭할 때마다 userAnswerArray 입력 중");
    console.log(userAnswerArray);
  };

  // 1.
  // useEffect(() => {
  //   async function makeAnswerStr() {
  //     const AnsStr = [];
  //     for (let i = 1; i < userAnswerArray.length; i++) {
  //       AnsStr.push("B" + String(i) + "=" + userAnswerArray[i]);
  //       // console.log(AnsStr);
  //     }
  //     const totalAnsStr = AnsStr.join(" ");
  //     console.log("네가 낸 답 string으로 만들고 있음");
  //     console.log(totalAnsStr);
  //     return totalAnsStr;
  //   }
  //   makeAnswerStr();
  // }, [currUserAnswer, userAnswerArray]);

  // 2.
  useEffect(() => {
    function makeAnswerStr() {
      const AnsStr = [];
      for (let i = 1; i < userAnswerArray.length; i++) {
        AnsStr.push("B" + String(i) + "=" + userAnswerArray[i]);
        // console.log(AnsStr);
      }
      const totalAnsStr = AnsStr.join(" ");
      return totalAnsStr;
    }
    function checkRadio() {
      const radio = false;
      if (userAnswerArray[Number(currQuestionNum)] === undefined) {
        console.log(`${currQuestionNum} : false`);
        return radio; //radio check false
      } else if (userAnswerArray[Number(currQuestionNum)] !== undefined) {
        console.log(`${currQuestionNum} : true`);
        return !radio; //radio check true
      }
    }
    async function asyncCall() {
      try {
        console.log("네가 낸 답 string으로 만들고 있음");
        const result1 = await makeAnswerStr();
        console.log(result1);
        setFinalTotalAnsStr(result1);
        console.log("체크박스 로딩 중");
        const result2 = await checkRadio();
        setFinalRadio(result2);
        console.log("체크박스 체크 완료");
      } catch (err) {
        console.log(err);
      }
    }
    asyncCall();
  }, [currUserAnswer, userAnswerArray]);

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
                    onClick={clickHandler}
                    checked={finalRadio}
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
                    onClick={clickHandler}
                    checked={finalRadio}
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
                    onClick={clickHandler}
                    checked={finalRadio}
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
                    onClick={clickHandler}
                    checked={finalRadio}
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
