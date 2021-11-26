import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function TestExample() {
  return (
    <div className="testExamplePage">
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
      <div>
        <h4>1번. 두 개 가치 중에 자신에게 더 중요한 가치를 선택하세요.</h4>
        <form>
          <div>
            <p>능력발휘 : 직업을 통해 자신의 능력을 발휘하는 것입니다.</p>
            <input
              type="radio"
              value="1"
              // readOnly
            ></input>
          </div>
          <div>
            <p>
              자율성 : 일하는 시간과 방식에 대해서 스스로 결정할 수 있는
              것입니다.
            </p>
            <input
              type="radio"
              value="2"
              // readOnly
            ></input>
          </div>
        </form>
      </div>
      <Link to="/test">
        <Button variant="primary" size="lg">
          검사시작
        </Button>
      </Link>
    </div>
  );
}
