## 2장. 리액트 시작하기

### 4. State(계속)

#### 4-2. 상태가 복합 객체인 경우

- 초기 상태값이 객체인 경우, 기존의 상태 객체를 복사해서 새로운 객체로 생성해야지 React 에서 상태 변경을 감지하고 리렌더링 진행
- 하지만 복합 객체의 경우, 가장 바깥쪽의 객체를 복사해도 내부의 객체, 배열의 메모리 주소는 초기 상태값의 주소와 동일
  => 초기 상태에서 새로운 상태로 변경된 것이 아님. 즉, 최초 상태값의 가장 바깥쪽 객체의 주소만 변경된 상태이며, 내부는 변경된 상태나 초기 상태값이나 동일
- 복합 객체의 끝단에 어떤 속성을 변경한다는 것은 결국 해당 속성의 부모 속성도 모두 새로운 객체로 수정해야함
- 단순히 setter 함수로 상태를 변경하는 것은 리렌더링은 진행되지만, **상태는 계속해서 변하는 상태이며 즉 상태의 불변성을 지키는 것이 아니다!**
- 상태의 불변성을 지키기 위한 추가 작업이 필요하다

**방법 1. 상태가 변경되는 속성을 포함하는 객체를 모두 새로운 객체로 복사**

- 수정된 속성을 포함하는 상위 객체를 모두 수정
- 오류의 가능성이 높아지고, 디버깅이 어려워짐
- 추가적인 구조가 함께 변경되면 구조가 복잡해짐

```jsx
// user > extra > addressBook > address 배열
// map 메소드를 사용하여 address 배열의 id 와 event.target.name 이 일치하는 경우(상태가 변경된 경우), address 배열의 값을 복사, 그리고 변경된 속성의 값을 변경
const newAddressBook = user.extra.addressBook.map((address) => {
  if (address.id === Number(event.target.name)) {
    return { ...address, value: event.target.value };
    // 변경한 주소 값을 꺼내서 변경된 객체의 value 를 수정
    // 필요한 부분만 수정해서 새로운 객체를 반환
  } else {
    return address;
    // 상태 변경이 없는 경우 원본 객체 그대로 반환
  }
});

// user 객체 전체를 새로운 객체로 복사, setter 함수로 상태 변경 지정
const newState = {
  ...user,
  // extra 객체 전체를 새로운 객체로 복사
  extra: {
    ...user.extra,
    // addressBook 배열 내의 속성이 변경된 경우, 변경사항 반영
    addressBook: newAddressBook,
  },
};
```

**방법 2. immer 라이브러리 사용**

- 객체를 불변성으로 만들어주는 라이브러리

```jsx
// immer 라이브러리의 produce 함수 호출
const newState = produce(user, (draft) => {
  // produce 함수 안에 user 객체를 첫 번째 매개변수에 전달
  // 두 번째 매개변수에는 함수 전달, draft 는 user 객체를 복사한 새로운 객체
  // immer 라이브러리가 자동으로 부모 객체도 자동으로 복제해서 반환
  // 불변성 확보
  const address = draft.extra.addressBook.find(
    // address.id 와 event.target.name 의 값이 동일한 경우 탐색
    (address) => address.id === Number(e.target.name)
  );
  address.value = e.target.value;
});

setUser(newState);
```

#### 4-3. props 유효성 검증

- React 는 상태가 변경되면 UI 를 자동으로 리렌더링
- 단방향 데이터 바인딩 -> 상태가 변경되면 자동으로 UI 를 변경해주지만 UI 가 변경됨에 따른 상태는 변경되지 않음
- 따라서 UI 의 변경에 따른 상태 변화는 이벤트 핸들러를 추가하고, setter 함수를 콜백 함수로 지정하여 상태 변경

**React 에서 DOM Node 획득**

- JS 에서 DOM Node 를 획득하는 경우에는 DOM API 를 활용하여 DOM 객체 획득
- React 에서는 DOM API 사용 불가, 직접 DOM 에 접근하는 방식 지양
- React 에서 DOM 객체에 접근하는 훅(**useRef()**)을 통해 DOM 객체에 접근
- useRef() 를 통해 획득하고자 하는 DOM 객체의 태그 내에 ref 속성을 추가하면 해당 DOM 객체 접근 가능
- useRef() 함수의 실행 결과 initialValue 가 매개변수로 지정된 current 객체 반환, ref 속성을 선택하고자 하는 DOM 객체에 추가하면 해당 DOM 객체의 속성이 current 에 저장
- refName.current.value 를 통해 DOM 노드(주로 input)의 값을 조회, 획득 가능, ref.current.focus() 메서드 등 DOM 메서드를 사용할 수 있음

