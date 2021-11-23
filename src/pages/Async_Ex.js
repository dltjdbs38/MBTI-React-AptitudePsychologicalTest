// 1.
// useEffect(() => {
//   async function makeAnswerStr() {
//     const AnsStr = [];
//     for (let i = 1; i < userAnswerArray.length; i++) {
//       AnsStr.push("B" + String(i) + "=" + userAnswerArray[i]);
//       // console.log(AnsStr);
//     }
//     const totalAnsStr = AnsStr.join(" ");
//     console.log("네가 낸 답 string으로 만들고 있음");
//     console.log(totalAnsStr);
//     return totalAnsStr;
//   }
//   makeAnswerStr();
// }, [currUserAnswer, userAnswerArray]);

const changeHandler = (e) => {
  e.preventDefault();
  if (e.target.checked === true) {
    setCurrQuestionNum(Number(e.target.name)); //1
    setCurrUserAnswer(e.target.value); //'1'
    console.log(currUserAnswer);
    // 2. [undefined, '1', '3', '5', '7', '9', '11', '13', '15', '18', '19', '21', '23', '26', '27', '30', '31', '33', '35', '38', '39', '41', '43', '46', '47', '49', '51', '53', '55']
    let newAnswers = [...userAnswerArray]; //28개짜리
    newAnswers[currQuestionNum - 1] = currUserAnswer; //0부터 넣기 시작
    setUserAnswerArray(newAnswers);
  }
};
// 2.
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
  function checkRadio() {
    if (userAnswerArray[Number(currQuestionNum)] !== undefined) {
      return currQuestionNum; //radio check true
    }
  }
  async function asyncCall() {
    try {
      const result1 = await makeAnswerStr();
      setFinalTotalAnsStr(result1);
      console.log(finalTotalAnsStr);
      const result2 = await checkRadio();
      setRadioNum(result2);
    } catch (err) {
      console.log(err);
    }
  }
  return asyncCall();
}, [currUserAnswer, userAnswerArray, finalTotalAnsStr, radioNum]);
