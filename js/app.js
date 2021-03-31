"use strict";

//import { milKey } from './keys.js';
let cleanAPIData = [];
let allCleanAPIData = [];


let load = function(news) {

  fetchThings(url, news);
  };

// Async Await Method
let url = 'https://www.reddit.com/r/LosAngeles/top.json';

const fetchThings = async (url, news) => {
  //let dataArray = [];
  try {
    // fetch the raw response
    const rawResponse = await fetch(url);

    if (!rawResponse.ok) {
      throw new Error(rawResponse);
    }

    // parse response into json
    const jsonResponse = await rawResponse.json();
    //console.log(jsonResponse);
    let obj = [];
    // now we can do whatever we want with jsonResponse
    // add elements to DOM, make more requests, etc.
    // condition for diffrent Api url
    if (news){
      console.log('new',jsonResponse);
      jsonResponse.articles.forEach(function(element) {
      
        obj = {
          title: element.title,
          thumbnail: element.urlToImage,
          url: element.url,
          author: element.author,
          selftext: element.selftext,
          ups: element.publishedAt
        };
        cleanAPIData.push(obj);

        allCleanAPIData.push(obj);
        //renderRows(element);
      });
    } else {
      console.log(jsonResponse.data.children);
      jsonResponse.data.children.forEach(function(element) {
        
         obj = {
          title: element.data.title,
          thumbnail: element.data.thumbnail,
          url: element.data.url,
          author: element.data.author,
          selftext: element.data.selftext,
          ups: element.data.ups
        };
        cleanAPIData.push(obj);

        allCleanAPIData.push(obj);
        //renderRows(element.data);
      });
    }
  } catch (err) {
    /// Error API is not working!
    console.log('err', err);
    alert("API is not working!");
  }
  printLoad();
  // current location of Poupup 
  let artCont =  document.querySelectorAll(".articleContent a");
  //console.log(artCont.length);
  for (let i= 0; i< artCont.length; i++){

    artCont[i].addEventListener("click", function(){

      popNewUp(cleanAPIData[i]);
      console.log(`data array: ${cleanAPIData[i].title}`);

    });
  }
  // let artCont2 =  document.querySelectorAll("#main2 .articleContent a");
  // //console.log(artCont2.length);
  // for (let i= 0; i< artCont2.length; i++){
  //   console.log('search popup workssssssssssssssssss');
  //   artCont2[i].addEventListener("click", function(){

  //     popNewUp(cleanAPIData[i]);
  //     //console.log(`data array: ${dataArray[i]}`);

  //   });
  // }
};
/// default load
load();
function printLoad(){
cleanAPIData.forEach(renderRows);};

/// build article
function renderRows(element) {
  // default picture
 let article = document.createElement('article');
if (element.thumbnail === "self" || element.thumbnail === "default"){
element.thumbnail = "images/article_placeholder_1.jpg";
};
  article.innerHTML = `
    <article class="article">
      <section class="featuredImage">
        <img src="${element.thumbnail}" alt="" />
      </section>
      <section class="articleContent">
          <a href="#"><h3>${element.title}</h3></a>
          <h6>Lifestyle - ${element.author}</h6>
      </section>
      <section class="impressions">
      ${element.ups}
      </section>
      <div class="clearfix"></div>
    </article>
  `;
  document.getElementById('main').appendChild(article);

/// Remove loader and add hidden classes for new url
  document.querySelector("#popUp").classList.remove("loader");
  document.querySelector("#popUp").classList.add("hidden");
}

// PopUp function
let popNewUp = function (element){
  console.log('popup works');
console.log(element.title);
  document.querySelector("#popUp").classList.remove("hidden","loader");
  //console.log(element);     
  //console.log(this.textContent);

    document.querySelector('#popUp').innerText = ``;
    document.querySelector('#popUp').innerHTML =
      `<a href="#" class="closePopUp">X</a>
           <div class="container">
              <h1>${element.title}</h1>
              <p>${element.selftext || "There is no description for this article."}</p>
            <a href="${element.url}" class="popUpAction" target="_blank">Read more from source</a>
          </div>`
    ;
  ////  close PopUP
  document.querySelector(".closePopUp").addEventListener("click",function () {
    console.log('popup close');
    document.querySelector("#popUp").classList.add( "loader", "hidden");
  });
};


