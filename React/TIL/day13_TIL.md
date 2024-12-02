2024.12.02.(월)

## 8장. 리액트에서 CSS 사용

### 1. 기본 CSS

- 가장 기본적인 스타일 지정 방법
- CSS 파일을 React 컴포넌트에 직접 import 하여 사용, React 컴포넌트에서 태그 내에 className 지정하여 스타일 적용 가능
- 소규모 프로젝트인 경우나 컴포넌트에서 사용되는 클래스 명이 한정적인 경우 사용하기 편리

**단점**

- 번들러를 사용하는 경우, 모든 파일에 적용된 CSS 파일을 하나의 CSS 파일로 번들링, index.html 에 stylesheet 가 적용됨
- CSS 파일이 하나의 파일로 통합되는 과정에서 클래스명이 중복되는 경우도 포함하여 번들링
- 또한 index.html 파일에 적용되기 때문에 전역에서 하나의 CSS 파일을 사용하게 됨
- 그렇다면, 컴포넌트에서 CSS 파일을 import 하지 않는다면?? => 컴포넌트에서 CSS 파일을 import 를 하지 않는 경우, import 되지 않은 파일을 제외하고 번들링 진행

충돌 해결 방법 - **클래스명이 중복되지 않게 처리**

1. 각기 다른 클래스명 지정 - 확인 과정, 또는 클래스명 작명에 불필요한 시간을 투자하게 됨
2. CSS 모듈 사용 - 각 컴포넌트에서 import 되는 CSS "모듈화"

### 2. CSS 모듈

- CSS 파일이 많아지는 경우 번들링 과정에서 동일한 이름의 클래스, id 가 정의될 수 있음
- 각 CSS 파일의 클래스 값을 중복되지 않는 고유한 이름으로 만들어주기 때문에 클래스명 중복을 방지, 식별자 작명에 불필요한 시간 투자 불필요
- 컴포넌트 당 하나의 CSS 모듈 작성, 스타일 유지보수 가능
- 번들링 시, 하나의 CSS 모듈의 클래스명은 임의의 식별자가 추가된 클래스명으로 지정, 사용 시에는 CSS 파일에서 정의한 클래스명을 사용

#### 사용 방법

- CSS 파일명의 확장자명 앞에 .module 추가
- 컴포넌트에서 import, import 시 스타일은 객체 형태로 전달, 객체 내부의 클래스명을 접근, 지정

```jsx
import styles from "./Button.module.css"; // style 객체 내부에 classname 접근

return <button className={styles.button}></button>;
```

- 상위 컴포넌트로부터 props 로 사용하고자 하는 스타일을 전달받아 사용할 수 있음

```jsx
// App.jsx
// Button 컴포넌트에 색상을 props 로 전달 가능
<Button bg='red' color='blue' >
  빨간 바탕, 파란 글자
</Button>

// Button.jsx
// 상위 컴포넌트로부터 bg 와 color 를 props 로 전달받음
<button className={`${styles.button} ${styles[`color-${bg}-${color}`]}`}>
  {children}
</button>

// 중첩된 템플릿 리터럴로 클래스명을 지정하는 대신 classnames 라이브러리 사용 가능
const colorStyle = classNames(styles.button, styles[`color-${bg}-${color}`]);
// classnames 라이브러리는 다수의 클래스명들을 공백으로 연결된 클래스명 string 으로 반환
<button className={colorStyle}>
  {children}
</button>
```

### 3. CSS-in-JS (Styled-components)

- 자바스크립트 파일 안에서 스타일을 정의하고 컴포넌트에서 사용하는 방식
- 별도의 CSS 파일이 필요 없고, 컴포넌트 내부에서 직접 스타일 지정, 사용
- 대표적인 라이브러리로 Styled-components 가 있음

#### 사용 방법

- styled.idendifierName`styles` 형식으로 사용
- Tagged template literal 로 style 지정 가능

```jsx
// 기본 버튼 스타일 - 스타일이 적용된 버튼 컴포넌트
// 상위 컴포넌트로부터 전달받은 props 의 bg, color 를 적용, 만일 props 로 전달받지 않은 경우 default 로 지정
// 템플릿 리터럴에 함수로 전달, 동적으로 css 속성값 지정 가능
const BasicButtonStyle = styled.button`
  background-color: ${(props) => props.bg || "#4caf50"}; /* Green background */
  border: none; /* Remove borders */
  color: ${(props) => props.color || "white"}; /* White text */
  padding: 6px 18px; /* Padding */
  text-align: center; /* Center text */
  text-decoration: none; /* Remove underline */
  display: inline-block; /* Display as inline-block */
  font-size: ${(props) => props.size || "16px"}; /* Font size */
  margin: 4px 2px; /* Margin */
  cursor: pointer; /* Cursor pointer */
  border-radius: 6px; /* Border radius */
`;

// 스타일 상속 - styled 에 상속받고 싶은 스타일을 인자로 전달할 수 있음, 기본 버튼의 스타일을 상속받고, 추가로 지정할 스타일만 템플릿 리터럴로 지정
const SubmitButtonStyle = styled(BasicButtonStyle)`
  background-color: pink;
`;

// 컴포넌트
export function Submit({ children, ...rest }) {
  // BasicButtonStyle 에 적용된 스타일이 적용된 버튼 컴포넌트 반환(bg, color, onClick 등)
  return (
    <SubmitButtonStyle type="submit" {...rest}>
      {children}
    </SubmitButtonStyle>
  );
}
```
