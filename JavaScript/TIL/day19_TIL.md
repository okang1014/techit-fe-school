### 1-4. async, await
실전 프로그래밍에는 비동기를 사용하는 사례가 많음
그렇기 때문에 매번 Promis, then 을 사용하게 되면 코드가 길어지고, 가독성이 떨어질 수 있음
콜백의 콜백의 콜백의 ... 뎁스 자체가 깊어지고 코드가 지저분해지며, 한 눈에 보이지 않게 된다 - Callback Hell 😈

이러한 문제를 방지하기 위해 async, await 를 지원
원론적으로 Promise 와 동일하게 작동하고, 표면적인 표기만 차이가 있음

#### async
- async 예약어는 반드시 함수 선언 부분에 사용
- 표현식 함수도 똑같이 함수 키워드 앞에 예약어 추가
- 함수를 콜하면 바로 return - return Promise 와 동일하게 작용, 명시적인 개발자 코드가 지정되지 않아도 자동으로 Promise 객체 반환
- async 도 then() 을 통해 업무 실행 결과를 반환받을 수 있음
- async 함수 내에 return 을 통해 일반 함수의 결과 값을 반환하는 것처럼 결과값을 받을 수 있음
- 자동으로 resolve() 에 의해 반환된 값을 반환
- 함수 내부에 await 가 꼭 필요한 것은 아니다
#### await
- 함수 body 내에서 사용되는 예약어
- 일반 함수에서는 사용이 불가하고, 꼭 async 예약어를 통해 선언된 함수에서만 사용
- 함수의 결과가 반환될 때까지 대기 상태
- await 뒤에 붙어있는 함수(업무)가 완료될 때까지 대기 상태
#### await 를 이용한 순차적 실행 & 동시 실행
async 함수를 호출하면 곧바로 다음 줄의 코드가 실행된다
그리고 비동기 업무 실행자 측에서 await 업무가 한 개 이상일 때, 작성된 순서대로 순차적으로 실행된다

동시에 실행한 결과를 받고 싶다면
1) await 문을 연달아서 작성하면 한 번에 결과가 반환됨
2) 또는, Promise.all([진행업무1, 진행업무2]).then(values) 기법이 제공, 콜백함수의 매개변수는 배열

## 2. Ajax, Axios
바닐라, 파이널 프로젝트에서 핵심은 Ajax 통신을 이용하여 서버로부터 데이터를 잘 끌어오는 것
Ajax, Axios 는 라이브러리로, 이러한 비동기 프로그래밍이 가능케 하는 라이브러리
### 2-1. Ajax
*서버 연동 자바스크립트 프로그램*
프론트 웹 앱이란 브라우저 단에서 실행되는 웹을 만드는 것이다
프론트 웹 앱에 필수 요소 1) 화면, 2) 서버연동
서버 연동은 백앤드 앱과 네트워킹을 하면서 서버의 정보를 화면에 출력하는 기능이다
프론트 웹 앱은 자바스크립트 코드 내에서 필요한 데이터를 주고 받기 위해 네트워킹, 통신하는 프로그램

**Ajax - Asynchronous JavaScript XML**
비동기 서버 연동을 위해 제공되는 기술이며, 요즘 서버 연동은 거의 Ajax 를 통해 진행된다

그럼 Ajax 는 왜쓰는거야?
비동기 통신을 가능하게 하는 프로그램이기 때문이다
동기 통신은 서버에 요청을 보내면 서버의 응답이 있기 전까지 브라우저는 대기 상태가 된다 -> 브라우저는 사용 불가, 서버의 응답이 돌아오면 전체 화면이 갱신 
이러한 단점을 해결하기 위한게 Ajax

비동기 통신은 서버와 데이터를 주고받지만 비동기적으로 해당 업무를 처리한다
서버에 요청을 보낸 이후, 서버 응답이 아직 돌아오지 않더라도 브라우저는 계속해서 사용이 가능하다
그리고 응답 이후 전체 화면이 새로고침되는 것이 아니라 결과만 반환, 해당 결과는 개발자가 사용하기 나름입니다

### 2-2. XMLHttpRequest
Ajax 통신으로 서버에 요청을 보내기 위해서는 XMLHttpRequest 객체를 이용
작업 흐름
1. new 연산자를 이용하여 새로운 XMLHttpRequest 객체를 생성
2. 요청 준비(초기화) - 객체명.open('request method', 'url', '비동기/동기 여부')
3. 요청 전송 - 객체명.send()
4. 이벤트 콜백을 통한 결과 이용 -> 서버에서 돌아온 응답을 이용하여 실행할 콜백 업무