/// Navbar function -----------------------------------------------
let urlChange = function(newUrl, news){
  // load new url
  document.querySelector("#popUp").classList.remove("hidden");
  document.querySelector("#popUp").classList.add("loader");
  //console.log('work url2');
  cleanAPIData = [];
  url = newUrl;
  // remove and refresh the page
  main.innerHTML = ``;
  load(news);
};

// First news
let urlNew1 = document.getElementById('url1');
urlNew1.onclick = function(){
  let url = 'https://www.reddit.com/r/LosAngeles/top.json';
  urlChange(url);
};

// Second news
let urlNew2 = document.getElementById('url2');
urlNew2.onclick = function(){
  let url = 'https://www.reddit.com/r/vancouver/top.json';
  urlChange(url);
};

// Third news
let urlNew3 = document.getElementById('url3');
urlNew3.onclick = function(){
  let url = 'https://www.reddit.com/r/Toronto/top.json';
  urlChange(url);
};
// Fourth news
let urlNew4 = document.getElementById('url4');
urlNew4.onclick = function(){
  //let url = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=214b0c558498448797163c59349a0165';

  let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.milKey}`;
  urlChange(url, "news");
  //Sconsole.log(url);
};
// logo
let logo = document.getElementById('logo');
logo.onclick = function(){
  let url = 'https://www.reddit.com/r/LosAngeles/top.json';
  urlChange(url);
};

/// Search
document.querySelector('#search a').addEventListener('click', function(){
  console.log(cleanAPIData);
  
  document.querySelector('#search').classList.toggle('active');
  document.querySelector('#input').addEventListener('keypress', function(e){
  main2.innerHTML = ``;
  if (e.key === 'Enter') {  
  console.log('search works');
  let value = document.querySelector('#input').value.toLowerCase();
  //console.log(value);
  cleanAPIData.forEach(el => {
      //console.log(el);
    if(el.title.toLowerCase().indexOf(value) != -1){
      //console.log(el.title)
      // hide main 
      document.querySelector('#main').style.display = "none";
      searchFind(el);
      
      }
    });
///////////////////////////////////////////////////////////////////////////
    ////Pouup main22222222222222222
    let artCont2 =  document.querySelectorAll("#main2 .articleContent a");
    //console.log(artCont2.length);
    for (let i= 0; i< artCont2.length; i++){
      console.log('search popup workssssssssssssssssss');
      console.log(cleanAPIData[i]);

      artCont2[i].addEventListener("click", function(){
  
        popNewUp(cleanAPIData[i]);
        console.log(cleanAPIData[i]);
        //console.log(`data array: ${dataArray[i]}`);
  
      });
    }
  }});
  
  document.querySelector('#input').value= '';
  document.querySelector('#main').style.display = "block";
});


function searchFind(element) {
  //contentToDom(element);
  let article = document.createElement('article');

  if (element.thumbnail === "self" || element.thumbnail === "default"){
    element.thumbnail = "images/article_placeholder_1.jpg";
    };
      article.innerHTML = `
    
    
        <article class="article" >
          <section class="featuredImage">
            <img src="${element.thumbnail}" alt="" />
          </section>
          <section class="articleContent">
              <a href="#"><h3>${element.title}</h3></a>
              <h6>Lifestyle - ${element.author}</h6>
          </section>
          <section class="impressions">
          ${element.ups}
          </section>
          <div class="clearfix"></div>
        </article>
      `;
    
  document.getElementById('main2').appendChild(article);

/// Remove loader and add hidden classes for new url
  document.querySelector("#popUp").classList.remove("loader");
  document.querySelector("#popUp").classList.add("hidden");
  
}
