import React, { useState, useEffect } from "react";
import { BrowserRouter, useParams, useHistory } from "react-router-dom";
import axios from "axios";

export default function TestPage() {
  const [saveData, setSaveData] = useState([]); //state가 바뀔때마다 재랜더링
  const [pageCount, setPageCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const questions5 = [];
  let pagenum = useParams().pagenum;
  const [pageNum, setPageNum] = useState(Number(pagenum));
  const history = useHistory();
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
  //28개짜리 saveData를 5개짜리 6개의 questions로 만들기
  for (let i = 0; i < saveData.length; i = i + 5) {
    questions5.push(saveData.slice(i, i + 5));
  }

  if (saveData && saveData.length > 0) {
    console.log("saveData 받기 성공");
    console.log(saveData);
  }
  if (questions5 && questions5.length > 0) {
    console.log("questions5 : 5개씩 6묶음 성공");
    console.log(questions5);
  }

  function PrevPage() {
    if (0 < pageCount && 1 < pageNum) {
      setPageCount(pageCount - 1);
      setPageNum(pageNum - 1);
      pagenum = pageNum;
      history.push(`/test/${pagenum}`);
    } else if (pageCount === 0 && pageNum === 1) {
      setPageCount(0);
      setPageNum(1);
      pagenum = pageNum;
      history.push(`/test/${pagenum}`);
    } else {
      setPageNum(1);
      setPageCount(0);
      pagenum = pageNum;
      console.log("You clicked too much! I will let you go to start page");
      history.push(`/test/${pagenum}`);
    }
  }

  function NextPage() {
    if (pageCount < questions5.length - 1 && pageNum < questions5.length) {
      setPageCount(pageCount + 1);
      setPageNum(pageNum + 1);
      pagenum = pageNum;
      history.push(`/test/${pagenum}`);
    } else if (pageCount === 5 && pageNum === 6) {
      setPageCount(questions5.length - 1);
      setPageNum(questions5.length);
      pagenum = pageNum;
      history.push(`/test/${pagenum}`);
    } else {
      setPageNum(1);
      setPageCount(0);
      pagenum = pageNum;
      console.log("You clicked too much! I will let you go to start page");
      history.push(`/test/${pagenum}`);
    }
  }

  function printQuestion5() {
    questions5[pageNum - 1];
  }
  return (
    <div>
      <header>검사 진행</header>
      <h2>{progress} % 진행 중</h2>
      <div className="question_block"></div>
      <button onClick={PrevPage}>이전</button>
      <button onClick={NextPage}>다음</button>
    </div>
  );
}
