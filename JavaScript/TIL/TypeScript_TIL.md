# 6장. TypeScript
기본적으로 자바스크립트가 기초가 되어야한다.
타입스크립트가 대세라고는 하지만 현재 모든 개발이 타입스크립트 기반으로 진행되는 것은 아님
현재도 자바스크립트가 메인이자, 기초
기초를 탄탄히 한 이후, 타입스크립트를 적극 사용

## 1. TypeScript 소개
타입스크립트는 MS 에서 만든 소프트웨어 언어
왜? 대규모 웹 앱을 개발하고자 했지만, 자바스크립트만으로는 한계가 존재, 이를 극복하기 위해 만들어진 소프트웨어 언어이다.
타입스크립트 = ES6 + 정적 타입(자바스크립트와 타입스크립트의 가장 큰 차이)
JS ES6 를 완전히 포함하여 상호 호환이 가능하고, ES6 에서 제공하지 않는 기능을 추가로 제공

## 2. 개발환경
타입스크립트는 브라우저 또는 Node.js 의 JS Engine 이 해석하지 못한다.
따라서 타입스크립트로 작성된 코드를 자바스크립트 코드로 transpile(compile) 필요

*compile 이란?*
Java 또는 C 와 같은 언어로 작성된 코드는 실행시키기 전에 기계어로 변환하는 작업을 거침, 이를 compile 이라고 부른다
타입스크립트도 편의상 transpile 과정을 compile 이라고 통칭

### 1) TSC 로 컴파일만 진행
컴파일러를 사용하여 타입스크립트 코드를 자바스크립트 코드로 변환

타입스크립트를 사용하는 모든 코드 파일에 적용하기 위해서는 하나로 묶고 상위 파일 내에 설치
이 경우 06-typescript 폴더 내의 모든 하위 폴더가 타입스크립트를 사용하기 위해서 06-typescript 에 설치
-> npm install typescript
-> npm install -g typescript 
//전역에 설치하게 됨, 전역의 모든 코드 파일이 ts 사용할 수 있게 됨, 잘 하지 않는다, 이 프로젝트 저 프로젝트를 하다보면 충돌 발생 가능성 존재

npm 명령어로 설치하면 node_modules 폴더가 만들어지고 내부에 설치됨
node_modules 에 설치된 모든 것은 node_modules 가 위치한 폴더 모든 하위 폴더에서 사용 가능

설치된 컴파일러를 이용해서 ts 파일을 js 파일로 컴파일 가능성
npx - Node 명령어, tsc 라는 컴파일러 실행시키거라! 없으면... 설치해라!!
컴파일하고자 하는 ts 파일이 있는 폴더로 이동해서 실행
-> npx tsc main.ts
=> main.js 파일이 생성됨, 다만 모든 변수가 var 로 변환되는 것 같다...

타입스크립트 파일 내에 코드 작성 -> 타입스크립트 컴파일러 설치 -> 타입스크립트 파일을 자바스크립트로 컴파일 -> 연결 스크립트 변경

### 2) tsconfig.json 을 활용한 방법
1 의 방법은 단순히 타입스크립트 코드를 컴파일러를 통해 자바스크립트 코드로 변환하는 것이라면, 
이 방법은 tsconfig.json 을 통해 다양한 기능을 활용할 수 있음
예 - 소스 파일 변환 결과로 나온 자바스크립트 저장 위치 설정, 등

npm 으로 관리되는 프로젝트 초기화, 자동으로 package.json 이 하나 만들어짐
프로젝트 파일 하위 전체 파일을 npm 으로 관리하겠다.
-> npm init

필요한 lib(package) 혹은 tool 다운로드
npm install xxx - npm repository server 로부터 xxx 패키지를 다운로드 받는 명령어
-D 옵션을 주면 tool 을 설치
package.json dependency 에 자동 기록됨
-> npm install -D typescript

tsconfig.json(ts 환경파일) 준비
-> npx tsc -init
=> tsc 를 초기 설정하겠다 -> tsconfig.json 파일 생성

tsc 설정 내용을 tsconfig.json 에 기록
```json
//주로 사용하는 컴파일 옵션
{
  "compilerOptions": {
    //컴파일 시킨 산출물(js 파일)을 만들 디렉토리 위치
    "outDir": "./build",
    //compile 대상에 ts 뿐만 아니라 js 도 포함 여부, true = 포함, false = 제외
    //ES6 를 지원하지 않는 브라우저에서 접속하는 예외사항에 대처하기 위해
    //ES6 -> ES5 코드로 변형하여 전체 브라우저에 동작하도록
    "allowJs": true,
    //js 모듈화 방식이 2가지 1) ES6 스타일 모듈, 2) commonjs(과거 사용) 방식
    //둘의 호환성 제공
    "esModuleInterop": true,
    //JSON 파일을 마치 코드에서 객체로 바로 이용 가능하게(parse 없이)
    "resolveJsonModule": true,
    //ts -> js 로 컴파일 시킬 때 js.map 파일을 자동으로 만드는 설정
    //개발자가 분석할 파일은 아니지만 디버깅을 위해 만드는 것이 좋음
    //런타임 시 js 가 실행, 런타임 에러가 발생하면 js 라인수가 나옴
    //우리가 개발하고 유지 보수하는 파일은 ts, 따라서 런타임 에러 발생 시 에러가 발생한 ts 코드의 위치를 알려줌
    //map 파일이 있어야 ts 코드 내에서의 위치를 알려줌
    "sourceMap": true,
    //any 타입을 허용할 것인가에 대한 설정
    //any - 아무 타입이나 다 지정 가능, 권장 X
    "noImplicitAny": true,
    //컴파일된 js 코드를 es5 스타일로? 아니면 es6 스타일로?
    "target": "ES5",
    //jsx 구문을 어느 형태의 js 로 변형시킬지? 대부분 React
    "jsx": "react",
    //모듈화 방식, target 과 맞춘다.
    //target 이 es5 면 module 도 맞춰야 하고, target 이 es6 면 es6 모듈로 지정
    "module": "CommonJS" 
  },
  //transpile 시킬 대상 폴더 파일 지정
  "include": ["./src/**/*"],
  //include 내의 파일 중 제외할 파일 지정
  "exclue": ["node_modules", "**/*.spec.ts"]
}
```

