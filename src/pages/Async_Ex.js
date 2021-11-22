useEffect(() => {
  function makeAnswerStr() {
    const AnsStr = [];
    for (let i = 1; i < userAnswerArray.length; i++) {
      AnsStr.push("B" + String(i) + "=" + userAnswerArray[i]);
      // console.log(AnsStr);
    }
    const totalAnsStr = AnsStr.join(" ");
    return totalAnsStr;
  }
  function checkRadio(userAnswerArray, currQuestionNum) {
    if (userAnswerArray[i] === undefined) {
      return false;
    } else if (userAnswerArray[i] !== undefined) {
      return true;
    }
  }
  async function asyncCall() {
    try {
      console.log("네가 낸 답 string으로 만들고 있음");
      const result1 = await makeAnswerStr();
      console.log(result1);
      console.log("체크박스 로딩 중");
      const result2 = await checkRadio();
    } catch (err) {
      console.log(err);
    }
  }
  asyncCall();
}, [currUserAnswer, userAnswerArray]);
