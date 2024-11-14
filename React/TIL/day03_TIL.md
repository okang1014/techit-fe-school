#### 2-7. 배열 메서드

1. forEach()

- 배열의 각 요소에 대해 콜백 함수 실행, 반환값은 없음 (return 이 없음)

```js
// 배열 요소 중의 홀수의 합계 구하기
var array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

var result = 0;

// 내 코드 if 문 ver
array.forEach((item, index) => {
  if (item % 2 === 1) {
    result += item;
  }
});

// 내 코드 삼항 연산자 ver
// array.forEach(item => item % 2 === 1 ? result += item : result);

console.log(result);
```

2. map()

- 배열의 각 요소에 대해 콜백 함수 실행, 호출되는 콜백함수가 반환하는 값을 요소로 하는 **새로운 배열**을 반환

```js
// 배열 요소 중의 홀수의 합계 구하기
var array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

var result = 0;

// if 문 ver
var newArray = array.map((number) => {
  if (number % 2 !== 0) {
    // 홀수면 그 값을 그대로 return
    return number;
  } else {
    return 0;
  }
});

// 삼항 연산자 ver - num % 2 결과 값이 1 이면 true, 0 이면 false
var newArray = array.map((number) => (number % 2 ? number : 0));

newArray.forEach((number) => (result += number));

console.log(result); // 25
```

3. find()

- 배열의 각 요소에 대해 콜백 함수 실행
- 콜백 함수의 실행 결과가 true 인 최초의 요소를 반환
- true 를 반환하는 요소가 없는 경우 undefined 반환

```js
// 배열 요소 중 2와 3의 최소공배수 구하기
var array = [2, 4, 7, 8, 9, 5, 3, 1, 6, 10];

// sort 는 기본적으로 문자열을 기준으로 정렬
// 음수 값을 반환하는 경우 a, b 정렬
// 양수 값을 반환하는 경우 b, a 정렬
// 0 을 반환하는 경우 그대로
array.sort((a, b) => a - b);

console.log(array);

var result = 0;

// if 문 ver
array.find((num) => {
  if (num % 2 === 0 && num % 3 === 0) {
    result = num;
  }
});

// 함수의 조건을 만족하는 하나의 요소를 반환
// num % 2 === 0 && num % 3 === 0 의 평가 값이 true 를 반환하는 최초의 값을 return
var result = array.find((num) => num % 2 === 0 && num % 3 === 0);

console.log(result); // 6
```

4. filter()

- 콜백 함수의 실행 결과가 true 인 모든 요소를 배열로 모아서 반환
- true 를 반환하는 콜백 함수가 없는 경우, 빈 배열 반환

```js
// 배열 요소 중 홀수의 합계 구하기
var array = [2, 4, 7, 8, 9, 5, 3, 1, 6, 10];

var result = 0;

// 2 로 나눴을 때 0 이 아닌 값(true)를 반환하는 요소만 필터링
array.filter((num) => num % 2 !== 0).forEach((num) => (result += num));

console.log(result); // 25
```

5. reduce()

- Array.prototype.reduce(callback[, initialValue])
- 배열의 각 요소에 대해 콜백 함수 실행
- initialValue 가 주어지면 초기값으로 사용
- initialValue 가 주어지지 않으면 배열의 첫번째 요소를 초기값으로 사용
- callback(accumulator - 누적값, currentValue - 현재값, currentIndex - 인덱스, array - 원본 배열)

