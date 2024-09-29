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
let checkoutBtn = document.getElementById('checkout');

//조건 1 - JS 의 상품정보대로 초기화면 출력
//products 배열 내의 상품 개수만큼 리스트 크기 조정
listNode.setAttribute('size', products.length);

//products 배열 내의 상품 html 화면에 출력
for (let i = 0; i < products.length; i++) {
  let productName = `${products[i].name}`
  let productPrice = `${products[i].price}`
  let productNode = document.createElement('option');
  productNode.setAttribute('class', `product`)
  productNode.setAttribute('id', productName)
  productNode.setAttribute('value', productPrice)
  let productTextNode = document.createTextNode(`${productName} - ${productPrice}`);

  productNode.appendChild(productTextNode);
  listNode.appendChild(productNode);
}

//product 항목을 선택 시 선택한 상품 리스트에 추가
let productNode = listNode.querySelectorAll('option');

//클릭 이벤트로 할 경우
//1. 하나의 아이템 최초로 클릭했을 때는 list Node 에 추가
//2. 두번째로 클릭했을 때는 listNode 에서 제거
// 클릭했던 노드를 배열에 넣고, 반환
// 재차 클릭한 경우, 배열에서 삭제

let cart = document.getElementById('cart');

let productSelected = [];
let priceSelected = [];
productNode.forEach((product) => {
  product.addEventListener('click', () => {
    //productSelected 배열에 product 의 값이 동일한 요소가 없으면 배열에 추가
    if (productSelected.every((value) => value !== product.textContent)) {
      productSelected.push(product.textContent);
      priceSelected.push(product.value);
      console.log(priceSelected);
    } else {
      //productSelected 배열에 선택한 상품이 있는 경우, 배열에서 삭제
      let index = productSelected.findIndex((value) => value == product.textContent);
      productSelected.splice(index, 1);
      priceSelected.splice(index, 1);
      console.log(priceSelected);
    }

    //선택한 상품이 담긴 배열 cartList 에 출력
    let items = '';
    let total = 0;

    //선택한 상품이 없는 경우
    if (productSelected.length === 0) {
      //선택한 상품, 총액 영역 표시 X
      //총액 노드 value = 0
      // cart.setAttribute('style', 'display: none;');
      cartList.innerHTML = '';
      totalPrice.innerText = '';
      totalPrice.setAttribute('value', 0);
    } else {//선택한 상품이 있는 경우
      //선택한 상품 영역 표시
      //li 노드 추가하여 출력
      productSelected.forEach((product) => {
        cart.setAttribute('style', 'display: block;');
        items += `<li>${product}</li>`;
        cartList.innerHTML = items;
      });
      //선택한 상품의 가격 표시, 총합 노드 value 는 가격 총액
      priceSelected.forEach((price) => {
        total += parseInt(price);
        totalPrice.setAttribute('value', `${total}`);
        totalPrice.innerText = total;
      });
    }
  })
})


//결제하기 버튼을 클릭하면
//1. 어떠한 값도 선택되지 않은 경우 - alert 창 출력
//2. 값을 선택한 경우 checkout.html 출력

//이걸 하기 위해서 특정 노드를 선택, 



checkoutBtn.addEventListener('click', (e) => {
  e.preventDefault();

  var price = totalPrice.innerText;
  function printPrice() {
    return price;
  }
  printPrice()
  console.log(price);

  if (!cartList.hasChildNodes()) {
    alert('결제할 상품을 선택해 주세요.');
  } else {
    window.open(
      'checkout.html',
      '_blank',
      'left=100, top=100, width=500, height=300'
    )
  }
});

