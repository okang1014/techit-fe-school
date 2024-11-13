## 2장. 리액트 시작하기

### 5. 속성 Props (추가 설명)

#### UI 요소 컴포넌트화

- 상위 컴포넌트에서 사용되는 UI 요소도 컴포넌트화 가능
- 하위 컴포넌트에 추가되어야 하는 속성을 상위 컴포넌트에서 전달 가능(버튼의 경우 이벤트 함수, type 등)
- 하위 컴포넌트에서 default 속성을 지정할 수 있음. 이때는 상위 컴포넌트로부터 props 를 전달받지 않더라도 자동으로 속성이 추가됨
- 상위 컴포넌트의 자식 element 가 있는 경우, children 이라는 속성(식별자 고정)을 하위 컴포넌트에 전달
- JSX 코드에서 태그에 style 을 적용하고자 하는 경우 `style={{property: value, property: value}}` 형태로 지정 가능

```jsx
// Counter 컴포넌트
return (
  // 하위 컴포넌트인 Button 컴포넌트에게 type, onClick, 그리고 하위의 자식요소(text) props 를 전달
  <div id="counter">
    <Button onClick={handleDown}>-</Button>
    <Button onClick={(event) => handleReset(event)}>0</Button>
    <Button onClick={handleUp}>+</Button>

    {/* 별도의 type 또는 color 를 지정하고 싶으면 상위 컴포넌트에서 지정, 하위 컴포넌트로 속성 전달 */}
    <Button color="grey" type="submit">Submit</Button>

    <span style={{ marginLeft: 10 }}>{count}</span>
  </div>
);

// Button 컴포넌트화
import "./Button.css"; // CSS 파일 import 후 클래스로 스타일 적용 가능. 단 class 는 className 으로 추가

// 상위 컴포넌트 태그의 자식 element(이 경우 텍스트노드)가 하위 컴포넌트에 전달될 때 children 이라는 변수명을 사용해야함
export default function Button({ children, type = "button", onClick, color }) {
  // default parameter 를 사용하여, 상위 컴포넌트로부터 button type 이 전달되지 않는 경우는 button 은 type="button" 으로 자동 지정
  // 필요에 의해 상위 컴포넌트로부터 전달 받는 속성의 이름을 변경하고자 한다면 onClick: eventHandler 형식으로 변경할 수 있음
  return (
    // 상위 컴포넌트로부터 전달 받은 props(children(상위 컴포넌트의 하위 element), type, 함수)를 속성에 추가할 수 있음

    <button
      {/* 스타일 속성 값을 사용할 수 있음 */}
      className="rounded-button"
      {/* style 속성에 {} 사이에 객체 형태로 property: value 를 추가해야 함 */}
      style={{ backgroundColor: color }}
      type={type}
      onClick={onClick}
    >
    {/* children 은 상위 컴포넌트로부터 전달받은 속성 */}
      {children}
    </button>
  );
}
```

## 1장. 리액트 빌드업

### 2. JavaScript 문법 복습

리액트에서 많이 사용되는 문법 중심으로 자바스크립트 문법 복습

#### 2-1. Arrow Function

- 화살표 함수는 function 키워드 대신 매개변수와 함수 body 를 => 로 연결하여 표시
- () 내에는 함수에 전달할 매개변수, => 이후에는 실행될 함수를 전달

```js
var arr2 = [];
arr.forEach((item, i) => {
  arr2.push(item * item);
});
```

- 화살표 함수는 매개변수가 한 개인 경우 () 생략 가능
- 함수 body 의 코드가 한 줄인 경우에는 {} 생략 가능
- {} 가 생략되는 경우, 자동으로 함수의 결과를 return 하기 때문에 return 생략 가능

```js
arr.map((item) => item * item);
// map() 메서드는 자동으로 arr 배열의 항목을 함수에 실행하여 결과값을 담은 새로운 배열 반환
```

#### 2-2. 구조 분해 할당

- 객체 또는 배열을 분해해서 변수에 할당하는 문법
- 객체를 구조 분해 할당하는 경우, 순서에 상관없이 속성 이름을 변수로 사용
  - React 에서는 상위 컴포넌트에서 전달받은 Props 를 하위 컴포넌트에서 사용하는 경우 주로 사용
- 배열의 경우, 배열의 index no 가 property key 이기 때문에 순서에 맞춰서 할당
  - React 에서는 주로 useState() 에서 사용

```js
var itemList = [
  { _id: 1, todo: "청소", done: false },
  { _id: 2, todo: "공부", done: false },
  { _id: 3, todo: "식사", done: false },
  { _id: 4, todo: "장보기", done: false },
];

// itemList 배열을 구조 분해 할당
const [first, second, third, fourth] = itemList;
// first == itemList[0], ...

// itemList 배열의 객체를 구조 분해 할당
const { _id, todo, done } = first;
// 객체 내의 각 변수는 itemList 의 first 항목을 property key 와 동일한 변수에 할당

// 객체에 존재하지 않는 변수를 선언하게 된다면 undefined 를 반환
const { no, todo, done } = third;
console.log(no, todo, done); // undefined, '식사', false

// 만일 구조 분해 할당 시 선언된 변수 대신 다른 변수를 사용하고자 한다면 변수명을 변경할 수 있음
const { _id: no, todo, done } = third;
```

