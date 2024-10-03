### 6-4. 즉시 실행 함수
일반적인 함수는 선언되었다고 실행되지 않고, 나중에 함수가 실행되어야 하는 부분에서 호출되고 실행됨
그리고 함수는 반복적으로 호출이 가능하다 - 재사용성 향상
반면 즉시 실행 함수는 함수 선언과 동시에 함수를 실행시키는 함수
선언과 동시에 실행이 목적이기에 별도의 함수명(식별자)이 없음 -> 바로 호출 후 실행
문법 : (function(){...})()
```js
(function(){})()
//소괄호 두 개로 표시, 첫 괄호에는 실행시키고자 하는 함수, 그리고 뒤의 괄호는 호출문(매개변수 전달 가능)
```

즉시 실행 함수는 함수 선언, 호출, 실행, 종료가 한 과정에서 실시 -> 다른 곳에서 호출 불가능
호출 부분의 괄호 내에는 함수의 매개변수에 전달하는 인수 입려 가능

즉시 실행 함수가 실행되는 사례 
1) 변수, 함수가 즉시 실행 함수 내에서만 실행되도록 하기 위해 - 다른 곳에서 해당 변수, 함수 사용 x
2) 라이브러리 사용 - 개발자가 라이브러리를 사용할 때 개발자가 별도로 선언한 변수, 함수명과의 충돌 방지
3) 하나의 변수가 특정 함수(1개 이상)에서만 사용하도록

예시 1
```js
(function(){
  let data = 10;
  function myFun(){
    console.log(data);
  }
  myFun(); //10
});

console.log(data); //undefined
myFun(); //undefined
```

예시 2
```js
//즉시 실행 함수를 사용하지 않은 경우 - count 의 값이 의도치 않게 변경될 수 있음, 유지 보수성 저하
let count = 0;
function increment() {
  count++;
}
function decrement() {
  count--;
}
increment();
increment();
decrement();
console.log(count); //1
//increment, decrement 에서 사용하는 데이터가 코드 어딘가에서 다른 의미로 사용되는 것을 방지할 수 없게 됨
count = 10;
increment();
increment();
decrement();
console.log(count); //11

//즉시 실행 함수 사용 시 count 값 유지 가능 - 유지 보수성 향상
const counter = (function () {
  //이렇게 선언하면 외부에서 count 를 사용할 수 없음
  let count = 0;
  return function (argFun) {
    count = argFun(count);
    return count;
  };
})();

let increment = (no) => ++no;
let decrement = (no) => --no;

console.log(counter(increment));
console.log(counter(increment));
console.log(counter(decrement));
```

# 5장. Web APIs
## 1. JavaScript 비동기
## 2. Ajax
## 3. Web Storage (데이터 영속화)
## 4. Web Socket
## 5. File handling (파일 관리)

## 1. JavaScript 비동기
### 1-1. Web APIs
Application Programming Interface - 프로그래밍 언어로 만든 데이터와 기능 모음
API 는 변수, 함수, 클래스로 제공되며, 해당 API 의 변수명, 함수명 참조하여 사용할 수 있음

Browser API - 브라우저에서 기본으로 제공하는 API(표준 API, Web API)
Third-Party API - 외부 벤더, 플랫폼에서 제공하는 API

### 1-2. *setTimeout(), setInterval()
가장 기초이자 코어 함수
개발자의 함수는 호출이 되어야 실행 가능하다
setTimeout, setInterval 함수를 사용하면 특정 함수를 자동으로 호출할 수 있도록 예약 가능
- setTimeout() : 매개변수로 전달된 함수를 특정 시간 이후에 호출
- setInterval() : 매개변수로 전달된 함수를 특정 시간 간격으로 **반복** 호출

**setTimeout**
```js
setTimeout(functionRef, delay, param1, param2, ..., paramN)
```
- 첫번째 매개변수로 전달한 함수를 실행
- 두 번째 매개변수로 전달한 시간 이후에 함수 실행 (밀리세컨 단위로 매개변수 전달, 1000 = 1초)
- 시간 매개변수를 전달하지 않는 경우 즉시 실행
- 세 번째 이후의 매개변수는 함수에 들어가는 인수를 입력
- **유의사항 : 첫번째 매개변수는 호출이 아니므로 괄호 없이 매개변수 입력**

