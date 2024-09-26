### 3-3. 프로토타입 사용의 이점
#### 3-3-2. 상속 구현
상속이란 개념은 객체지향 프로그래밍에서 사용할 수 있는 강력한 기능
어떤 객체 내의 변수, 함수를 다른 객체에 상속이 가능하다는 것
불필요한 중복 코드는 상속을 이용하여 간편하게 코드의 재사용을 구현할 수 있다

**prototype 을 이용한 상속 지원**
함수를 선언한 이후 함수에 해당하는 프로토타입 객체가 생성된다
새로운 객체에 원하는 프로토타입을 지정해줄 수 있다
```js
function Shape(name) {
  this.name = name;
}
Shape.prototype.draw = function() {
  console.log(`${this.name} 도형을 그립니다`)
};

function Rect(name, width, height) {
  Shape.apply(this, [name]); //shape 객체 내에 있는 name 이라는 프로퍼티명을 가진 프로퍼티를 현재 객체(this)에 추가
  this.width = width;
  this.height = height;
};

Rect.prototype = new Shape(); //Shape 생성자 함수를 사용하여 새로운 객체를 만들고, 그 객체가 Rect 의 prototype 객체가 됨. Shape 의 프로토타입도 사용이 가능하다
let rect1 = new Rect('square', 200, 100);
rect1.draw(); //동일하게 함수 호출 가능

Rect.prototype = Shape.prototype; //Rect 의 프로토타입과 Shape 의 프로토타입이 같음
//즉 Rect 생성자 함수에 의해 생성된 객체는 Shape.prototype 을 공유한다
let rect2 = new Rect('rect', 20, 100);
console.dir(rect1);
console.dir(rect2);
```

## 4. 다양한 OOP 기법
### 4-1. typeof, instanceof 연산자
**typeof**
typeof 는 타입을 확인하기 위한 연산자
숫자, 문자, 불린은 원시 타입, 기초타입
함수, 배열, 객체 => 객체 타입
```js
console.log(typeof 1) //number
console.log(typeof 's') //string
console.log(typeof true) //boolean
console.log(typeof [10, 20]) //object
console.log(typeof functon(){}) //function
console.log(typeof {}) //object
```

**instanceof**
instanceof 왼편의 객체가 오른쪽의 prototype 의 constructor() 에 의해 만들어진 instance 인지 확인하기 위함
```js
function Shape(){}

let shape1 = new Shape()

console.log(shape1 instanceof Shape); //true

console.log(10 instanceof Number);//false 10은 원시값의 데이터이며 Number 생성자 함수에 의해 생성된 객체가 아님. 거짓
```
**좌항의 객체가 우항의 생성자 함수(prototype)에 의해 생성된 인스턴스(객체)인지 파악**


### 4-2. 프로퍼티 descriptor
생성자 함수에 의해 객체가 생성될 때 객체 내의 프로퍼티는 설명자(descriptor)라는 정보가 존재한다
실제 객체 프로퍼티에는 값만 있는 것이 아닌 다양한 정보가 존재함
그리고 Object.getOwnPropertyDescriptor()을 이용하여 객체의 프로퍼티에 접근 가능하다
Object.defineProperty() 함수를 통해 descriptor 에 접근 가능
```js
console.log(Object.getOwnPropertyDescriptor(obj, 'name')); //매개 변수에는 접근하고자 하는 객체와 프로퍼티 키를 입력
// {value: 'jihoon', writable: true, enumerable: true, configurable: true}
//value 를 제외한 정보는 별도 지정이 없으면 모두 true

Object.defineProperty(obj, 'name', {writable: true/false}); //매개변수 내에 객체의 이름, 접근하고자 하는 프로퍼티 값, 그리고 변경하고자 하는 속성을 접근
```
value: 프로퍼티에 대입된 값


writable: 프로퍼티 value 를 수정 가능한지 여부
- 프로퍼티의 값을 수정 가능한지 설정하기 위해 사용
- false 로 설정한 경우, 해당 값은 수정이 불가