```js
// 배열 요소 중 홀수의 합계 구하기
var array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// sum = 0, num = 1 로 시작, 두 값을 더한 결과값이 다음 과정에서 sum 이 됨
// sum = 1, num = 2 의 합계, 3
// sum = 3, num = 3 의 합계, 6
// sum = 6, num = 4 의 합계, 10
// ...
var result = array.reduce((sum, num) => {
  return sum + num;
}, 0);

console.log(result); // 55

var result = array.reduce((sum, num) => {
  if (num % 2 !== 0) {
    return sum + num; // num 이 홀수인 경우, sum 에 누적해서 반환
  } else {
    return sum; // num 이 짝수인 경우, sum 을 그대로 반환
  }
}, 0);

console.log(result); // 25

var result = array.reduce((sum, num) => {
  // num % 2 값이 1인 경우, sum + num 의 값 반환, 0인 경우 sum 반환
  // 삼항 연산자를 사용하면 간단하게 표시 가능, 하지만 직관성이 떨어짐
  return num % 2 ? sum + num : sum;
}, 0);

console.log(result); // 25

var result = array.reduce((sum, num) => (num % 2 ? sum + num : sum), 0);

console.log(result); // 25

// num % 2 && num 은 논리곱 연산자로 둘 중 하나라도 false 인 경우(num % 2 이 0 인 경우는 짝수) 바로 sum 에 0 을 더함
// 반대로 num % 2 값이 1인 경우, && 다음의 num 을 sum 에 더함
// 즉 둘 중 하나라도 false 가 된다면 false 의 값을 즉시 반환
// 둘 다 true 인 경우, 최종적으로 true 임을 결정짓는 값 반환
var result = array.reduce((sum, num) => (sum += num % 2 && num), 0);

console.log(result); // 25
```

#### 2-8. Memoization

- 실행 시간이 오래 걸리는 함수의 경우, cache 에 해당 함수의 실행 결과를 저장하여, 이후에 동일한 함수의 실행결과를 호출하면 함수 실행 없이 결과값을 cache 로부터 불러올 수 있는 기능
- 매개변수에 관계없이 항상 동일한 결과가 보장되는 함수(순수 함수)라는 전제 하에 메모이제이션 적용 가능
- 함수 외부의 변경사항이 함수 내부에 영향을 미치지 않는 함수에만 메모이제이션 적용 가능

```js
// 지정한 수가 소수인지 여부를 반환
var isPrime = function (num) {
  console.time("소요 시간");
  console.log("소수 판별 시작.", num);

  // TODO: 소수 판별 코드
  let prime = num > 1; // 1이 소수가 아니기 때문에 1인 경우는 false 로 시작, 그 외 값은 모두 소수로 시작

  for (let i = 2; i < num; i++) {
    if (num % i === 0) {
      prime = false;
      break; // i 에 전달하는 값으로 나누어 떨어지는 경우 소수가 아니기 때문에 조건문 종료
    }
  }

  console.log("소수 판별 결과.", prime);
  console.timeEnd("소요 시간");
  return prime;
};

// var isPrime = function (num) {
//   // 캐시를 위한 코드
//   isPrime._cache = isPrime._cache || {};
//   // 캐시에 저장할 객체를 빈 객체로 저장

//   if (isPrime._cache[num] !== undefined) { // 캐시 되어있는 경우(cache hit)
//     // 캐시 되어 있는 경우, 캐시에 저장된 값을 그대로 출력
//     console.log('cache hit', num, isPrime._cache[num]);
//     return isPrime._cache[num];
//   } else { // 캐시 되어있지 않은 경우
//     // 소수 판별 코드 실행
//     return isPrime._cache[num] = isPrime2(num);
//   }
// };

// 지정한 함수에 memoization 기능 추가
function memo(fn) {
  return function (args) {
    fn._cache = fn._cache || {};

    if (fn._cache[args] !== undefined) {
      console.log("cache hit", args, fn._cache[args]);
      return fn._cache[args];
    } else {
      return (fn._cache[args] = fn(args));
    }
  };
}

var isPrime = memo(isPrime); // memoization 기능 추가

isPrime(1);
isPrime(2);
isPrime(3);
isPrime(4);
isPrime(5);
isPrime(6);
isPrime(7);
isPrime(8);
isPrime(9);
isPrime(1000000007); // 한 번 실행되는 시간이 1~2초 걸림
// 이러한 기능을 캐시로 추가한다면 조금 더 빨리 실행될 듯
isPrime(1000000007);
isPrime(1000000007);
```