예약 실행을 위해서는 setTimeout() 함수를 변수에 대입하여, clearTimeout() 에 전달
```js
let id = setTimeout(fun1, 1000); //fun1 을 
clearTimeout(id);
//id 에 할당된 예약 함수 실행 취소
```

**setInterval**
```js
setInterval(functionRef, delay, arg1, arg2, ... , argN)
```
- setTimeout 과 문법은 동일
- 두 번째 시간 매개변수로 전달한 시간 간격으로 함수 실행
- 단 해당 시간은 코드의 실행 시간을 포함한 시간이므로, 코드 실행 완료 후 일정 시간 간격으로 실행을 원하는 경우 별도의 알고리즘 설정 필요

반복 실행을 중단하고자 할 때는 clearInterval() 로 취소 가능
```js
let id = setInterval(fun1, 1000);
clearInterval(() => clearInterval(id), 3000); // 3초 뒤에 id 에 대입된 interval 실행 종료
```

```js
//setInterval 설정한 함수를 함수가 실행된 이후 시점부터 특정 시간 간격으로 실행되게 하는 알고리즘
//일부러 코드가 실행되는 시간을 0.5초로 지정
function sleep(sec) {
  //매개변수 시간 후에 결과를 리턴
  return new Promise(resolve => setTimeout(resolve, sec));
};
let beforeTime = performance.now();

//0.5초 걸리는 업무를 진행한 이후에 1초 업무 실행
let id = 0;
let sayHello = async () => {
  let nowTime = performance.now();
  console.log(nowTime - beforeTime);
  beforeTime = nowTime;
  await sleep(500) //0.5초 업무 실행
  //밑줄이 실행되는 것은 윗줄 실행이 완료되었다는 것
  setTimeout(sayHello, 1000);
}
```

### 1-3. 비동기 async
일반적으로 개발자가 작성한 코드는 위에서 아래로 실행됨 - Runtime 에서 실행
하나의 코드가 실행되면 해당 코드가 실행될 때까지 다른 코드가 실행되지 않음 -> 동기 프로그래밍
동기 프로그래밍은 동기적으로 프로그램이 실행됐다, 혹은 단일 thread 에서 실행됐다고 함
기본적으로 코드 실행은 동기적으로 실행됨

비동기 프로그래밍은 특정 코드의 실행이 너무 오래 걸리는 경우, 다른 코드가 실행되지 않는 현상을 막기 위해 사용
실행시간이 상대적으로 오래 걸리는 함수의 실행을 비동기적으로 실행되도록 하고, 코드 실행의 흐름을 유지
비동기 실행 함수가 실행 완료되면 기존의 흐름에서 함수 실행 결과를 받아들이도록 하는 방법

#### 1-3-1. Promise
Promise 는 자바스크립트 비동기 프로그램 작성을 위한 가장 기본적인 기법
비동기 업무를 요청한 쪽, 비동기 업무를 실행하는 쪽으로 구분하여 이해하는 것이 좋겠다
비동기적으로 업무를 진행해야하는 경우, 비동기 업무의 종료, 실행 결과를 요청한 쪽에서 비동기 업무 진행 상황 및 결과를 전달 받을 수 있는 규칙이 바로 Promise

```js
//비동기적으로 실행될 함수를 Promise 를 생성해서 반환, 함수를 호출한 곳(비동기 업무 요청자)은 계속해서 다음 라인을 실행
function myFun() {
  //Promise 생성자 매개변수에는 함수 등록, 해당 함수가 비동기적으로 실행
  //Promise 객체가 만들어지자 마자 매개변수의 함수 비동기적으로 실행(비동기 업무 실행자에서)
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(10), 1000)
  })
}

console.log('step1');
let promise = myFun();
//promise 의 비동기 업무에 의한 결과가 발생할 때 실행할 함수 등록
//결과를 받을 함수를 등록만 한거고, 실행을 시킨 것은 아니다
//비동기 업무에서 결과를 발생할 때 알아서 실행됨
promise.then(result => { //result 매개변수에 Promise 쪽(비동기 업무 실행자)에서 발생한 데이터가 전달됨
  console.log(`result: ${result}`)
});
//이 코드가 연속적으로 실행
console.log('step2');
//위 코드 이후에 promise.then 의 결과가 출력
```

