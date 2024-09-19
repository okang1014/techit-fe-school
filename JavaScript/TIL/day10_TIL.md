### 1-3. Date 객체
- 시간/날짜 데이터는 앱을 이용할 떄 다양한 형태로 활용 가능하고, 이를 활용하여 다양한 연산이 필요함
- 이를 위한 자바스크립트 내장 객체가 Date 이며, 다양한 함수를 이용해 시간/날짜를 활용
- Date 객체는 new 연산자를 통해 생성
```javascript
let date1 = new Date();
console.log(date1.toString());
//괄호 내에 아무런 데이터를 입력하지 않으면 코드가 실행되는 시점을 출력
```

#### 1-3-1. UTC/GMT
- UTC : Coordinated Universal Time
- GMT : 그리니치 표준시
- 이 둘은 초의 소수점 단위에서 약간의 차이가 있지만 거의 동일한 개념이며 혼용되어 사용

#### 1-3-2. Timestamp
- 특정 순간의 시간/날짜를 표현하는 데이터
- 타임스탬프는 UTC 1970년 1월 1일 자정부터 경과된 밀리초 값

#### 1-3-3. Date() 객체 이용하기
- 시간을 브라우저 설정 언어에 맞게 출력하고자 한다면 toLocaleString() 사용
```javascript
console.log(date1.toLocaleString()); //한국어로 시간 출력
```
- new Date() 로 객체를 생성하고, 현재 시간이 아닌 특정 시간을 설정하고 싶다면 매개변수에 시간 지정 가능
- 만일 date 에 해당하는 데이터를 일일이 입력하는 경우, 월의 데이터만 0 부터 시작
```javascript
let date2 = new Date("2024-10-09T10:10:10");
let date3 = new Date(2024, 10-1, 9, 10, 10, 10);
```

#### 1-3-4. Date() 데이터 추출
- getFullYear() : 년도 반환
- getMonth() : 달 반환, 0 이 1월,
- getDate() : 날짜 반환
- getDay() : 요일 반환, 0(일요일)부터 시작
- getHours() : 시 반환
- getMinuts() : 분 반환
- getSeconds() : 초 반환
- getTime() : timestamp 값 추출

**두 시간 데이터를 비교하는 경우**
getTime() 을 사용하여 타임스탬프 값을 추출
```javascript
//이벤트 시간 가정
let eventStartDate = new Date('2024-09-01 00:00:00');
let eventEndDate = new Date('2024-09-30 23:59:59');

//예약 시간
let regDate = new Date('2024-09-19 14:00:00');

//두 개의 타임스탬프 비교
if (regDate.getTime() < eventStartDate.getTime()) {
  console.log('예약하신 시간은 이벤트 시작 전입니다.');
} else if (regDate.getTime() > eventEndDate.getTime()) {
  console.log('에약하신 시간은 이벤트 종료 후입니다.');
} else {
  console.log(`${regDate.toLocaleString()} 으로 예약이 완료되었습니다.`)
}
```

### 1-4. Math 객체
수학과 관련된 다양한 작업이 필요하며 이를 도와주기 위한 Math 라는 내장객체 제공
- Math.PI : 원주율 값
- Math.abs() : 절대값을 반환
- Math.ceil() : 올림 값을 반환
- Math.floor() : 내림 값을 반환
- Math.round() : 반올림 값을 반환 -> 음수인 경우, 절대값을 반올림
- Math.max() : 최대값을 구하는 함수
- Math.min() : 최소값을 구하는 함수
- Math.pow() : 제곱근을 구하는 함수
- *Math.random() : 난수를 생성
  - 0 과 1 사이의 실수값을 출력
```javascript
console.log(Math.random()); // 0 과 1 사이의 실수 출력
//0 과 N 사이의 난수 생성
console.log(Math.random() * N); //N 의 값을 랜덤함수에 곱하면 N 사이의 난수 생성
//m 과 n 사이의 난수 생성
let min = 11;
let max = 70;
console.log(Math.random() * (max - min) + min);
```
## 2. 브라우저 내장객체
### 2-1. 브라우저의 내장 객체
브라우저 내장 객체는 브라우저에서 제공하는 자바스크립트 내장 개체이며, 브라우저에서 실행되는 프론트 웹 앱에서만 사용 가능
- *window : 브라우저 창을 지칭하는 객체 (prompt(), alert(), confirm()...)
- *document : 브라우저에 출력되는 HTML 문서를 지칭하는 객체
- history : 인터넷 방문 기록을 지칭
- screen : 브라우저 내의 스크린 창을 지칭하는 객체 
- navigator : 브라우저에 대한 정보를 제공하는 객체
- location : 브라우저 출력 URL 을 지칭

#### 2-1-1. 브라우저의 계층구조
브라우저 객체들은 모드 window 의 객체들로 window 부터 계층 구조로 구성되어 있음
- document, history, screen, navigator, location 모두 window 에 포함된 객체
- 그럼으로 객체들을 사용할 때 window.document  혹은 window.screen 등 형식으로 사용
- 하지만 브라우저에 실행되는 모든 자바스크립트의 글로벌 객체가 window 이기 때문에 window 생략 가능

