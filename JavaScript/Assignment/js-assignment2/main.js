"use strict";

window.addEventListener('load', () => {
  console.log('loaded');

  //필요한 노드 획득
  let searchBar = document.querySelector('.search-bar');
  let searchNode = document.getElementById('search');
  let btnNode = document.getElementById('search-button');
  let resultNode = document.getElementById('results');
  let wrapperNode = document.querySelector('.wrapper');

  //result 부분에 데이터 출력
  let printSearchResult = function (obj) {
    //articleTitle
    let articleTitle = document.createElement('h2');
    articleTitle.setAttribute('class', 'article-title');
    let articleTitleTxt = document.createTextNode(`${obj.title}`);
    articleTitle.appendChild(articleTitleTxt);

    //articleInfo
    let articleInfo = document.createElement('p');
    let articleInfoTxt = document.createTextNode(`${obj.author}, ${obj.publishedAt}`);
    articleInfo.appendChild(articleInfoTxt);

    //moreLink
    let moreLink = document.createElement('a');
    moreLink.setAttribute('href', `${obj.url}`);
    moreLink.setAttribute('target', '_blank');
    let moreLinkTxt = document.createTextNode('more');
    moreLink.appendChild(moreLinkTxt);

    //articleInfoSection = articleInfo + moreLink
    let articleInfoSection = document.createElement('div');
    articleInfoSection.setAttribute('class', 'article-info');
    articleInfoSection.appendChild(articleInfo);
    articleInfoSection.appendChild(moreLink);

    //articleTxt
    let articleTxt = document.createElement('p');
    articleTxt.setAttribute('class', 'article-text');
    let articleTxtContent = document.createTextNode(`${obj.description}`);
    articleTxt.appendChild(articleTxtContent);

    //articleMain = articleTitle + articeInfoSeciton + articleTxt
    let articleMain = document.createElement('section');
    articleMain.setAttribute('class', 'article-main');
    articleMain.appendChild(articleTitle);
    articleMain.appendChild(articleInfoSection);
    articleMain.appendChild(articleTxt);

    //articleCoverSrc
    let articleCoverSrc = document.createElement('img');
    articleCoverSrc.setAttribute('src', `${obj.urlToImage == null ? 'images/no-photo.jpg' : obj.urlToImage}`);
    articleCoverSrc.setAttribute('alt', 'article-cover-img');

    //articleCover
    let articleCover = document.createElement('section');
    articleCover.setAttribute('class', 'article-cover');
    articleCover.appendChild(articleCoverSrc);

    //article
    let article = document.createElement('article');
    article.setAttribute('class', 'article');
    article.appendChild(articleMain);
    article.appendChild(articleCover);

    //hrNode
    let hrNode = document.createElement('hr');

    //resultNode 에 출력
    resultNode.appendChild(hrNode);
    resultNode.appendChild(article);
  }

  //검색어 입력하지 않은 경우, 하이라이트 표시
  let printErrorMessage = function () {
    searchBar.setAttribute('style', 'border: 1px solid rgb(228, 0, 0)');
    searchNode.removeAttribute('placeholder');

    let alertNode = document.createElement('p');
    alertNode.setAttribute('class', 'alert');
    let alertTxt = document.createTextNode('검색어가 입력되지 않았습니다.');
    alertNode.appendChild(alertTxt);

    searchBar.appendChild(alertNode);
  }

  btnNode.addEventListener('click', (e) => {
    e.preventDefault();
    //사용자 입력 검색어 획득
    let searchKeyword = searchNode.value;

    if (searchKeyword == 0 || searchKeyword.trim().length == 0) {
      //사용자 검색어 미입력 후 클릭 시 경고 얼럿 출력
      printErrorMessage();
      searchNode.addEventListener('focus', () => {
        searchBar.removeChild(document.querySelector('.alert'));
        searchBar.removeAttribute('style');
        searchNode.setAttribute('placeholder', '검색어를 입력해 주세요.')
      });
    } else {
      //레이아웃 조정
      wrapperNode.setAttribute('style', 'margin-top: 100px');
      //사용자 검색 시간 획득
      let time = new Date();
      let year = time.getFullYear();
      let month = time.getMonth();
      let date = time.getDate();
      let searchTime =
        `${year}-${month < 10 ? '0' + month : month}-${date < 10 ? '0' + date : date}`;

      //XMLHttpRequest
      let xhr = new XMLHttpRequest();
      xhr.open('get', `https://newsapi.org/v2/everything?q=${searchKeyword}&from=${searchTime}&sortBy=publishedAt&apiKey=44dbdbd5948d48e39c3343f8c6a8699d`, true);
      xhr.send();
      xhr.onload = function () {
        if (xhr.status === 200) {
          //HTTP request 정상 요청 완료 
          let data = JSON.parse(xhr.responseText);

          //결과 출력
          if (data.articles.length == 0) {
            //검색어에 해당하는 기사가 없는 경우
            resultNode.innerHTML = '<h3 style="text-align: center; margin-top: 20px;">표시할 기사가 없습니다 😭</h3>'
          } else {
            //검색어에 해당하는 기사가 있는 경우
            resultNode.innerHTML = ''; //기존 검색 결과가 표시되고 있는 경우, 초기화
            //검색어에 해당하는 기사 10개만 출력
            for (let i = 0; i < 10; i++) {
              let news = data.articles[i];
              printSearchResult(news);
            }
          }
        }
      }
    }
  });
});