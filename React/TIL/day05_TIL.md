## 2장. React 시작하기

### 5. props 유효성 검증(추가)

#### prop-types

- 유효성 검증 라이브러리
- 컴포넌트에 전달된 Props 의 유효성을 검증하는 기능
- props 의 타입 및 필수 여부 검증
- 컴포넌트가 props 를 사용하면서 발생할 수 있는 오류 예방 가능

```jsx
import PropTypes from 'prop-types';
// prop-types 라이브러리에서 PropType import

function TodoItem({item, toggelDone, deleteItem}) {
  return ()
}

// propTypes 를 통해 TodoItem 이 전달받는 props 의 type 정의
// isRequired 는 필수 props 이며 없는 경우, 오류 발생
TodoItem.propTypes = {
  // item: PropTypes.object, // item props 자체를 object 타입으로 지정
  // PropTypes.shape 로 하위 props 의 타입을 더 세분화해서 지정 가능
  item: PropTypes.shape({
    _id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    done: PropTypes.bool,
  }).isRequired,
  toggleDone: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
};
```

### 6. 컴포넌트 구분

- 컴포넌트를 담당 기능을 기준으로 분류하는 방법
- 표현 컴포넌트와 컨테이너 컴포넌트로 분류
- 표현 컴포넌트는 주로 UI 를 렌더링하는 컴포넌트
  - 컨테이너 컴포넌트의 자식 컴포넌트로 주로 사용
  - UI 반환에만 치중
- 컨테이너 컴포넌트는 비즈니스 로직과 상태 관리를 목적으로 하는 컴포넌트
  - 최소한의 UI 렌더링과 기능 및 상태관리 위주의 기능을 목적으로 함
  - prps 를 통해 상태 및 기능을 하위 컴포넌트에 제공
  - 필요한 데이터와 동작을 제공

**장점**

- UI 와 기능 및 상태를 분리하여 관리 가능
- 상태 추적과 디버깅이 용이해짐

## 4장. 클래스 컴포넌트와 컴포넌트의 라이프 사이클

- 컴포넌트 생성 방식에 따라 함수형 컴포넌트와 클래스형 컴포넌트로 나뉨
- 16.8 버전 이전에는 라이프 사이클에서의 세부 조정은 클래스 컴포넌트로만 가능
- 16.8 버전 이후, 함수형도 useEffect 라는 hook 이 추가되어 클래스 컴포넌트와 동일하게 라이프 사이클에서의 세부조정이 가능하게 됨
- 함수형 컴포넌트에 비해 상대적으로 구조가 복잡하여 함수형 컴포넌트가 일반화 되고, 클래스 컴포넌트가 잘 사용되지 않게 됨

### 컴포넌트 라이프 사이클

#### 1. mounting

- 컴포넌트가 처음으로 DOM 에 추가되고 렌더링되는 단계
- 상태와 속성이 초기화됨

1-1. constructor()

- 컴포넌트 생성 시 호출
- 필요한 경우 super(props) 를 호출하여 this 클래스를 참조할 수 있도록 함
- 상태를 초기화하는 코드 작성
- 상태를 초기화할 필요가 없으면 생성자를 작성할 필요 없음

```jsx
constructor(props) {
  super(props);
  this.state = {count: 0}
}
```

1-2. static getDerivedStateFromProps(props, state)

- 부모 컴포넌트로부터 전달받은 속성으로 상태를 업데이트할 때 사용
- mounting 단계, update 단계에서 둘 다 사용
- props 나 state 값에 의해 업데이트되는 새로운 state 를 반환하도록 작성
- 일반적으로 props 가 state 에 영향을 주는 경우가 많지 않아 잘 사용되지 않음

1-3. render()

- JSX 로 화면을 리턴

1-4. componentDidMount() (함수형 컴포넌트에서는 useEffect 사용)

- 컴포넌트 마운트 완료, 브라우저 DOM 트리에 반영된 후 호출
  - 컴포넌트가 렌더링되어 화면에 보이기 직전에 호출되는 메서드

