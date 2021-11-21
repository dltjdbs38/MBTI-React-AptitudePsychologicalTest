import React, { useState, useEffect } from "react";
import axios from "axios";

const TestPage = ({ history }) => {
  const [questions, setQuestions] = useState([]);
  const [curPage, setCurPage] = useState(0);
  const [curQuestions, setCurQuestions] = useState(0);

  const key = "7a4a751c986dd7f717a4bb2fb63a14a6";
  const handleClick = (e) => {
    e.preventDefault();
    setCurPage(curPage + 1);
  };

  useEffect(() => {
    async function getQuestion() {
      try {
        const response = await axios.get(
          `https://www.career.go.kr/inspct/openapi/test/questions?apikey=${key}&q=6`
        );
        setQuestions(response.data["RESULT"]);
        console.log(questions);
      } catch (err) {
        console.log(err);
      }
    }
    getQuestion();
  }, []);

  // qlist에 5문항씩 받아오기 및 배열 안에 객체 콘솔 출력에 TypeError: Cannot read property ‘0’ of undefined 에러 해결
  const qlist = [];
  for (let i = 0; i < questions.length; i += 5)
    qlist.push(questions.slice(i, i + 5));
  if (qlist && qlist.length > 0) {
    console.log(qlist);
  }

  // questions 질문지 받아오기 콘솔 출력
  if (questions && questions.length > 0) {
    console.log(questions);
  }

  const printqlist = () => {
    const print5qlist = [];
    if (curPage === 5) {
      for (let curQuestions = 0; curQuestions < 3; curQuestions++) {
        print5qlist.push(
          <div>
            <div>{qlist[curPage][curQuestions].question}</div>

            <form>
              <input
                type="radio"
                name="ans"
                value={qlist[curPage][curQuestions].answerScore01}
              />
              <div>{qlist[curPage][curQuestions].answer03}</div>
              <div>{qlist[curPage][curQuestions].answer01}</div>

              <input
                type="radio"
                name="ans"
                value={qlist[curPage][curQuestions].answerScore02}
              />
              <div>{qlist[curPage][curQuestions].answer04}</div>
              <div>{qlist[curPage][curQuestions].answer02}</div>
            </form>
          </div>
        );
      }
    } else if (curPage < 6) {
      for (let curQuestions = 0; curQuestions < 5; curQuestions++) {
        if (qlist && qlist.length > 0) {
          print5qlist.push(
            <div>
              <div>{qlist[curPage][curQuestions].question}</div>

              <form>
                <input
                  type="radio"
                  name="ans"
                  value={qlist[curPage][curQuestions].answerScore01}
                />
                <div>{qlist[curPage][curQuestions].answer03}</div>
                <div>{qlist[curPage][curQuestions].answer01}</div>

                <input
                  type="radio"
                  name="ans"
                  value={qlist[curPage][curQuestions].answerScore02}
                />
                <div>{qlist[curPage][curQuestions].answer04}</div>
                <div>{qlist[curPage][curQuestions].answer02}</div>
              </form>
            </div>
          );
        }
        // 검사 응답 모두 완료시 버튼 '결과보기' 변경 및 결과 페이지 이동 구현
      }
    }
    return print5qlist;
  };

  return (
    <div>
      <div>{printqlist()}</div>

      {/* 이전 버튼 클릭시 응답 저장 데이터 유지한채로 전 페이지 불러오기 */}
      <div>
        <button
          onClick={() => {
            history.goBack();
          }}
        >
          이전
        </button>
      </div>
      <div>
        <button onClick={handleClick}>다음</button>
      </div>
    </div>
  );
};

export default TestPage;
