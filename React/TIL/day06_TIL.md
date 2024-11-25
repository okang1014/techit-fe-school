## 3장. 리액트 훅

### 3-3. useEffect

- 컴포넌트의 생명주기 이벤트를 등록하기 위한 hook
- 클래스 기반 컴포넌트에서 컴포넌트 생명주기에 따른 10개의 메소드 중 componentDidMount(), componentDidUpdate(), componentWillUnmout() 를 오버라이드해서 구현
- 순수 함수가 아닌 함수를 useEffect 내부에서 실행함으로써 컴포넌트가 순수 함수의 특징을 갖도록 함 (예: API 를 통해 서버의 데이터를 불러오는 경우)
- 그러기 위해 우선 최초 렌더링 실행 후 useEffect 내부의 함수 실행 -> 컴포넌트의 순수 함수 유지 가능

#### API

```jsx
useEffect(setup, dependencies?);
```

#### 매개변수

- setup: 컴포넌트가 마운트, 업데이트, 제거될 때 호출되는 함수
  - mount 될 때, 또는 업데이트될 때 호출
  - setup 함수가 함수를 리턴할 때, 반환된 함수를 cleanup 함수라고 부르며, 컴포넌트가 업데이트되거나 언마운트될 때 호출됨
  - cleanup 이 먼저 실행되고, 실행이 완료된 이후 unmount 되며, 그 이후에 setup 함수가 mount 됨
- dependencies(선택): 의존 객체 배열
  - setup 함수는 컴포넌트가 최초 로딩될 때와 업데이트 될 때 실행
  - dependencies 지정에 따라 setup 함수가 호출될 시기를 지정할 수 있음
  - dependencies 생략 시, 마운트 시와 업데이트 시 setup 함수 호출
  - dependencies 에 빈 배열 지정 시 업데이트 될 때는 setup 호출되지 않고, 최초 마운트 시에만 호출
  - dependencies 에 특정 상태값 지정 시, 해당 state 값이 변경되는 경우에만 setup 함수 호출

**순수 함수**

- 외부 데이터로 인해 부수효과가 발생하지 않는 함수
- 함수의 실행 결과가 매번 동일한 결과를 반환

### 3-4. useReducer

- useState 와 동일하게 상태 관리를 위해 사용
- useState 보다 더 복잡한 상태관리를 하는 경우 주로 사용
- 상태 관리가 필요하지만 하나의 컴포넌트 내에 포함하는 경우, 컴포넌트의 구조가 복잡해지는 경우, 또는 다수의 컴포넌트에서 하나의 복잡한 상태를 관리하는 경우 사용됨
- 상태 관련 로직을 가지고 있는 훅
- state 값은 불변성이 있어야 상태 변경 내역을 추적할 수 있음
- useReducesr 는 순수 함수여야 함
- 리듀서를 사용하여 앱 전역 수준의 상태를 관리하는 라이브러리가 Redux

#### API

```jsx
function Reducer(state, action) {...}
const [state, dispatch] = useReducer(Reducer, initialArg, init);
```

#### 매개변수

- Reducer : state 와 action 을 인자로 받아 새로운 state 를 반환하는 함수
  - state : Reducer 에 전달되는 상태값
  - action : dispatch 에 전달한 인자값, 수행할 작업의 종류와 필요한 인자값을 포함한 객체
- initialArg : 초기 상태로 지정할 값(useState() 의 최초 state 와 유사)
- init(선택) : initialArg 를 인자로 받고, 리턴한 값이 초기 상태로 지정되는 함수

#### 리턴값

- state : 상태값이 저장된 getter
- dispatch : 상태값을 변경하는 setter 함수, dispatch 에 전달한 인자값이 reducer 의 두 번째 인자값으로 전달됨, (useState() 의 setState 함수와 비슷한 역할)

#### useState vs. useReducer

1. 코드 크기

- useReducer 를 사용하면 reducer 함수와 dispatch 액션을 작성해야하기 때문에 기본적으로 코드의 크기가 useState 보다 커짐
- 여러 이벤트 핸들러가 비슷한 상태 관리 로직을 가지고 있다면 reducer 함수에 공통으로 작성해서 코드를 줄일 수 있음

