#### 4-2-2. while 문
for 문과 달리 while 문은 반복 조건만 명시
- while (반복 조건) {body - 반복적으로 실행되는 구문}
- while 문은 최초 조건 판단 결과가 false 인 경우, 한 번도 실행되지 않는 경우가 있음
- body 안의 코드를 반복적으로 실행하다보니 반복 조건을 정확하게 설정하는 것이 중요 -> 무한 루프에 빠지지 않도록 주의

**while 문 실행 순서**
- while 문 진입
- 반복 조건 판단
- body 코드 실행
- 다시 반복 조건 판단 -> true 인 경우 body 코드 재실행, false 인 경우 body 코드 실행 중지

#### 4-2-3. do ... while  ...
while 문의 일종
- do {body - 반복적으로 실행되는 구문} while (반복조건)
- 우선 코드 블록을 실행, 실행한 이후 반복조건을 판단하고 true 인 경우 body 코드 재실행, false 인 경우 코드 실행 중지
- 반복 조건을 만족하는 경우 반복 실행되는 것은 동일하나 while 문이 한 번도 실행되지 않는 경우가 있는 반면, do ... while.. 문은 최소 한 번은 실항

**for 문과 while 문을 사용하는 경우**
for 문과 while 문 모두 동일하게 사용이 가능하다. 하지만 특정 상황에서 어떤 반복문을 사용하는 것이 유리한 경우는 존재
- for 문 - 제한된 횟수를 반복하는 경우 효율적이다. 또는 반복될 횟수를 파악이 가능한 경우 사용하는 것이 좋다.
- while 문 - 특정 조건 내에서 반복되는 횟수를 파악하기 어려운 경우 유리하다. 또는 별도의 실행 중지 전까지 계속 반복해야 하는 경우 사용이 가능하다.

#### 4-2-3. break, continue 문
- break 문과 continue 문은 포함되어 있는 제어문을 추가로 제어하기 위한 제어문
- **자신과 가장 가까운 코드 블록의 실행을 제어**
- break 문과 countinue 문 다음에 나오는 코드는 실행되지 않는다.
- 특정 코드 블록을 제어하고자 한다면 제어하고자 하는 코드 블럭에 label(변수처럼 개발자가 별도로 지정 가능)을 지정해주어야 한다.
  - label : for () {body - 코드 실행; break label;} label 을 가지고 있는 코드 블록 실행 제어

**break 문**
- 코드 실행 흐름 중 break 문을 만나면 break 문이 포함되어 있는 코드 블록(반복문 등)의 실행을 멈추고 탈출하는 기능을 한다.
- 주로 switch-case 문, 그리고 반복문을 특정 조건을 만족하는 경우 실행을 중지할 때 사용

**continue 문**
- break 와 동일하게 코드 실행 흐름을 멈춘다.
- break 문과 달리 코드 블록의 실행을 완전히 멈추고 코드 블록에서 탈출하는 것이 아닌, 반복 조건을 판단하는 코드로 다시 돌아가 해당 위치부터 코드를 재실행한다.