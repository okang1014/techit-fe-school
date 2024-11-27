2024.11.25.(월)

## 5장. 리액트 라우터

#### react-router-dom 이 제공하는 Hook

1. useParams

- 현재 페이지의 URI parameter 값을 획득할 때 사용

```jsx
const params = useParams();
const _id = params._id;
```

- useParams() 호출 결과로 URI 의 params 반환

2. useSearchParams

- 검색 결과 페이지의 URI query 문자열(URI 에서 ? 뒤의 문자열)을 획득할 때 사용

```jsx
// 주소창의 query string 을 읽어오거나 설정할 때 사용, URL 에서 ? 뒤의 정보
// /list?keyword=환승&page=3 => 물음표 뒤의 내용을 new URLSearchParams() 객체 반환
const [searchParams, setSearchParams] = useSearchParams();

const params = {
  // url 에서 받은 검색 키워드를 획득하라
  keyword: searchParams.get("keyword") || "", // keyword 가 없으면 기본 화면으로 전달
  // url 에서 받은 페이지를 획득하라
  page: searchParams.get("page") || 1, // page 가 있다면 1페이지를 줌, 그렇지 않다면 1페이지 전달
  limit: 5, // 한 페이지 당 다섯개
};

// searchRef 는 useRef() 훅으로 획득한 input 란의 value
// new URLSearchParams 는 현재 페이지의 쿼리 문자열을 포함한 객체
// setSearchParams 를 통해 새로운 검색 결과 페이지로 이동
setSearchParams(new URLSearchParams(`keyword=${searchRef.current.value}`));
```

- searchParams 는 검색한 결과값의 현재 쿼리 스트링
- setSearchParams 는 검색 결과를

3. useNavigate

- 페이지를 이동할 수 있는 navigate 함수 반환
- navigate 함수의 매개변수에는 이동하고자 하는 페이지의 경로를 지정할 수 있음

```jsx
const navigate = useNavigate();

navigate("/", { state: { from: "/list" } }); // 특정 페이지로 이동
navigate("/list?keyword=hello", { replace: true }); // 가장 마지막의 history 를 첫번째 매개변수로 대체
navigate(-1); // 바로 직전 페이지로 이동
```

4. useLocation

- 요청된 URI 정보를 담고 있는 location 객체 반환
- location 객체 속성:
  - pathnaame: 현재 요청된 경로
  - search: 쿼리 문자열
  - state: navigate() 로 이동할 때 전달된 state 객체
- useParams, useSearchParams, useNavigate 의 내용 전체를 아우르는 훅

5. useOutletContext

- 중첩 라우팅에서 부모가 Outlet 에 삽입되는 컴포넌트에 context 속성으로 props 를 전달

```jsx
// 부모 컨텍스트
<Outlet context={itemList} />;

// 자식 컨텍스트
const itemList = useOutletContext();
// 상위 컴포넌트로부터 전달받는 context props
```

### 5-4. 동적 세그먼트

- URI 파라미터 : URI 경로에 매번 바뀌는 동적인 값이 포함되면 컴포넌트에서는 URI 파라미터를 통해 이 값을 전달받을 수 있음
- 예 : TodoList 에서 특정 할 일을 선택한 경우, 해당 TodoItem 에 해당하는 URI 를 파라미터로 전달

```jsx
// routes.jsx
{path: 'list/:_id', element: <TodoDetail />}
// :_id 는 동적으로 결정되는 값

// TodoListItem.jsx
return (
  <Link to={`/list/${_id}`}></Link>
)
// 해당 Link 태그를 선택하면 id 값에 해당하는 TodoDetail 페이지로 이동

// TodoDetail.jsx
// TodoDetail 컴포넌트에서 useParams() 훅을 사용하여 id 값을 동적으로 지정할 수 있음
const {_id} = useParams();
```

### 5-5. 중첩 라우트

- Route 컴포넌트 내부에 자식 Route 컴포넌트를 포함
- 부모 컴포넌트와 매칭되는 경우 부모 컴포넌트를 렌더링하고 하위 경로가 자식 컴포넌트와 매칭되면 추가적으로 자식 컴포넌트도 렌더링
- 부모 컴포넌트에는 자식 컴포넌트가 렌더링될 영역에 <Outlet /> 컴포넌트 추가

```jsx
// routes.jsx
// list/:_id 에 하위 컴포넌트를 children 으로 지정
{
  path: 'list/:_id',
  element: <TodoDetail/>,
  children: [
    {path: 'edit', element: <TodoEdit/>}
  ]
}

// TodoDetail.jsx
return (
  <div>
  {/* Outlet 컴포넌트에 TodoEdit 컴포넌트 삽입 */}
    <Outlet/>
  </div>
)
```

