import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserInfo";
import Chart from "chart.js/auto";
import { Button } from "react-bootstrap";

export default function ResultGraph() {
  const context = useContext(UserContext);
  const [graphArr, setGraphArr] = useState([]);
  // const latestGraphArr = useRef(graphArr);
  const [jobs, setJobs] = useState([]);
  const [majors, setMajors] = useState([]);
  const [endTime, setEndTime] = useState("");
  let jobArr = [];
  let majorArr = [];
  // const [seqIndex, setSeqIndex] = useState([]);
  //CORS : Cross Origin Resource Sharing 교차 출처 리소스 공유
  // 도메인과 포트가 서로 다른 서버로 client를 요청했을 때 브라우저가 보안상 이유로 API를 차단하는 문제. ex client는 8080포트, server는 9000포트일 때.
  //나는 지금 백엔드 없이 프론트React만 사용하므로 요청받는 server에서 모든 요청을 허가한다든지 백엔드에 cors 패키지를 설치해 미들웨어로 처리한다든지 할 수 없다.
  useEffect(() => {
    async function asyncCall() {
      let seqKey = "";
      //no1 no2 알아내기 위한 변수
      let result1 = [];
      let result2 = [];
      let No1Index = "";
      let No2Index = "";
      let NoIndex = [];

      const uploadData = await axios
        .post(
          `http://www.career.go.kr/inspct/openapi/test/report?apikey=${context.apikey}&qestrnSeq=${context.qestrnSeq}`,
          context
        )
        .then((res) => {
          console.log("1번째 post완료 응답 ", res);
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
          console.log("2번째 get완료 res:", res);
          setEndTime(res.data.result.endDtm.split("T")[0]);
          result1 = res.data.result.wonScore.split(" "); //['1=3', '2=3', '3=4', '4=3', '5=4', '6=5', '7=5', '8=1', '']
          result1.pop(); //마지막 하나 뺌 result1 길이 8

          // 1. setGraphArr
          const newGraphArr = [...graphArr];
          for (let i = 0; i < result1.length; i++) {
            newGraphArr.push(result1[i].split("=")[1]);
          }
          setGraphArr(newGraphArr);
          console.log("newGraphArr:", newGraphArr); //['3','3','4','4','5','5','1']

          result2 = result1.sort(function (a, b) {
            return a[2] - b[2]; //오름차순 return 1, -1, 0
          });
          console.log("result2:", result2); //['8=1', '1=3', '3=3', '5=3', '2=4', '4=4', '6=5', '7=5']
          No1Index = result2[result2.length - 1].split("=")[0]; //문항번호 가져와야되니 앞에 놈
          No2Index = result2[result2.length - 2].split("=")[0];
          NoIndex = [No1Index, No2Index];
          console.log("NoIndex:", NoIndex);

          // 2. setSeqIndex
          // const newSeqIndex = [...seqIndex];
          // newSeqIndex.push(result2[result2.length - 1].split("=")[0]);
          // newSeqIndex.push(result2[result2.length - 2].split("=")[0]);
          // console.log("newSeqIndex: ", newSeqIndex);
          // setSeqIndex(newSeqIndex);

          // return seqIndex;
        })
        .catch((err) => {
          console.error(err);
        });
      // 3. 종사자 평균 학력별 get
      const requestJobs = await axios
        .get(
          `https://inspct.career.go.kr/inspct/api/psycho/value/jobs?no1=${NoIndex[0]}&no2=${NoIndex[1]}`
        )
        .then((res) => {
          console.log("3번째 get완료 종사자 평균 학력별: ", res);
          //setJobs 버전
          const newJobs = [...jobs];
          for (let i = 0; i < res.data.length; i++) {
            newJobs.push(res.data[i]);
          }
          console.log("newJobs:", newJobs);
          setJobs(newJobs);
          //일반 변수 버전
          for (let i = 0; i < res.data.length; i++) {
            jobArr.push(res.data[i]);
          }
        })
        .catch((err) => {
          console.error(err);
        });
      // 4. 종사자 평균 전공별 get
      const requestMajors = await axios
        .get(
          `https://inspct.career.go.kr/inspct/api/psycho/value/majors?no1=${NoIndex[0]}&no2=${NoIndex[1]}`
        )
        .then((res) => {
          console.log("4번째 get완료 종사자 평균 전공별:", res);
          //setMajors 버전
          const newMajors = [...majors];
          for (let i = 0; i < res.data.length; i++) {
            newMajors.push(res.data[i]);
          }
          console.log("newMajors:", newMajors);
          setMajors(newMajors);
          //일반 변수 버전
          for (let i = 0; i < res.data.length; i++) {
            majorArr.push(res.data[i]);
          }
        })
        .catch((err) => console.error(err));
    }
    asyncCall();
  }, []);
  //https://www.career.go.kr/inspct/web/psycho/value/report?seq=NTU3MTA5NDE

  function printJobs() {
    console.log("printJobs start - jobs:", jobs);
    const HighJobs = [];
    const SpeciJobs = [];
    const UnivJobs = [];
    const LabJobs = [];
    for (let i = 0; i < jobs.length; i++) {
      if (jobs[i][2] <= 2) {
        HighJobs.push(jobs[i][1]); //['경찰관','레크리에이션지도자','마술사']
      } else if (jobs[i][2] === 3) {
        SpeciJobs.push(jobs[i][1]);
      } else if (jobs[i][2] === 4) {
        UnivJobs.push(jobs[i][1]);
      } else if (jobs[i][2] >= 5) {
        LabJobs.push(jobs[i][1]);
      }
    }
    const HighJobsStr = HighJobs.join(" / "); //'경찰관 / 레크리에이션지도자 / 마술사
    const SpeciJobsStr = SpeciJobs.join(" / ");
    const UnivJobsStr = UnivJobs.join(" / ");
    const LabJobsStr = LabJobs.join(" / ");
    return [HighJobsStr, SpeciJobsStr, UnivJobsStr, LabJobsStr];
  }

  function printJobs2() {
    console.log("printJobs2 start - majors:", majors);
    const Jobs0 = [];
    const Jobs1 = [];
    const Jobs2 = [];
    const Jobs3 = [];
    const Jobs4 = [];
    const Jobs5 = [];
    const Jobs6 = [];
    const Jobs7 = [];
    for (let i = 0; i < majors.length; i++) {
      if (majors[i][2] === 0) {
        Jobs0.push(majors[i][1]); //['경찰관','레크리에이션지도자','마술사']
      } else if (majors[i][2] === 1) {
        Jobs1.push(majors[i][1]);
      } else if (majors[i][2] === 2) {
        Jobs2.push(majors[i][1]);
      } else if (majors[i][2] === 3) {
        Jobs3.push(majors[i][1]);
      } else if (majors[i][2] === 4) {
        Jobs4.push(majors[i][1]);
      } else if (majors[i][2] === 5) {
        Jobs5.push(majors[i][1]);
      } else if (majors[i][2] === 6) {
        Jobs6.push(majors[i][1]);
      } else if (majors[i][2] === 7) {
        Jobs7.push(majors[i][1]);
      }
    }
    const JobsStr0 = Jobs0.join(" / "); //'경찰관 / 레크리에이션지도자 / 마술사
    const JobsStr1 = Jobs1.join(" / ");
    const JobsStr2 = Jobs2.join(" / ");
    const JobsStr3 = Jobs3.join(" / ");
    const JobsStr4 = Jobs4.join(" / ");
    const JobsStr5 = Jobs5.join(" / ");
    const JobsStr6 = Jobs6.join(" / ");
    const JobsStr7 = Jobs7.join(" / ");
    return [
      JobsStr0,
      JobsStr1,
      JobsStr2,
      JobsStr3,
      JobsStr4,
      JobsStr5,
      JobsStr6,
      JobsStr7,
    ];
  }

  // 5. state들 출력용 useEffect
  useEffect(() => {
    console.log("-------state changed----------");
    console.log(context);
    console.log("graphArr:", graphArr);
    console.log("jobs:", jobs);
    console.log("majors:", majors);
    console.log("-------state changed----------");
    // console.log("seqIndex:", seqIndex);
  }, [graphArr, jobs, majors]);

  useEffect(() => {
    let ctx = document.getElementById("Mychart").getContext("2d");
    console.log("Now Draw graph : graphArr", graphArr);
    // if (typeof Mychart !== "undefined") Mychart.destroy();
    let Mychart = new Chart(ctx, {
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
            // data: ["3", "3", "4", "3", "4", "5", "5", "1"],
            data: graphArr,
          },
        ],
      },
    });
    if (graphArr.length === 0) Mychart.destroy();
  }, [graphArr]);
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
            <td>{endTime}</td>
          </tr>
        </tbody>
      </table>
      <table>
        <thead>직업가치관 결과</thead>
        <tbody>
          <canvas id="Mychart"></canvas>
        </tbody>
      </table>
      <table>
        <thead>가치관과 관련이 높은 직업</thead>
        <tbody></tbody>
      </table>
      <table>
        <thead>1. 종사자 평균 학력별</thead>
      </table>
      <table>
        <thead>
          <tr>
            <th>학력</th>
            <th>직업</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>고등학교 졸업자 </td>
            <td>{printJobs()[0]}</td>
          </tr>
          <tr>
            <td>전문대학교 졸업자 </td>
            <td>{printJobs()[1]}</td>
          </tr>
          <tr>
            <td>대학교 졸업자 </td>
            <td>{printJobs()[2]}</td>
          </tr>
          <tr>
            <td>대학원 졸업자 </td>
            <td>{printJobs()[3]}</td>
          </tr>
        </tbody>
      </table>
      <div>
        <br />
      </div>
      <table>
        <thead>2. 종사자 평균 전공별</thead>
      </table>
      <table>
        <thead>
          <tr>
            <th>전공</th>
            <th>직업</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>계열무관</td>
            <td>{printJobs2()[0]}</td>
          </tr>
          <tr>
            <td>인문</td>
            <td>{printJobs2()[1]}</td>
          </tr>
          <tr>
            <td>사회</td>
            <td>{printJobs2()[2]}</td>
          </tr>
          <tr>
            <td>교육</td>
            <td>{printJobs2()[3]}</td>
          </tr>
          <tr>
            <td>공학</td>
            <td>{printJobs2()[4]}</td>
          </tr>
          <tr>
            <td>자연</td>
            <td>{printJobs2()[5]}</td>
          </tr>
          <tr>
            <td>의학</td>
            <td>{printJobs2()[6]}</td>
          </tr>
          <tr>
            <td>예체능</td>
            <td>{printJobs2()[7]}</td>
          </tr>
        </tbody>
      </table>
      <div>
        <br />
      </div>
      <Link to="/">
        <Button variant="primary" size="lg">
          다시 검사하기
        </Button>
      </Link>
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
