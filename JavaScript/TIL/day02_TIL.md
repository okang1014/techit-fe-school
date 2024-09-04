## 3. JavaScript Overview
### 3-1. JavaScript의 간단한 역사
JavaScript는 역사가 꽤나 오래된 언어
- 1995년 브랜던 아이크에 의해 처음 개발, 초기 명칭은 LiveScript
- 넷스케이프 브라우저의 간단한 언어적인 처리만을 위한 표준 스크립트 언어로 채택되면서 상용화되기 시작
- 프론트엔드 웹 앱의 발전으로 인해 JavaScript의 인기가 급상승
- Node.js 출현으로 인해 JavaScript가 브라우저만을 위한 소프트웨어 언어가 아닌, 범용적으로 사용되는 언어로 사용 가능

### 3-2. JavaScript의 표준
**JavaScript는 넷스케이프 브라우저에서 이용하기 위한 소프트웨어 언어였지만 이 외의 다양한 브라우저에서도 채택이 되면서 사용되기 시작, 문제 발생**
- 다양한 브라우저에서 사용하다 보니 독자적으로 JavaScript를 발전시키기 시작 -> 호환성 문제 발생
- 따라서 모든 브라우저에 동일하게 동작할 수 있도록 표준을 책정 (ECMA가 표준 지정)

현재 사용하는 ECMA 버전은 ECMA2015(a.k.a ES2015, ECMA6, ES6)
- JavaScript를 활용하여 다양한 애플리케이션을 개발할 수 있는 기법 제공 선언,
- ECMA2015 이후 매년 새로운 버전이 발표되고 있지만, 과하게 세분화되고, 기능적인 업데이트 규모가 상대적으로 작음
- 2015년 이후 나온 모든 버전을 ECMA2015로 통칭

### 3-3. 컴파일 언어 vs 스크립트 언어
**JavaScript는 대표적인 스크립트 언어이다.**

**스크립트 언어란?**
- 사람이 작성한 코드(소스)가 별도의 컴파일 단계 없이 컴퓨터(플랫폼)에서 실행되는 언어
- 즉, 코드를 실행할 때 한 줄 한 줄 컴퓨터가 이해 가능한 언어로 변환하여 실행된다.

**컴파일 언어란?**
- 사람이 작성한 코드를 일차적으로 컴퓨터가 이해 가능한 기계어로 컴파일한 이후 컴퓨터에 전달
- 컴파일 단계가 존재한다.

### 3-4. JavaScript 엔진
브라우저 내에는 HTML, CSS, JavaScript를 실행하기 위한 기술들이 존재
HTML은 HTML Parser, CSS는 CSS 엔진, JavaScript는 JavaScript 엔진에 의해 실행

### 3-5. JavaScript의 단점
**장점** 
- 탄생 배경 자체가 간단한 연산, 데이터 처리를 위한 소프트웨어 언어이기 때문에 **문법 자체가 유연하고 간단**

**단점**
- 문법 자체가 다른 언어에 비해 상대적으로 부족 -> 복잡한 앱을 개발하기 위해 여러 어려움을 겪을 수 있음
단점을 보완하기 위해 만들어진 언어들 중, 가장 대중적으로 사용되는 언어가 **Typescript**

**Typescript**
- JavaScript 언어의 한계를 보완하기 위해 만들어진 언어
- 독자적으로 브라우저나 Node.js 의해 실행이 불가 -> 별도의 JavaScript 변형 작업을 거쳐 실행

## 4. 용어정리
**플랫폼**
- 개발한 애플리케이션을 실행시켜주는 환경(OS, 플랫폼 등)
- JavaScript로 만든 애플리케이션이 실행되는 플랫폼 => 주로 브라우저

**네트워킹**
- 개인과 개인, 개인과 서버 사이에서 상호 데이터를 주고 받는 과정

**W3C**
- 웹 표준화 단체 - 모든 브라우저에서 동일하게 작성되고, 동작할 수 있도록 표준을 지정하는 단체
- HTML, CSS, Web API에 대한 표준 지정
- ECMA는 JavaScript라는 소프트웨어 언어 자체의 표준을 지정하는 단체

**프로토콜**
- 클라이언트 - 서버 사이에서 네트워킹하는 과정에서 주고 받는 데이터에 대한 규칙
- 데이터를 주고 받고, 처리하고 해석하는지까지를 다루는 규칙
- 웹 앱의 경우 주로 HTTP, HTTPS 프로토콜 사용

**HTTPS**
- HTTP 프로토콜에 보안을 강화
- 현재는 대부분 HTTPS 프로토콜 사용

**도메인, IP**
- 네트워크 상의 주소는 IP - 일반적으로 4개의 숫자가 온점(.)으로 연결 (eg. 111.222.333.444)
- IP 주소를 외워서 접속하는데 어려움이 있음 -> 도메인은 IP주소의 "별칭"
- **네트워킹을 위한 주소는 IP주소, 도메인은 편의성을 위한 IP주소의 별칭**

