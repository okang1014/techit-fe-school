### 5-5. static 멤버(추가)
클래스 내에 선언된 멤버는 객체 멤버와 static 멤버가 존재
클래스 내에 선언된 객체 멤버는 객체 생성을 목적으로 선언된 멤버 -> 객체 생성시 메모리에 들어가야하는 멤버이다

static 멤버는 static 예약어를 사용하여 선언한 프로퍼티이며 일반 객체 멤버와 다르게 **객체 생성 시 객체의 메모리에 저장되지 않고 별도의 메모리에 저장된다**
static 멤버는 객체 생성과 상관 없이 접근 가능, 클래스 명으로 접근(객체를 통해 접근 불가)
```js
class MyClass {
	data1 = 10;
	static data2 = 20;
	myFun1() {
		console.log('myFun1 call');
	};
	static myFun2() {
		console.log('myFun2 call');
	}
}//이렇게 선언되고 객체 생성이 되지 않았다면 static 멤버가 아닌 멤버는 접근 불가
//static 멤버는 선언과 동시에 메모리 할당 및 저장, 객체 생성 없이 static 멤버는 class 를 통해 접근 가능

console.log(MyClass.data2); //20
MyClass.myFun1(); //error
MyClass.myFun2(); //myFun2 call
```
객체 별로 다른 메모리를 할당하여 객체 멤버를 저장하는 경우에는 객체 멤버로 선언, 객체별로 상이한 데이터를 유지하고자 하는 목적이 아닌 경우 static 멤버로 선언
static 멤버를 남발하는 것은 지양

*주의 : prototype 과는 별도의 메모리에 저장되고, 해당 메모리에 접근이 가능하다는 점만 유사, 그 외 측면은 다름*

### 5-6. 상속
객체 지향에서 굉장히 중요한 개념이며, 공통적인 코드는 한 곳에 작성하여 이를 상속, 재사용하도록 하는 기법
생성자 함수는 상속을 위해 프로토타입 기능을 지원
클래스는 **extends 예약어**로 상속관계를 명시
```js
//extends 예약어로 상속 관계 명시
//상속의 기본은 부모에 선언된 멤버를 내것처럼 이용
class Shape {
  name = '도형';
  x = 0;
  y = 0;
  draw() {
    console.log(`drawing ${this.name} at ${this.x}, ${this.y}`);
  }
}

class Rect extends Shape {
  width = 0;
  height = 0;
}

let rect = new Rect();
rect.name = 'rectangle';
rect.x = 10;
rect.y = 10;
rect.width = 100;
rect.height = 100;
rect.draw(); //drawing rectangle at 10, 10
//상위 클래스 Shape 의 멤버를 그대로 상속 받아 사용 가능
//rect 자신의 멤버는 6개가 된다
```

#### 5-6-1. private 프로퍼티, static 멤버 상속
private 프로퍼티는 하위 클래스에 상속되지 않는다
static 멤버는 하위 클래스에 상속
```js
class Super {
  data1 = 10;
  #data2 = 20;
  static data3 = 30;
}
class Sub extends Super {
  static data4 = 40;
  subFun() {
    //부모에 선언된 멤버를 마치 자신의 멤버인 것처럼
    console.log(this.data1);
    // console.log(this.#data2); //error, private field 는 해당 클래스 내에서만 접근 가능, 상속 불가, 하위 클래스에서 사용 불가
  }
}
let obj = new Sub();
obj.subFun();

console.log(Super.data3); //30
console.log(Sub.data3); //30 
//상위 클래스의 static 멤버는 하위 클래스에 상속, 클래스 명으로 호출 가능
```

#### 5-6-2. super 로 상위 생성자 호출
객체 지향 프로그래밍의 절대 규칙 중 하나 = 하위 클래스 생성자 호출 시점에 무조건적으로 상위 생성자도 호출이 되어야 한다
상위 생성자도 호출해야만 하위 클래스에 의해 생성된 객체 메모리 내에 상위 클래스의 멤버가 상속될 수 있다
super - 상위 클래스를 지칭하는 예약어