#### 2. updating

- mount 된 컴포넌트의 상태나 속성이 변경되어 리렌더링 되는 단계

2-1. static getDerivedStateFromProps(props, state)

- 1-2 와 동일한 방식으로 작동

2-2. shouldComponentUpdate(nextProps, nextState)

- 렌더링 진행 여부 결정하는 단계
- true 가 반환되는 경우 render 호출, false 반환 시 render 진행하지 않음
- 인자로 전달되는 nextProps, nextState 와 이전값 this.props, this.state 비교를 통해 렌더링 여부를 결정할 수 있음

2-3. render()

- 1-3 과 동일

2-4. getSnapshotBeforeUpdate(prevProps, prevState)

- render() 메서드가 호출되고 가상 DOM 으로 쓰기 완료되어 브라우저 DOM 에 출력되기 전에 호출
- 이 메서드의 반환값이 2-5 단계의 세번째 인자로 전달

2-5. componentDidUpdate(prevProps, prevState, snapshot) (함수형 컴포넌트에서는 useEffect 사용)

- 브라우저 DOM 업데이트 완료 후 실행
- 현재 속성 this.props, this.state 와 이전 값 prevProps, prevState 가 다르다면 외부 API 호출 등의 작업 수행
- 2-4 의 리턴값이 세번째 인자 snapshot 으로 전달되기에 2-4 와 함께 사용됨

#### 3. unmounting

- 컴포넌트가 DOM 에서 제거되는 단계
  3-1. componentWillUnmount (함수형 컴포넌트에서는 useEffect 사용)
- 컴포넌트가 앱의 컴포넌트 트리에서 삭제되기 전에 실행
- 주로 1-4 componentDidMout() 와 함께 사용
  - 웹소켓 사용 경우, 1-4 에서 연결, 3-1 에서 해제
  - setTimeout() 을 해제하기 위해 clearTimeout() 호출

#### Life cycle 메소드가 두 번씩 호출되는 이유

- Vite 로 프로젝트 생성 시 만들어지는 main.jsx 에 의해 strict 모드로 동작하며 개발 모드에서만 동작
- 테스트 목적으로 두 번 출력
- 라이프사이클 메소드 내에서 발생할 수 있는 상태 관련 버그를 체크할 수 있도록 의도적으로 strict 모드에서 두번씩 렌더링함
  - 순수 함수 여부 확인을 위해 컴포넌트를 추가 렌더링
  - 클린업 누락 여부를 체크하기 위해 Effect 추가 실행
  - 더 이상 사용되지 않는 API 를 사용할 경우 경고 표시
- 리액트의 모든 컴포넌트는 순수 함수임을 가정하기 때문에 동일한 입력에 대해 동일한 출력을 반환해야함

## 3장. 리액트 훅

### 3-1. 리액트 훅이란?

- 리액트 훅이란 컴포넌트가 렌더링되는 동안에만 사용할 수 있는 특별한 함수
- 16.8 버전에 추가된 기능
- 훅을 사용하면 클래스 컴포넌트에서만 가능했던 상태관리와 생명 주기 이벤트를 함수형 컴포넌트에서도 사용할 수 있게 됨
  - useState(상태 관리)와 useEffect(생명 주기 이벤트)
- 함수형 컴포넌트는 활용도가 증가, 코드가 클래스 컴포넌트보다 간결하고 용이해 함수형 컴포넌트 사용이 일반화됨

### 3-2. useState

- 상태값을 추가하기 위한 훅
- 초기 상태값을 지정하는 훅

#### API

```jsx
const [state, setState] = useState(initialValue);
```

#### 매개변수

- initialState : 상태값의 초기값이며 최초 렌더링 이후에는 무시된다.

#### 리턴값

- state : 저장된 상태값, 최초에는 initialValue 가 저장되어 반환, 이후 setter 함수를 통해 state 값 변경 => UI 리렌더링
- setState : 상태값을 변경하는 setter 함수
  - setter 함수를 통해 상태가 변경되면 해당 컴포넌트는 리렌더링
