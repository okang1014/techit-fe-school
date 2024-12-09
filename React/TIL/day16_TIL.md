2024.12.05.(목)

## 9장. HTTP 통신과 Ajax

### 9-2. Ajax

#### Data Fetching Pattern

- 컴포넌트 렌더링과 데이터를 불러오는 과정을 어떤 순서로 진행할 것인가?
- 컴포넌트를 렌더링하는 것과 비동기 데이터를 로딩하는 것 사이의 관계를 정의
- 렌더링 타이밍을 조절

##### Fetch-on-render

- 컴포넌트가 렌더링된 이후 데이터 fetch
- 지금까지 진행한 실습은 모두 컴포넌트를 로딩한 후 데이터 fetch
- 최초 컴포넌트 렌더링 시 데이터가 출력되는 부분은 비운채로 먼저 렌더링
- 렌더링 완료 후 fetch 된 데이터를 화면에 출력
- 렌더링 => 데이터 fetching => setState => 리렌더링

```jsx
import axios from "axios";
import { useEffect, useState } from "react";

// 게시글 조회 API 호출 함수
function fetchPost() {
  return axios.get("https://11.fesp.shop/posts/1?delay=3000", {
    headers: {
      "client-id": "00-brunch",
    },
  });
}

// 게시글 상세 조회 페이지
function FetchOnRender() {
  const [data, setData] = useState();

  useEffect(() => {
    fetchPost().then((res) => {
      setData(res.data);
    }); // axios 는 promise 객체를 반환, then 을 사용해서 콜백함수로 promise 실행 결과를 사용할 수 있음
    // Promise 객체 찾아보기
  }, []);

  if (!data) {
    return <div>게시글 로딩중</div>;
  }

  return (
    <>
      {/* {data && <h4>{data.item.title}</h4>} */}
      <h4>{data.item.title}</h4>
      <Replies />
    </>
  );
}

// 댓글 목록 조회 API 호출 함수
function fetchReplies() {
  return axios.get("https://11.fesp.shop/posts/1/replies?delay=2000", {
    headers: {
      "client-id": "00-brunch",
    },
  });
}

// 댓글 목록 조회 페이지 -> FetchOnRender 컴포넌트 아래에 삽입
function Replies() {
  const [data, setData] = useState();

  useEffect(() => {
    fetchReplies().then((res) => {
      setData(res.data);
    }); // axios 는 promise 객체를 반환, then 을 사용해서 콜백함수로 promise 실행 결과를 사용할 수 있음
    // Promise 객체 찾아보기
  }, []);

  if (!data) {
    return <div>댓글 로딩중</div>;
  }

  // 서버로부터 받아온 데이터 배열을 map 함수를 사용하여 각 배열의 항목마다 li 태그를 생성
  const list = data.item.map((item) => <li key={item._id}>{item.content}</li>);

  return (
    <>
      <ul>{list}</ul>
    </>
  );
}

export default FetchOnRender;
```

**장점**

- 컴포넌트가 독립적으로 작동, 재사용성이 높음
- 코드의 직관성이 높음

**단점**

- 페이지 렌더링과 데이터 요청이 순차적으로 발생 => 폭포수 현상 발생
- 순차적으로 fetch 처리, 만일 데이터를 불러오는 과정에서 지연이 발생하면 순차적으로 실행되기 때문에 로딩 시간이 증가
- 부모 컴포넌트와 자식 컴포넌트가 동일한 데이터를 서버에 요청하는 경우, 네트워크 중복 요청 발생 => 성능 저하 우려

##### Fetch-then-render

- 데이터 fetch 후 렌더링
- 컴포넌트 외부에서 Promise.all 로 promise 를 반환하는 함수를 실행
- 해당 파일이 상위 컴포넌트에 의해 import 될 떄, 함수를 실행하고 서버로부터 데이터를 가져옴
- 불러온 데이터를 가지고 렌더링

