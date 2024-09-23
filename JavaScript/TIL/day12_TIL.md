#### 3-3-4. 스타일 이용
**style**
- JS 에서 CSS style 값을 획득하고 변경해야 하는 경우가 존재
- 이때 사용하는 것이 .style 프로퍼티
```js
document.querySelector('css selector').style.cssPropertyName //노드 스타일 획득
document.querySelector('css selector').style.cssPropertyName = 'CSS property value' //노드 스타일 변경
```

**getComputedStyle()**
- 위의 style 프로퍼티를 사용하여 접근할 수 있는 style 속성은 inline style 에만 접근 가능
- head 태그 내에 style 을 입력하거나 외부 파일로 style.css 를 분리한 경우에는 조회가 불가
- 그래서 외부 스타일을 접근, 획득하기 위해서는 getComputedStyle() 메서드 사용
```js
getComputedStyle('selector').cssProperty;
//매개 변수에는 스타일을 획득하고자 하는 노드를 입력, cssProperty 에는 조회하고자 하는 css 속성을 입력
```
- 해당 메서드는 조회만 가능하며 수정은 불가

**주의사항** :
- CSS 에서는 프로퍼티를 snake-case 로 입력하지만 JS 는 camelCase 로 작성해야함
- style 프로퍼티를 사용하여 스타일을 변경하는 경우는 인라인 스타일로 적용됨
- 기존에 있는 외부 CSS style(head 내의 style 또는 style.css) 은 변경되지 않음
- 동적으로 변경되는 스타일만 해당되며, CSS 적용 우선순위에 따라 inline style 이 최우선이기 때문에 덮어씌워짐

#### 3-3-5. 노드 동적으로 추가
새로운 노드를 추가할 때 innerHTML, innerText 를 사용할 수 있지만, innerHTML, innerText 는 선택한 노드 내에 있던 내용을 완전히 삭제하고 추가
기존의 내용을 유지하기 위해서는 계속해서 삭제된 내용을 다시 입력해야 함 => 비효율적임
그래서 document 객체에는 노드 객체를 직접 만들고 추가할 수 있는 함수를 제공

**노드 객체 생성 함수**
createElement() - 요소 노드 생성
createAttribute() - 속성 노드 생성
createTextNode() - 텍스트 노드 생성
```js
let newElementNode = createElement('tag name');
let newAttrNode = createAttribute('attribute name'); //속성 노드만 생성
newAttrNode.value = 'attribute value'; //속성 노드에 속성 값을 입력해주어야 한다.
let newTextNode = createTextNode('text');
```

**생성한 노드 객체를 기존의 노드에 추가**
appendChild() - 새로 생성한 노드를 기존의 내용 다음에 추가
insertBefore() - 새로 생성한 노드를 원하는 위치에 추가 가능
이 두 함수 앞에는 새로운 노드를 추가하고자 하는 노드를 입력, 매개변수에는 추가하고자 하는 새로운 노드 입력
```js
currentNode.appendChild(newlyCreatedNode);
currentNode.insertBefore(newlyCreatedNode, currentNode.childNodes[i]); //insertBefore 를 사용하고자 한다면 두 번째 매개변수에는 현재 노드의 자식노드 중 i 번째에 추가하도록 함
currentNode.setAttribute(newAttrNode); //요소 노드에 속성을 추가하고자 한다면 setAttribute() 메서드 사용
```

**노드 삭제**
removeChild() - 자식노드 삭제
```js
currentNode.removeChild(childNode); //매개변수에 하위 노드를 입력, this 사용하여 선택한 객체 삭제 가능
```

*cf - 이벤트 핸들러 내에 또다른 이벤트 핸들러를 추가할 수 있음*

# 4장. JavaScript OOP
객체란 서로 연관된 목적을 갖는 변수 또는 함수를 하나의 변수로 묶어서 사용, 관리하기 위한 요소
예) 회원가입 과정에서 사용되는 변수와 함수를 signUp 이라는 변수의 객체로 묶어서 사용, 관리하는 등
이러한 객체는 JS 나 브라우저가 제공하는 객체가 아니기 때문에 개발자가 직접 만들어야 하는 객체이다.

## 1. Object Literal
### 1-1. 객체 리터럴
객체를 생성하는 가장 기본적이고 간단한 방법

#### 1-1-1. 객체 생성
변수를 선언하고, 해당 변수에 중괄호로 묶은 객체를 할당
```js
let user = {
  //중괄호 내에 있는 데이터는 프로퍼티라고 부르며 하나의 프로퍼티는 프로퍼티 키와 프로퍼티 값으로 불린다
  //프로퍼티는 객체 내에 저장된 변수와 같은 기능을 함
  name: 'jihoon kang',
  birthYear: 1996,
  isMemeber: true,
  order: {
    productId: 2,
    count: 10
  },
  //객체 내의 함수를 메서드라고 부름
  calcAge: function () {
    this.age = 2024 - this.birthYear;
    return this.age;
    //this.age 에 접근하기 전에 함수를 호출해야 해당 객체 데이터가 생성됨
  } 
}
user.calcAge();

```
#### 1-1-2. 객체 내 데이터 접근
객체 내의 데이터에 접근하기 위해서는 객체 멤버 접근 연산자(.) 사용
```js
console.log(user.name); //'jihoon kang'
console.log(user.calcAge()); //28
console.log(user.order.count); //10
```

**객체의 this**
객체 내에 저장된 메서드 내에서 객체의 멤버 값을 사용하는 경우가 존재
이 때는 객체명을 사용하는 것이 아닌 this 키워드 사용
```js
let user = {
  name: 'jihoon kang',
  birthYear: 1996,
  isMemeber: true,
  sayHello: function() {
    console.log(`${this.name}, born in ${birthYear}`);
    //함수 호출 시 this.name 은 콘솔에 출력이 되지만 birthYear 는 출력이 되지 않음, 이는 객체 내의 birthYear 을 지칭하지 않기 때문에 에러 발생
  }
}
```

**화살표 함수와 this**
객체 내에 메서드를 저장할 떄, 화살표 함수도 사용이 가능하다
하지만 화살표 함수 내에서는 this 키워드를 사용하여 현재 객체를 지칭할 수 없다
```js
let user = {
  name: 'jihoon',
  sayHi: () => {
    console.log(`${this.name}, hi`); //arrow function 에서는 this 키워드로 현재 객체를 지칭할 수 없음
  }
}
```

**축약형으로 등록**
객체 내의 프로퍼티 키와 값이 동일한 경우, 프로퍼티 키만 축약형으로 등록 가능
```js
let name = 'jihoon';
let age = 29;

let user = {
  // name: name; //name: 'jihoon'
  // age: age; //age = 29
  //대신 아래처럼 등록 가능 
  name, 
  age 
}
```

**외부에서 객체 멤버 등록**
객체 리터럴을 통해 객체 내에 멤버를 등록 가능
하지만 객체를 선언한 이후 객체에 멤버 추가 등록 가능
```js
let user = {
  name: 'joe',
  age: '20'
}

user.address = 'seoul'
user.calcBirthYear = function() {
  console.log(2024 - this.age);
}
//객체 명.추가하고자하는 프로퍼티 키 = 프로퍼티 값
```