enumerable: 열거형으로 나열 가능한지 여부
- 객체 내의 데이터를 열거할 때 선택한 프로퍼티를 포함할지 여부를 설정
- 만일 false 인 경우에는 열거형으로 나열할 때 해당 프로퍼티를 생략

configurable: 설명자 내의 정보를 수정할 수 있는지 여부
- descriptor 내의 속성 설정 가능 여부를 결정
- configurable: false 이면 descriptor 의 모든 속성을 설정 불가

### 4-3. new Object()
하나의 객체만을 만들 때는 객체 리터럴을 사용하는 것이 효율적
객체 리터럴을 만드는 것과 동일한 기능
```js
let obj = {}
let obj = new Object()
//두 개의 코드는 동일한 기능
```

### 4-4. Object.create()
모든 객체는 해당 객체를 만드는 프로토타입 객체가 존재한다
하지만 객체 리터럴로 생성된 객체는? 객체 리터럴로 만든 객체의 프로토타입은 Object 의 프로토타입이다
```js
let user = {
  name: 'jihoon',
  age: 29
}
//객체 리터럴로 객체를 생성할 때 프로토타입이 없는 것처럼 보이지만 사실 아래의 함수와 같다
let user = Object.create(Object.prototype, {
  name: {value: 'jihoon'},
  age: {value: 29}
})

//객체 리터럴로 생성하는 함수의 prototype 을 별도로 지정이 가능하다
let user = Object.create(Shape.prototype, {
  name: {value: 'jihoon'},
  age: {value: 29}
})
//이렇게 하면 객체 리터럴로 생성한 user 객체는 Share 프로토타입을 갖는다
```

### 4-5. this
this 는 함수를 호출한 객체를 지칭하는 예약어이다
하나의 함수 내에 this 예약어를 이용했다면 this 는 함수가 포함되어 있는 객체를 의미
함수가 호출될 때마다 this 가 지칭하는 대상은 유동적이다
실행하는 순간에 this 가 결정되며, 동일한 함수의 this 라고 하더라도 함수의 호출 방식에 따라 다른 객체를 지칭할 수 있다

**전역 함수에서의 this**
전역을 스코프로 갖는 함수는 엄격모드에서 작성하고 있는지 여부에 따라 this 가 지칭하는게 다를 수 있음
일반 모드에서는 전역에서 선언된 함수 내에 포함된 this 는 자동으로 window 객체를 지칭
```js
cosole.log(this == window); //true
function myFun1() {
  console.log(this == window);
}

myFun1(); //true
window.myFun(); //true
this.myFun(); //true
```
엄격모드에서 전역위치 함수를 객체를 지정하지 않고 호출하게 되면 this 는 undefined
```js
"use strict";
console.log(this == window); //true

function myFun1(){
  console.log(this == window)
}

myFun()//false
window.myFun()//true
this.myFun()//true
```
**함수 내에 선언된 함수에서의 this**
함수 내에서 선언된 함수를 호출하는 경우에도 this 는 전역 위치의 함수호출과 동일하게 지칭 

**객체 메서드 호출 시의 this**
객체를 생성하고 내부의 메서드를 호출하는 경우, this 는 메서드를 실행시키는 객체를 지칭

**생성자 함수 내에서의 this**
new 연산자에 의해 호출되는 시점의 this 는 새로 만들어지는 객체를 의미한다

**화살표 함수에서의 this**
자바스크립트에서 this 키워드가 지칭하는 대상은 함수를 this 키워드를 포함한 코드가 실행한 시점에서 결정 - 동적 바인딩
화살표 함수에 한해서는 this 키워드가 지칭하는 대상은 코드를 작성하는 시점에 결정 - 정적 바인딩, lexical 바인딩
화살표 함수의 this 는 선언되는 시점에 지정, 화살표 함수의 상위 스코프에 있는 객체가 this 에 지정됨