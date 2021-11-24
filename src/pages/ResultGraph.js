import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "./UserInfo";

export default function ResultGraph() {
  const [firstData, setFirstData] = useState();
  const context = useContext(UserContext);
  //CORS : Cross Origin Resource Sharing 교차 출처 리소 스 공유
  // 도메인과 포트가 서로 다른 서버로 client를 요청했을 때 브라우저가 보안상 이유로 API를 차단하는 문제. ex client는 8080포트, server는 9000포트일 때.
  //나는 지금 백엔드 없이 프론트React만 사용하므로 요청받는 server에서 모든 요청을 허가한다든지 백엔드에 cors 패키지를 설치해 미들웨어로 처리한다든지 할 수 없다.
  useEffect(() => {
    async function uploadData() {
      await axios({
        method: "post",
        url: `/inspct/openapi/test/report?apikey=${context.apikey}&qestrnSeq=${context.qestrnSeq}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(context),
      })
        .then((res) => {
          setFirstData(res);
        })
        .catch((err) => {
          console.error(err);
        });
    }
    uploadData();
  }, []);
  if (firstData && firstData.length > 0) {
    console.log(firstData);
  }
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
        <tbody>여기에 그래프 넣으삼</tbody>
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
