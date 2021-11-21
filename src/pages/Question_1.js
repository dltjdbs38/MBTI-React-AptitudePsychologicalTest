import { useState, useEffect } from "react";
import { BrowserRouter, Link, Route } from "react-router-dom";
import React from "react";
import axios from "axios";

export default function TestPage(props) {
  const [currentPage, setCurrentPage] = useState(props.mypage);
  const [currentQuestions, setCurrentQuestions] = useState(props.myquest);
  const [progress, setProgress] = useState(props.myprogress);
  const [userAnswer, setUserAnswer] = useState();
  const [totalAnswer, setTotalAnswer] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  useEffect(() => {
    async function setQuestAndPage() {
      const loading = await Boolean(
        props.myquest && props.mypage && props.myprogress
      );
      if (loading == true) {
        setCurrentQuestions(props.myquest);
        setCurrentPage(props.mypage);
        // set;
      }
    }
  }, [currentQuestions, currentPage]);
  return (
    <div>
      <div className="question">
        <h2>{progress}% 진행 중</h2>
        {props.myquest &&
          currentQuestions.map((data) => {
            function inputHandler(e) {
              setUserAnswer(e.target.value);
              totalAnswer[Number(data.qitemNo) - 1] = userAnswer;
              setTotalScore(totalScore + Number(userAnswer));
              console.log(totalAnswer);
              console.log(totalScore);
            }
            return (
              <div key={data.qitemNo}>
                <p>{data.question}</p>
                <form>
                  <input
                    type="checkbox"
                    value="1"
                    onChange={inputHandler}
                  ></input>
                  {data.answer01} : {data.answer03}
                  <input
                    type="checkbox"
                    value="2"
                    onChange={inputHandler}
                  ></input>
                  {data.answer02} : {data.answer04}
                </form>
              </div>
            );
          })}
      </div>
    </div>
  );
}

function PageButton(props) {
  //useParams는 URL 인자들의 key/value(키/값) 짝들의 객체를 반환한다. 현재 <Route> 의 match.params에 접근하기 위해 사용한다.

  return <div className="pageButton"></div>;
}
