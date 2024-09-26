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

console.log(products)

let listNode = document.getElementById('list');

//products 배열 내의 아이템 개수만큼 html 화면에 출력
for (let i = 0; i < products.length; i++) {
  let productNode = document.createElement('option');
  let productTextNode = document.createTextNode(`${products[i].name} - ${products[i].price}`);

  productNode.appendChild(productTextNode);
  console.log(productNode)
  listNode.appendChild(productNode);
}