- **단, DOM 을 ref 로 직접 수정하는 방식은 React 의 상태 관리와 충돌할 수 있으므로, 되도록이면 접근 및 참조만 하고 값 변경은 state 를 통해 수정**

```jsx
// useRef 의 초기값은 null 또는 0
const nameElem = useRef(null);
// useRef() 함수를 호출하면 initialValue 가 null 인 current 객체를 반환
nameElem.current.focus();
// 선택한 노드의 current 객체에 접근, focus() 등 DOM 메소드 사용 가능

return (
  <div>
    <input
      id="name"
      name="name"
      value={user.name}
      onChange={handleChange}
      // useRef() 로 생성한 ref 속성을 input 태그의 속성으로 추가
      // ref 속성을 가진 태그의 속성이 current 객체에 저장됨
      ref={nameElem}
    />
  </div>
);
```

#### 4-4. react-hook-form

- React 의 hook 형태를 띄는 form 관련 라이브러리
- 자동으로 form 요소의 유효성 검증 로직 구성 및 유효성 검사 실행

```jsx
const emailExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const cellphoneExp = /^(01[016789]{1})[0-9]{3,4}[0-9]{4}$/;

function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    // useForm 의 기본값
    defaultValues: {
      // useForm 의 initialValue 로 등록
      name: "",
      email: "",
      cellphone: "010",
    },
  });
  // 검증을 모두 통과한 경우에만 해당 함수 실행, name, email, cellphone 속성을 담은 객체를 반환
  const onSubmit = (user) => {
    console.log("서버에 전송", user);
  };

  return (
    <>
      <h1>06 회원가입 입력값 검증(feat. react-hook-form)</h1>

      {/* React-hook-form 의 handelSubmit 에서 검증을 통과한 경우, onSubmit 함수가 호출 */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">이름</label>
        <input
          id="name"
          // react-hook-form 의 register 함수 호출, id 는 포함하지 않음
          // 아래 내용을 register 함수에 전달하여 호출하게 된다면 자동으로 검증 로직을 만들어 줌
          {...register("name", {
            required: "이름을 입력하세요.", // 필수 입력 정보
            minLength: {
              // 이름의 경우, 최소 입력 길이 전달, 검증 조건을 전달
              value: 2, // 최소 입력 길이
              message: "2글자 이상 입력하세요.", // 안내 메시지
            },
          })}
          // 함수 호출 결과로 객체 반환, 전개 연산자로 풀면 자동으로 name, value, onChange, ref 속성이 자동으로 추가
          // 첫번째 매개변수는 name 을 가지는 요소
          // 두번째 매개변수는 검증 규칙을 객체로 전달
          // name="name"
          // value={user.name}
          // onChange={handleChange}
          // ref={nameElem}
        />
        <br />
        <div style={errorStyle}>{errors.name?.message}</div>
        <label htmlFor="email">이메일</label>
        <input
          id="email"
          {...register("email", {
            required: "이메일을 입력하세요.",
            pattern: {
              // 검증 조건
              // 정규 표현식 검증
              value: emailExp, // 위에서 선언한 정규 표현식
              message: "이메일 양식에 맞지 않습니다.",
            },
          })}
        />
        <br />
        <div style={errorStyle}>{errors.email?.message}</div>

        <label htmlFor="cellphone">휴대폰</label>
        <input
          id="cellphone"
          {...register("cellphone", {
            required: "휴대폰 번호을 입력하세요.",
            pattern: {
              // 검증 조건
              // 정규 표현식
              value: cellphoneExp,
              message: "휴대폰 번호 양식에 맞지 않습니다.",
            },
          })}
        />
        <br />
        <div style={errorStyle}>{errors.cellphone?.message}</div>

        <button type="submit">가입</button>
      </form>

      <p>
        {/* form input 의 name 에 해당하는 값을 꺼내서 출력 */}
        이름: {watch("name")}
        <br />
        이메일: {watch("email")}
        <br />
        휴대폰: {watch("cellphone")}
        <br />
      </p>
    </>
  );
}
```
