### 5-3. 파일 내용 읽기
파일의 내용을 읽어서 화면에 출력시키기 위해서는 FileReaderAPI 를 사용해야한다

**FileReaderAPI 함수**
- readAsText() - 파일의 내용을 텍스트, 문자열로 읽음
- readAsDataURL() - 파일의 내용을 읽어 base64(문자열)로 인코딩, 주로 이미지 파일을 읽어들여 화면에 출력하고자 할 때 사용 or 이미지 내용을 DB 에 저장할 때 사용
`<img src="base64:byte 형식으로 인코딩">`
- readAsArrayBuffer() - 파일의 내용을 버퍼로 읽음
- readAsBinaryString() - 파일의 내용을 바이너리 문자열로 읽음

> **buffer 란?**

IO 과정에서 주로 사용되는 용어로, 버퍼를 적용한다는 것은 데이터를 짧게 나누어서 읽고 쓰겠다는 것을 의미

왜? 데이터를 주고 받는 과정에서 파일과 같은 경우, 데이터가 큰 경우가 존재, 버퍼를 적용하지 않고 파일을 주고 받게 되면 OOM(Out Of Memory) 에러가 발생할 수 있어, 프로세스가 중단될 수 있음

*OOM - 프로세스에 할당된 메모리가 가득 찬 상태*

따라서, 버퍼를 적용하여 주고 받을 데이터의 사이즈를 쪼개서 주고 받을 수 있다

메모리 효율을 높이기 위해 사용

**FileReader 이벤트**
파일 내용 읽기는 비동기로 이뤄지기 때문에 읽은 내용은 이벤트를 등록하여 콜백함수를 통해 획득
- load : 파일 읽기 작업이 완료된 순간의 이벤트
- error : 파일 읽기 과정 중 에러가 발생한 순간의 이벤트
- abort : abort() 함수가 호출되어 읽기 작업이 취소된 순간의 이벤트
- progress : 파일 읽기 과정에서 주기적으로 발생하는 이벤트

### 5-4. File - FormData
request 에 파일을 포함하여 서버에 전달하는 것은 Ajax 를 사용하지 않아도 form 태그를 이용하면 가능하다.
폼 태그를 사용해서 폼 태그 내에 method="post" encType="multipart/form-data" 로 전송이 가능하지만 잘 하지 않는다.
이는 파일의 사이즈에 따라 처리 시간이 길어질 수 있고, 동기 통신으로 인한 불편함이 생길 수 있다.
그래서 FormData(API)로 파일을 담아 Ajax 통신을 통해 업로드하는 방법 제공
이 방법으로 파일뿐만 아니라 일반 문자열 데이터도 전달 가능

```js
if (files.length !== 0) {
  //새로운 FormData 생성
  const formData = new FormData();
  //사용자가 선택한 파일이 다수의 파일인 경우를 가정하여 반복문으로 formData 에 파일을 담음
  for (const file of files) {
    //formData 에 파일을 append
    formData.append('file', file);
  }
  //일반 데이터도 append 가능
  formData.append('title', title);

  //비동기 통신이 기본, async, await, post method 를 사용하여 첫 매개변수 url 에 formData 를 전송
  const resp = await axios.post('http://localhost:8000/upload', formData);
  if (resp.data.status === 200) {
    alert('upload ok');
  }
}
```

### 5-5. File - drag & drop
드래그 앤 드롭에 의해 파일을 추가하기 위해서는 태그를 준비해야함
`<div id="drop_zone" ondrop="dropHandler(event)" ondragover="dragOverHandler(event)">`
드래그 앤 드롭 이벤트 발생 시 콜백 함수를 통해 실시

```js
async function upload(files) {
  if (files.length !== 0) {
    let formData = new FormData();
    for (let file of files) {
      formData.append('file', file);
    }
    let resp = await axios.post('http://localhost:8000/upload', formData);
    if (resp.data.status === 200) {
      alert('upload ok');
    }
  }
}

function dropHandler(e) {
  //브라우저의 기본 이벤트 처리 금지
  e.preventDefault(); //브라우저에 파일을 드래그, 드롭하면 그냥 뷰어로 동작

  //drop 한 파일 정보를 추출하여 upload 함수 호출
  upload(e.dataTransfer.files)
}

//dragOver -> 브라우저의 차이에 따라 드래그 오버에 이벤트가 있는 경우 존재, 원천 봉쇄
function dragOverHandler(e) {
  e.preventDefault();
}
```