2024.11.22.(금)

## 5장. 리액트 라우터

### 5-1. 전통적인 웹의 페이지 이동

#### 최초의 웹 서버 접속

1. 브라우저가 서버에 HTML 문서를 요청
2. 웹 서버는 해당 요청을 분석하고, 필요한 작업을 수행한 후, 클라이언트에게 HTML 응답
3. 브라우저는 웹 서버로부터 받은 HTML 코드 파싱
4. 추가 리소스(CSS, JS 등)는 서버에 추가 요청하여 화면에 렌더링

#### 페이지 이동

5. HTML 파일 내의 a 태그를 통해 화면 이동
6. a 태그 선택 시 현재 화면을 비운 후 1~4의 과정 반복 시행
   즉, 새로운 화면으로 이동하는 것은 꼭 새로고침이 필요한 과정

- 브라우저 주소창에는 새로운 URL 표시
- 이전 URL 은 히스토리에 쌓임
- 히스토리 정보를 이용하여 이전, 다음 페이지 이동

매번 서버로부터 페이지를 받아와서 새로고침하게 되는 경우, 서버의 부하 발생 가능
공통인 부분도 존재하지만 다른 페이지로 이동하는 경우 전체 페이지를 새로고침함

### 5-2. 리액트(SPA) 의 페이지 이동

#### 최초의 웹 서버 접속

1.  브라우저가 서버에 HTML 문서를 요청
2.  웹 서버는 해당 요청을 분석하고, 필요한 작업을 수행한 후, 클라이언트에게 HTML 응답
3.  브라우저는 웹 서버로부터 받은 HTML 코드 파싱
4.  추가 리소스(CSS, JS 등)는 서버에 추가 요청하여 화면에 렌더링

#### 페이지 이동

5. 사용자가 HTML 요소 내의 링크를 클릭하면 4번에서 다운로드 받은 자바스크립트를 이용해 새로운 컴포넌트를 **렌더링**

- 최초로 서버로부터 전달받은 JS 파일에 페이지 렌더링에 필요한 모든 컴포넌트가 포함되어 있음
- 최초 웹 서버에 접속한 후 모든 파일을 다운로드 받았기 때문에 더 이상 웹 서버에 페이지 요청을 보내지 않음
- 브라우저의 주소창에 새로운 URL 을 표시하고 이전 URL 은 브라우저의 히스토리에 쌓이도록 자바스크립트로 구현해야함

### 5-3. 리액트 라우터(react-router-dom)

- 리액트 기반의 라우팅 라이브러리
- 화면에 렌더링하는 컴포넌트와 URI 경로를 동기화하면서 새로운 화면과 흐름을 앱에 추가할 수 있음

주로 브라우저 라우터를 사용

- history API 를 통해 URI 와 UI 동기화
- 브라우저 히스토리 스택 관리로 이전/다음 페이지 이동 가능
- 모든 URI 요청에 대해 초기페이지를 응답하도록 서버 구현 필요
- 일반 웹 앱에 사용하기 적합

주로 별도의 routes.jsx 파일에 필요한 경로를 지정함

```jsx
// routes.jsx
import Page1 from "./Page1";
import Home from "./Home";
import Page2 from "./Page2";
import { createBrowserRouter, Navigate } from "react-router-dom";
// react-router-dom 에서 browser router import
import Layout from "./Layout"; // 공통 레이아웃 지정

// createBrowerRouter 첫번째 인자는 라우팅 규칙 배열
const router = createBrowserRouter([
  {
    // path 는 경로, element 는 연결할 컴포넌트
    // 페이지들을 연관된 기능별로 분류할 수 있음
    // 가장 상위 컴포넌트 Layout 의 자식 컴포넌트는 children 배열로 추가
    path: "/",
    element: <Layout />,
    children: [
      // index 는 기본으로 표시되는 페이지
      // { index: true, element: <Home /> },
      { index: true, element: <Navigate to="/home" /> }, // URI 뒤에 아무것도 없으면 자동으로 home 으로 이동
      { path: "home", element: <Home /> },
      { path: "page1", element: <Page1 /> },
      { path: "page2", element: <Page2 /> },
      { path: "page3", element: <Navigate to="/page1" /> }, // page3 URI 입력 시 page1 이동
      { path: "page4", element: <Page1 /> }, // page4 URI 입력 시 내용물만 Page 1에 해당되는 내용 출력
    ],
  },
]);

export default router;
```

- 가장 상위 컴포넌트 내에 Outlet 컴포넌트를 지정하여, 해당 영역에 하위 컴포넌트들이 삽입될 수 있도록 함

```jsx
function Layout() {
  return (
    <>
      {/* Header 컴포넌트 */}
      <Header />
      {/* routes.jsx 에서 children 에 정의된 컴포넌트들이 Outlet 의 위치에 삽입 됨 */}
      <Outlet />
    </>
  );
}
```

- 각 컴포넌트에 react-router-dom 의 Link 컴포넌트를 import
- html 의 a 태그 대신 Link 태그 사용, href 대신 to="경로" 속성 사용

```jsx
function Header() {
  return (
    <>
      <Link to="/home"></Link>
      <Link to="/about"></Link>
      <Link to="/list"></Link>
    </>
  );
}

export default Header;
```
