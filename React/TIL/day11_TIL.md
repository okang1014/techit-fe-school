2024.11.27.(수)

## 6장. Context API

#### prop drilling 의 한계

- 하나의 상태를 다수의 컴포넌트가 사용할 때 사용
- 컴포넌트 트리에서 부모 컴포넌트의 상태나 데이터를 자식 컴포넌트에 전달할 때 일반적으로 Props 를 사용하지만, 트리의 깊이가 깊어질수록 불편함
  - 동일한 상태나 데이터를 다수의 자식에게 전달하고자 한다면 공통의 부모 컴포넌트에 지정해야함
  - prop drilling 을 통해 실제 상태를 사용하는 컴포넌트에게 전달하기 위해 props 를 해당 상태를 사용하지 않는 상위 컴포넌트에게도 전달하여 전달
  - props 가 변경되거나 새로운 props 가 추가된다면 중간 컴포넌트를 수정해야함
  - 상태가 변경됨에 따라 상태를 사용하는 하위 컴포넌트 외에도 전체 중간 컴포넌트도 리렌더링됨
- 단순 구조의 앱에서는 괜찮지만, 앱의 규모가 커질수록 props 를 전달하는 것이 복잡해지며, 이로 인해 예상치 못한 오류가 발생할 수 있음

#### Context API 사용 이유

- Context API 는 컴포넌트 트리에서 데이터를 효율적으로 전달할 수 있도록 react 에서 기본적으로 제공
- 직접 가장 하위의 컴포넌트에게 Props 를 전달할 수 있어 불필용한 리렌더링을 막고, props 를 많은 중간 컴포넌트를 거칠 필요가 없어짐
- 전역 상태 관리 도구로 Context API 를 사용할 수 있음
  - 모든 전역 상태 관리 시 사용할 수 있는 것은 아님
  - 상태 관리 로직이 복잡해지면 Context API 를 사용하기 어려움

#### 사용 방법

1. Context 객체 생성

- React.createContext() 함수로 객체 생성

2. Provider 컴포넌트 작성

- 상태와 상태 변경 함수를 관리할 컴포넌트 작성
- Context 객체가 제공하는 Provider 컴포넌트를 사용해서 자식 컴포넌트를 렌더링, 이때 Provider 의 value 속성으로 전달할 Context 지정

```jsx
// CounterProvider 컴포넌트

import PropTypes from "prop-types";
import { createContext, useState } from "react";

// Context 객체 생성
const CounterContext = createContext();

CounterProvider.propTypes = {
  children: PropTypes.node,
};

export function CounterProvider({ children }) {
  // 상태
  const [count, setCount] = useState(10);

  // 상태 변경하는 함수
  const countUp = function (step) {
    setCount(count + step);
  };
  const reset = function (step) {
    setCount(0);
  };
  const countDown = function (step) {
    setCount(count - step);
  };

  // 하위 컴포넌트에 전달할 객체
  const values = {
    // 상태 관련 props
    state: { count },
    // 상태 관리 관련 props
    actions: { countUp, reset, countDown },
    hello: "counter",
  };

  return (
    <CounterContext.Provider value={values}>{children}</CounterContext.Provider>
  );
}

// 반환 값 => CounterProvider 컴포넌트 사이에 App 을 삽입하면, App 하위의 컴포넌트가 모두 value 를 사용할 수 있음
// 전역 상태 관리 : 여러 컴포넌트가 사용할 상태를 사용할 수 있도록 just like 보급 창고
// <CounterProvider>
//   <App>
// <CounterProvider>

export default CounterContext;

// App.jsx
function App() {
  // 🚨 CounterProvider 에서 상태 및 상태 관리 함수를 관리하고 있기 때문에 App 에서 상태 관리 불필요

  return (
    <>
      {/* CounterProvider 에서 컴포넌트에서 지정한 value 객체를 불러올 수 있음 */}
      <CounterProvider>
        <Left1 />
        <Right1 />
      </CounterProvider>
    </>
  );
}

export default App;

// 자식 컴포넌트에서 사용
// Left3.jsx
const {state: {count}} = useContext(CounterContext);

// Right3.jsx
const {actions: {countUp, countDown, countReset}};
// 구조 분해 할당을 통해 직접 사용 가능
```

#### Context API 남용 주의!

- props 를 사용하면 어떤 컴포넌트가 어떤 데이터를 사용하는지 파악이 간단하여 데이터 흐름을 명확히 파악할 수 있음
- 반면 Context API 를 사용하면 외부로부터 상태값, 데이터를 받기 때문에 데이터 흐름 파악이 어려움

#### Context API 단점

- useContext() 를 사용하는 컴포넌트는 Provider 에 의존하게 됨으로 재사용이 어려움
- 하나의 Context 에는 하나의 상태만 저장할 수 있음
  - 여러 상태를 관리하기 위해서 객체를 상태로 지정할 수 있지만, 해당 객체의 속성이 변경되는 경우 해당 context 를 구독하는 모든 컴포넌트가 불필요하게 리렌더링됨
  - Context 가 여러개인 경우, 중첩된 provider 구조가 발생할 수 있어 데이터의 흐름 관리가 어려워짐
- 대규모 상태 관리에 적합하지 않음
