### 2-3. location
브라우저 URL 을 다루기 위한 객체

**location 프로퍼티**
|프로퍼티|설명|
|------|---|
|href|현재 브라우저 html url 정보 (full url)|
|protocol|url 의 프로토콜 정보|
|host|호스트 정보, 호스트명과 포트 정보 - 웹의 기본 포트는 :80, 80인 경우 생략가능|
|hostname|url 의 호스트명 정보|
|port|포트정보|
|pathname|포트명 / 이후의 정보|
|search|search string query string 정보, 서버에 전송하는 데이터|
|hash|url 뒤에 # 뒤에 붙는 정보, 현재 페이지의 상태를 표현하기 위해서|
|origin|백엔드를 식별하기 위한 정보 - 프로토콜, 도메인, 포트까지의 정보, 만일 이 세가지 정보가 모두 동일하다면 동일한 백엔드 서버를 가지고 있다.|

참고내용 - URL 구조

**<프로토콜명>://<호스트(aka 서버 주소)>:<포트>/<경로>?<쿼리(or Seach 문자열)>#<해시>**
- 프로토콜 - 사용되는 프로토콜 명
- 호스트 - 흔히 말하는 도메인, 서버의 네트워크 상의 주소
- 포트 - 도메인 뒤에 콜론으로 붙인 숫자값. 해당 서버의 어떤 애플리케이션을 나타냄. 웹의 기본 애플리케이션이 80 이며, 80이면 생략 가능. 80 외에는 표기 필수.
- 경로 - 리소스 내의 경로이다
- 쿼리 문자열 - 프론트 ⇒ 백엔드 요청하면서 전달하는 데이터
- 해시 - html에서 href=”#” 사용 ⇒ # 뒤에 나오는 id 위치로 이동


**location 함수**
|함수|설명|
|---|---|
|reload()|현재의 url 새로 요청 - 필요한 순간 새로고침|
|replace('url 정보')|새로운 url 로 이동|
```js
//location.href 에 url 을 할당하면, 해당 url 로 이동, 현재의 url 정보가 히스토리에 유지됨(뒤로가기 버튼 사용 가능)
location.href = "http://www.google.com";
//replace 함수를 사용하는 경우, 이전 페이지의 히스토리 유지 x, 주로 임시 페이지를 사용하여 로그인을 하는 경우에 사용
location.replace("http://www.google.com")
```

### 2-4. history
브라우저가 저장하고 있는 히스토리 정보
유저가 back, forward 하는 방식으로 동일하기 작동하게 만들 수 있음

**history 함수**
|함수|설명|
|---|---|
|back()|이전 화면으로 이동|
|forward()|이후 화면으로 이동|
|go()|히스토리의 특정 위치로 이동, 현재 페이지 0 기준 음수는 이전, 양수는 이후|

### 2-5. screen
브라우저가 출력되고 있는 화면을 말한다.

**screen 프로퍼티**
|프로퍼티|설명|
|_____|____|
|availWidth|사용 가능한 화면의 너비|
|availHeight|사용 가능한 화면의 높이|
|width|스크린 가로 사이즈|
|height|스크린 세로 사이즈|

### 2-6. navigator
화면과 관계 없는 기타 브라우저 정보

**navigator 프로퍼티**
|프로퍼티|설명|
|-----|----|
|cookieEnabled|브라우저 쿠키가 사용 가능한지 여부|
|language|현재 브라우저 설정 상의 언어(locale)|
|onLine|네트워크 연결 여부 - PC 환경보다는 모바일 환경에서 많이 사용|
|userAgent|브라우저, 플랫폼 정보(문자열로 고정 출력)|

**userAgent**
userAgent 가 반환하는 문자열은 앱이 실행되는 브라우저와 브라우저가 실행되는 플랫폼에 대한 정보
http requests 요청 시  http request header 에 항상 포함되어 서버에 전송된다(백엔드와도 관련성 높음)

## 3. Document
document 는 브라우저에서 실행되는 프론트 웹 앱에서 사용할 수 있는 내장 객체, 브라우저에 출력되는 HTML 문서 자체를 지칭하는 객체

### 3-1. DOM Node
브라우저에서 HTML 문서를 실행할 떄, HTML Parser 에 의해 HTML 문서가 파싱되어 메모리에 DOM Node 객체가 만들어지며, 자바스크립트는 해당 DOM Node 에 접근, 조작
JS 코드로 화면을 제어하기 위해서는 제어하고자 하는 노드에 탐색하고 접근하는 것이 우선

#### Node 종류
요소 노드 - HTML 태그
속성(어트리뷰트) 노드 - HTML 태그 내의 속성
텍스트 노드 - HTML 태그로 감싸진, 태그 내의 콘텐츠
주석 노드 - 문서 주석 지칭
문서(document) 노드 - HTML 문서 전체를 지칭하는 노드, 모든 노드는 document 노드의 하위 노드(root 노드)

**태그에 해당되는 노드 객체만 생성되는 것이 아닌, 해당 노드의 속성, 그리고 내부의 콘텐츠에도 노드 객체 생성**

### 3-2. Node Selector
노드를 조작하기 위해서는 조작, 제어하고자 하는 노드를 탐색하고 선택하는 단계가 우선적으로 실행되어야 함
NodeSelector 를 활용해서 접근하고자 하는 노드를 선택할 수 있다.

#### Node Selector 종류
**getElementById()**
- DOM Node 를 획득하는 가장 기본적인 방법
- DOM Node 중 해당 id 를 가지고 있는 node 탐색, 접근, 취득
- 기본적으로 id 는 하나의 HTML 문서에 하나만 있는 것이 원칙이지만, 만일 동일한 id 를 가진 노드가 여러개인 경우, 첫 번째 노드만 선택

