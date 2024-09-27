"use strict";

//가정 1. 쇼핑몰 물건 구매를 가정
//아래의 JS 코드에 판매할 상품 정보가 저장되어 있다고 가정한다

function Product(name, price) {
  this.name = name;
  this.price = price;
}

let products = [
  new Product('대뱃살', 3000),
  new Product('목살', 5000),
  new Product('배꼽살', 4000),
  new Product('중뱃살', 1000),
]

//필요 노드 획득
let listNode = document.getElementById('list');
let cartList = document.getElementById('cart-list')
let totalPrice = document.getElementById('total-price');

//조건 1 - JS 의 상품정보대로 초기화면 출력
//products 배열 내의 상품 개수만큼 리스트 크기 조정
listNode.setAttribute('size', products.length);

//products 배열 내의 상품 html 화면에 출력
for (let i = 0; i < products.length; i++) {
  let productInfo = `${products[i].name} - ${products[i].price}`
  let productNode = document.createElement('option');
  productNode.setAttribute('id', `product`)
  productNode.setAttribute('value', productInfo)
  let productTextNode = document.createTextNode(productInfo);

  productNode.appendChild(productTextNode);
  listNode.appendChild(productNode);
}

//선택한 상품 리스트에 추가하는 로직 수정 필요

//product 항목을 선택 시 선택한 상품 리스트에 추가
let productNode = listNode.querySelectorAll('option');
//검토가 필요해보임
// let productSelected = listNode.querySelectorAll('#product:checked');

//클릭한 상품 리스트에 출력, 하지만 계속해서 추가됨, innerHTML 사용하면 해결되려나?
// productNode.forEach((product) => {
//   product.addEventListener('click', function () {
//     console.log('clickevent')
//     let cartItem = document.createElement('li');
//     let cartItemText = document.createTextNode(`${product.textContent}`)
//     cartItem.appendChild(cartItemText);
//     cartList.append(cartItem);
//   })
// })

//클릭 이벤트로 할 경우
//1. 하나의 아이템 최초로 클릭했을 때는 list Node 에 추가
//2. 두번째로 클릭했을 때는 listNode 에서 제거
// 클릭했던 노드를 배열에 넣고, 반환하도록
// 재차 클릭한 경우, 배열에서 삭제하는 방법?

let productSelected = [];
productNode.forEach((product) => {
  product.addEventListener('click', () => {
    //선택을 하더라도 하나씩만 productSelected 에 추가되도록
    if (productSelected.every((value) => value !== product.value)) {
      productSelected.push(product.textContent);
      console.log(productSelected);
    } else {
      let index = productSelected.findIndex((value) => value == product.value);
      productSelected.splice(index, 1);
      console.log(productSelected);
    }

    productSelected.forEach((product) => {
      let productNode = document.createElement('li');
      let productTextNode = document.createTextNode(`${product}`);
      productNode.appendChild(productTextNode);

      cartList.appendChild(productNode);
    })
  })
})

//checked 노드를 선택하는 경우,
//checked 된 노드가 포함된 객체를 화면에 출력
//check 되지 않은 노드는 자동으로 객체에서 삭제, 그러면 