#### 2-3. 전개 연산자

1. 참조 데이터 타입 vs 원시 데이터 타입

- 원시 데이터 타입 : string, number, boolean

  - 원시 데이터 타입을 값으로 가지고 있는 변수를 참조하여 값을 변경하는 경우, 원래의 값은 변경되지 않음
  - 원시 데이터 타입이 할당된 변수는 변수 선언 시 데이터의 타입에 맞는 메모리 공간을 확보하고 해당 메모리 공간에 값이 저장
  - 이는 원시 데이터 타입에 따라 정해진 크기의 메모리 공간이 확보되기 때문

- 참조 데이터 타입 : 원시 데이터 타입을 제외한 모든 데이터 타입

  - 참조 데이터 타입을 값으로 가지고 있는 변수를 참조하여 값을 변경하는 경우, 원래의 값이 수정됨
  - 참조 데이터 타입은 변수에 저장되는 데이터의 크기가 정해져 있지 않아 메모리의 크기도 정해져 있지 않음
  - 따라서 참조 데이터 타입이 할당된 변수는 값이 아닌 값이 저장된 메모리 공간의 주소가 저장

2. 참조 데이터 타입의 원본을 유지하는 방법

a. 대입 연산자로 newItem 생성

```js
var item = { no: 1, todo: "두부", done: true };
var newItem = item;

var itemList = [
  { no: 1, todo: "두부", done: false },
  { no: 2, todo: "계란", done: false },
  { no: 3, todo: "라면", done: false },
];
var newItemList = itemList;

// 위의 newItem 은 결국 동일한 메모리 주소를 갖게 되기에 newItem 을 수정하면 item 객체도 수정됨
```

b. Object.assign() 을 사용하여 속성 추가(객체 전용)

- Object.assign(target, ...source) - target 객체에 source 객체들의 속성을 추가

```js
var newItem = Object.assign(item, { delete: true });
// 위 방법은 결국 item 객체에 새로운 프로퍼티를 추가, 따라서 newItem 은 item 객체와 동일한 메모리 주소 참조

var newItem = Object.assign({}, item, { delete: true });
// 새로운 객체를 생성하고, 해당 객체에 item 과 새로운 프로퍼티를 추가, 따라서 동일한 값을 갖지만 참조하는 메모리 주소는 완전 다른 두 객체가 생성됨
```

c. item 의 속성으로 새로운 객체 생성
d. 전개 연산자를 이용한 복사

```js
// c)
var newItem = { no: item.no, done: item.done, todo: item.todo };
// 위 방법은 item 의 프로퍼티를 새로운 객체 newItem 에 수동적으로 추가하는 방법

// d)
var newItem = { ...item };
// item 객체의 모든 항목을 새로운 객체 newItem 에 추가하는 방법
// 3 의 방법과 내부적으로 동이랗게 작동

var newItem = { ...item, done: false };
// item 객체의 항목을 추가하고, 동일한 Property key 를 갖는 속성값을 변경

var newItemList = [...itemList];
// 배열 내부에 또다른 참조 데이터 타입이 있는 경우, 가장 외부의 배열은 새로운 배열이지만, 내부의 참조형 데이터는 동일한 메모리 주소를 가리키고 있음
```

##### React 에서 상태는 불변하는 상태여야 함. 즉, 기존 상태는 변하면 안되며 완전히 새로운 상태를 만들어서 비교해야 함

#### 2-4. 삼항 조건 연산자

- 보간법을 사용할 떄 {} 사이에는 값이 들어가야함
- 하지만 값이 아닌 문인 if 문이나 for 문 사용이 불가
- 대신 값으로 평가되는 삼항 조건 연산자나 forEach() 반복문, 또는 map() 메소드 사용

```js
// if 문
if (num > 0) {
  return num;
} else {
  return "not in between range";
}

// 삼항 조건 연산자
num > 0 ? num : "not in between range";
// 좌항의 식이 true 인 경우 num 을 반환, false 인 경우 문자열 반환
```

- 삼항 조건 연산자를 중첩해서 사용할 수 있지만, 이는 코드의 가독성을 떨어트림
- 따라서 삼항 조건 연산자 대신, if...else... 문이나 switch...case... 문의 결과를 return 하여 변수에 대입하여 태그의 {} 내에 삽입하여 가독성 향상 가능

#### 2-5. module

- export 하는 방식에 따라 import 하여 사용하는 방식의 차이가 있음
- export default 로 하나의 모듈 또는 다수의 모듈을 export
  - 하나의 모듈만 export 하면 해당 모듈을 변수에 대입하여 사용 가능
  - 다수의 모듈을 export 하면 module 객체로 모듈을 사용하는 곳에 import, module.funName() 형태로 모듈을 사용하거나 {fun1, fun2, fun3} 형식으로 구조 분해 할당하여 모듈을 직접 사용할 수 있음
  - 단, 하나의 모듈에서는 하나의 default export 만 가능