### 2-2. window
#### 2-2-1. window 객체
- window 객체는 브라우저 창을 지칭하는 객체, 브라우저에 실행되는 앱 모든 곳에서 이용 가능
- alert, prompt 도 window 객체 함수, console 도 window 에 선언된 객체

#### 2-2-2. window 프로퍼티
|프로퍼티|설명|
|-----|----|
|document|html 문서 지칭하는객체|
|location||
|screen||
|history||
|navigator||
|console||
|innerWidth|브라우저 창 viewport의 너비|
|innerHeight|브라우저 창 viewport의 높이|
|outerWidth|브라우저 창 가장 바깥쪽 영역을 포함한 너비|
|outerHeight|브라우저 창 가장 바깥쪽 영역을 포함한 높이|
|scrollX|x 축 방향으로 스크롤|
|scrollY|y 축 방향으로 스크롤|
|screenLft|전체 화면 내에서 브라우저 화면의 좌측 좌표값|
|screenTop|전체 화면 내에서 브라우저 화면의 상단 좌표값|

#### 2-2-3. window 함수
|함수명|설명|
|----|---|
|alert()|alert dialog 출력|
|confirm()|확인, 취소 dialog 출력|
|prompt()|사용자 입력 dialog 출력|
|open()|새로운 URL 문서 열기|
|close()|브라우저 창 닫기|
|scrollBy()|스크롤|

**open()**
- 새로운 브라우저 창을 open() 함수를 통해 출력하도록 하면, 기존 브라우저 창은 부모창(parent), 새로 열린 브라우저 창은 자식창(child)
- open("url", "target", "windowFeatures") 로 매개변수 전달 가능
- 만일 url 만 있는 경우, 기본값으로 target 은 "_blank"
- target 매개변수
  + _blank : 새로운 창
  + _self : 새로운 창 없이 url 로 이동
  + _parent : 부모창 url 이동
- windowFeatures 매개변수
  + width, height: 출력되는 창의 사이즈
  + left, top: 바탕화면 좌측 상단 기준에서 새로이 출력되는 창의 위치
```javascript
window.open("http://www.naver.com") //url 에 해당하는 새로운 페이지 출력
window.open("http://www.naver.com", "_blank") //url 에 해당하는 페이지 새로운 페이지에 출력
window.open("http://www.naver.com", "_blank", "left=100, top=100, width=400, height=400") 
//url 에 해당하는 새로운 페이지가 400 * 400 사이즈로 윈도우 왼쪽 상단 모서리 기준 100 씩 떨어져서 출력
```

**close()**
- 브라우저 창을 닫는 함수
```javascript
window.close();
```

#### 2-2-4. HTML 문서의 메모리 구조
- 사용자 입장에서 하나의 앱은 하나의 문서로 받아들여지지만, 브라우저 앱을 구성하기 위해 많은 문서를 연결하여 하나의 앱을 구성
- 각각의 페이지에 메모리를 할당하며 해당 문서 내의 변수, 함수를 메모리에 저장
- 하나의 문서는 다른 문서의 메모리 접근이 불가
- 자바스크립트의 경우, 연결된 페이지의 메모리만 접근 가능
- 하지만 다른 페이지 내의 데이터가 다른 곳에서 필요한 경우가 존재한다. => 부모창의 데이터가 자식창에 필요한 경우 or 자식창의 데이터가 부모창에 필요한 경우
  + 이를 위해 opener 라는 객체를 제공
- **opener 는 부모창에서 자식창을 open() 함수로 여는 경우, 자식창에서 자신을 연 부모창을 지칭하는 객체**

**opener 를 이용하여 부모창의 변수 함수 이용하기**
```javascript
//부모창에서 open() 함수를 통해 자식창을 여는 경우
function openChild() {
  window.open(
    "child.html",
    "_blank",
    "left=100, right=100, width=400, height=400"
  )
}

var parentData = 20;
function parentFun() {
  console.log('parentFun call');
}

//자식창에서 opener 를 통해 부모창에서 선언된 변수, 함수 사용 가능 가능
console.log(opener.parentData); //20
opener.mainFun(); //부모창에서 함수 실행
```

**opener 를 이용해 자식창의 변수 함수 이용하기**
```javascript
//자식창에서 선언된 변수, 함수를 사용하기 위해서는 opener.(임의의 변수명) = this; 를 통해 자신의  window 를 지칭하는 객체 선언 필요
var childData = 30;
function childFun() {
  console.log('childFun call');
}
opener.childPage = this;

//부모 창에서 자식창의 데이터 접근 가능
let getChildData = () => {
  console.log(childPage.childData)
  childPage.childFun();
}
```

**opener 를 이용하여 부모창의 URL 변경**
```javascript
//부모창의 url 을 변경할 수 있음
opener.location.href = 'http://www.naver.com"
window.close()
```