- index 라우트
  - URI 가 자식 경로와 매칭되지 않는 경우 기본으로 렌더링할 자식 라우트 지정

```jsx
{
  // localhost/
  path: "/",
  element: <Layout />,
  errorElement: <ErrorPage />, // 404 error 발생 시, 에러에 해당하는 컴포넌트로 이동
  children: [
    { index: true, element: <Navigate to="/home" /> }, // / 까지만 입력되고 이후 주소값이 없는 경우, home 으로 이동
    { path: "home", element: <Home /> },
    { path: "about", element: <About /> },
    { path: "list", element: <TodoList /> }
  ]
}
```

### 5-6. Fallback UI 와 404 라우트

#### fallback UI

- 리액트는 SPA(Single Page Application) 개발을 위해 사용되는 라이브러리 이므로 모든 페이지 구성 요소(js, css)가 번들링 된 후 하나의 시작 페이지에 포함됨(index.html)
- 사용자가 시작 페이지부터 순차적으로 리액트 라우트에 의해 라우팅 하지 않고 웹브라우저 주소창에 list/3 처럼 URI를 직접 입력할 경우 서버측에는 list/3 URI가 존재하지 않으므로 일반적으로 404 에러 메세지를 보내지만 SPA를 서비스하는 웹서버라면 모든 URI 요청에 시작 페이지를(index.html) 전송하도록 구성해야 리액트 라우터에 의해 해당 페이지로 라우팅 되는데 이를 fallback UI라고 함

#### vite 기반으로 개발할 경우 서버에 기본으로 fallback UI 가 지정되어 있음

### 5-7. Lazy Loading

- SPA 는 기본적으로 하나의 html, css, js 가 존재, 하나의 페이지에 모든 페이지가 포함되어 있음
- 앱의 규모가 커질수록 css 와 js 의 크기가 커질 수 밖에 없음 => 이에 따른 초기 화면 로딩 지연(SPA 의 단점)
- 사용자가 사용하지 않은 페이지에 대해서도 전체 css 를 로딩하게 됨 -> 성능의 문제가 생김
- 초기 사용되는 js 파일만 로딩하고, 나머지 js 파일은 사용자가 사용하게될 때 서버로부터 전달받음
- React.lazy() 를 활용하면 특정 페이지, 컴포넌트가 필요한 경우 로딩할 수 있음
- 필요한 경우에만 사용, 규모가 큰 경우에 메인 페이지만 로딩 우선적으로 실행, 그리고 추후에 다른 페이지 이동 시 사용.

```jsx
import { lazy } from "react";

const Layout = lazy(() => import("@components/Layout"));
const About = lazy(() => import("@pages/About"));
const ErrorPage = lazy(() => import("@pages/ErrorPage"));
const Home = lazy(() => import("@pages/Home"));
const TodoAdd = lazy(() => import("@pages/TodoAdd"));
const TodoDetail = lazy(() => import("@pages/TodoDetail"));
const TodoEdit = lazy(() => import("@pages/TodoEdit"));
const TodoList = lazy(() => import("@pages/TodoList"));
```

### 5-8. React.Suspense 컴포넌트

- 동적 Import 를 사용하면 해당 컴포넌트가 서버로부터 네트워킹을 통해 가져오기 때문에 지연시간이 발생할 수 있음
- 사용자에게 로딩 중임을 나타내는 적절한 UI 필요
- Suspense 컴포넌트를 통해 구현 가능

```jsx
// App.jsx
import { PulseLoader } from "react-spinners";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {/* <Suspense fallback={<PulseLoader />}> */}
      <RouterProvider router={router} future={{ v7_startTransition: true }} />
    </Suspense>
  );
}
```

## 9장. Ajax

### 9-1. HTTP 통신

#### HTTP 란?

HTTP(HyperText Transfer Protocol)는 웹 브라우저와 웹 서버 간 텍스트 기반으로 데이터를 송수신하기 위한 프로토콜

#### 주요 특징

- TCP 기반 프로토콜
  - 클라이언트와 서버가 연결을 수립한 후 메시지 교환
  - 데이터를 패킷 단위로 전송하며, 수신 측에서 데이터를 검증한 뒤 응답을 보냄
  - 패킷이란 요청을 전송하는 단위이며, 서버에서는 패킷 단위로 전달받은 요청을 검증한 후, 이상이 있는 경우 재요청, 이상이 없는 경우 처리
  - 데이터 누락 시 재전송 요청하여 신뢰성이 높다는 특징을 가짐

추가 정보

- UDP 기반 프로토콜
  - UDP 기반 프로토콜은 클라이언트에서 필요한 요청을 정리하여 한 번에 서버에 요청하는 방식
  - 해당 요청을 정상적으로 전송, 처리했다는 확인 매커니즘 부재
  - 신뢰성이 낮지만 빠름