하위 클래스에 개발자가 명시적으로 생성자를 선언하지 않은 경우는 하위 클래스 내에 자동으로 default 생성자가 추가 -> 자동으로 상위 클래스의 생성자 호출
문제가 되는 케이스는 super 클래스와 하위 클래스 내에 생성자를 선언하고, 하위 클래스를 이용하여 객체를 생성한다면 오류 발생

만일 하위 클래스와 super 클래스 내에 생성자가 선언이 되어 있다면, 하위 생성자가 호출될 시점에 상위 클래스의 생성자도 호출되어야 함 => 하위 생성자 가장 첫 번째 줄에 super() 예약어 추가
super() 는 생성자 내에서 가장 첫 줄에 한 번만 작성 가능
그리고 상위 생성자에 매개변수가 있는 경우가 있기 때문에 super() 에 매개변수 전달이 가능
```js
class Super2 {
  constructor(name, x, y) {
    this.name = name;
    this.x = x;
    this.y = y;
  }
}

class Sub2 extends Super2 {
  constructor(name, x, y, width, height) {
    super(name, x, y); //몇몇 매개변수는 super 에 전달하여 상위 생성자 호출
    this.width = width;
    this.height = height;
  }
}

let obj2 = new Sub2('rect2', 20, 20, 200, 200);
//객체 생성 시 전달한 데이터는 하위 클래스에 전달
// => 그 중 몇개의 데이터는 상위 클래스의 생성자에 전달된다
```

**참고사항 - super() 가 생성자 가장 첫 번째 줄에 선언되는 이유**
클래스 내의 생성자가 호출되는 과정과 관련 있음
생성자의 역할
- 생성자 내의 개발자 코드 실행 (3)
- 상위 생성자 호출 (1)
- 자신 클래스 멤버를 메모리에 할당 (2)

new 연산자에 의해 하위 생성자가 호출 -> 하위 생성자에 의해 상위 생성자 호출 -> 상위 생성자에 의해 메모리 확보, 멤버 저장 -> 해당 메모리에 하위 생성자에 의해 생성되는 객체 멤버 저장

#### 5-6-3. 오버라이딩
상위 멤버는 하위 클래스에서 상속되어 사용 가능
결국 하위 클래스에서 선언된 멤버처럼 사용 가능
만일 하위 클래스에서, 상위 클래스의 멤버 이름과 동일한 객체 멤버를 선언하는 경우를 overriding 이라고 부른다
이 경우, 상위 클래스에 선언된 멤버는 무시, 하위 클래스에서 선언된 멤버를 사용

## 6. 클로저(Closure)
### 6-1. 클로저란
**클로저란 함수와 함수가 선언되었을 때의 렉시컬 환경의 조합을 의미한다**
클로저는 문법을 사용하여 개발자가 명시적으로 만들어내는 것이 아닌, 특정 상황에서 자동으로 만들어지는 기법
클로저를 이해하기 위해서는 함수가 실행되는 **실행 컨텍스트** 개념과 **렉시컬 환경**을 이해해야함

### 6-2. 함수의 실행 컨텍스트(operation context)
실행 컨텍스트란 함수가 실행되기 위한 정보를 갖는 객체
함수가 선언이 되었을 때 함수는 매개변수를 전달 받을 수 있고, 함수 내부에는 변수, 함수가 선언되어 있을 수 있음
함수가 호출되는 시점에 함수가 전달받은 인수와 함수 내의 변수, 함수를 저장하는 객체가 필요함 -> 이러한 정보, 데이터가 저장되는 객체가 실행 컨텍스트
해당 함수 실행이 끝나면 실행 컨텍스트는 자동으로 소멸

**함수 실행에 따른 실행 컨텍스트 상태**
함수 호출 -> 함수 내부의 정보를 저장하기 위한 메모리 할당 -> 코드가 실행되며 발생한 데이터 정보를 해당 메모리(객체)에 자동으로 저장 -> 함수 실행이 종료되면 실행 컨텍스트 소멸

