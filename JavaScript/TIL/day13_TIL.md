## 2. 생성자 함수 constructor function
### 2-1. 객체 모형을 이용한 객체 생성
객체 리터럴을 사용하여 객체를 만드는 것은 간단하고 효과적이다
하지만 동일한 구성의 객체를 여러개 만드는 경우, 객체 리터럴을 반복적으로 사용하여 객체를 만드는 것은 비효율적
객체를 만들어 내는 모형을 만들어 동일한 구조의 객체를 만드는 방법이 효과적
이러한 모형을 만드는 방법 => 생성자 함수와 클래스

**생성자**
생성자란 객체의 모형을 만들어주는 역할자
즉, 객체의 모형을 정의하고 이 모형을 통해 객체를 만드는(생성하는) 작업을 수행
**"생성자를 이용해서 객체를 생성"**
자바스크립트에서는 생성자 함수가 그 생성자 역할을 함

### 2-2. 생성자 함수란
일반적인 함수는 특정 로직, 알고리즘을 묶고, 이런 묶음을 실행시키는 역할을 함
반면 생성자 함수는 일반적인 함수와는 달리 **객체를 생성하는** 역할을 하는 함수
*문법적인 차이는 존재하지 않으나, 역할의 차이 때문에 일반함수와 생성자 함수로 구분*
```js
function User(name, age) {
  this.name = name;
  this.age = age;
}
//일반적인 함수 선언문과는 문법적인 차이가 없기에 관습적으로 생성자 함수의 함수명은 대문자로 시작
//함수 리터럴, 화살표 함수를 이용할 수도 있음(화살표 함수는 객체 내의 this 지칭 불가)
```
### 2-3. new 연산자를 이용한 객체 생성
생성자 함수는 모형이고, 함수와 문법이 동일 -> 일반 함수처럼 호출이 가능
하지만 일반 함수처럼 호출하는 경우에는 객체가 생성되지 않음
객체를 생성하기 위해서는 new 연산자(객체 생성 연산자)를 사용하여 객체를 생성
```js
let user = new User('jihoon', 29);
console.log(user); //User {name: 'jihoon', age: 29}
```
new 연산자를 통해 객체 생성 시 처리 과정:
new 연산자가 실행되면 일단 객체를 위한 메모리를 확보 -> 메모리 내에 this 객체 생성 -> 생성자 함수 실행, this 객체에 접근하여 멤버(프로퍼티)를 추가 -> 메모리에 저장된 this 객체와 객체 내에 저장된 값이 좌항 변수에 할당

1) 일반 함수처럼 생성자 함수를 호출하는 경우
```js
let user = User('jihoon', 29);
//new 연산자를 사용하지 않으면 this 객체가 생성되지 않은 상태이기에 객체가 저장되지 않음
//일반 함수처럼 호출을 하게 된다면 함수에 전달된 인수의 값을 매개변수로 활용할 수 없음, this 가 지칭하는 대상 참조 불가 => undefined
```

2) this 키워드 대신 생성자 함수 내에 변수를 이용하는 경우
```js
function User(){
  let name = 'jihoon';
  let age = 20;
  let sayHello = function () {
    console.log('hello there');
  }
}

let user1 = new User()
//this 객체를 저장하는 메모리를 확보했지만, 해당 객체 내에 아무런 데이터를 저장하지 않음
//에러가 발생하지 않지만 빈 객체로 표시
```
**new 연산자를 이용했기 때문에! this 객체에 해당하는 메모리를 확보하고, 해당 객체에 생성자 함수 값을 저장하는 것이다아**

### 2-4. 생성자 함수와 리턴 값
일반 함수는 함수를 호출한 곳에 결과값을 반환하기 위해 return 예약어를 사용해야한다
하지만 생성자 함수는 객체 생성이 목적이므로 return 예약어를 사용하지 않아도 자동으로 객체가 생성, 반환
다만 생성자 함수 내에 return 문을 사용할 수 있긴 하며, return 하고자 하는 값이 원시값인지 객체인지 여부에 따라 다르게 작동한다
```js
function User1(name, age) {
  this.name = name;
  this.age = age;
  return 10
}
let user1 = new User1('jihoon', 29);
console.log(user1); //User1 {name: 'jihoon', age: 29}
//원시값을 return 하는 경우 해당 return 무시

function User2(name, age) {
  this.name = name;
  this.age = age;
  return {
    prodId: 14;
    prodName: '맥북에어';
  }
}
let user2 = new User2('jihoon', 29);
console.log(user2); //User2 {prodId: 14, prodName: '맥북에어'}
//객체값을 return 하는 경우, 생성된 객체를 무시하고, return 한 객체를 반환
```
### 2-5. 객체 멤버 추가
객체 리터럴과 동일한 방식으로 객체 멤버 추가 가능
```js
function User(name, age) {
  this.name = name;
  this.age = age;
}
let user1 = new User('jihoon', 29);
let user2 = new User('younghoon', 27);

user1.address = 'seoul';
user2.address = '010-1234-5678';
```