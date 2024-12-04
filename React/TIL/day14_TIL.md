2024.12.03.(화)

## 8장. 리액트에서 CSS 사용

### 4. Tailwind CSS

- 미리 정의된 CSS 클래스를 이용해서 스타일링을 할 수 있는 프레임워크
- CSS 파일을 따로 만들 필요 없이 제공되는 클래스를 HTML 태그에 직접 지정

#### 장점

- 개발 생산성: 개발자가 CSS 클래스를 별도로 정의할 필요 없음, 속도와 생산성 증가
- 재사용성: 재사용 가능한 클래스가 제공, 디자인 일관성 확보
- 가독성
- 유연성
- 파일 크기: 사용하는 클래스만 포함하여 최적화된 CSS 생성 가능

#### 사용 방법

**설치**

```
npm install -D tailwindcss postcss autoprefixer
```

- -D 옵션을 지정하게 되면 개발과정에서만 해당 프레임워크가 사용
- Vite 번들링 과정에서 해당 CSS 클래스가 포함된 통합 CSS 생성
- 자동으로 prefix 를 지정하여 중복된 클래스 방지 가능
- **PostCSS** 로 CSS 를 효율적으로 처리하고 최적화 가능
- PostCSS 는 최근 CSS 를 지원하지 않는 브라우저에도 최신 CSS 사용이 가능하게 해줌

**설정 파일 생성**

- 터미널에 npm tailwindcss init -p
- 자동으로 tailwind.config.js, postcss.config.js 파일 생성

**설정 파일 수정**

- tailwind.config.js

```js
/** @type {import('tailwindcss').Config} */
export default {
  // TailwindCSS 적용할 파일을 content 에 지정
  // src 폴더 밑의 모든 폴더에 있는 파일 중 js 또는 jsx 파일만
  // 타입스크립트인경우 ts, tsx 로 지정
  content: ["./src/**/*.{js,jsx}"], // 띄어쓰기하면 인식이 안됨
  theme: {
    extend: {},
  },
  plugins: [],
};
```

- index.css 에 tailwindcss 지시어 추가

```css
/* 테일윈드 지시어 지정 */
@tailwind base; /* html 태그의 기본 스타일이 정의된 layer */
@tailwind components; /* 컴포넌트 스타일을 정의. 개발자가 직접 정의하여 사용(.btn, .card, .toast 등) */
@tailwind utilities; /* 간격, 색상, 폰트 크리, 정렬 등의 유틸리티 클래스 정의, 기존 tailwind css 에서 제공하는 값 외에 디테일한 조정이 필요한 경우 사용 */
```

**VSCode 플러그인**

- Tailwind CSS IntelliSense
  - VSCode에서 tainwindcss 관련 자동 완성, 구문 강조, 린팅 같은 기능 제공
  - 마우스 오버시 실제 적용되는 CSS가 툴팁으로 표시

#### 사용 예시

2. 특정 컴포넌트에 기본 스타일 지정

```jsx
export default function Button({
  children,
  bg = "gray",
  color = "black",
  size = "md",
  ...rest // 스타일 외의 속성은 버튼의 속성으로 그대로 적용
  // type = "button",
  // onClick: clickHandler,
}) {
  let bgColor = {
    gray: "bg-gray-500",
    blue: "bg-blue-500",
    red: "bg-red-500",
    yellow: "bg-yellow-500",
  };

  let textColor = {
    black: "text-black",
    white: "text-white",
    blue: "text-blue-500",
    red: "text-red-500",
  };

  let btnSize = {
    sm: "py-1 px-2 text-sm",
    md: "py-2 px-4 text-base",
    lg: "py-2 px-6 text-lg",
  };

  return (
    <button
      // [ ] 내부는 상위 컴포넌트로부터 전달받은 bg, color props 이며, 위에 정의한 스타일 객체에서 속성을 꺼내서 클래스에 지정할 수 있음
      className={`${bgColor[bg]} ${textColor[color]} ${btnSize[size]} m-1 rounded-md`}
      {...rest}
    >
      {children}
    </button>
  );
}
```

2. base layer 지정: html 태그의 기본 스타일 정의

```css
/* base layer 에 설정
Tailwind CSS 의 base, components, utilitieys 레이어 중 base 레이어의 h1 태그 재정의 */
@layer base {
  /* h1 컴포넌트에 모두 동일한 스타일 지정, 별도 클래스명 지정하지 않아도 됨 */
  h1 {
    @apply mb-6 text-2xl font-bold;
  }
}
```

3. components 재정의, card 나 toast 컴포넌트 전체 디자인 시 주로 사용

```css
/* components 재정의, card 나 toast 컴포넌트의 전체 디자인 */
@layer components {
  .btn {
    /* 많이 사용하는 컴포넌트 사용, 해당 태그 내에는 클래스명만 추가하면 됨 */
    @apply bg-gray-400 text-white px-2 py-1 ml-2 text-base hover:bg-gray-600 rounded;
  }
  .btn-primary {
    @apply bg-blue-500 hover:bg-blue-700;
  }
  .btn-warn {
    @apply bg-red-500 hover:bg-red-700;
  }
}
```

- JSX 컴포넌트에서 기본 스타일이 지정된 tailwind 컴포넌트 사용

```jsx
<button className="btn">default</button>
        <button className="btn btn-primary">Submit</button>
        <button className="btn btn-warn">Delete</button>
```
