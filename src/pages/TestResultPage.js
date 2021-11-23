import React from "react";
import { UserContext } from "./UserInfo";
import { useHistory } from "react-router-dom";
export default function TestResultPage() {
  const history = useHistory();
  return (
    <div>
      <>직업가치관 검사 결과</>
      <button
        onClick={() => {
          history.push({
            pathname: "/result_graph",
            // state: { userName: userName, gender: gender },
          });
        }}
      >
        내 결과 보기
      </button>
    </div>
  );
}