**getElementsByTagName()**
- 매개변수로 전달한 태그 이름을 갖는 모든 노드 획득
- getElementsByTagName() 함수로 획득된 노드는 여러개일 수 있기 때문에 획득된 노드 객체가 담겨 있는 HTMLCollection 에 저장됨
- 객체 내의 데이터를 사용하기 위해서는 반복문을 사용

**getElementsByClassName()**
- 매개변수로 전달한 클래스 이름을 갖는 모든 노드 획득
- 태그명으로 획득한 것과 동일하게 HTMLCollection 객체에 노드 저장

**getElementsByName()**
- Name 속성 값으로 노드를 탐색
- 주로 input 요소를 탐색할 때 사용됨

**querySelector**
- 매개변수에 전달하는 속성을 바탕으로 노드 탐색, 획득
- CSS selector 에 해당하는 노드를 탐색할 수 있기에 조금 더 섬세한 선택이 가능
- 하나의 노드만 선택하기 때문에 다수의 노드를 획득한 경우, 첫 번째 노드만 획득, 반환

**querySelectorAll**
- querySelector 과 동일한 조건으로 탐색
- 매개변수에 전달하는 속성을 만족하는 모든 노드 탐색, 획득
- NodeList 객체에 저장

document.NodeSelector() => 전체 문서 내에서 노드 탐색, 획득
ElementName.NodeSelector() => ElementName 에 해당되는 노드의 하위 노드 탐색, 획득

### 3-3. Node 이용
#### 3-3-1. innerHTML vs innderText
노드 객체 하위에 선언된 자식 노드를 얻고, 변경할 수 있다는 점에서 두 객체는 유사
하지만 실제 동작하는 방식의 차이 존재
innerHTML 은 노드 하위에 선언된 모든 구성 요소를 포함, innerText 는 하위의 텍스트 노드만 해당
```html
<div id="one"><a href="#">link</a></div>
<div id="two"></div>
<div id="three"></div>
<script>
  let oneNode = document.getElementById('one');
  //innerHTML 은 해당 요소 노드 하위의 모든 요소 접근, 획득
  console.log(oneNode.innerHTML); //<a href="#">link</a>
  //innerText 는 해당 요소 노드 하위의 텍스트 요소만 접근, 획득
  console.log(oneNode.innerTest); //link

  //innerHTML, innerText 를 사용하여 하위 요소 조작 가능
  let twoNode = document.getElementById('two');
  let threeNode = document.getElementById('three');

  twoNode.innerHTML = `<a href="#">google</a>` //새롭게 추가되는 요소는 HTML parser 에 의해 파싱되어 a 태그 링크로 작동
  threeNode.innerText = `<a href="#">google</a>` //일반 텍스트 형식으로 추가됨
</script>
```

#### 3-3-2. 속성 이용
노드의 속성 값을 획득하거나 변경, 제거하는 경우 아래 함수를 사용
- getAttribute() - 매개변수로 전달한 속성 값 획득
- setAttribute() - 매개변수로 선택할 속성값과 변경할 값을 입력
  + twoNode.setAttribute('변경하고자 하는 속성 명', '선택한 속성에 변경할 값')
- removeAttribute() - 매개변수로 전달한 속성 삭제
- hasAttribute() - 매개변수로 전달한 속성 존재 여부 확인, treu/false 값

#### 3-3-3. Targeting 과 Bubbling
HTML 태그들은 중첩 구조를 갖고 있다. 
그리고 문서 내에 다수의 이벤트 핸들러를 한 개 이상의 각기 다른 요소 노드에 적용하는 경우가 존재한다.
타겟팅과 버블링은 이러한 중첩 구조를 띄는 요소 노드에 적용된 많은 이벤트가 실행되는 방식, 과정, 순서를 의미

**targeting**
- 최상위 document 노드부터 시작하여 이벤트가 발생한 노드까지 탐색해 들어가는 과정을 의미

**capturing**
- 캡처링은 상위노드의 이벤트부터 가장 내부 노드의 이벤트 순으로 실행

**bubbling**
- 버블링은 하위노드의 이벤트부터 가장 바깥쪽 노드의 이벤트 순으로 실행

문서 객체 내에 하위 노드와 상위 노드 모두 이벤트가 등록이 되어 있다면 이벤트가 실행되는 순서를 제어할 필요가 있음
이 때 이벤트 리스너 함수의 매개변수로 제어할 수 있다
```javascript
EventName.addEventListener('이벤트 타입 명', '이벤트 핸들러', useCapture(true 또는 false))
//세번째 매개변수에 true 또는 false 를 입력, false 가 default 값이며, 이는 버블링 단계에서 실행되게 함.
//true 값을 입력하는 경우 캡처링 과정에서 이벤트 실행하게 함.
```

**preventDefault() 와 stopPropagation()**
두 함수는 버블링 또는 캡처링 단계에서 다음 이벤트의 처리를 막는 함수이다.
- preventDefault() - 캡처링, 버블링 단계와 관계 없이 노드에 기본적으로 등록된 이벤트를 막는 것이다
  + 예: form 의 데이터를 submit 하는 경우 자동으로 페이지 새로고침, preventDefault() 를 통해 자동 새로고침 방지
- stopPropagation() - 캡처링, 버블링 과정에서의 이벤트 실행을 중지시키는 함수
  + stopPropagation() 함수가 실행되는 노드의 이벤트까지 실행하고, 이후 노드의 이벤트는 실행되지 않음