#### 동작 방식

1. 클라이언트 요청(Request)

- 클라이언트가 HTTP 요청 메시지를 서버로 전송
- 요청에 필요한 자원(URL)이나 작업(method)이 포함됨

2. 서버 응답(Response)

- 서버는 요청을 분석하여 필요한 작업 수행
  - 파일 읽기, DB 조회, 외부 시스템 연동 등
- 작업 결과를 바탕으로 응답 메시지를 생성하여 클라이언트로 전송

3. 웹 브라우저 처리

- 클라이언트는 서버 응답을 받아 파싱한 후 화면에 출력
- 서버 응답을 받은 이후 클라이언트와 서버간의 연결 해제

**장점**

- TCP 기반 프로토콜로 신뢰성이 높음
- 전 세계에서 통용되는 웹 통신 프로토콜로 범용성이 높음

#### HTTP 프로토콜 특징

1. 비연결성 - 연결을 유지하지 않음

- 클라이언트가 요청을 보내고 서버가 응답하면 연결을 해제
- 서버는 요청 정보를 분석하여 적절한 응답을 만드는 데만 집중
- 따라서 서버 구현이 단순

2. 무상태 - 과거 요청 정보 유지 X

- 순수하게 클라이언트 요청 정보만 보고 응답 생성, 클라이언트의 정보, 상태 정보를 유지하지 않음
- 이전 요청 작업 관리하지 않음
- 클라이언트 정보를 저장해야하는 경우, 쿠키, 세션 스토리지, 로컬 스토리지 등 저장 방식 도입

#### 주요 Request Method

Get - 서버로부터 자원을 가져올 때 사용(CRUD 작업 중 Read 에 해당)
Post - 서버로 데이터를 보낼 때 사용(CRUD 작업 중 Create 에 해당)
Put - 서버 데이터 한 건을 전체 항목 수정 시 사용(CRUD 작업 중 Update 에 해당)
Patch - 서버 데이터 한 건 중 일부 수정 시 사용(CRUD 작업 중 Update 에 해당)
Delete - 서버 데이터 한 건을 삭제 시 사용(CRUD 작업 중 Delete 에 해당)

### 9-2. Ajax

#### Ajax 란?

- Ajax(Asynchronous JavaScript and XML)는 클라이언트와 서버 간 비동기 통신 기법
- 자바스크립트로부터 HTTP 요청을 보내고 응답을 받아 처리하는 방식
- 페이지 이동이나 새로고침 없이 서버에 요청을 보내고 DOM API 를 이용해 화면 갱신

#### XMLHttpRequest 객체

- 서버에서 HTTP 요청을 만들고 전송할 수 있는 자바스크립트 객체

```js
function getTodoList(callback) {
  // 새로운 XMLHttpRequest 객체 생성
  const xhr = new XMLHttpRequest();
  // Ajax 통신 후 실행될 콜백 함수, onload 이벤트
  xhr.onload = () => {
    const data = xhr.responseText;
    const jsonData = JSON.parse(data);
    callback(jsonData);
  };
  // XHR 객체 내에 request method, 서버 URL, 비동기 통신 여부 매개변수로 전달
  xhr.open("GET", "https://example.com/todolist", true);

  // XHR 요청 전송
  xhr.send();
}
```

#### fetch API

- ECMAScript 6 에 추가된 HTTP 클라이언트
- Promise 기반 설계
- XMLHttpRequest 를 대체할 수 있는 표준 API
- 단점 :
  - 응답 객체에서 본문을 바로 꺼낼 수 없고, JSON 이나 다른 데이터 타입으로 파싱 필요
  - 네트워크 에러를 제외한 HTTP 응답 에러에 대해 오류 발생 불가, 별도 처리 필요

```js
async function getTodoList() {
  try {
    const response = await fetch("http://example.com/todolist");
    if (response.ok) {
      // 응답 데이터가 정상 수신되었을 때, 응답 데이터를 JSON 으로 변환하는 작업
      const jsonData = await response.json();
      return jsonData;
    } else {
      // 404 같은 HTTP 응답 오류에 대한 처리
    }
  } catch (err) {
    // 네트워크 에러 처리
  }
}
```

#### Axios 라이브러리

- Node.js 와 브라우저에서 사용 가능한 Promise 기반 HTTP 클라이언트
- XMLHttpRequest 객체를 기반으로 동작, 호환성 높음
- 인터셉터 기능 제공
- JSON 형태로 응답 데이터 자동 파싱
- timeout 설정 가능

```js
async function getTodoList() {
  try {
    const response = await axios.get('https://example.com/todolist');
    return response.data;
  } cactch(err) {
    // 네트워크 에러나 HTTP 응답 에러 처리
  }
}
```
