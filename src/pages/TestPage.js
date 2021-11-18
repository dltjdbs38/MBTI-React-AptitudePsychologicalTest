import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import React from "react";
import axios from "axios";

function TestPage() {
  const [progress, setProgress] = useState(0);
  const [saveData, setSaveData] = useState([]); //length 28인 Array
  const [userAnswer, setUserAnswer] = useState();
  const [totalAnswer, setTotalAnswer] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const [currentData, setCurrentData] = useState([, , , ,]);
  useEffect(() => {
    //컴포넌트가 렌더링 될 떄마다 특정 작업을 실행할 수 있도록
    axios
      .get(
        "https://www.career.go.kr/inspct/openapi/test/questions?apikey=8611fd29678269e033bf421a0db5f770&q=6"
      )
      .then((res) => {
        console.log(res);
        setSaveData(res.data.RESULT);
        setTotalAnswer(Array(saveData.length));
        for (let i = 0; i <= saveData.length - 1; i++) {
          for (let j = 0; j <= currentData.length - 1; j++) {
            currentData[i] = saveData[i];
          }
        }
        console.log(currentData);
      })
      .catch((err) => {
        console.log(err);
      }); //한번만 실행 원하면 ({함수},[]) 리렌더링시마다 실행하고싶으면 ({함수}) 특정 state가 바뀔떄마다 실행 ({함수},[name])
  }, []);
  function PlusProgress({ saveData, progress }) {
    setProgress(progress + 100 / (28 / 5));
    if (progress > 100) {
      setProgress(100);
    }
    console.log(progress);
  }
  function MinusProgress({ saveData, progress }) {
    setProgress(progress - 100 / (28 / 5));
    if (progress < 0) {
      setProgress(0);
    }
    console.log(progress);
  }
  return (
    <div>
      <header>검사 진행</header>
      <h2>{progress}% 진행 중</h2>
      <div className="question">
        {currentData.map((data) => {
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
              <div>
                <input
                  type="checkbox"
                  value="1"
                  onChange={inputHandler}
                ></input>
                {data.answer01} : {data.answer03}
              </div>
              <div>
                <input
                  type="checkbox"
                  value="2"
                  onChange={inputHandler}
                ></input>
                {data.answer02} : {data.answer04}
              </div>
            </div>
          );
        })}
      </div>
      <button onClick={MinusProgress}>이전</button>
      <button onClick={PlusProgress}>다음</button>
    </div>
  );
}

export default TestPage;
