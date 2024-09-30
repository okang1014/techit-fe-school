### 4-6. this 키워드
자바스크립트의 this 는 동적으로 결정된다
코드를 실행하는 시점에 지칭하는 객체가 결정됨 -> 동적으로 객체가 결정된다(동적 바인딩)
하지만 화살표 함수는 this 키워드가 지칭하는 대상이 코드를 작성한 시점에서 결정됨 - lexical 바인딩

### 4-7. this 의 동적 바인딩
bind(), apply(), call() 를 통해 임의의 함수를 객체에 연결하여 객체 내의 멤버를 this 를 활용하여 참조할 수 있도록 할 수 있음

**bind()**
'함수명'.bind(obj1) -> 함수에 obj1 객체를 연결
일반 함수를 실행시키는 순간 함수 내의 this 는 obj1 을 지칭한다
동적으로 객체를 바인딩 시켜 새로운 함수를 만드는 역할을 함
```js
let obj = {
  name: 'ji'
}

let sayHello = function(arg1, arg2) {
  console.log(`hello ${this.name}, ${arg1}, ${arg2}`);
};

let newSayHello = sayHello.bind(obj);
newSayHello(10, 20); //hello ji, 10, 20

//rest 파라미터를 활용하여 함수 선언
let sayHello2 = function(...args) {
  console.log(`hello ${this.name}, ${args}`);
}

let newSayHello2 = sayHello2.bind(obj, 10, 20);
newSayHello2(30, 40); //hello ji, 10, 20, 30, 40
```

**call(), apply()**
bind() 는 새로운 함수를 생성하지만 호출은 하지 않음
call(), apply() 는 함수를 생성하는 동시에 호출
결국 call(), apply() 의 반환 값은 새로운 함수가 아니라 함수를 호출한 결과 값
```js
let sayHello = function() {
  console.log(`hello ${this.name}`);
  return 100;
}

console.log(sayHello.call(obj)); //100
```
call() 로 객체를 바인딩하여 함수를 호출할 수 있고, 이 때 매개변수 값을 전달할 수 있음
```js
let sayHello = function (arg1, arg2) {
  consol.log(`hello, ${this.name}, ${arg1}, ${arg2}`);
  return 100;
}

console.log(sayHello.call(obj, 10, 20)); //100
```
call() 로 바인딩하는 경우, 매개변수 개수대로 인수 전달 가능
apply() 로 바인딩하는 경우, 매개변수를 배열로 지정

### 4-8. setter/getter
setter/getter 은 일반적인 소프트웨어 언어
함수를 지칭하며 데이터를 획득하고 변경하는 역할을 하는 함수를 지칭
- setter - 데이터 값을 변경하는 함수, set 키워드를 사용하여 선언
- getter - 데이터 값을 참조하는 함수, get 키워드를 사용하여 선언

getter/setter 함수는 객체 내에서는 변수의 형식을 띄고 있지만 외부에서는 함수처럼 사용

```js
let obj = {
  _num: 0,
  get num() {
    return this._num;
  },
  set num(value) {
    this._num = value;
  }
};

console.log(obj.num); //0
obj.num = 10;
console.log(obj.num); //10
```
객체 내에 프로퍼티를 선언하여 참조하지 않는 이유?
- 유지 보수성을 높이기 위함 -> 객체 내의 값을 변경해야한다면, 코드 내의 모든 값을 변경할 필요 없이 객체 내의 값만 수정하면 되기 때문
- 그리고 해당 값에 접근하고 변경할 수 있는 제한을 설정할 수 있음 -> set 함수를 선언하지 않고 get 만 선언한 경우는 참조만 가능

## 5. 클래스
동일한 구조의 객체를 여러개 만들기 위해서는 생성자 함수를 통해 만드는 방법이 있고, 다른 하나의 방법이 클래스를 이용하는 방법이다.
생성자 함수를 사용하는 방법은 고전적인 방법이지만, 이 방법을 이용한 자바스크립트의 객체 지향 프로그래밍 방법이 다른 언어와 비교했을 때 이질적이다.
따라서 ES6 부터는 이를 보완하기 위해 Class 기능을 제공
둘 다 인지하고 있어야 함 -> 기존의 코드나 API 에서 아직 생성자 함수를 사용한게 많기 때문에

### 5-1. 선언 및 생성
클래스는 class 예약어를 사용
class { 프로퍼티, 메서드 등을 나열}
```js
class User {
  name = 'jihoon';
  sayHello() {
    console.log(`hello ${this.name}`);
  };
}

//새로운 객체를 생성하는 방식, 객체 내부의 프로퍼티 접근 및 메서드 호출은 생성자 함수를 통해 만든 객체와 동일
let obj = new User();
console.log(obj.name); //jihoon
obj.sayHello(); //hello jihoon
```
모형을 선언하는 방식에 차이가 존재, 객체 생성, 객체 접근은 생성자 함수를 통한 객체 생성과 동일

