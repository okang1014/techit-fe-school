2024.11.28(목)

## 7장. 전역 상태관리

#### 리액트의 상태 관리

- useState 또는 useReducer 훅을 사용하여 컴포넌트 내부의 상태를 관리할 수 있음
- 상태가 변경되면 해당 컴포넌트가 리렌더링
- 하지만 useState 와 useReducer 는 컴포넌트 내부의 상태만 관리, 다른 컴포넌트와 상태를 공유할 수 없음

#### 전역 상태 관리란?

- 앱 전반에서 사용되는 상태를 관리하거나, 여러 컴포넌트가 상태를 공유하고, 해당 컴포넌트의 상태를 변경하는 경우, 상태를 사용하는 모든 컴포넌트가 리렌더링 되도록 하는 상태관리
- 앱 전반적으로 사용하는 상태를 관리하기 위한 매커니즘이 필요하지만 직접 구현 및 관리가 어렵기 때문에 라이브러리를 사용
- 대표적인 전역 상태 관리 라이브러리
  - Redux : 전역 상태 관리 라이브러리의 끝판왕, 오래된 라이브러리이지만 가장 범용적, 주로 규모가 큰 앱의 전역 상태 관리를 하는 경우 사용
  - Context API : 리액트 표준 라이브러리
  - Recoil, Zustand : 리액트 전용 라이브러리
- 라이브러리 선택 시 고려 사항
  - 범용성 : 사용률이 높은 경우, 관련 정보가 많음
  - 용이성 및 편의성 : 라이브러리를 사용하는 주체는 결국 개발자, 사용하기 용이한 것이 중요

#### 사용 사례

1. **인증 상태 관리(로그인)**

- 로그인 여부에 따른 사용자 정보를 전역 상태로 관리
- 로그인 상태에 따라 컴포넌트 UI 렌더링
- API 호출 시 인증 토큰 참조

2. 테마 및 환경 설정

- 다크 모드, 폰트 크기, 언어 등 전역 설정

3. 쇼핑 카트 관리

- 상품 추가, 삭제 시 카트의 항목 상태로 관리

4. 알림 및 메시지 관리

5. API 상태 및 캐싱

- 서버 데이터를 어딘가에 저장할 때
- 필요한 정보를 캐싱할 때

6. 멀티 스텝 폼 데이터

- 단계별 데이터를 입력하는 경우 사용
- 회원가입, 회원 정보 설정 등

### 1. Redux

사용하기 어려운 라이브러리임이 분명하다
하지만 범용적으로 사용되고 있기 때문에 숙지하는 것이 좋음
미래 필요한 경우, 추가 학습을 통해 완벽히 이해할 수 있도록!

#### Redux 란

- 대표적인 상태 관리 라이브러리
- 원래는 JS 앱의 상태 관리를 위한 라이브러리, 하지만 주로 React 와 함께 사용
- 컴포넌트 간 상태 공유 단순화 및 상태 관리 예측 가능성을 높일 수 있음(store 에 상태, 상태 변경 내역 등 저장)
- Flux 아키텍쳐를 기반으로 한 라이브러리, 복잡한 상태 관리 단순화 가능

#### Redux 특징

- 중앙 집중식 관리 - 앱 상태 전체를 한 곳에서 관리
- 예측 가능성 - 순수 함수 사용을 통해 같은 입력은 같은 출력 보장
- 단방향 데이터 흐름 - 리액트의 상태 변화 흐름과 동일
  - 컴포넌트에서 이벤트 발생 -> 액션(작업 정의) -> 리듀서(상태 관리) -> 스토어(상태 저장) 한 방향의 흐름
  - 상태가 변경되면 해당 상태를 사용하는 모든 컴포넌트 리렌더링

#### Redux 사용 사례

- 대규모 앱에서 전역 상태 관리가 필요한 경우
- 상태 변경 추적, 디버깅, 테스트가 중요한 프로젝트

#### Flux Architecture

- 웹 앱을 만들 때 사용하는 설계 패턴
- 단방향 데이터 흐름을 관리해 앱 구조 단순화
- React 와 사용하면 데이터 흐름을 명확히 하여 UI 컴포넌트 관리 용이

**Store**

- 앱의 상태와 상태를 변경하는 로직을 관리
- 상태를 직접 수정하지 않고 항상 새 상태를 만들어냄 - 순수함수의 특성을 유지하기 위함

**Views**

- store 의 상태를 UI 로 보여줌
- 사용자의 액션을 통해 Action 을 실행할 수 있는 환경 제공

**ActionCreators**

- actionCreator 에는 해야할 작업과 작업에 필요한 데이터가 포함
- 상태를 변경하기 위한 주요 로직 처리
- 처리 결과를 Action 으로 만들어 Dispatcher 로 전달

**Action**

- Store 의 상태를 어떻게 바꿀지에 대한 정보가 담긴 객체
- Dispatcher 를 통해 Store 로 전달되어 상태 변경 유도

**Dispatcher**