## 2장. 리액트 시작하기

### 4. State

- React 에서는 시간이 지남에 따라 변하는 데이터를 상태라고 함
- 상태가 변경되면 해당 컴포넌트와 하위 컴포넌트가 리렌더링 됨

##### React.useState()

- 상태값(컴포넌트에서 관리하는 데이터)을 추가하기 위한 훅(hook)
  - hook 이란 React 에서 use 키워드를 포함한 메서드를 지칭

**API**

```js
const [state, setState] = useState(initialState);
```

**매개변수**

- useState 는 최초의 상태를 지정
- 한 번만 실행되고, 이후에는 state 를 사용

**리턴값**

- state : 저장된 상태값
  - 최초의 값은 useState() 에 전달한 값
  - 상태가 변경된 경우, 이 값과 비교해서 상태 변화 감지
- setState : 상태값을 변경하는 setter 함수
  - state 값을 직접 변경할 수 없고, setter 함수를 사용해서만 변경 가능
  - 이를 통해 변경된 상태를 감지하고 화면 리렌더링

**useState() 특징 - hook 의 조건**

- 컴포넌트 함수 내부의 최상위 수준에서 사용 가능 - 컴포넌트 내부의 함수 스코프에서는 사용 불가
  - 함수 블록 안에 있는 hook 은 실행이 안될 수 있기에 루트 레벨에서 사용하는 것을 권장
- state 로 만든 변수는 컴포넌트가 여러번 사용되는 경우에도 상태값을 각각 컴포넌트에서 관리
  - 한 페이지에서 동일한 컴포넌트가 여러번 사용되어도, 각 컴포넌트의 상태는 분리되어 관리된다
  - 서로의 상태에 영향을 미치지 않음
- state 를 지역변수로 선언하게 된다면, 컴포넌트 함수가 실행될 때마다 변수가 초기화됨
- 반면 React 는 초기의 state 값이 지정되고, 함수가 실행되고 화면이 리렌더링되는 경우에도 초기값이 변하지 않고 유지됨
- 하나의 상태는 하나의 컴포넌트 내에서 관리 권장

**상태 사용 시 유의사항**

- setter 함수를 호출하는 즉시 상태가 변경되는 것은 아님
  - 상태값 변경은 컴포넌트 내부의 코드가 모두 실행 완료된 이후 반영
  - state 가 변경되는 즉시 리렌더링 되는 것이 아니며, 이벤트 큐에 리렌더링 작업이 등록
  - 이벤트 핸들러의 모든 코드가 실행이 완료된 이후에 리렌더링 실행
- 객체나 배열로 상태를 지정한 경우, 상태를 변경하기 위해 객체, 배열 내부의 속성을 직접 변경한 경우에는 React 에서 상태 변화 감지 불가
  - 값은 변경되었으나 객체, 배열의 주소가 동일하여 결국 동일한 속성을 가지고 있기 때문

**상태 사용 시 유의사항**

- React 의 대전제 : 상태는 불변성을 가져야 한다
- 원시 데이터 타입은 불변성을 가짐
- 참조 데이터 타입은 불변성을 가지도록 객체, 배열을 복사해서 새로운 상태값을 만들어서 교체해야함(깊은 복사)
- 중첩 객체인 경우는 불변성을 지키기 위해 추가적인 절차가 필요
- 불변성을 유지하기 위해 피할 메서드와 권장 메서드
  - 추가: push(), unshift() 대신 **concat(), [...arr]**
  - 삭제: pop(), shift() 대신 **filter(), slice()**
  - 수정: splice(), arr[i] 대신 **map()**
  - 정렬: reverse(), sort() 를 바로 사용하지 않고 **배열을 복사한 후 사용**
  - 원본 객체를 수정하는 메서드보다는 **새로운 객체를 만들어 내는 메서드 권장**