### 5-2. 생성자
생성자는 OOP 에서 굉장히 중요한 개념
모든 객체 모형에서 생성자는 필수이다
자바스크립트에서도 생성자 함수를 통해 객체를 생성하는 과정 
-> 함수 선언과 동시에 생성되는 prototype 객체 생성
-> prototype 객체 내에는 constructor() 함수가 자동으로 포함
-> new 연산자를 통해 생성자 함수를 호출하는 것은 prototype 객체 내의 constructor() 를 호출하는 것
```js
class User { 생성자, 변수(프로퍼티), 함수(메서드) }
```
생성자는 객체 생성 시에 호출되어 클래스의 프로퍼티, 메서드를 메모리에 저장하는 역할을 한다
즉, 모든 클래스는 생성자를 가지고 있으며, 생성자 없이는 존재할 수 없다.
개발자가 클래스를 선언하였지만 내부에 명시적으로 생성자를 포함하지 않고, 해당 클래스를 통해 객체를 생성하는 경우, 자동으로 기본 생성자(default constructor)가 추가
*기본 생성자는 매개변수를 갖지 않는 생성자 - constructor(){}*

**new 연산자는 사실상 생성자를 호출한다. 즉 클래스 내부의 생성자를 통해 객체가 생성되는 것**
```js
class User {
  name = 'ji';
  //명시적으로 매개변수를 갖는 생성자를 선언하여 이를 통해 객체 생성 가능
  constructor(name) {
    this.name = name;
  }
  sayHello() {
    console.log(`hello ${this.name}`);
  }
}
let obj = new User('jihoon');
obj.sayHello(); //hello jihoon
```
### 5-3. 객체 멤버
객체는 결국 변수와 함수를 묶어서 관리하기 위함 => 내부의 변수, 함수가 결국 객체 멤버이다
변수는 프로퍼티, 함수는 메서드라고 부르기도 함
프로퍼티는 생성자 내에서 this.프로퍼티명 형태로 선언하고, 메서드는 생성자 밖, 클래스 내에서 function 예약어 없이 선언하는 것이 일반적
클래스 영역에서 프로퍼티를 선언할 수 있고, 함수를 this.함수명(){} 형태로 선언할 수 있다.
단, 클래스 내에 멤버를 추가할 때는 변수 선언 키워드(var, let, const)를 사용할 수 없고, 함수 선언 키워드(function)도 사용하지 않음
```js
class User {
  constructor(name) {
    //생성자 내부에서 this 키워드를 이용하여 변수, 함수 선언 가능
    this.name = name;
    this.sayHello = function() {
      console.log(`hello ${this.name}`);
    }
  }
  //클래스 영역 내부에서 프로퍼티, 함수 선언 가능, 단 변수, 함수 선언 키워드(var, let, const, function) 사용 불가
  name = 'kay'
  sayBye() {
    console.log(`bye ${this.name}`);
  }

  //권장안
  constructor(name, age) {
    //프로퍼티는 생성자 내부에 선언
    this.name = name;
    this.age = age;
  }
  //메서드는 클래스 영역에서 function 키워드를 제외하고 선언
  sayHi() {
    console.log(`hi ${this.name}`)
  }
}

//객체 생성, 객체 멤버 접근은 동일
let obj = new User('jay');
obj.sayHello();
```
**변수 멤버 - 생성자 내에 this 키워드를 사용하여 선언 권장**
**메서드 멤버 - 클래스 내에 function 키워드를 제외하고 선언 권장**

### 5-4. private 멤버
OOP 에서 접근 제한자는 선언된 멤버의 접근 가능한 범위를 제한하는 역할을 수행
설정 가능한 접근 범위
- 전역에서 접근 가능
- 클래스 내에서만 제한적으로 접근 - 클래스 외부에서는 접근 불가
- 클래스 내와 하위 클래스에서만 사용

접근을 제한하는 이유는 뭡니까? - **유지 보수성 측면에서 유리**

**하지만, 자바스크립트는 접근 제한자 기능이 지원되지 않는다!! 😱**
대신, 클래스 내의 멤버가 클래스 내에서만 접근 가능하고 외부에서 접근하지 않게 하려면 두 가지 방법을 제공한다
- 변수, 함수의 이름을 # 로 시작하는 이름으로 지정(클래스 내부에서만 가능, 생성자 내부에서 선언할 시 불가능)
- 클로저라는 방법을 제공

### 5-5. static 멤버
클래스에 선언된 멤버는 객체 멤버와 static 멤버로 구분된다
변수 자체를 선언할 때 일반 객체 멤버 혹은 static 멤버로 선언할지 결정 가능
static 멤버는 객체 생성시 객체 메모리에 저장되지 않고, 클래스 선언 시 딱 하나의 공통된 메모리에 저장됨 (prototype 과 유사)
static 예약어로 선언, 없으면 일반 객체 멤버. 일반 객체 멤버는 객체가 생성될 때마다 객체에 해당되는 메모리에 저장된다