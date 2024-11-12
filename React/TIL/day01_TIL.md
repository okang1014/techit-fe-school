## 2장. React 시작하기

### 1. 리액트란

- 페이스북에서 UI 를 구성하기 위해 개발된 자바스크립트 라이브러리
- 화면 구성을 간단하게 해주는 라이브러리

### 2. React 특징

#### SPA 의 단점을 보완하는 기술 도입

**SPA 의 단점**

- 한 페이지 내에서 모든 앱이 동작
  - 데이터가 계속 누적되기 떄문에 변수, 함수 등 데이터 관리가 어려움
  - 오류의 가능성 증가
- 자바스크립트에서 HTML 코드를 생성 - 개발 생산성 저하
- 브라우저의 DOM 을 자주 리렌더링하게 된다면 성능 저하 발생
  - 리렌더링이 불필요한 부분까지 렌더링이 됨

**SPA 의 단점을 보완하는 React 의 특징**

- 컴포넌트 단위로 개발되어 상태 관리가 용이, 전역 상태 관리를 지원하는 서드파티 라이브러리가 많음
- JSX 를 이용하여 HTML 개발 생산성이 높아짐
- 가상 DOM 을 이용하여 성능 저하 최소화, 화면 전체를 리렌더링하는 것이 아니라 상태가 변경된 부분만 리렌더링

#### 컴포넌트 기반 개발

- 화면의 UI 및 기능을 기준으로 컴포넌트 분리, 개발
- 컴포넌트는 자바스크립트 기반으로 개발되어 재사용성이 높음

#### 상태 관리와 단방향 데이터 바인딩

- 각각의 컴포넌트 내부에서 상태 관리 기능 제공
- 전역 상태 관리를 위한 라이브러리(Context API, Redux, MobX, Zustand 등) 사용 가능
- 상태가 변경되면 즉시 뷰(UI, HTML)가 렌더링 됨
  - 개발자가 UI 관리하는 것을 최소화
- 단방향 데이터 파인딩 - 상태(데이터)가 변경되는 경우 화면이 변경
  - view 의 변경은 직접 state 를 변경하지 않음 -> 상태의 관리, 추적, 예측이 용이
  - view 가 state 를 변경하는 방법은 eventHander -> setSatate() 함수로만 변경 가능
  - **전적으로 개발자가 데이터 변경 상태를 제어할 수 있음**

#### 가상 DOM(Virtual DOM)

- 기본 상태를 가지고 있는 Virtual DOM 을 초기에 생성 -> 상태가 변경이 된 경우, 새로운 Virtual DOM 생성
- 두 Virtual DOM 비교 후, 수정된 부분만 리렌더링 진행
  => 메모리에는 실제 브라우저 DOM 과 Virtual DOM 두 개가 존재

### 3. JSX

- JSX 는 자바스크립트 파일 내에 HTML 과 유사한 마크업을 작성할 수 있는 자바스크립트 확장 구문
- React 에서 사용할 목적으로 개발되었지만 필수는 아님

#### JSX 규칙

1. 단일 루트 요소를 반환

- JSX 는 transpile 시 자바스크립트 객체로 변환
- 함수에서는 하나 이상의 객체를 반환할 수 없기 때문에 하나의 자바스크립트 객체로 반환될 수 있도록 루트 태그로 감싸야함

```jsx
// No
return (
  <h1>header</h1>
  <ul>list</ul>
  // 이런 경우 함수는 다수의 객체를 반환할 수 없기 때문에 오류 발생
);

// Yes - 하나의 루트 태그로 감싸는 방법
return (
  <div>
    <h1>header</h1>
    <ul>list</ul>
  </div>
);

// Yes - Fragment 요소 사용
// Fragment 및 </> 는 렌더링 결과에 영향 미치지 않음
return (
  <Fragment>
    <h1>header</h1>
    <ul>list</ul>
  </Fragment>
);

// Yes - Fragment 약어(</>) 사용
return (
  <>
    <h1>header</h1>
    <ul>list</ul>
  </>
);
```

2. 모든 태그는 반드시 닫는 태그가 필요

```jsx
// No - img 태그에 닫는 태그가 없는 경우 오류 발생
return (
  <>
    <img src="/src/assets/example.jpg">
  </>
);

// Yes - 닫는 태그 항상 작성
return (
  <>
    <img src="/src/assets/example.jpg" />
  </>
);
```

3. 요소의 속성명은 camelCase 준수

