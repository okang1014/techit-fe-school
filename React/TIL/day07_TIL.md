2024.11.21.(목)

## 3장. 리액트 훅

### 3-6. useMemo

- 지정된 함수의 실행 결과값을 내부에 저장하는 함수

#### API

```jsx
const calculateValue = function() {...} // 결과값을 저장하고자 하는 함수
const cachedValue = useMemo(calculateValue, dependencies)
```

#### 매개변수

- calculateValue : 캐싱할 값을 계산하여 반환하는 순수 함수
- depenedencies : 의존 객체 배열
  - 계산 결과에 영향을 주는 calculateValue 함수의 매개변수 값
  - 이 배열의 값이 하나라도 변경되면 calculateValue 함수 재호출, 변경되지 않으면 저장된 결과값을 반환
  - 빈 배열을 지정하면 의존성이 없으므로 매번 캐시된 값을 반환

#### 리턴값

- calculateValue 함수에 dependencies(인자)를 전달하여 실행한 결과값을 반환
- 만일 dependencies 가 변경되지 않으면 캐시된 결과를, 변경된 경우 calculateValue 에 변경된 dependencies 를 전달하여 실행한 결과값 반환

### 3-7. React.memo

- 컴포넌트를 memoize 한 후, 리렌더링 될 때 props 가 변경되지 않으면 memoize 된 컴포넌트 반환
- 컴포넌트 내의 상태값이 변경되는 경우, 전체 컴포넌트가 다시 실행, 리렌더링 실행
- React.memo 를 통해 컴포넌트를 memoize 하는 경우, 상태 변경으로 인해 리렌더링되는 부분만 렌더링되고, 이외 부분(props 가 변하지 않았다는 전제 하에)은 리렌더링되지 않고, 저장된 컴포넌트가 출력

#### API

```jsx
const MemoizedComponent = React.memo(SomeComponent, arePropsEqual?);
```

#### 매개변수

- SomeComponent : memoize 하고자 하는 컴포넌트
- arePropsEqual(선택) : memoize 된 컴포넌트를 반환할지, 다시 호출할지 결정하는 함수
  - 컴포넌트의 이전 prop & 새로운 props 인자로 받음(이전 prop 과 새로운 prop 일치 비교)
  - true 인 경우 memoize 된 컴포넌트 반환, false 인 경우 컴포넌트 다시 호출

#### 리턴값

- memoize 된 SomeComponent(props 가 변경되지 않은 경우)

### 3-8. useCallback

- 컴포넌트 내부에 선언된 함수를 캐싱
- 컴포넌트가 리렌더링되는 과정에서 컴포넌트 내에 선언되는 함수는 항상 새로운 함수이기 때문에 리렌더링됨
  - 함수도 객체의 일종이기에 동일한 함수 내용을 갖지만 메모리 주소가 다르게 됨, 결국 새로운 함수 생성
- 부모 컴포넌트(함수가 선언된 컴포넌트)가 재호출되어도 기존 함수 유지
- props 가 변경되는 경우 리렌더링됨

#### API

```jsx
const cachedFunction = useCallback(function, dependencies);
```

#### 매개변수

- function : 캐싱될 함수
- dependencies : 의존 객체 배열
  - 캐싱된 함수에서 컴포넌트의 변수를 사용할 경우, 함수 생성 당시의 값을 참조(클로저)하고 있기 떄문에 이 값이 바뀌면 함수도 다시 생성됨, 해당 값을 의존성으로 지정하면 의존성이 변경될 때마다 새로운 함수 생성, 반환
  - 빈 배열 지정 시 매번 캐시된 함수 반환

#### 리턴값

- 최초에는 function 함수를 반환, 그 이후 의존성 변경 여부에 따라 변경되었다면 새로운 함수를, 변경되지 않았다면 캐시된 함수 반환

### useMemo vs React.memo vs useCallback

- useMemo : 함수를 인자로 전달하여 함수가 실행된 결과값을 캐싱
- React.memo : 컴포넌트를 인자로 전달하여 컴포넌트가 캐싱
- useCallback : 컴포넌트 내부의 함수를 인자로 전달하여 해당 함수가 캐싱

### 3-9. Custom Hook

- 리액트 내장 훅은 컴포넌트에서만 사용되는 특수한 함수
- 리액트 내장 훅은 일반 함수에서 사용할 수 없음, 컴포넌트 내부에서만 사용 가능
- 일반 함수 내에서 사용하기 위해서는 리액트 내장 훅을 포함한 커스텀 훅을 작성해야함