**Node.js**
- JavaScript가 브라우저가 아닌 다른 곳에서 실행할 수 있도록 하는 Run-timer
- 백엔드 웹 앱을 개발하는 기술 중 인기 있는 기술
- Node.js 자체가 서버의 역할을 할 수는 없음

**DOM Node**
- Document Object Model의 약자
- HTML 문서를 브라우저의 HTML Parser가 해석, 브라우저 메모리에 저장을 할 때, HTML 문서의 태그를 객체의 계층 구조로 저장
- 메모리에 저장된 문서의 전체 계층 구조를 DOM, 그리고 각 구성 요소를 node라고 부른다.
*여기에서의 Node와 Node.js Node는 표기는 동일하지만 다른 의미를 가지고 있다*

**디버깅**
- 소프트웨어 개발, 또는 실행하는 단계에서 발생하는 오류, 문제를 버그(Bug)라고 부름
- 이러한 오류, 문제, 버그를 해결하는 과정 == 디버깅(Debugging)

**IDE**
- Integrated Development Environment 의 약자로 통합적인 개발 환경을 제공해주는 툴을 통칭하는 용어

**API**
- Application Programming Interface 의 약자
- 이미 누군가에 의해 만들어진 코드, 기능을 가져와서 사용할 수 있도록 하는 interface
- 변수명, 함수명이 될 수도 있고, 외부 기능이 될 수도 있다.
 *추후에 학습 예정*

**라이브러리**
- 이미 누군가에 의해 만들어져서 개발 시 사용할 수 있는 코드, 기능의 집합체
- lib 라고 줄여서 부를 수도 있음

# 2장. JavaScript Basic
## 1. JavaScript 시작하기
### 1-1. JavaScript 코드 작성 위치
JavaScript 코드는 **HTML 문서 내**에서 <script></script> 태그를 사용하여 감싸야 한다.(HTML 문서 필수)
이는 브라우저 내의 HTML Parser는 HTML 문서를 파싱하여 문성의 구조를 메모리에 객체의 계층 구조로 저장(DOM)
JavaScript는 JavaScript 엔진에 의해 실행, 따라서 HTML Parser는 <script></script> 태그를 만나면 해당 코드를 실행시킬 수 있는 엔진 실행
-> <script type="application/javascript"></script>가 마크업 표준. 하지만 해당 태그 내에 대부분의 JavaScript 코드이기 때문에 별도 지정이 없는 경우 디폴트로 JavaScript 엔진 실행

**HTML 문서 내에 작성**
- <head></head> 또는 <body></body> 내 에 <script></script> 태그 추가 가능
- script 태그 내에 스크립트 코드 작성

**HTML 문서 외부에 작성**
- 별도의 .js 확장자 파일을 생성
- 해당 파일 내에 스크립트 코드 작성
- HTML 문서 내에서 스크립트 코드를 실행하고 싶은 부분에 <script src="파일명.js"></script> 선언

**JavaScript 코드 작성 위치 관련 유의사항**
- 기본적으로 <script></script> 태그는 어디든 위치할 수 있지만, 특정 경우 런타임 에러를 발생시킬 수 있다.
- 이는 주로 HTML Parser에 의해 HTML 문서가 파싱되는 순서와 관련 있음
- JavaScript 코드 자체가 DOM Node를 활용하지 않는 경우는 어디든 작성 가능
- **코드가 DOM Node를 활용한다면 꼭 DOM Node가 메모리에 로딩된 이후 실행되기 해야한다**
- 또는 <head></head> 태그 내에 작성한 경우, **이벤트 콜백 함수로 등록, HTML 파싱이 완료된 이후 코드를 실행하도록 해야한다.**

```html
<script>
    window.addEventListener('load', function (e) {
      let selectNode = document.getElementById('a1');
      selectNode.style.backgroundColor = 'red';
    })
    //load - html parsing 이 완료된 시점에 DOM node 를 사용하는 콜백함수 코드 실행
</script>
```

### 1-2. JavaScript 주석
한 줄 주석 - // 한 줄 주석
여러 줄 주석 - /* 여러 줄 주석*/

### 1-3. JavaScript에서의 대소문자
- JavaScript 내에서는 영어 대소문자를 구별한다.
- 변수, 함수 클래스 이름을 선언할 때 대소문자를 사용하는 방식은 개발자의 마음
- 하지만 기본적인 **코드 컨벤션**이 존재, 따른 것을 권장
  - 변수와 함수 - 소문자로 시작, 여러 단어로 이뤄지는 경우 camelCase 사용
  - 클래스 - 대문자로 시작(PascalCase)