- 데이터를 전달하는 하나의 통로
- 모든 액션은 스토어에 전달되기 전에 Dispatcher 를 통과
- 모든 상태 변화 관련 로그는 dispatcher 에서 확인 가능

#### Redux 구성 요소

- Redux 의 store 는 상태만 저장, 상태 변경 로직은 Reducer 에 저장, 구현
- View 는 컴포넌트를 표시, 사용자 액션이 발생하면 ActionCreator 호출하여 action 객체 생성
- Action 은 store 로 전달, store 에서는 action 객체를 reducer 에 전달, 처리, 상태를 바탕으로 새로운 상태를 만들어서 변경된 상태를 store 에 전달하여 해당 상태를 바탕으로 view 를 리렌더링
- Store 에는 상태 및 변경된 상태 기록이 저장되며, 디버깅 시 store 에서 확인 가능

**Redux 단점**

- 초기 설정의 복잡성
- 코드의 양
- 규모가 작은 앱에 사용하기에는 오버스펙

### 2. Redux-Toolkit

- Redux 공식 권장 툴킷
- Redux 보다 사용이 간단하고, 기본적인 보일러플레이트 코드 제공
- ActionCreator 와 reducer 을 결합한 라이브러리

### 3. Recoil

- 페이스북에서 만든 상태 관리 라이브러리
- 내부적으로 Context API 사용
- Immer 등 별도의 라이브러리를 사용하여 상태의 불변성을 유지하도록 해야함

#### RecoilRoot

- 상태 관리가 필요한 컴포넌트를 RecoilRoot 태그로 감싸서 하위 컴포넌트가 atom 에서 지정한 상태를 사용할 수 있게 함

```jsx
function App(){
  return (
    <>
      <RecoilRoot>
        <ChildComponents>
      </RecoilRoot>
    </>
  )
}
```

#### Atom

- 공통의 기본 상태를 atom 에 정의
- RecoilRoot 에 의해 감싸진 컴포넌트들은 atom 에 정의된 기본 상태값을 사용 가능
- Atom 에는 atom 을 식별할 수 있는 식별자와 해당 식별자의 기본 상태값을 지정해야함

```js
export const counterState = atom({
  key: "count", // atom 을 식별하는 식별자
  default: 8, // 기본 상태값
});
```

- 상태값만 사용하고자 하는 컴포넌트에서는 useRecoilValue(counterState) 를 통해 상태값을 사용할 수 있음

```js
// 상태값 사용
const count = useRecoilValue(counterState);
```

- 상태값을 변경하는 컴포넌트에서는 useSetRecoilValue(counterState) 를 통해 상태값 변경 가능
- useRecoilValue 로 생성된 setter 함수는 내부적으로 이전값을 사용할 수 있음

```js
// 상태값 변경
const setCount = useSetRecoilValue(counterState);
const countUp = (step) => {
  setCount((count) => count + step); // count 는 이전의 상태값(개발자 지정 식별자)
};
```

- 상태값을 읽고 쓰기 위해서는 useRecoilState 훅 사용

#### Selector

- Atom 이나 다른 selector 를 통해 읽은 상태값을 기반으로 가공된 값을 반환
- 컴포넌트가 selector 를 통해서 읽을 경우, 현재 상태값을 기반으로 가공된 값으로 사용 가능
- selector 는 atom 값이 변하지 않으면 언제나 같은 값을 반환하는 순수 함수로 만들어야함

### 4. Zustand

- Context API 나 Provider 없이 훅 기반 API 를 통해 상태 관리 가능
- 직관적인 설계와 빠른 성능
- 소규모 앱 전역 상태 관리에 적합

```js
// 전역 상태로 관리하고자 하는 상태 + 상태값 변경 로직
// create 에는 setter 와 getter 를 매개변수로 갖고, 객체를 반환하는 함수를 전달
const useCounterState = create((set, get) => ({
  // 기초 상태 값
  count: 6,

  // get 함수를 통해서 기초 상태값을 추출, step 만큼 더해서 newState 에 대입, set 함수를 통해서 새로운 상태값으로 변경
  countUp: (step) => {
    const newState = { count: get().count + step };
    set(newState);
  },
  countDown: (step) => {
    const newState = { count: get().count - step };
    set(newState);
  },
  countReset: () => {
    const newState = { count: (get().count = 0) };
    set(newState);
  },
}));
```

#### Store

- 커스텀 훅과 동일하게 사용
- Store 를 사용하는 컴포넌트는 자동으로 Store 를 구독

```jsx
// 상태값을 사용하는 컴포넌트
const { count } = useCounterState();

// 상태값을 변경하는 컴포넌트 -> 함수로 전달
// 렌더링 최적화를 위해 필요한 부분만 지정, state 객체를 전달하고, state 내부의 countUp 만 반환하도록 지정
const countUp = useCounterState((state) => state.countUp);
const countDown = useCounterState((state) => state.countDown);
const countReset = useCounterState((state) => state.countReset);
```
