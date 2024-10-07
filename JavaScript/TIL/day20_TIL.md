### 2-4. Axios
대표적인 Ajax 라이브러리
간단한 request 의 경우, XMLHttpRequest 를 사용하여도 무관
하지만 점점 요청에 대한 복잡도가 올라가기 때문에 라이브러리를 사용하는 경우도 존재

Axios 특징
- Axios 는 내부적으로 XMLHttpRequest 를 사용
- Promise API 를 지원하기 때문에 자동으로 비동기 실행
- 서버 응답 결과를 return 을 통해 받음
- 요청 및 응답 interceptor 를 지원
- HTML 문서의 head 부분에 Axios CDN 설정을 통해 사용
```html
<head>
  <script src="axios CDN"></script>
</head>
```

#### Axios 를 이용한 서버 요청
axios() 함수 호출, 매개변수로 서버 요청을 위한 정보 설정(객체 형태)
```js
//axios 함수 호출
axios({
  method: 'get',
  url: `http://localhost:5500/sum/${num}`
})
//promise api 지원 -> then 을 이용하여 콜백함수 호출
  .then(response => {
    printResult(response.data.result);
  })
```
axios() 내의 설정 정보를 config 설정이라고 한다.
편의성을 위해 http request method 에 맞는 별도의 함수 제공 - axios.get(), axios.post(), axios.delete() 등

#### Axios config 설정
서버 연동은 코드에서 여러변 실행될 수 있다 -> url, 사용자 입력 데이터는 변경될 수 있지만, origin 이나 timeout 은 변동되는 경우가 적음
반복되어 사용되는 설정은 axios config 설정을 통해 dry coding 이 가능

config 설정 방법
- axios.defaults 를 통해 axios 객체의 default 설정
```js
axios.defaults.basdURL = "http://localhost:3000"
axios.defaults.timeout = 2000;
//공통이 되는 요소들을 미리 설정하고, 해당 부분 이외의 변동되는 부분만 변경되도록
```

- custom axios 객체를 만들어 공통 정보 설정
```js
//새로운 axios 객체
const myAxios = axios.create({
	baseURL : "http://localhost:3000",
	timeout : 2000;
});

