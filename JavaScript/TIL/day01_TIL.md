# 1장. Overview on JavaScript
## 1. Software Language Overview
### 1-1. HTML/CSS vs. JavaScript
HTML/CSS 는 문법 작성 규칙을 학습하는 것이라면, **자바스크립트는 소프트웨어 언어를 학습하는 것**
- HTML, CSS, JavaScript 모두 프론트엔드 웹 앱 개발을 위한 필수 기술
- HTML/CSS 는 사용자에게 보이는 웹 화면 구성, JavaScript 는 소프트웨어 언어
- HTML/CSS 는 정적인 요소 vs JavaScript 는 동적인 요소
**HTML/CSS, JavaScript 모두 프론트엔드 웹 앱을 만드는데 있어서 필수적인 요소**

### 1-2. 소프트웨어 언어의 목적
소프트웨어 언어는 의사소통을 목적으로 함 
- 누구와? => 사람(개발자)과 컴퓨터(플랫폼, 운영체제) 사이의 의사소통
- 소프트웨어 언어가 다양한 이유 : 다양한 국가의 사람들이 다양한 언어를 사용하여 소통하는 것과 같이, 플랫폼(운영체제)에 따라 이해할 수 있는 언어가 다르기 때문
- JavaScript 는 그러한 소프트웨어 언어 중 하나 -> 브라우저 플랫폼이 이해할 수 있는 소프트웨어 언어
- 정확한 소프트웨어 언어 사용과 더불어 올바른 문법을 사용하는 것도 중요!

소프트웨어 언어의 특징
- 소프트웨어 언어들은 대동소이 : 자바스크립트 내에서 학습하는 내용은 결국 다른 소프트웨어 언어에도 사용되는 개념들이며 문법적인 차이, 표현 방식 상의 차이가 있음. 첫 소프트웨어 언어를 배우는 것이 어렵지, 그 이후 배우는 언어는 첫 언어보다 상대적으로 수월할 수 있다!

### 1-3. 결국, 소프트웨어 언어란?
**소프트웨어 언어란 결국 앱을 만들기 위한 도구이다**
좋은 요리를 하기 위해 다양한 조리도구를 사용하는 방법과, 연습과 훈련을 통해서 그 도구를 능숙하게 사용할 수 있는 것처럼
JavaScript 라는 언어 자체를 배우는데 치중할 것이 아닌, 도구로써 JavaScript 를 학습하여 활용할 수 있는 방법을 배우는 것이 중요

***

## 2. Web Application Overview
### 2-1. 프론트엔드 웹 앱이 브라우저를 보는 관점
프론트엔드 웹 앱 개발에서 브라우저는 프론트엔드 웹 앱이 작동하는 운영체제(OS), 플랫폼으로 본다.
브라우저에서 동작하는 프론트엔드 웹 앱을 개발하는 것이 프론트엔드 개발의 핵심 -> **따라서 브라우저가 이해할 수 있는 HTML, CSS, JavaScript 기반으로 만들어지는 것**

### 2-2. 프론트엔드 웹 앱 vs 백엔드 웹 앱
#### Standalone Application vs Client-Server Application
Standalone Application : 네트워킹을 하지 않은 애플리케이션
Client-Server Application : 네트워킹을 하는 애플리케이션 <- 우리가 개발하는 애플리케이션의 대부분
- 업무 처리를 위해 사용자 애플리케이션과 서버 애플리케이션이 네트워킹하는 앱
- 네트워킹을 하는 상황
  - Case 1: 사용자 간의 데이터를 공유해야하는 경우
  - Case 2: 사용자가 서버 데이터베이스(이하 DB)에 저장되어 있는 데이터를 이용해야하는 경우
#### Front Web Application vs Backend Web Application
Front Web Application : 클라이언트(사용자 브라우저)에서 실행되는 앱
Backend Web Application : 서버에서 실행되는 앱

### 2-3. 웹 애플리케이션 개발 기술
프론트엔드 웹 애플리케이션 개발 기술 - HTML, CSS, JavaScript
HTML/CSS(유저에게 제공하는 화면을 구성하는 기술) + JavaScript(동적으로 데이터를 표시하는 수단)
이 세 가지가 W3C 에서 정의하는 프론트엔드 웹 애플리케이션 개발 기술 표준이다.
그렇다면 프레임워크(React.js, Angular, Vue.js 등)를 사용하는 이유는?
=> 점점 웹 애플리케이션이 복잡하고 방대해지기 때문에 기본적인 뼈대 및 구조를 만들어 주는 역할을 프레임워크가 해주기 때문

### 2-4. 웹 기본 지식 - HTTP 프로토콜
HTTP 프로토콜이란?
클라이언트 - 서버 구조에서 네트워킹을 하며 데이터를 상호 교환하는 과정에서, 데이터를 주고 받는 형태에 대한 규약(W3C 에 의해 정의됨)
#### Client - HTTP Request 
클라이언트 단에서 서버 측에 데이터를 요청하고, 서버 측에서 받아온 데이터를 해석 및 표시하는 방법에 대한 규약
- HTTP Request Methods -> 서버에 데이터를 전달하는 방식
  - GET : 서버의 데이터를 얻기 위한 요청(별도 변경 사항 없을 시 기본 메서드)
  - POST : 서버에 데이터 전달, 저장하기 위한 요청
  - PUT : 서버에 데이터 전달, 수정하기 위한 요청
  - DELETE : 서버의 데이터를 삭제하기 위한 요청
  - HEAD : 서버와 각종 정보를 확인하기 위한 요청
  - PATCH : 서버의 데이터를 수정하기 위한 요청

#### Server - HTTP Response
클라이언트 단에서 요청한 데이터를 처리하고 다시 클라이언트에 전달하는 방법에 대한 통신 규약
- HTTP Response 상태코드
  - 2** - 정상 처리
  - 3** - 요청을 처리하였으나 별도의 추가 작업 필요
  - 4** - 요청 잘못으로 요청을 처리하지 못함
  - 5** - 서버 잘못으로 요청을 처리하지 못함

### 2-5. 웹 기본 지식 - URL 분석
URL - Uniform **Resource** Locator
여기서 resource 란 DB 에 저장되어 있는 정보를 의미
즉, 저장되어 있는 정보를 식별, 지칭해주는 역할을 URL 이 한다.

**기본 구조**
<프로토콜명>://<호스트>:<포트번호>/<경로>?<쿼리 문자열>#<해시>
- 프로토콜 : 클라이언트 - 서버가 데이터를 주고 받을 시 사용되는 프로토콜 명
- 호스트 : 흔히 말하는 도메인. 서버의 네트워크 상의 주소
- 포트 : 해당 서버의 어떤 애플리케이션인가를 나타냄(프론트 웹 앱 등). 기본 번호는 80, 80 인 경우 포트번호 생략가능
- 경로 : 리소스 내의 경로
- 쿼리 문자열 : 프론트 <-> 백엔드 요청하면서 주고받는 데이터