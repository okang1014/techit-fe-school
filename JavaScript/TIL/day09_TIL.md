# 3장. 내장 객체(Implicit Object)
## 1. JS 내장 객체
### 1-1. 객체란
객체란 함수와 데이터의 집합
변수와 함수를 관련성을 기준으로 묶어서 더 큰 단위로 만든 것이 객체이다

**Object Oriented Programming(OOP)**
객체 지향 프로그래밍
객체를 선언하고 객체를 이용해 코드를 작성하는 기법을 이야기 하는 용어, 자바스크립트 뿐만 아니라 대부분의 소프트웨어 언어에서 회자되는 용어

객체를 만드는 방법
- 객체 리터럴
- 함수 생성자
- 클래스 선언

#### 1-1-1. 내장 객체
- 개발자가 직접 객체를 선언해서 필요한 객체를 만들 수 있음
- 하지만 이미 존재하는 객체를 이용할 수 있음
- 내장 객체란 앱 개발을 위한 **소프트웨어 언어 자체에서 제공되는 객체**와 **앱 실행 플랫폼에서 제공되는 객체**가 있음

### 1-2. Array
- 배열이란 여러 데이터를 하나의 변수로 활용하기 위한 프로그래밍 기법
- 자바스크립트에서는 Array 타입의 객체
- 여러 관련 데이터를 사용하고자 하지만 데이터가 너무 많거나 데이터의 수가 예측이 되지 않는 경우, 하나의 변수로 묶어서 관리, 사용

#### 1-2-1. 배열 객체 선언 방식

**[] 표기**
- 배열 객체를 선언하기 위해서는 대괄호([])를 이용할 수 있음
- 내부의 데이터는 쉼표(,)를 사용하여 구분
```javascript
let array = [];
```

**Array 생성자 이용**
- 새로운 객체를 생성하는 연산자가 new 연산자이다
- new Array() 를 사용하여 새로운 배열 생성 가능
```javascript
let product = new Array('신발','화분', '동전');
```

#### 1-2-2. 배열 데이터 개수 파악
- 배열 객체 내에는 다수의 데이터가 담겨 있음
- 경우에 따라 배열 객체 내에 저정되어 있는 데이터 개수를 파악해야 하는 경우가 존재 => .length 프로퍼티를 사용
```javascript
let array = [10, 20];
console.log(array.length); //2
```

#### 1-2-3. 배열 데이터 획득
- []에 배열의 index 숫자를 명시하여 해당 위치에 있는 데이터 획득
- index 숫자는 0 부터 시작
- 전체를 다 핸들링하고자 한다면 forEach() 함수 사용가능 => for 반복문과 비슷한 기능
```javascript
let array = [10, 20, 30, 40];
console.log(array[1];) //20

array.forEach((data - 배열 내의 데이터, index - 배열 데이터의 인덱스) => {
  console.log(`array[${index}] = ${data}`)
})
```

#### 1-2-4. 배열 데이터 수정
array[index number] = 변경하고자 하는 데이터 값
해당 index number 의 데이터가 변경됨

**instance of**
- 대상 instanceof Class
- instanceof 연산자를 통해 좌항의 피연산자가 우항의 피연산자에 해당되는지 판별하는 연산자

#### 1-2-5. 배열 함수
|함수|설명|
|---|---|
|concat()|두 배열을 합쳐 하나의 배열을 만드는 함수|
|join()|배열 데이터를 구분자로 연결해 문자열로 만드는 함수|
|push()|배열에 데이터를 맨뒤에 추가하는 함수|
|unshift()|배열에 맨 앞에 데이터를 추가하는 함수, 배열 내의 인덱스가 자동으로 변경|
|pop()|배열에서 맨 뒤의 데이터를 제거하는 함수|
|shift()|배열 맨 앞의 데이터를 제거하는 함수, 배열 내의 인덱스가 자동으로 변경|
|splice()|지정된 위치의 데이터 삭제, 변경, 추가|
|slice()|특정 위치의 데이터 획득|
|forEach()|배열의 데이터 개수만큼 함수 반복 실행|
|filter()|조건에 만족하는 배열 데이터만 추출|
|every()|배열의 데이터가 특정 조건에 모두 만족하는지 판단|
|map()|배열의 데이터로 함수를 실행, 함수 실행 결과(반환 값)를 모아서 배열로 만드는 함수|

