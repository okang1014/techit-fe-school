//문제 설명
// 문자열 my_string 과 정수 n 이 매개변수로 주어질 때, my_string 에 들어있는 각 문자를 n 만큼 반복한 문자열을 return 하도록 solution 함수를 완성해보세요. 
//제한 사항 
//2 <= my_string.length <= 5
//2 <= n <= 10
//"my_string" 은 영어 대소문자로 이루어져 있습니다.

//입출력 예: my_string = "hello", n = 3, result = "hhheeellllllooo"

//문제 접근
//n 회 반복하여 글자가 출력되도록하기 위해 반복문을 사용
//이 과정을 문자열 my_string 에 입력되는 데이터의 string.length 만큼 반복하는 것이 필요
//my_string 의 문자를 n회 반복하여 출력되도록 하기 위해서는 반복되는 문자를 출력할 배열이 필요할 것 같다.

const repeat = function (my_string, n) {
  if (my_string.length < 2 || my_string.length > 5 || n > 10 || n < 2) {
    return '올바른 값을 입력해주세요.'
  } else {
    //반복된 문자가 들어갈 빈 배열 선언
    let result = [];

    //인수로 전달된 단어의 길이만큼 반복
    for (i = 0; i < my_string.length; i++) {

      //매개변수 n 만큼 반복
      for (j = 0; j < n; j++) {
        //매개변수 my_string에 대입된 단어의 i번째 문자열을 빈 배열에 저장. 
        result.push(my_string[i]);
      }
    }
    //result 배열을 반환하도록
    // return result;
    //result 배열을 문자 형태로 반환
    // return `${result}`
    //result 배열을 쉼표 없이 표시하도록(구글 검색)
    return result.join("");
  }
}

console.log(repeat("hello", 5));
console.log(repeat("hello", 1));
console.log(repeat("helloworld", 5));
console.log(repeat("slkdjlfksjdllkfj", 1));