tsc 로 transfile
-> npx tsc

### 3) 인터넷 사이트
인터넷 사이트에도 타입스크립트 컴파일이 가능하다. 
typescriptlang.org/play/
약식의 테스트나 개발환경에 부족함이 있는 경우에만 사용 권장

## 3. 타입
자바스크립트는 변수에 값이 대입된 이후 타입이 결정됨 - 타입 유추
이러한 자바스크립트의 유연성은 오류 발생 가능성을 높일 수 있음
반면 타입스크립트는 사용자가 타입을 지정할 수 있다. - 자바스크립트와의 가장 큰 차이점

타입스크립트에서는 number, string, boolean, any, array, null, undefined, void, union, never, object, 사용자 지정 타입을 선언할 수 있음

### number, string, boolean
```tsx
let firstName: string = 'jihoon';
let age: number = 29;
let alive: boolean = true;
```

### any
모든 타입의 데이터를 받음
any 타입을 갖는 변수는 문법 검사를 실시하지 않는다. -> 자바스크립트처럼 변수 내에 모든 타입의 데이터를 넣을 수 있다.(해당 변수에 들어올 예정인 데이터의 타입이 불명확한 경우에만 사용하기)

### array
배열 타입
```tsx
let a: number[] = [10, 29]; //a 라는 배열의 데이터는 숫자 데이터
let b: Array<number> = [1, 2]; //<> 내에 선언한 타입만 가능한 배열이다
```

### void
결과 값을 리턴하지 않는 함수에 사용하는 예약어
- 변수에 void 타입으로 지정하면 변수에는 undefined 밖에 못 들어감(변수 타입을 쓸 수 있지만, 무의미)
- 함수의 리턴 타입을 주로 사용
```tsx
function a(): void {}
//함수를 선언했다. 이 함수에서는 return 구문이 없는 함수
//함수를 호출했지만 결과 값은 없다
```

### union
여러 타입을 허용 - : number|string
- | (or 기호) 사용 가능
- 사용자 지정 타입 { } 로 다수의 타입 선언 가능(주로 객체를 지정할 때 사용)
```tsx
let obj: {id: number, name: string} //custom 타입, id 와 name 프로퍼티를 갖는 객체
//id 에는 숫자 타입만, name 에는 문자열 타입만
```

### never
never : 함수의 리턴타입으로 사용, 종료되지 않거나 의미있는 결과 값이 리턴되지 않는다는 것을 명시적으로 선언 - void 와는 차이가 존재
- 에러를 리턴 시키는 경우
- 서버에서 무한 루프를 실행하는 경우
```tsx
function error(msg: string): never {
	throw new Error(msg);
}
```

### object
boolean, string, number, null, undefine 가 아님을 선언
- 어떤 객체든 상관 없다. 기초 타입은 아님

### generic
제네릭(Generic, 형식 타입) - 타입 지정: 함수를 선언하는 쪽이 아니라 함수를 호출하는 쪽에서 타입을 결정하도록 하는 것, 이용하는 쪽에 타입 지정
```tsx
function a<T> (arg1: T[], arg2: T[]): T[]{
	return arg1.concat(arg2);
} //T 라는 타입이 있는데, 여기에 들어갈 타입은 나중에 결정될 것이다.
//이런 타입이 있다고 가정하자. 나중에 지정될 것이야

let b = a<number>([10, 20], [30, 40]);
let c = a<string>(['string', 'type'], ['generic', 'type']);
//타입을 사용할 때 결정, T 부분에 타입을 지정할 수 있다.
```

### typealias
typealias
- type 예약어로 선언한다
- 개발자에 의해 타입을 지정한다
```tsx
type MyType2 = {id: number, name: string};
let be: MyType2 = {id: 10, name: 'hello'};
```

### optional
optional - 생략 가능한 데이터의 타입 표현, 데이터가 지정이 안되어도 된다. 만일 들어가야 한다면 타입은 일치시켜야함 - 주로 object literal 을 통해 객체를 만들 때 사용
```tsx
let c: {id: number, name?: string};
//? 를 표기하면 해당 값을 대입하려면 string 타입, 아니면 없어도 되고
c = {id: 20};
c = {id: 30, name: 'hello'};
```

### readonly
readonly - 읽기 전용, 수정 불가
```tsx
type MyType2 = {id: number, name: string, readonly email: string};
```

### tuple
tuple - 배열 내부의 타입과 순서를 일치시키기 위해서 사용
```tsx
let d:[number, string];
//배열 내부 데이터의 순서와 타입을 일치시키기 위함
d = [10, "hello"];
```

### intersection type
intersection type - & 로 연결된 두 가지 타입을 모두 만족해야함
```tsx
type PersonTypeInter = PersonTypeA & PersonTypeB
//Typealias 와 & 연산자 활용
```

## 4. Enum
## 5. Interface
## 6. abstract(추상형)