#### XMLHttpRequest 메서드
- open() : 요청 초기화
- abort() : 요청 취소
- send() : 서버 요청
- setRequestHeader() : 요청 헤더 설정

#### XMLHttpRequest 요청 과정
1. XMLHttpRequest 객체 생성
```js
let xhr = new XMLHttpRequest();
```
2. open() 함수로 새로운 요청을 위한 초기화 작업진행
3. open() 함수의 매개변수에는 http request method, url, 비동기/동기처리(option) 정보가 들어감
```js
xhr.open('get', `http://localhost:3000/sum/${numNode.value}`, true);
```
  - HTTP request method : open() 함수의 가장 첫 매개변수, 서버에 데이터를 요청하는 방식(get, post, put, delete) 정의
  - URL : 데이터를 요청하고자 하는 서버의 origin, 템플릿 리터럴을 통해 외부의 데이터를 입력할 수 있음
  - 비동기/동기 처리 : true/false 의 값을 입력, true 는 비동기 처리, false 는 동기 처리
4. send() 를 통해 서버에 요청 전송
```js
xhr.send()
```
5. 서버로 보낸 요청의 처리 결과는 이벤트 콜백 함수를 통해 이용
  이벤트 리스트
  - loadstart : 요청에 대한 응답을 받기 전에, 요청을 보내자마자 발생한 이벤트
  - *progress : 서버에 요청 후 응답을 받는 중 주기적으로 발생하는 이벤트
  - ***load : 요청에 대한 응답이 성공적으로 완료한 경우 발생하는 이벤트
  - abort : 요청이 취소된 경우
  - **error : 요청에 에러 발생
  - loadend : 성공, 실패와 관련없이 서버 요청이 끝나면 발생
  - readystatechange : readystate 값이 변경될 때 발생하는 이벤트

  XMLHttpRequest 에서 제공되는 프로퍼티
  - *status: http request 상태 코드 - 200, 400, 500 등
  - readyState : http 요청에 대한 상태
  - *responseText : http response 결과 문자열
  - statusText : http response 의 상태를 표시하는 문자열, ok 등
  - responseType : http response 결과 타입
```js
xhr.onload = function() {
  //http status - http request 상태 코드
  if (xhr.status === 200) {
    let data = JSON.parse(xhr.responseText); //request 에 따른 response 결과 문자열
    resultNode.innerHTML = data.result
  }
}
```

**JSON 이란?**
JavaScript Object Notation 의 약어
자바스크립트에서 객체를 만들기 위해 사용한 객체 리터럴 방식을 서버의 데이터를 표기하는 표기 방식
{"key": "value"} 형식의 문자열 타입 데이터
서버 응답을 통해 전달되는 데이터는 JSON 형식으로 넘어오기 때문에 별도의 변환과정이 필요하다
- 객체를 JSON 문자열로 변경 - JSON.stringify(obj)
- JSON 문자열을 객체로 변경 - JSON.parse(JSON data - 서버로부터 전달받은 응답 데이터)

**readyState**
readyState 프로퍼티 값은 http 요청에 대한 상태를 나타내는 프로퍼티
- 0: UNSET - 아직 open() 함수로 초기화되기 전 상태
- 1: OPENED - open() 함수에 의해 초기화 되었지만 서버 요청이 발생하지 않은 상태
- 2: HEADER_RECIEVED - 서버로부터 헤더값이 전달된 상태(헤더값에 포함된 내용은 request method 와 url)
- 3: LOADING - 서버 데이터가 클라이언트로 전송되고 있는 상태
- 4: DONE - 모든 작업이 완료된 상태

### 2-3. CORS
Cross Origin Response Sharing 의 약어
요청을 보내는 HTML 의 origin 과 요청을 받는 서버의 origin 이 다른 경우, 서버의 응답을 받을 수 없음
**Ajax 통신을 사용하면 단골로 따라 나오는 에러 상황**
Ajax 에서 서버 연동을 하는 경우, CORS 정책에 의해 브라우저에서 차단한다
이는 백엔드 단에서 response header 명령어를 지정해서 해당 문제를 막을 수 있다.