- 속성명은 HTML 표준 속성명이 아닌 DOM API 스펙에 기반을 둠
  - stroke-width -> strokeWidth
  - onclick -> onClick
  - onkeyup -> onKeyUp

4. 보간법{} 사용 시 표현식 사용 필수

- {} 안에는 변수값, 메서드 리턴값 등 **값으로 평가되는 표현식**만 사용 가능
- if, for 문 등은 사용 불가

```jsx
// if 문 대신 삼항 연산자 사용
{
  item.done ? <s>두부</s> : "두부";
}

// for 문 대신 forEach(), map() 등 사용
{
  forEach((item, index) => {});
}
{
  itemList.map((item) => item.title);
}
```

5. 보간법{} 내부의 HTML 문자열은 인코딩

- {} 내부의 값이 HTML **문자열**인 경우 HTML 태그를 인코딩해서 브라우저에는 태그가 그대로 보여짐

```jsx
const App() {
  const msg = '<i>World</i>';
  return <span>Hello {msg}</span>;
// Hello <i>world</i>
}

// 해결 방법 1
const App() {
  const msg = '<i>World</i>';
  return <span>Hello <span dangerouslySetInnerHTML>{msg}</span></span>;
// Hello world, XSS 공격에는 취약할 수 있음
}

// 해결 방법 2
const App() {
  const msg = <i>World</i>;
  return <span>Hello {msg}</span>;
// Hello world -> JSX 는 XSS 공격에 안전
}
```

## 5. 속성 Props

- 상위 컴포넌트에서 하위 컴포넌트로 데이터를 전달할 때 사용
- 함수에 데이터를 전달할 때 인수를 사용하듯, 컴포넌트에 데이터를 전달할 때 Props 사용
  - JSX 에서 하위 컴포넌트를 HTML 태그(<App />)처럼 사용하는 경우 HTML 태그의 속성처럼 사용
- 하위 컴포넌트에는 상위 컴포넌트가 전달한 여러 속성이 하나의 Props 객체로 전달,
  - 주로 구조 분해 할당을 이용해서 필요한 속성을 바로 꺼내서 사용
- 기본값 매개변수를 사용하면 Props 가 전달되지 않거나 undefined 가 명시적으로 전달될 때 적용
  - null, 0 값은 기본값으로 대체되지 않음
- 자신이 전달받은 Props 전체를 하위 컴포넌트에 전달하고 싶을 때는 전개 연산자 사용(권장 X)

```jsx
function App() {
  const title = "React Props";
  let list = [
    { _id: 1, title: "리그오브 레전드", done: false },
    { _id: 2, title: "영화 보기(집에서)", done: false },
    { _id: 3, title: "던파", done: false },
  ];

  // 하위 컴포넌트(Title 과 TodoList)에서 사용되는 상태, 또는 함수를 props 로 전달 가능
  return (
    <div id="app">
      <div>
        <Title title={title} />
        <TodoList list={list} />
      </div>
    </div>
  );
}

// 상위 컴포넌트에서 아무런 props 가 전달되지 않은 경우, default parameter 처럼 기본값 지정 가능
function Title({ title = "Default Title" }) {
  // 구조 분해 할당으로 상위 컴포넌트로부터 전달 받은 props 객체 내부의 title 값을 추출
  return (
    <div>
      <h1>Simple Todo List - {title} :()</h1>
      <hr />
    </div>
  );
}

function TodoList({ list }) {
  // 구조 분해 할당으로 상위 컴포넌트로부터 전달 받은 props 객체 내부의 title 값을 추출
  const itemList = list.map((item) => {
    return <li key={item._id}>{item.title}</li>;
  });

  return <ul className="todolist">{itemList}</ul>;
}

// spread 연산자로 props 객체 내의 특정 속성을 전달하는 것이 아니라 props 전체를 하위 요소에 전달 가능
// 하지만 예상하지 못한 오류가 발생할 수 있음
// (예: 하위 요소에서 사용하지 않을 props 속성을 사용)
function Profile(props) {
  <>
    <div>
      <Avatar {...props} />
    </div>
  </>;
}
```

- props 로 객체를 전달 받을 때, 전달 받은 값을 변경하는 것은 지양
  - React 데이터는 상위 컴포넌트에서 하위 컴포넌트로 전달, 하위 컴포넌트에서 상위 컴포넌트의 데이터를 직접 수정하는 경우, 데이터의 흐름을 예측하기 어려워짐
  - 디버깅하기 어려운 오류를 만들 수 있음