#### 1-3-2. Promise 작성 규칙
**executor**
Promise 객체가 생성될 떄 생성자 매개변수에 지정된 함수
즉 비동기 처리되어야 하는 업무가 executor 함수 내에 작성되어야함
executor 가 실행되는 동안 비동기 업무 요청자 쪽의 코드는 대기상태가 아니며 계속 실행
이 때 Promise 객체 내에는 state(pending / fulfilled) 와 result(undefined / valid) 프로퍼티 유지
state 는 Promise 의 상태값, result 에는 Promise 의 실행 결과값

**resolve 와 reject**
비동기 업무 처리 결과를 알아야 하는 것은 필수가 아님
하지만 업무의 volume 이 커지거나, 업무를 통해 발생한 결과 값을 사용하기 위해서는 처리 결과를 얻어야한다
이 때 사용하는 것이 resolve 와 reject

1) resolve 
- executor 매개변수에 전달된 것은 resolve 함수이다
- resolve 함수를 호출하게 되면 executor 업무 처리가 종료, 매개변수에 지정된 값이 Promise 에 의해 발생한 결과 값
- state 프로퍼티는 fulfilled, result 프로퍼티는 해당 함수에 의해 발생한 결과값

2) reject
- reject 는 정상적으로 업무 처리가 되지 않은 경우 존재
- executor 함수에서 에러가 발생했음을 에러 정보와 함께 외부 발행
- state 프로퍼티는 rejected, result 프로퍼티는 error 내용

**Promise callback**
비동기 업무 요청자 측에서 .then() 메서드 사용해서 Promise 의 결과값을 이용한 업무 진행
then() 의 매개변수에 콜백 함수를 등록해 놓으면 resolve 또는 reject 가 호출, 실행된다
매개변수에 전달한 콜백 함수 중 첫 번째 함수가 resolve 에 의해 실행될 함수, 두 번째 함수가 reject 에 의해 실행될 함수
```js
function myFun3(num) {
  return new Promise((resolve, reject) => {
    //resolve 인 경우 -> 업무 정상 처리, resolve 매개변수에 전달된 결과를 .then() 에 반환
    if (num > 0) resolve(num * num);
    //reject 인 경우 -> 업무 처리 오류
    else reject('0 보다 큰 수를 지정하십쇼');
  })
}
myFun3(10).then(
  //resolve, reject 값을 두 개 모두 획득하려면 then 에 매개변수로 함수 두개 등록
  (value) => console.log(`result: ${value}`), //value 매개변수에는 resolve 의 실행 결과가 입력
  (error) => console.log(error) //error 매개변수에는 reject 의 실행 결과 입력
); //result: 100
```

**catch(), finally()**
then() 대신 Promise 의 실행 결과를 대입, 실행되는 함수
reject 에 의해 실행될 결과를 사용하고자 한다면 catch() 함수로 등록 가능
finally() 를 이용해 콜백 등록 시 resolve, reject 모든 경우에 실행할 코드 등록 가능

#### 1-3-5. async, await
비동기 프로그래밍을 위한 예약어
Promise 를 이용하면 콜백 함수의 콜백 함수의 콜백 함수의 ... ;;;
코드가 지저분해질 수 있고, 복잡해질 수 있음
그래서 async, await 기능을 제공 -> 내부적으로는 Promise 를 사용

**async, await 절대 규칙**
- async 는 함수 선운 부분에사용, await 는 함수 body 내에 사용
- await 는 꼭 async 가 사용된 함수 내에서만 사용 가능