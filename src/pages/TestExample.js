import { Link } from "react-router-dom";
export default function TestExample() {
  return (
    <>
      <header>검사 예시 페이지입니다.</header>
      <p>
        설문은 2지선일 형식으로 진행됩니다.
        <br />
        다음과 같은 문항들을 보고, 자신에게 해당하는 사항에 체크해주세요.
        <br />
        (유의! 모든 문항에 대해 누락되지 않게 체크해주세요.)
      </p>
      <h2>0% 진행 중</h2>
      <div>현재 페이지는 0 입니다.</div>
      <div>~~~~여기에 예시 질문 넣으삼~~~</div>
      <Link to="/test">
        <button>검사시작</button>
      </Link>
    </>
  );
}
