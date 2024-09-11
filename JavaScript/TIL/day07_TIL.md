## 5. Function 함수
### 5-1. 함수란?
하나의 관련된 업무를 실행하기 위한 코드들을 묶기 위해 선언되는 프로그램의 구성요소
각 업무가 함수로 구분되어 작성됨으로 코드를 작성하기도 편하고 나중에 필요한 부분의 코드를 식별, 분석, 실행하기 용이

**용어 정리 - 함수와 메서드**
함수와 메서드는 유사한 특징을 가지며, 혼용되어 부르기도 한다. 하지만 엄밀히 따지면 차이가 존재한다

- 함수
  - 영어로 function, 기능을 의미
  - 함수 내에 작성된 기능에 초점을 맞춘 단어
  - 함수를 호출하는 쪽에서 함수의 기능, 로직을 사용한다는 입장

- 메서드
  - 클래스 내에 선언된 함수를 주로 메서드라고 부름
  - method 수단을 의미 
  - 클래스 내에 선언되어 클래스 내에서 이용되는 수단으로 간주, 클래스에 종속적

### 5-2. 선언과 이용
#### 5-2-1. 함수 선언
- 함수를 선언하기 위해서는 function 키워드(예약어)를 사용
- function 함수명 () {body 실행 코드} 형식 (함수명 뒤의 () 는 필수이다)
- 함수 호출은 함수명 () 형태로 호출 가능
- 권장 사항 함수명은 보통 동사형을 사용
- 코드 실행 흐름에 따라 함수 선언문을 지나면 자바스크립트 엔진이 함수가 있음을 인식, 실행 X
- 이후에 함수 호출문이 있는 경우 해당 함수를 사용

```javascript
//함수 선언
function functionName() {
  body 함수 코드 부분
}

//함수 호출
functionName();
```
#### 5-2-2. 매개변수와 반환값
- 함수 선언문에서 함수명 뒤에 오는 괄호는 함수 내의 코드에서 사용되는 변수, 즉 매개변수이다.
- 함수 호출문이 데이터를 가지고 있는 경우, 매개변수는 호출문의 데이터(인수)를 매개변수로 전달받아 코드를 실행
- 함수 실행 결과를 호출문에 전달 -> return 키워드를 사용하여 호출문에 전달
```javascript
//외부로부터 전달되는 데이터 인풋을 대비하여 매개변수를 선언
function 함수명 (매개변수1, 매개변수2) {
  함수 body
}
//매개변수에 입력할 인수가 있다면 함수 호출 시 인수로 전달
함수명(1, 2);
```

- 함수의 매개변수에 전달되는 인수의 순서가 중요하다 -> 매개변수는 순서에 맞는 인수를 전달 받는다

```javascript
function myFun(x, y) {
  return x + y;
}

let result = myFun(10, 20);
console.log(result);//30
```

- 함수에 매개변수를 선언하였어도, 함수 호출 시 인수를 전달하지 않아도 됨
- 이 경우, 매개변수는 값을 갖지 못하기 때문에 undefined 가 된다.

**Default Parameter**
선언된 매개변수의 개수만큼 인수가 전달되지 않는 경우도 존재한다. 이때 인수가 대입되지 않은 매개변수는 undefined 가 된다.
undefined 자체는 문제가 되지 않지만, 이를 참조하는 경우 에러가 발생할 수 있다.
이러한 오류를 방지하기 위해 인수가 대입되지 않는 경우 기본으로 매개변수에 대입되는 값을 정할 수 있다.
```javascript
function myFun(var1, var2 = 0) {
  console.log(`var1 : ${var1}, var2: ${var2}`);
}
myFun(); // var1 : undefined, var2 : 0
myFun(10); // var1 : 10, var2 : 0;
```

**Rest Parameter**
- ...(spread 연산자)로 선언되는 매개변수
- 함수는 매개변수의 개수보다 많은 인수를 전달 받을 수 있지만, 초과로 대입된 인수는 무시된다
- Rest parameter 로 선언한 매개변수는 인수의 개수와 상관없이 모든 인수를 매개변수에 대입할 수 있음

```javascript
//...arg2 매개변수에 전달되는 인수는 배열로 처리된다.
function myFun(arg1, ...arg2) {
  console.log(arg1, arg2);
}

myFun(10, 20, 30, 40); //10, [20, 30, 40]
```
- Rest parameter 를 사용하는 이유
  - 매개변수가 너무 많을 때 일일이 매개변수를 선언하는 것보다 효율적
  - 매개변수의 개수를 예측할 수 없는 경우 -> 네트워킹을 통해 받는 데이터 개수가 정해져 있지 않은 경우

**Parameter vs Argument**
함수에 대입되는 데이터를 parameter 또는 argument 라고 부른다
- parameter - 함수를 선언하는 입장에서의 함수에 입력, 전달되는 데이터를 바라보는 시각
- argument - 함수를 호출하는 입장에서의 함수에 입력, 전달하는 데이터를 바라보는 시각
=> 결국 동일한 인수를 지칭하지만 이를 바라보는 입장에 차이가 존재

### 5-3. 함수 표현식
- 함수 표현식은 변수에 함수가 대입되는 것을 통해 함수가 정의
- 함수 표현식을 호출하고자 할 떄는 함수 표현식이 할당되어 있는 변수를 참조
```javascript
//함수 표현식, 변수에 함수를 대입
let myFun = function(매개변수) {
  함수 body
}
```

