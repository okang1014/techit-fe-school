"use strict";

window.addEventListener('load', () => {
  console.log('loaded');

  //필요한 노드 획득
  let searchNode = document.getElementById('search');
  let btnNode = document.getElementById('search-button');
  let resultNode = document.getElementById('results');
  let wrapperNode = document.querySelector('.wrapper');

  //result 부분에 데이터 출력
  let printSearchResult = function () {
    //articleTitle
    let articleTitle = document.createElement('h2');
    articleTitle.setAttribute('class', 'article-title');
    let articleTitleTxt = document.createTextNode('article-title'); //동적 데이터 수신, 텍스트 입력
    articleTitle.appendChild(articleTitleTxt);

    //articleInfo
    let articleInfo = document.createElement('p');
    let articleInfoTxt = document.createTextNode('article-info'); //추후 동적 데이터 수신 후 텍스트 넣을 예정
    articleInfo.appendChild(articleInfoTxt);

    //moreLink
    let moreLink = document.createElement('a');
    moreLink.setAttribute('href', '#');
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
    let articleTxtContent = document.createTextNode('article-textcontent'); //추후 동적 데이터 수신, 텍스트 입력 
    articleTxt.appendChild(articleTxtContent);

    //articleMain = articleTitle + articeInfoSeciton + articleTxt
    let articleMain = document.createElement('section');
    articleMain.setAttribute('class', 'article-main');
    articleMain.appendChild(articleTitle);
    articleMain.appendChild(articleInfoSection);
    articleMain.appendChild(articleTxt);

    //articleCoverSrc
    let articleCoverSrc = document.createElement('img');
    articleCoverSrc.setAttribute('src', '#'); //동적으로 데이터 수신, 이미지 url 입력하도록
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

  btnNode.addEventListener('click', () => {
    wrapperNode.setAttribute('style', 'margin-top: 100px');
    printSearchResult();
  })
});