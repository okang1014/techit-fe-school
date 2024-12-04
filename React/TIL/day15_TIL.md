2024.12.04.(수)

## 9장. HTTP 통신과 Ajax

### 9-2. Ajax

#### React Query

- React 에서 Axios 같은 비동기 데이터 처리 작업을 손쉽게 사용할 수 있도록 지원하는 라이브러리
- API 서버로부터 받아온 데이터를 캐시하거나 폴링하는 작업을 자동으로 수행, 서버의 상태와 클라이언트 동기화 (invalidateQueryClient())
- Pagination, 무한 스크롤 등 성능 최적화에 필요한 다양한 기능 제공
- React query 를 사용하고자 하는 컴포넌트를 QueryClientProvider 컴포넌트로 감싸야 함

```jsx
// main.jsx
// 새로운 클라이언트 객체 생성, 리액트 쿼리를 사용하기 위한 초기 설정
const queryClient = new QueryClient();

function App() {
  return(
    // props 로 client 객체 전달
    <QueryClientProvider client={queryClient}>
      <Page />
      <ReacQueryDevtools initialIsOpen={false}>
    </QueryClientProvider>
  )
}
```

##### 1. useQuery();

- 서버의 데이터를 조회할 때 사용(GET)
- 응답 받은 데이터는 캐시되며 다음번 요청 시 서버에 요청하지 않고, 캐시된 데이터 반환
- 캐시 상태:
  - fresh: 쿼리 실행 직후 캐시된 상태, 동일한 쿼리 실행 시 캐시된 데이터 반환
  - stale: 시간이 지나면 캐시된 데이터는 stale(고인) 상태가 됨, 동일한 쿼리 실행 시 일단 캐시된 데이터를 반환함과 동시에 서버 요청, 응답을 받으면 새로운 데이터로 교체, 컴포넌트 리렌더링

```jsx
// useQuery 로 데이터를 받아와서 상태를 사용하는 컴포넌트
// 컴포넌트가 로딩되면 자동으로 useQuery 실행
// useQuery 는 data, isLoading, error, refetch 함수를 반환
const { data, isLoading, error, refetch } = useQuery({
  queryKey: ["products", 7],
  // 캐시될 키 값
  queryFn: () => axios.get(`/todolist/${_id}`),
  // useQuery 호출 시 실행될 함수
  select: (res) => res.data.item,
  // queryFn 실행 결과(axios 호출 결과) 데이터 객체 중 속성을 추출하여 필요한 속성만 사용
  refetchInterval: 1000 * 3,
  // 지정된 시간 간격으로 refetch 실행
  staleTime: 1000,
  // 캐시된 값의 상태가 fresh 에서 stale 로 변경되는 시간, default 0
  gcTime; 1000*6,
  // 캐시된 데이터가 지정된 시간동안 사용되지 않으면 캐시 데이터에서 제거
  retry: true || false || number
  // 실패한 쿼리 재시도 여부 및 횟수, true 인 경우 무한 재시도, false 는 재시도 안함, 정수는 재시도 횟수
  // 기타 option 은 강의 Readme 참조
});
```

- data : queryFn 실행 결과로 전달받은 데이터(서버 데이터)
- isLoading : axios 실행 상태를 담은 객체
- error : axios 실행 시 발생한 에러
- refetch : 서버의 데이터를 다시 불러오는 함수

##### 2. useMutation();

- 서버의 데이터를 변경할 때 주로 사용(POST, PUT, PATCH, DELETE)
- useMutation 은 React Hook 이며, 컴포넌트 루트에서만 사용 가능
- useMutation 은 쿼리를 바로 실행하지 않고, 쿼리를 실행할 때 사용할 함수를 반환, 반환된 함수를 이벤트 핸들러에서 사용 가능

```jsx
const addItem = useMutation({
  // useMutation 실행 시 mutationFn 에서 지정한 함수는 mutate() 함수로 반환, 이벤트 핸들러에 addItem.mutate 를 추가하면 해당 mutationFn 에서 지정한 함수 실행
  mutationFn: (item) => axios.post(`/todolist`, item),
  // 작업 성공 시(API 서버 데이터 요청 및 응답) 실행될 코드(axios 의 try 와 유사)
  onSuccess: () => {
    alert("할 일이 추가되었습니다.");
    reset();
    // 지정한 키의 쿼리 캐시를 무효화
    queryClient.invalidateQueries(["todolist"]);
    // todolist 로 시작되는 모든 쿼리값은 유지하되 그 이후의 페이지네이션 값은 캐시 초기화, fresh, stale 상관 없이
    // 할 일 목록 페이지로 이동
    navigate(-1);
  },
  // 작업 실패 시(에러 발생) 실행될 코드(axios 의 catch 와 유사)
  onError: (err) => {
    console.log("서버에서 에러 응답");
    alert(err?.message || "할 일 추가에 실패했습니다.");
  },
  // 서버 응답 성공 실패 여부와 관계 없이 실행(axios 의 finally 와 유사)
  onSettled: () => {
    console.log("처리 완료");
    setIsLoadig(false);
  },
  // gcTime, retry 는 useQuery 기능과 동일
});
```

**invalidateQueries**

- useQuery 에서 사용된 queryKey 를 지정해서 캐시된 쿼리를 무효화시키고 데이터를 다시 호출
- 사용 예시

```jsx
const queryClient = useQueryClient();

const editItem = useMutation({
  mutationFn: (_id) => axios.patch('/todolist', _id);
  onSuccess: () => {
    queryClient.invalidate(['todolist']);
    // todolist 로 시작되는 쿼리값은 유지하되 이후의 쿼리는 캐시 초기화(fresh, stale 상태 무관)
  }
});
```
