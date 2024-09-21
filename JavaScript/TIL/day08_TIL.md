## 7. Event Programming
애플리케이션 개발 시 프로그래밍 기법 상 가장 많이 사용되는 것이 이벤트 프로그래밍이다.
윈도우에 의해, 또는 사용자에 의해 발생하는 이벤트를 처리하는 프로그래밍이다.

### 7-1. 이벤트의 종류
크게 브라우저 이벤트, 그리고 사용자 이벤트로 나뉨
- 브라우저 이벤트 - 브라우저 자체에서 발생하는 이벤트
- 사용자 이벤트 - 사용자가 키보드 혹은 마우스로 발생시키는 이벤트
  - 마우스 이벤트
  - 키 이벤트
  - **HTML 폼 요소 관련 이벤트** - 프론트엔드 앱에서 가장 중요한 부분. 사용자가 폼을 통해 입력한 데이터를 활용하기에 핵심적인 이벤트라고 볼 수 있다.

### 7-2. 이벤트 프로그래밍 구조
자바스크립트에서 사용자 이벤트 발생을 감지하고, 이벤트가 발생했을 때 코드가 동적으로 실행되게 하는 것이 이벤트 소스, 이벤트 핸들러, 리스너
- 이벤트 소스 - 이벤트가 발생하는 객체(노드)
  - node 객체 - 앱이 실행될 때 html 파서에 의해 html 문서를 파싱, 객체로 저장, 각 태그가 노드로 저장
- 이벤트 핸들러 - 이벤트 발생 시 실행되는 코드, 동작
  - 이벤트 소스에 이벤트가 발생했을 시 실행될 내용
- 리스너 - 이벤트 소스와 이벤트 핸들러를 연결

### 7-3. 이벤트 핸들러와 이벤트 소스를 연결하는 방법
**addEventListener()**
가장 기본적인 방법이며, addEventListener() 함수를 사용
```javascript
window.addEventListener('load', () => {})
이벤트소스   리스너          이벤트명  이벤트 핸들러
```

용어 - 콜백 함수
이벤트 핸들러와 같이 특정 상황에서만 자동으로 호출되는 함수를 통칭

**DOME node 에서 이벤트 등록**
화면을 구성하는 각 태그에 이벤트를 등록하고자 한다면 HTML 문서 내의 태그에 직접 이벤트 핸들러를 등록할 수 있음
해당 이벤트 핸들러는 연결된 js 파일에 함수로 선언한다.
```html
<button onclick="myEventHandler()">click</button>
```

**자바스크립트에서 .onXXX 형식으로 등록**
- onXXX 에서 XXX 는 이벤트를 식별하기 위한 이름
- 클릭 이벤트를 등록하겠다면 onclick, 브라우저 로딩 이벤트를 등록하겠다면 onload 를 사용
```javascript
window.onload = () => {
  console.log('html 문서 로딩이 완료')
}

let button = document.querySelector('button1');
button.onclick = () => {

}
```

### 7-4. 마우스 이벤트
|이벤트 종류|설명|
|--------|---|
|click|마우스 클릭 이벤트|
|dblclick|마우스 더블클릭 이벤트|
|mousedown|마우스 버튼을 누르는 순간의 이벤트|
|mouseup|마우스 버튼을 떼는 순간 이벤트|
|mousemove|마우스 이동 이벤트|
|mouseenter|마우스 포인터가 들어오는 순간 이벤트|
|mouseleave|마우스 포인터가 나가는 순간 이벤트|
|mouseover|마우스 포인터가 들어오는 순간 이벤트|
|mouseout|마우스 포인터가 나가는 순간 이벤트|

- 모든 마우스 이벤트들은 이벤트 함수에 MouseEvent 타입의 객체가 전달되며, 이 객체 정보를 이용해 마우스 이벤트 발생 지점의 좌표값을 얻을 수 있다
- offsetX, Y 는 이벤트가 발생한 DOM node 기준 위치 좌표, pageX, Y 는 전체 페이지 내의 위치 좌표

**mouseleave, mouseleave vs mouseover, mouseout**
- mouseleave, mouseleave 는 이벤트가 발생한 DOM node 에서만 이벤트 처리가 가능하다
- mouseover, mouseout 는 이벤트가 발생한 DOM node 와 상위 노드에도 이벤트가 전파된다.(이걸 버블링 현상이라고도 부름)

### 7-5. Window 이벤트
|이벤트|설명|
|----|---|
|copy|브라우저에서 복사했을 때의 이벤트|
|cut|브라우저에서 잘라내기 했을 때의 이벤트|
|paste|브라우저에서 붙여넣기 했을 때의 이벤트|
|load|브라우저에서 문서 로딩이 완료되었을 때의 이벤트|
|error|브라우저에서 문서 로딩이 실패했을 때의 이벤트|
|resize|브라우저의 창 크기가 변경될 때의 이벤트|

- resize 이벤트는 브라우저 창의 크기가 변경되는 순간의 이벤트이며 이벤트 처리 함수에서 innerWidth, innerHeight 로 브라우저 창의 크기 획득 가능
```javascript
addEventListener('resize', () => {
  console.log(`width : ${innerWidth}, height: ${innerHeight}`);
});
```
### 7-6. Form 관련 이벤트
- HTML 문서에서 사용자 데이터를 입력 받기 위한 태그가 form 태그이며, input, textarea, select 등의 입력 태그를 묶어서 처리할 수 있음
- 사용자 입력과 관련된 이벤트는 form 태그에 연결하는 이벤트와 입력 요소에 연결하는 이벤트로 구분해서 정리해 주어야 한다.

**form 관련 이벤트**
|이벤트|설명|
|----|---|
|submit|form 데이터가 submit 되는 순간의 이벤트|
|reset|form 데이터가 reset 되는 순간의 이벤트|

**form 내에 input 관련 이벤트**
form 내의 다양한 입력 태그들이 추가될 수 있고, 이러한 입력 태그에 포커싱 되는 순간, 데이터가 변경되는 순간 등의 이벤트 처리 가능
|이벤트|설명|
|----|---|
|change|입력 데이터가 변경되는 순간의 이벤트|
|focus|입력 요소가 포커스를 가지는 순간의 이벤트|
|blur| 입력 요소가 포커스를 잃어버리는 순간의 이벤트|