//해당 객체를 가지고 http request 가능
myAxios.post (`post-test`,
	{
		name: '홍길동',
		age: 25
	}
)
```

설정 가능한 정보
- url: 서버 요청 url
- method: HTTP request method
- baseURL: url, http 로 시작하지 않은 경우, url 앞에 들어가는 공통 url
- data: post, put, patch 요청 시 전송될 **바디 스트림**의 데이터
- timeout: 요청 타임아웃 시간 - 요청 후 일정 시간이 초과되면 에러로 간주되는 상황
- params: 요청 url 파라미터, **헤드 스트림**의 데이터
- transformRequest:
  - request 데이터를 조작
  - 여러 함수를 담은 배열을 매개변수로, request 시 데이터는 배열 내의 함수를 거쳐 서버에 전달
  - body stream 의 데이터(post, put, patch 등)를 이용하여 요청한 데이터를 조작하는데 이용
- transformResponse:
  - transformRequest 와 문법은 동일
  - response 의 데이터가 함수를 거쳐 클라이언트에 전달
  - 매개변수는 서버에서 전달받는 데이터

#### HTTP Protocol Review
클라이언트가 서버에 업무 요청을 하고, 서버의 응답을 클라이언트가 받아들이는 방식을 정한 규칙

**http request**
클라이언트 측에서 서버에 요청하는 것
- http request method 별도 지정하지 않는 경우 get 이 default
- request method : get(default), post, put, delete, patch, head
  - get : 데이터 전달 요청 -> read 업무 수행, 데이터를 서버에 전달하겠다면 header 를 통해 데이터 전달(url 에 데이터 추가하여 전달, url path 또는 search(query) 문자열로 전달)
  - post : 데이터 저장 -> create 업무
  - put : 데이터 수정 -> update 업무
  - delete : 데이터 삭제 -> delete 업무
- 위의 request method 를 통해 CRUD 업무를 진행
  - Create : 새로운 데이터 발생, 저장
  - Read : 서버의 데이터 획득
  - Update : 데이터 수정
  - Delete : 데이터 삭제
- http request method 만으로 대략적으로 처리하는 업무를 파악할 수 있따
- get 은 정보를 요청하기만 하는 것이므로 header 데이터, url 에 붙여서 요청할 수 있음(body stream X)
- post, put 은 생성, 수정이기에 body stream 을 통해 추가할 내용을 명시해야함

## 3. Storage API
앱이 실행되는 프로세스 중에는 많은 데이터가 발생되고, 메모리에 저장
하나의 HTML 문서는 고유의 메모리가 할당되며, 문서 내의 데이터는 해당 메모리에 저장
그리고 브라우저의 프로세스가 종료되면 해당 문서의 메모리는 초기화, 다시 시작할 때 새로운 메모리 할당
JavaScript 코드는 하나의 문서 메모리만 접근 가능하며, 한 번에 다수의 메모리를 접근할 수 없음
**이로 인해 발생하는 불편함을 해소하기 위해 storage 기능 제공**

### 3-1. Storage
데이터를 영속적으로 저장하거나, 또는 저장된 데이터를 가져와 앱에 이용하는 것은 가장 기초적이면서 빈번하게 발생하는 기능
백엔드 앱에서는 영속적인 데이터 저장, 이용은 데이터베이스를 이용 - Oracle, MySQL, 클라우드 등

프론트에서 이용되는 데이터를 하나의 메모리에 저장하여 다양한 페이지에서 활용할 수 있도록 하기 위해 Storage 를 사용한다

#### 3-1-1. Storage 의 구분
메모리에 데이터를 저장하는 범위나 메모리에 저장된 데이터를 이용할 수 있는 범위에 따라 sessionStorage 와 localStorage 로 구분
- sessionStorage : 세션 단위로 이용되는 스토리지 - 동일 오리진이어도 세션이 다르면 접근, 이용이 불가한 스토리지
- localStorage : 세션이 다르다고 해도 동일 오리진의 여러 세션에서 공유되는 스토리지

**sessionStorage**
세션이란? - 하나의 오리진 내에 존재하는 각각의 브라우저 창을 의미한다
세션 스토리지는 하나의 페이지 내에서 발생하는 데이터를 저장하고, 저장된 데이터를 이용할 수 있는 스토리지를 의미
세션은 해당 페이지 내에서만 저장 및 이용이 가능하며 브라우저가 종료되거나 컴퓨터가 꺼지면 유실

**localStorage**
로컬 스토리지는 동일한 오리진의 모든 세션에서 공유하는 스토리지를 의미한다
로컬 스토리지에 저장된 데이터는 브라우저가 종료되어도 유실되지 않음

### 3-2. storage 데이터 저장 및 획득
localStorage 와 sessionStorage 에 데이터를 저장하거나 접근하는 함수는 동일하다
단지 객체명에서 차이가 있을 뿐

storage 데이터 저장 및 획득 함수:
- setItem(key, value) : 데이터 저장 - 신규 입력 및 업데이트 가능
- getItem(key) : 스토리지 내에 key 값으로 저장된 데이터 접근
- removeItem(key) : 스토리지 내에 key 값으로 저장된 데이터 삭제
- clear() : 스토리지 내의 모든 데이터 삭제

스토리지에 저장되는 키, 값은 모두 문자열이다
숫자, 객체를 저장해도 에러가 발생하지 않은, 타입이 유지되지는 않는다.
객체를 저장하고 싶다면 JSON.stringify, 획득하여 이용하고자 할 때는 JSON.parse 를 이용하여 변환 필요

**모든 스토리지 데이터 획득**
1) 스토리지 length 프로퍼티를 이용하여 반복문 작성
```js
for (let i = 0; i < sessionStorage.length; i++) {
  let key = sessionStorage.key(i);
  console.log(key, sessionStorage.getItem(key)); //
}
```

2) Object.keys() 를 이용해 모든 키를 배열로 획득
```js
let keys = Object.keys(sessionStorage);
keys.forEach(key => {
  console.log(key, sessionStorage.getItem(key));
})
```