```jsx
import axios from "axios";
import { useEffect, useState } from "react";

// 게시글과 댓글 목록 조회 동시에 진행
function fetchData() {
  // Promise.all - 여러 promise 객체를 배열로 담아서 동시에 실행
  return Promise.all([fetchPost(), fetchReplies()]).then(([post, replies]) => ({
    post: post.data,
    replies: replies.data,
  }));
  // Promise 객체 내의 비동기 함수가 성공되었을 때, 함수 실행 결과로 콜백함수 실행
}

// 해당 함수는 상위 컴포넌트에서 import 될 때 실행
// 서버로부터 데이터를 먼저 fetch
// 컴포넌트 렌더링 전에 실행된다
const promise = fetchData();

// 게시글 조회 API 호출 함수
function fetchPost() {
  return axios.get("https://11.fesp.shop/posts/1?delay=3000", {
    headers: {
      "client-id": "00-brunch",
    },
  });
}

// 게시글 상세 조회 페이지
function FetchThenRender() {
  // 두 개의 분리된 상태로 관리
  const [post, setPost] = useState();
  const [replies, setReplies] = useState();

  useEffect(() => {
    // promise 객체 실행 완료 후 실행될 코드
    promise.then((res) => {
      setPost(res.post);
      setReplies(res.replies);
    });
    // Promise 객체 찾아보기
  }, []);

  if (!post) {
    return <div>게시글 로딩중</div>;
  }

  return (
    <>
      <h4>{post.item.title}</h4>
      {/* 하위 컴포넌트에 props 로 댓글 객체 전달 */}
      <Replies replies={replies} />
    </>
  );
}

// 댓글 목록 조회 API 호출 함수
function fetchReplies() {
  return axios.get("https://11.fesp.shop/posts/1/replies?delay=2000", {
    headers: {
      "client-id": "00-brunch",
    },
  });
}

// 상위 컴포넌트로부터 받아온 replies props 사용
function Replies({ replies }) {
  // 부모 컴포넌트에서 이미 받았기 때문에 불필요
  // const [data, setData] = useState();
  // useEffect(() => {
  //   fetchReplies().then((res) => {
  //     setData(res.data);
  //   }); // axios 는 promise 객체를 반환, then 을 사용해서 콜백함수로 promise 실행 결과를 사용할 수 있음
  //   // Promise 객체 찾아보기
  // }, []);

  if (!replies) {
    return <div>댓글 로딩중</div>;
  }

  // 서버로부터 받아온 데이터 배열을 map 함수를 사용하여 각 배열의 항목마다 li 태그를 생성
  const list = replies.item.map((item) => (
    <li key={item._id}>{item.content}</li>
  ));

  return (
    <>
      <ul>{list}</ul>
    </>
  );
}

export default FetchThenRender;
```

**장점**

- 컴포넌트 간 이동 중 로딩 상태가 짧거나 없음
- 네트워크 중복 요청 방지 가능

**단점**

- 렌더링 전에 초기 로딩이 길어질 수 있음
- 부모 컴포넌트가 자식 컴포넌트의 의존성을 모두 관리해야하므로 복잡성 증가

##### Fetch-as-you-render

- React 의 suspense 컴포넌트 사용
- 데이터 fetching 과 렌더링 동시에 실행

```jsx
// App.jsx
function App() {
  return (
    <>
      <h1>04 Data Fetching Pattern - Fetch-as-you-render</h1>
      <Suspense fallback={<div>Post list loading in progress</div>}>
        <PostList />

        <Suspense fallback={<div>Post detail loading in progress</div>}>
          <FetchAsYouRender />

          <Suspense fallback={<div>Replies loading in progress</div>}>
            <Replies />
          </Suspense>
        </Suspense>
      </Suspense>
    </>
  );
}

// Component
import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

// 게시글 조회 API 호출 함수
function fetchPost() {
  return axios.get("https://11.fesp.shop/posts/1?delay=3000", {
    headers: {
      "client-id": "00-brunch",
    },
  });
}

// 게시글 상세 조회 페이지
function FetchAsYouRender() {
  // const [data, setData] = useState();
  // useEffect(() => {
  //   fetchPost().then((res) => {
  //     setData(res.data);
  //   });
  // }, []);

  const { data } = useSuspenseQuery({
    // suspense: true, // useQuery 사용 시 option 을 지정하면 suspense 컴포넌트와 함께 연동
    queryKey: ["posts", 1],
    queryFn: () => fetchPost(), // promise 객체 반환, 자동으로 suspense 컴포넌트에 throw
    select: (res) => res.data,
    staleTime: 1000 * 10,
  });

  // suspense 에 throw 되고, 아래 코드가 실행되지 않음
  // if (!data) {
  //   return <div>게시글 로딩중</div>;
  // }

  return (
    <>
      <h4>{data.item.title}</h4>
    </>
  );
}

// 댓글 목록 조회 API 호출 함수
function fetchReplies() {
  return axios.get("https://11.fesp.shop/posts/1/replies?delay=4000", {
    headers: {
      "client-id": "00-brunch",
    },
  });
}

// 댓글 목록 조회 페이지 -> FetchOnRender 컴포넌트 아래에 삽입
export function Replies() {
  const { data } = useSuspenseQuery({
    // suspense: true, // useQuery 사용 시 option 을 지정하면 suspense 컴포넌트와 함께 연동
    queryKey: ["posts", 1, "replies"],
    queryFn: () => fetchReplies(), // promise 객체 반환, 자동으로 suspense 컴포넌트에 throw
    select: (res) => res.data,
    staleTime: 1000 * 10,
  });

  // 서버로부터 받아온 데이터 배열을 map 함수를 사용하여 각 배열의 항목마다 li 태그를 생성
  const list = data.item.map((item) => <li key={item._id}>{item.content}</li>);

  return (
    <>
      <ul>{list}</ul>
    </>
  );
}

export default FetchAsYouRender;
```

**장점**

- 데이터 요청과 컴포넌트 렌더링이 병렬로 진행되어 성능 최적화 가능
- Suspense 를 사용해 비동기 로직이 간결해짐

**단점**

- Suspense 컴포넌트를 추가적으로 감싸는 부분이 복잡할 수 있음
- Suspense 와 함께 동작하는 비동기 로직을 직접 작성하기가 복잡해서 외부 라이브러리를 사용하는 경우도 발생