**스택 구조**
스택 구조란 하나의 공간에 새로운 내용, 정보가 추가되는 대로 저장되고, 가장 마지막에 추가된 것부터 순서대로 제거되는 구조
first in - last out
실행 컨텍스트는 스택 구조로 작동, 유지

**함수가 실행되며 필요한 정보가 실행 컨텍스트에 저장됨으로써 해당 정보가 함수 실행 시 사용이 가능, 함수 호출이 종료되면 관련 정보는 소멸되며, 함수가 실행되는 과정에서만 사용이 가능**

### 6-3. 렉시컬 환경
렉시컬 환경이란 함수가 선언된 위치를 의미
즉 함수가 실행되는 동적인 환경이 아닌 코드로 함수를 작성한 위치를 의미

**클로저의 이유**
모든 상황에서 클로저가 생성되는 것은 아님
특정 상황에서만 클로저가 자동으로 생성되는데 이는 실행 컨텍스트만으로 함수가 실행되기 어려운 경우 클로저가 생성된다.
```js
let x = 10;
function outerFun(){
	let y = 20;
	function innerFun(){
		let z = 30;
		console.log(x, y, z);
	}
	return innerFun
}

let resultFun = outerFun()
resultFun()
//위의 경우 innerFun 이 실행될 때 실행 컨텍스트만으로는 y 값이 없다
//하지만 innerFun 의 실행 컨텍스트에 대해 자동으로 클로저가 생성(y 값 포함)
```
위 예시에서 y 의 값은 실행 컨텍스트가 아닌 클로저에 저장되어 있다.

#### 캡슐화
OOP 공동 용어이며, 관련 프로퍼티 메서드를 하나로 묶어서 작성하고, 객체 내에서만 멤버를 사용하고 외부에서는 접근이 불가하게 만들기 위한 기법
개발 생산성 및 유지 보수성 증대
**변수는 encapsulate 시키고, 함수를 이용하여 해당 값을 사용하게끔 하는 것이 유지 보수성 측면에서 좋다**
자바스크립트 측면에서 생성자 함수를 이용하거나 클래스를 사용해서 캡슐화 가능
```js
//생성자 함수 - 클로저를 사용하여 캡슐화 가능, 지역 변수를 사용하여 
function UserFunction() {
  //생성자 함수 내에 변수가 선언되었지만 this. 로 선언한 것이 아님
  //생성되는 객체에 담기지 않고, 로컬 변수로 저장되며 외부에서는 해당 변수는 사용하지 못한다
  let name = '홍길동';
  let age = 10;

  //해당 값을 객체에서 유지하고, 함수를 통해 이용하게 하는 방법(이게 캡슐화이다)
  //외부에서 이용하는 함수 내에 lexical 정보로 이용하게
  //생성자 함수는 객체를 생성하면 함수가 종료, 실행 컨텍스트는 소멸되지만, 위에 선언된 변수는 클로저에 추가, 유지된다.
  this.getName = function () {
    return name;
  }
  this.setName = function (value) {
    name = value;
  }
  this.getAge = function () {
    return age;
  }
  this.setAge = function (value) {
    age = value;
  }
}

let obj1 = new UserFunction(); //{}
obj1.setName('고길동');
obj1.setAge(45);
console.log(obj1.getName(), obj1.getAge()); //고길동, 45

//클래스 - 클래스 영역에서 # 를 사용하여 변수명 선언
class UserClass {
  //클래스 내부에서는 접근 가능
  #name = '홍길동';
  #age = 10;

  getName() {
    return this.#name;
  }
  setName(value) {
    this.#name = value;
  }
  getAge() {
    return this.#age;
  }
  setAge(value) {
    this.#age = value;
  }
}

let obj2 = new UserClass();
obj2.setName('이길동');
obj2.setAge(20);
console.log(obj2.getName(), obj2.getAge()); //이길동, 20
```