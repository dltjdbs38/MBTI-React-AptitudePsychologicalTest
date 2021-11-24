// Promise란 : 비동기 작업의 단위
// 비동기 작업이 성공 : resolve 호출
// 비동기 작업이 실패 : reject 호출
// then : 해당 Promise가 성공했을 때 후속 조치 동작, 인자로 함수 받음
// catch : 해당 Promise가 실패했을 떄 후속 조치 동작, 인자로 함수 받음

// 1. resolve란
const promise1 = new Promise((resolve, reject) => {
  resolve();
});
promise1
  .then(() => {
    console.log("비동기 작업 성공ㅋㅋ");
  })
  .catch(() => {
    console.log("비동기 작업 실패 ㅠㅠ");
  }); //콘솔 결과 비동기 작업 성공ㅋㅋ

// 2. reject란
  const promise2 = new Promise((resolve, reject) => {
  reject();
});
promise2
  .then(() => {
    console.log("비동기 작업 성공");
  })
  .catch(() => {
    console.log("비동기 작업 실패 ㅠㅠ");
  }); //콘솔 결과 비동기 작업 실패 ㅠㅠ

// 3.resolve, reject함수에 인자(값?) 전달하기
function fetchData(data){
    ereturn new Promis((resolve,reject) => {
        if(data.length>0){
            resolve(`${data} are downloading`);
        }
        else reject(new Error(`${data} downloding failed`));
    });
}
const promise1 = fetchData([4,2,7]);// promise1 원래는 중복사용 안될듯? 일단 예시니까 그냥 ㄱㄱ
promise1
    .then((value)=>{
        console.log(value);
    })
    .catch((err)=>{
        console.error(err);
    });
const promise2 = fetchData();
promise2
    .then((value)=>{
        console.log(value);
    })
    .catch((err)=>{
        console.error(err);
    });

// 4. async :  저 promise를 포함한 함수를 바꾸기
// asycn함수의 리턴 값은 무조건 Promise가 나온다.
async function fetchData(data){
    if(data.length>0){
        return `${data} are downloading`;
    }
    else throw new Error(new Error(`${data} downloding failed`);
} // 밑에 부분은 동일...

// 5. await : promise가 fulfilled되든지 rejected 되든지 아무튼 간에 끝날때까지 기다리는 함수. 

// 성질1 async 함수 내에서만 사용할 수 있습니다.
// 성질2 Promise가 완료될 때까지 기다립니다.
// 성질3 Promise가 resolve한 값을 내놓습니다
// 성질4 해당 Promise에서 reject가 발생한다면 예외가 발생합니다 -> try,catch구문 사용
function successReadData(){
    return new Promise((resolve,reject)=>{
        resolve();
    })
}

async function asyncCall() {
    await successReadData();
    const promise1 = fetchData([1,2]);
    try {
        const result = await promise1; //기다려
        console.log(result);
    }
    catch(err){
        console.error(err);
    }
    const promise2 = fetchData([3,4,5]);
    try {
        const result = await promise2; //기다려
        console.log(result);
    }
    catch(err){
        console.error(err);
    }
}

asyncCall();