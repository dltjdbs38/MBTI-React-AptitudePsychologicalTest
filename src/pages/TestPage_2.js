import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Question from "./Question";
import axios from "axios";

export default function TestPage() {
  const [saveData, setSaveData] = useState([]); //length 28인 Array
  const [pageCount, setPageCount] = useState(1);
  const [progress, setProgress] = useState(0);
  const questions = [];
  // const [questions, setQuestions] = useState([]);
  function NextPage(progress, pageCount) {
    setProgress(progress + 100 / (28 / 5));
    setPageCount(pageCount + 1);
    if (progress < 100) {
      setPageCount(pageCount + 1);
      setProgress(progress + 100 / (28 / 5));
    } else {
      setPageCount(100);
      setProgress(0);
    }
    console.log(progress);
  }
  function PrevPage(progress, pageCount) {
    if (pageCount > 0) {
      setPageCount(pageCount - 1);
      setProgress(progress - 100 / (28 / 5));
    } else {
      setPageCount(0);
      setProgress(0);
    }
    console.log(progress);
  }
  useEffect(() => {
    axios
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
  for (let i = 0; i < saveData.length; i = i + 5) {
    questions.push(saveData.slice(i, i + 5));
  }
  if (saveData && saveData.length > 0) {
    console.log("saveData는 아래야");
    console.log(saveData);
  }
  if (questions && questions.length > 0) {
    console.log("어딜 보니 questions는 아래야");
    console.log(questions);
    return (
      <BrowserRouter>
        <div>
          <header>검사 진행</header>
          <div className="question_block">
            {/* {questions.map((qset) => {
              return <Question myquest={qset} pageCount={pageCount} />;
            })} */}
            <Question
              myquest={questions[pageCount]}
              mypage={pageCount}
              myprogress={progress}
            />
          </div>
          <button onClick={PrevPage}>이전</button>
          <button onClick={NextPage}>다음</button>
        </div>
      </BrowserRouter>
    );
  } else {
    console.log(questions);
    return <>ㅋㅋ 데이터 넣는 중이지롱</>;
  }
}
