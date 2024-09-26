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

  //product 항목을 선택 시 선택한 상품 리스트에 추가
  productNode.addEventListener('click', () => {
    let productSelected = list.querySelectorAll('option:checked');
    productSelected.forEach(data => {
      let cartItem = document.createElement('li');
      let cartItemText = document.createTextNode(`${data.textContent}`)
      cartItem.appendChild(cartItemText);
      cartList.append(cartItem);
    });

    let cartItem = cartList.querySelectorAll('li')
    console.log(cartItem)
  })
}

//선택한 상품 리스트에 추가하는 로직 수정 필요