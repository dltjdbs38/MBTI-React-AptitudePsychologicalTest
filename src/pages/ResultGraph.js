import axios from "axios";
import React, { useState, useRef, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "./UserInfo";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";

export default function ResultGraph() {
  const context = useContext(UserContext);
  let graphArr = [];
  let Jobs = [];
  let Majors = [];
  //CORS : Cross Origin Resource Sharing 교차 출처 리소스 공유
  // 도메인과 포트가 서로 다른 서버로 client를 요청했을 때 브라우저가 보안상 이유로 API를 차단하는 문제. ex client는 8080포트, server는 9000포트일 때.
  //나는 지금 백엔드 없이 프론트React만 사용하므로 요청받는 server에서 모든 요청을 허가한다든지 백엔드에 cors 패키지를 설치해 미들웨어로 처리한다든지 할 수 없다.
  useEffect(() => {
    async function asyncCall() {
      let seqKey = "";
      let result1 = [];
      let result3 = [];
      let originArr = [];
      let No1 = "";
      let No2 = "";
      let No1Index = "";
      let No2Index = "";
      let NoIndex = [];
      const uploadData = await axios
        .post(
          `http://www.career.go.kr/inspct/openapi/test/report?apikey=${context.apikey}&qestrnSeq=${context.qestrnSeq}`,
          context
        )
        .then((res) => {
          // console.log(res);
          seqKey = res.data.RESULT.url.split("seq=")[1];
          console.log(seqKey);
          return seqKey;
        })
        .catch((err) => {
          console.error(err);
        });
      const reloadData = await axios
        .get(`https://www.career.go.kr/inspct/api/psycho/report?seq=${seqKey}`)
        .then((res) => {
          console.log("get완료 res:", res);
          result1 = res.data.result.wonScore.split(" "); //['1=3', '2=3', '3=4', '4=3', '5=4', '6=5', '7=5', '8=1', '']
          for (let i = 0; i < result1.length - 1; i++) {
            originArr.push(result1[i].split("=")[1]); //['3','3','4','3','4','5','5','1']
          }
          graphArr = originArr;
          console.log("graphArr:", graphArr);
          result3 = originArr.sort(); //['1','3','3','3','4','4','5','5']
          console.log("sorted graphArr = result3:", result3);
          No1 = result3[result3.length - 1]; // '5'
          No2 = result3[result3.length - 2]; // '5' '4'
          console.log("No1:", No1, "No2:", No2);
          for (let i = 0; i < originArr.length; i++) {
            if (No1 !== No2) {
              if (originArr[i] === No1) {
                No1Index = String(i + 1); //3
              } else if (originArr[i] === No2) {
                No2Index = String(i + 1); //2
              }
            } else {
              if (originArr[i] === No1) {
                No1Index = String(i + 1);
                originArr[i] = "0";
                result3 = originArr.sort();
              } else if (originArr[i] === No2) {
                No2Index = String(i + 1);
              }
            }
          }
          NoIndex = [No1Index, No2Index];
          console.log("NoIndex: ", NoIndex);
          return NoIndex;
        })
        .catch((err) => {
          console.error(err);
        });
      const requestJobs = await axios
        .get(
          `https://inspct.career.go.kr/inspct/api/psycho/value/jobs?no1=${NoIndex[0]}&no2=${NoIndex[1]}`
        )
        .then((res) => {
          console.log("get완료 종사자 평균학력: ", res);
        })
        .catch((err) => {
          console.error(err);
        });
    }
    asyncCall();
  }, []);
  //https://www.career.go.kr/inspct/web/psycho/value/report?seq=NTU3MTA5NDE

  useEffect(() => {
    //firstResponse
    console.log(context);
    console.log(firstResponse);
  }, [firstResponse]);

  let data = {
    type: "bar",
    data: {
      labels: [
        "능력발휘",
        "자율성",
        "보수",
        "안정성",
        "사회적 인정",
        "사회봉사",
        "자기계발",
        "창의성",
      ],
      datasets: [
        {
          label: "직업가치관 결과",
          backgroundColor: "rgba(0, 99, 255, 0.27)",
          borderColor: "rgba(0, 99, 255, 0.72)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(0, 99, 255, 0.427)",
          hoverBorderColor: "rgba(0, 99, 255, 0.72)",
          data: ["3", "3", "4", "3", "4", "5", "5", "1"],
        },
      ],
    },
  };

  const canvasDom = useRef(null);
  useEffect(() => {
    const ctx = canvasDom.current.getContext("2d");
    console.log(ctx);
    let chart = new Chart(ctx, data);
  }, []);
  return (
    <div>
      <header>직업 가치관 검사 결과</header>
      <table>
        <thead>
          <tr>
            <th>이름</th>
            <th>성별</th>
            <th>검사 일시</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{context.name}</td>
            <td>{context.gender === "100323" ? "남" : "여"}</td>
            <td>{context.startDtm}</td>
          </tr>
        </tbody>
      </table>
      <table>
        <thead>직업가치관 결과</thead>
        <tbody>
          <canvas ref={canvasDom}></canvas>
        </tbody>
      </table>
      <table>
        <thead>가치관과 관련이 높은 직업</thead>
        <tbody>
          <table>
            <thead>종사자 평균 학력별</thead>
            <tbody>
              <tr>
                <td>
                  <table>
                    <thead>
                      <tr>
                        <th>학력</th>
                        <th>직업</th>
                      </tr>
                    </thead>
                    <tbody>tbody 1 !</tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <table>
            <thead>종사자 평균 전공별</thead>
            <tbody>
              <tr>
                <td>
                  <table>
                    <thead>
                      <tr>
                        <th>전공</th>
                        <th>직업</th>
                      </tr>
                    </thead>
                    <tbody>tbody 2 !</tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </tbody>
      </table>
    </div>
  );
}

// var config = {
//   headers: { "Access-Control-Allow-Origin": "*" },
// };
// await axios({
//   method: "post",
//   url:
//     (`http://www.career.go.kr/inspct/openapi/test/report?apikey=${context.apikey}&qestrnSeq=${context.qestrnSeq}`,
//     config),
//   headers: {
//     "Content-Type": "application/json",
//   },
//   data: context,
// })
