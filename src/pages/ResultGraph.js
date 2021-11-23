import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "./UserInfo";

export default function ResultGraph() {
  const context = useContext(UserContext);
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
        <tbody>여기에 그래프 넣기</tbody>
      </table>
      <table>
        <thead>가치관과 관련이 높은 직업</thead>
        <tbody>
          <>종사자 평균 학력별</>
          <table>
            <thead>
              <tr>
                <th>학력</th>
                <th>직업</th>
              </tr>
            </thead>
            <tbody>tbody 1 !</tbody>
          </table>
          <>종사자 평균 전공별</>
          <table>
            <thead>
              <tr>
                <th>전공</th>
                <th>직업</th>
              </tr>
            </thead>
            <tbody>tbody 2 ! </tbody>
          </table>
        </tbody>
      </table>
    </div>
  );
}