**concat()**
- 두 개의 배열을 결합시켜 하나의 배열로 만드는 함수
```javascript
let array1 = [1, 2, 3];
let array2 = [a, b, c];
let array3 = array1.concat(array2);
console.log(array3); //[1, 2, 3, a, b, c]
```

**join()**
- 배열 내의 데이터를 하나로 묶어서 문자열로 만드는 함수
- 괄호 내에 데이터 사이에 연결하는 문자 추가 가능
```javascript
let array = [10, 20, 30]
let result = array.join('-');
console.log(result); //10-20-30
```

**push(), unshift()**
- 배열 내에 괄호 내의 데이터 추가
- push() 는 배열 데이터 마지막에 추가, unshift() 는 배열 앞에 추가
```javascript
let array1 = [1, 2, 3],
let array2 = array1.push(10, 20);
let array3 = array2.unshift(100, 200);
console.log(array2); //[1, 2, 3, 10, 20]
console.log(array3); //[100, 200, 1, 2, 3, 10, 20]
```

**pop(), shift()**
- 배열 내에 데이터 삭제
- pop()은 맨 뒤의 데이터부터 삭제, shift()는 맨 앞의 데이터부터 삭제
```javascript
let array = [1, 2, 3, 4, 5, 6];
array.pop();
console.log(array); //[1, 2, 3, 4, 5]

array.shift();
console.log(array); //[2, 3, 4, 5]
```

**splice()**
- 배열 특정 위치 내에 데이터 추가, 제거, 수정 시 사용 가능
- 매개변수로 배열의 특정 데이터를 핸들링 가능하다.
- splice(index number, 교체 데이터 개수, 변경 데이터)
```javascript
let array = [1, 2, 3, 4, 5, 6];
array.splice(1, 3, 'hello', 'javascript', 'world');
//1번 index 부터 세 개의 데이터를 'hello', 'javascript', 'world' 로 교체
//두 번째 매개변수가 0 이라면 수정, 삭제 없이 추가
//세 번째 매개변수에 아무 데이터를 전달하지 않는 경우 삭제
console.log(array); //[1, 'hello', 'javascript', 'world', 5, 6]
```

**slice()**
- 배열의 데이터를 획득할 때 사용
- 매개변수로 시작 인덱스와 끝 인덱스 대입, 해당 인덱스 사이의 데이터 추출
```javascript
let array = [1, 2, 3, 4, 5, 6, 7, 8];
let array1 = array.slice(1, 6);
console.log(array1); //[2, 3, 4, 5, 6]
```

**forEach()**
- 배열 내의 모든 데이터에 접근, 핸들링
- 아래 함수의 data 는 배열 내의 데이터, index 는 배열 객체의 index number
```javascript
let array = [1, 2, 3, 4, 5];
forEach((data, index) => {
  console.log(`array[${index}] = ${data}`)
})
```

**filter()**
- 배열 내의 데이터 중 조건에 맞는 데이터만 추출
- 매개변수에 함수 지정, 배열의 개수만큼 순차적으로 매개변수의 함수 호출
- true 를 반환하는 데이터만 추출해서 결과 반환
```javascript
let array = [1, 12, 51, 23, 1];
let result = array.filter((value) => {
  return value > 20;
}); 
console.log(array);//[51, 23]
```

**every()**
- 배열 내의 모든 데이터가 특정 조건을 만족하는지 여부 확인
- 결과는 true/false 반환
- 하나라도 false 값이 반환되는 경우 최종 결과 값은 false
```javascript
let array = [1, 12, 51, 23, 1];
let result = array.every((value) => {
  return value > 10
});
console.log(array); //false
```

**map()**
- 배열의 데이터로 특정 로직을 실행, 그 결과를 다시 반환할 때 사용
- 매개변수 내의 함수 실행 결과를 결과값으로 출력
```javascript
let array = [1, 12, 51, 23, 1];
let result = array.map((value) => {
  return value * 2;
});
console.log(result); //(5) [2, 24, 102, 46, 2]
```