```jsx
// counterReducer 함수 - setter 함수가 됨
function counterReducer(state, action) {
  // Counter 에서 counterReducer 를 호출할 때 count 상태, action{type: 'UP', 그리고 value: 1 를 전달}
  // 현재 상태로 지정한 동작을 하도록 지시
  let newState; // 새로운 상태

  // case 이름은 개발자 작성 코드
  switch (action.type) {
    case "DOWN":
      newState = state - action.value;
      break;
    case "UP":
      newState = state + action.value;
      break;
    case "RESET":
      newState = 0;
      break;
    default:
      newState = state; // 아무것도 전달받지 않는 경우, 기존의 상태값 지정
  }

  return newState;
}

// counterReducer 를 useReducer 훅을 통해 사용
function Counter({ children = "0" }) {
  console.log("Component Rerender");
  const initCount = Number(children);

  const [count, countDispatch] = useReducer(counterReducer, initCount); // useReducer 훅 사용, 첫 번째 매개변수는 state 를 변경하는 함수, 두 번째 매개변수는 초기 상태값
  // counterReducer 는 setState 처럼 직접 호출해서 상태 변경을 하지 않음
  // countDispatch 는 내부적으로 counterReducer 를 호출
  // 컴포넌트 내에서는 상태 관리 action 만 reducer 에 전달
  const [step, setStep] = useState(1);

  const handleDown = () => {
    // setCount(count - step);
    countDispatch({ type: "DOWN", value: step });
  };

  const handleUp = () => {
    // setCount(count + step);
    countDispatch({ type: "UP", value: step });
  };

  const handleReset = (event) => {
    // setCount(initCount);
    countDispatch({ type: "RESET", value: initCount });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      console.log(new Date());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [step]);

  return (
    <div id="counter">
      <label htmlFor="step">증감치</label>
      <input
        id="step"
        type="number"
        style={{ width: "40px" }}
        value={step}
        onChange={(e) => setStep(Number(e.target.value))}
      />
      <Button type="button" color="red" onClick={handleDown}>
        -
      </Button>
      <Button type="button" onClick={handleReset}>
        {initCount}
      </Button>
      <Button type="button" color="blue" onClick={handleUp}>
        +
      </Button>
      <span>{count}</span>
    </div>
  );
}
```

2. 가독성

- 상태 관리 로직이 복잡하고 여러 이벤트 핸들러에서 비슷한 로직을 사용해야 한다면 useReducer 에서 상태 변경 로직을 집중시키고 컴포넌트와 분리하면 컴포넌트를 단순화할 수 있음

3. 디버깅

- useState 는 상태 변경 도중 오류가 발생하면 여러 이벤트 핸들러를 확인해야 함
- 반면 useReducer 는 상태 변경 로직이 한 곳에 있기 때문에 디버깅이 편함

4. 테스트

- reducer 함수는 독립적인 순수 함수이기 때문에 별도의 테스트 가능

### 3-5. useRef

- 컴포넌트가 리렌더링되어도 기존 상태값을 유지하는 변수를 생성하는 훅
- 함수 내부에 정의하는 지역 변수는 컴포넌트가 리렌더리되면 값이 초기화됨
- useState 는 값이 변경되면 컴포넌트 리렌더링, useRef 는 값이 변경되어도 컴포넌트가 다시 렌더링되지 않음
- 태그에 ref 속성을 추가하면 브라우저 DOM 엘리먼트에 접근 가능
  - focus(), 미디어 재생, 애니메이션 실행 등 작업은 useRef 를 통해 DOM 에 직접 접근, 제어
- defaultValue 속성으로 초기값 지정
- 브라우저에서 입력값을 관리하는 비제어 컴포넌트를 구현
- input 값이 변경 되어도 리렌더링 될 필요가 없을때, 리렌더링이 되지 않으므로 성능 최적화

#### API

```jsx
const ref = useRef(initialValue);
```

#### 매개변수

- initialValue : 초기값

#### 리턴 값

- current 라는 상태값 또는 DOM 요소가 있는 속성 하나가 정의된 객체
