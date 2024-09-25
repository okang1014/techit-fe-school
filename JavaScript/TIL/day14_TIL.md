## 3. 프로토타입(prototype)
### 3-1. 프로토타입
- 일반 함수, 생성자 상관없이 함수를 선언할 때 함수에 해당하는 프로토타입 객체가 자동으로 생성된다
- 그리고 이때 함수를 통해 객체를 생성하지 않아도 함수를 선언하는 것 만으로 프로토타입 객체가 생성
```js
function User1(name, age) {
  this.name = name;
  this.age = age;
}

console.log(User.prototype); 
//어? 난 아직 객체 생성 안했는디..?? 걱정말라! 함수 선언할 때 이미 prototype 객체가 만들어져 있당께
console.log(new User('고길동', 20))
```
- 함수가 선언되었을 때 생성되는 prototype 객체는 cousntructor() 함수만 있음
- prototype 객체도 결국 객체이기 떄문에 개발자 의도에 의해 메서드, 프로퍼티 추가 가능

**생성자 함수에 의해 객체가 생성되는 과정**
생성자 함수 선언 
-> 자동으로 생성자 함수에 대한 prototype 객체 생성, 객체 내부에는 constructor() 함수가 포함되어 있다
-> new 연산자 + 생성자 함수에 의해 prototype 객체 내의 constructor() 함수 실행
-> 객체 생성, 반환

- 프로토타입은 객체이기 때문에 프로토타입 객체 내에 프로퍼티, 메서드를 추가 가능하다
```js
function User(name, birthYear) {
  this.name = name;
  this.birthYear = birthYear;
}
//ObjectName.prototype.name 형식으로 프로토타입 내에 변수, 객체 추가 가능, 생성자 함수 내에도 추가 가능
User.prototype.currentYear = 2024;
User.prototype.calcAge = function() {
  return this.age =  this.currentYear - this.birthYear;
}
//prototype 객체에 추가된 프로퍼티 및 메서드는 생성자 함수에 의해 생성된 인스턴스(객체)에서 참조 가능

let user1 = new User('jihoon', 1996);
console.log(user1); //아직 객체 내에 함수가 실행되지 않았기 때문에 User {name: 'jihoon', birthYear: 1996} 만 출력

user1.calcAge(); //함수 실행 - 객체에서 프로퍼티 객체 내의 함수(메서드) 호출이 가능하다. 메서드를 호출하였기 때문에 user1 객체 내에는 age 라는 프로퍼티가 생성
console.log(user1); //User {name: 'jihoon', birthYear: 1996, age: 28}
```
**프로토타입 객체에 추가된 프로퍼티, 메서드는 생성자 함수에 의해 생성된 객체가 공유하는 프로퍼티, 메서드이다**

생성자 함수에 의해 생성된 객체에서 프로토타입 객체에 접근하기 위해서는 __proto__ 를 사용하여 접근할 수 있다
```js
user1.currentYear = 2023; //user1 객체에 currentYear 프로퍼티 추가
user1.calcAge = function() {
  console.log('hello')
}

//user1 내에 currentYear 프로퍼티와 calcAge() 메서드가 추가 - 프로토타입 객체 내의 멤버와 동일한 이름의 멤버를 생성한 경우, 자신 내의 멤버를 출력
console.log(user.currentYear); //2023
console.log(user.calcAge()); // f() {console.log('hello')};

//__proto__ 를 사용하여 prototype 객체 내의 멤버 접근 가능
console.log(user.__proto__.currentYear); //2024
```

### 3-2. 프로토타입과 this
객체 내에 프로퍼티와 메서드를 선언 경우 객체의 this 멤버로 추가할 수 있고, 프로토타입 멤버로 선언할 수 있음

**this**
- this 키워드를 사용하여 객체에 추가한 프로퍼티나 메서드는 해당 객체 고유의 프로퍼티, 메서드
- 다른 객체에 동일한 이름으로 프로퍼티 메서드가 추가되어도 이미 저장된 멤버의 값은 변경되지 않음

**prototype**
- prototype 객체 내에 프로퍼티, 메서드가 저장됨
- 동일한 prototype 멤버를 갖는 객체는 같은 프로퍼티, 메서드를 참조
- prototype 멤버를 공유하고 있는 하나의 객체에서 해당 값을 변경하는 경우, prototype 객체 내의 값이 변하기 때문에 이를 참조하는 모든 객체의 데이터 값도 변경됨
### 3-3. 프로토타입 사용의 이점
#### 3-3-1. 메모리 효율성
- 생성자 함수를 통해 객체를 생성할 때, 동일한 프로퍼티 및 *함수*가 반복해서 생성됨
- 해당 객체는 하나의 메모리 공간을 생성, 객체 내의 프로퍼티 메서드를 위한 메모리가 할당
- 모든 객체가 참조할 수 있는 객체에 하나의 프로퍼티, 메서드를 만든다면, 동일한 내용을 다수차례 반복할 필요가 없어서 효율성이 오름
- prototype 객체에 해당되는 메모리만 생성되기 때문에 메모리 측면에서도 효율적

#### 3-3-2. 상속 구현
- OOP 에 있어서 중요한 개념인 상속을 지원 가능
- 이는 어떤 객체 내의 프로퍼티, 메서드를 그대로 다른 객체 내에서 이어받는 것을 의미
- 재사용 측면에서 유리