- export 를 하는 경우는 특정 모듈만 export/import 하기 위함이며, 구조 분해 할당으로 모듈을 사용할 수 있음

```js
// Component.js
function fun1() {};
function fun2() {};
function fun3() {};

// 세 개의 모듈 모두 default export
export default {fun1, fun2, fun3};
// 세 개 중 하나만 default export
export default {fun1};
// 각각 별도의 모듈로 export
export fun1;
export fun2;
export fun3;

// Main.js 에서 모듈 사용, script 태그의 type 은 module 필수
// default export 를 import - 하나의 모듈만 default 로 export 된 경우
import MyFun from 'Component.js';
// default export 를 import - 두 개 이상의 모듈이 default 로 export 된 경우
// MyFun 에 모듈 객체 대입하여 사용
import MyFun from 'Component.js';
MyFun.fun1();
MyFun.fun2();
// 구조 분해 할당 후 모듈 사용
import {fun1, fun2, fun3} from 'Component.js';
fun1();
fun2();
fun3();

// 일반 export 된 모듈을 import - named export
import {fun1, fun2, fun3} from 'Component.js';
```

#### 2-6. Promise, async / await

- 코드 동기 실행의 경우, 하나의 코드 작업이 완료된 이후에 다음 코드가 실행
- 하지만 이전 코드의 실행 시간이 오래 걸리는 경우, 이후의 모든 코드 실행이 불가
- 이러한 동기 실행 방식의 한계를 보완하기 위한 것이 비동기 실행 방식

1. Promise...then...catch

```js
function f1() {
  // new Promise 생성자 함수를 통해 promise 객체를 생성
  return new Promise((resolve, reject) => {
    console.log(`2. f1 작업 시작.`);
    console.log(`3. f1 작업중...`);

    setTimeout(() => {
      console.log(`4. f1 작업 종료.`);

      // resolve - 작업 성공 시 실행 함수, bbb - 작업 실패 시 실행 함수
      resolve(`f1의 결과물`);
      // reject(new Error('에러 발생')); // 새로운 에러 객체를 생성하여 반환
    }, 1000);
  }); // Promise 객체 생성, () 에 실행 예정인 함수를 추가
}

function f2(f1Result) {
  return new Promise((resolve, reject) => {
    console.log(`5. ${f1Result}로 f2 작업 시작.`);
    console.log(`6. f2 작업중...`);

    setTimeout(() => {
      console.log(`7. f2 작업 종료.`);
      resolve(`최종 결과물`);
      // reject(new Error('에러 발생'));
    }, Math.random() * 2000);
  });
}

// Promise 기본 사용법 then().catch()
function test() {
  // 함수를 호출하면 Promise 객체 생성
  f1()
    .then(f2) // f2 자체를 콜백 함수로 지정
    .then((result) => console.log(`8. ${result}`))
    .catch((err) => console.error(err)); // f1, f2 에서 발생하는 모든 오류를 catch 가능
}

console.log("1. 테스트 시작.");
test();
console.log("9. 테스트 완료.");
```

2. Promise, async / await

- Promise...then...catch 의 Callback-hell 로부터 우리를 구제하기 위해 ESC2017 에 추가된 문법
- 단, await 가 사용된 함수는 필히 async 가 추가되어야 함
- async 함수인 경우, 내부의 콜백 함수는 await 필수 아님

```js
function f1() {
  return new Promise((resolve, reject) => {
    console.log(`2. f1 작업 시작.`);
    console.log(`3. f1 작업중...`);

    setTimeout(() => {
      // ......
      console.log(`4. f1 작업 종료.`);

      resolve(`f1의 결과물`);
      // reject(new Error('에러 발생'));
    }, 1000);
  });
}

function f2(f1Result) {
  return new Promise((resolve, reject) => {
    console.log(`5. ${f1Result}로 f2 작업 시작.`);
    console.log(`6. f2 작업중...`);

    setTimeout(() => {
      // ......
      console.log(`7. f2 작업 종료.`);
      resolve(`최종 결과물`);
      // reject(new Error('에러 발생'));
    }, Math.random() * 2000);
  });
}

// ESC2017 에 추가된 문법
// async 는 test() 가 비동기로 실행되는 것처럼 실행
async function test() {
  // await 함수를 실행하면 동기함수처럼 실행됨
  // 동기 함수를 호출하는 방식 그대로 작성하는 것이 Promise ... then ... catch 보다 가독성이 좋음
  const f1Result = await f1();
  const result = await f2(f1Result); // 내부적으로는 Promise ... then ... catch 를 실행
  console.log(`8. ${result}`);
  // 내부적으로 Promise 를 return 한다
  // 동기 처리의 error 처리는 try{} catch{} 사용
  // 주로 API 를 통해 data 를 불러오는 경우 많이 사용됨
}

console.log("1. 테스트 시작.");
test(); // .then() 을 사용하거나 await 를 사용할 수 있음. 함수의 리턴값이 결국 Promise 객체이기 때문에
console.log("9. 테스트 완료.");
```
