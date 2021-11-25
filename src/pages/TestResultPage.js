import React from "react";
import { UserContext } from "./UserInfo";
import { useHistory } from "react-router-dom";

export default function TestResultPage() {
  const history = useHistory();
  return (
    <div>
      <header>수고하셨습니다. 직업 가치관 검사가 완료되었습니다.</header>
      <p>
        검사결과는 여러분이 직업을 선택할 때 상대적으로 어떠한 가치를 중요하게
        생각하는지를 알려주고,
        <br />
        중요 가치를 충족시켜줄 수 있는 직업에 대해 생각해 볼 기회를 제공합니다.
      </p>
      <button
        onClick={() => {
          history.push({
            pathname: "/result_graph",
            // state: { userName: userName, gender: gender },
          });
        }}
      >
        결과 보기
      </button>
    </div>
  );
}