### 5-4. 화살표 함수(arrow function)
```javascript
//기존의 함수 선언문
function myFun(매개변수) {
  함수 body
}
//함수 표현식
let myFun = function(매개변수) {
  함수 body
}
//화살표 함수
let myFun = () => {
  함수 body
}
```
- 함수 표현식과 형태가 유사함
- 간단한 함수를 정의할 때 주로 사용
- 만약 화살표 함수의 body 가 한 줄인 경우 {} 생략 가능, 매개변수가 하나인 경우에만 ()도 생략 가능

**람다함수(lambda function)**
- 자바스크립트의 화살표 함수를 다른 언어에서는 람다 함수로 지칭
- 화살표 기준 왼쪽이 매개변수, 오른쪽이 함수 내용
- -> 또는 => 기호를 사용

### 5-5. 지역변수와 전역변수
변수가 선언된 위치에 따라 변수가 사용 가능한 범위가 결정된다. 이를 변수의 **스코프라고** 한다.
- 함수 내에 선언된 변수는 지역변수 중 하나이다
  - 함수가 호출되었을 때 함수 내에 선언된 변수가 메모리에 등록
  - 함수 실행이 완료되면 메모리에 저장된 변수는 해제
  - 함수가 호출될 때마다 새롭게 지역 변수가 메모리에 등록, 실행, 그리고 삭제되는 과정이 반복
- 함수 가장 바깥쪽에 선언된 변수는 전역 변수이다
  - 전역변수는 어디에서나 사용가능하다.

**Scope**
- 변수가 영향을 미칠 수 있는 범위를 의미
- 지역변수는 함수 스코프에서 이용
- 전역변수는 전역 스코프(전체 코드)에서 이용

### 5-6. 익명 함수
함수 선언 시 함수명을 지정하지 않는 함수
- 익명함수를 선언하자마자 그 함수를 변수에 대입하여 변수명으로 함수를 이용 - 이를 흔히 함수 표현식이라고 부른다
- 익명함수를 선언하는 대표적인 사례는 함수를 또다른 함수의 매개변수 또는 반환값으로 이용하는경우

**High Order Function(HOF 고차함수)**
- 함수를 매개변수로 대입하거나 리턴 값으로 함수를 반환하는 함수
- 고차함수의 활용 비율이 높아지는 경우 코드의 가독성, 편리성을 위해 매개변수, 또는 리턴 값으로 사용되는 함수는 화살표 함수로 선언하는 경우가 많다

## 6. Scope
### 6-1. Hoisting
#### 6-1-1. 변수 호이스팅
- 호이스팅은 무언가를 끌어올린다 라는 의미의 단어 - 아래에 선언된 변수를 끌어 올려서 위에서 사용할 수 있게 해주는 기법이다
- 어떤 변수가 선언되고, 변수에 값이 할당되었을 때 변수 초기화가 코드가 실행되기 이전에 실행됨.
- 이는 var 키워드로 선언된 변수에만 해당
- 전체 변수 선언문과 변수 할당문을 전부 호이스팅하는 것이 아니라 변수 선언문만 위로 올림. 변수 할당문은 코드 런타임에 실행된다
- 만일 변수 할당 전에 변수를 참조한 경우 변수는 undefined 이다.
```jsx
data = 20;
console.log(data); //20

var data = 10;
console.log(data); //10
```
- let, const 키워드로 선언한 변수는 호이스팅이 불가한 것처럼 보인다

#### 6-1-2. 함수 호이스팅
- 함수 선언문이 개발자 코드 내에서 아래쪽에 선언되어 있지만 선언문보다 위에서 해당 함수를 호출하는 것이 가능하다. 호이스팅이 되었기 때문
- 하지만 함수 표현식으로 정의된 함수(함수 리터럴 함수, 화살표 함수)는 호이스팅이 되지 않는다

### 6-2. 스코프
Scope 는 유효범위를 뜻한다.
자바스크립트에서는 중괄호({})로 하나의 실행 단위를 묶는다. 해당 실행 단위를 스코프라고 한다.
변수는 함수와 같은 코드 블록 내에 선언되는 경우, 해당 코드 블록이 변수의 스코프가 된다.
var 키워드로 선언된 변수는 함수 블록만, let, const 키워드로 선언된 변수는 모든 코드 블록 레벨의 스코프가 적용된다.

**중복 선언이란**
- 중복 선언이란 같은 동일한 변수명의 변수가 중복되어 선언되는 것을 의미

**다른 스코프에서 변수 중복 선언**
- 하나의 스코프 내에서 선언된 변수는 현재 자신이 위치한 스코프 내에서만 영향을 줌
- 다른 스코프 내에서 동일한 변수명을 가진 변수가 선언되어도 서로 다른 변수가 되며 상호 영향을 미치지 않음

**동일 스코프에서 변수 중복 선언**
- 동일 스코프 내에서 동일한 변수명을 선언한 경우
  - var 키워드로 선언된 변수는 재할당
  - let, const 키워드로 선언된 변수는 동일 스코프 내에서 중복 선언 불가 -> 오류 발생

**var, let, const 의 스코프**
- var 키워드로 선언된 변수는 함수 스코프만 지원
- let, const 키워드로 선언된 변수는 모든 코드 레벨 스코프를 지원