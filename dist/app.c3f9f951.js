// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/keys.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.milKey = void 0;
const milKey = '214b0c558498448797163c59349a0165';
exports.milKey = milKey;
},{}],"js/app.js":[function(require,module,exports) {
"use strict";

var _keys = require("./keys.js");

let cleanAPIData = [];
let allCleanAPIData = [];

let load = function (news) {
  fetchThings(url, news);
}; // Async Await Method


let url = 'https://www.reddit.com/r/LosAngeles/top.json';

const fetchThings = async (url, news) => {
  //let dataArray = [];
  try {
    // fetch the raw response
    const rawResponse = await fetch(url);

    if (!rawResponse.ok) {
      throw new Error(rawResponse);
    } // parse response into json


    const jsonResponse = await rawResponse.json(); //console.log(jsonResponse);

    let obj = []; // now we can do whatever we want with jsonResponse
    // add elements to DOM, make more requests, etc.
    // condition for diffrent Api url

    if (news) {
      console.log('new', jsonResponse);
      jsonResponse.articles.forEach(function (element) {
        obj = {
          title: element.title,
          thumbnail: element.urlToImage,
          url: element.url,
          author: element.author,
          selftext: element.selftext,
          ups: element.publishedAt
        };
        cleanAPIData.push(obj);
        allCleanAPIData.push(obj); //renderRows(element);
      });
    } else {
      console.log(jsonResponse.data.children);
      jsonResponse.data.children.forEach(function (element) {
        obj = {
          title: element.data.title,
          thumbnail: element.data.thumbnail,
          url: element.data.url,
          author: element.data.author,
          selftext: element.data.selftext,
          ups: element.data.ups
        };
        cleanAPIData.push(obj);
        allCleanAPIData.push(obj); //renderRows(element.data);
      });
    }
  } catch (err) {
    /// Error API is not working!
    console.log('err', err);
    alert("API is not working!");
  }

  printLoad(); // current location of Poupup 

  let artCont = document.querySelectorAll(".articleContent a"); //console.log(artCont.length);

  for (let i = 0; i < artCont.length; i++) {
    artCont[i].addEventListener("click", function () {
      popNewUp(cleanAPIData[i]);
      console.log(`data array: ${cleanAPIData[i].title}`);
    });
  } // let artCont2 =  document.querySelectorAll("#main2 .articleContent a");
  // //console.log(artCont2.length);
  // for (let i= 0; i< artCont2.length; i++){
  //   console.log('search popup workssssssssssssssssss');
  //   artCont2[i].addEventListener("click", function(){
  //     popNewUp(cleanAPIData[i]);
  //     //console.log(`data array: ${dataArray[i]}`);
  //   });
  // }

}; /// default load


load();

function printLoad() {
  cleanAPIData.forEach(renderRows);
}

; /// build article

function renderRows(element) {
  // default picture
  let article = document.createElement('article');

  if (element.thumbnail === "self" || element.thumbnail === "default") {
    element.thumbnail = "images/article_placeholder_1.jpg";
  }

  ;
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
  document.getElementById('main').appendChild(article); /// Remove loader and add hidden classes for new url

  document.querySelector("#popUp").classList.remove("loader");
  document.querySelector("#popUp").classList.add("hidden");
} // PopUp function


let popNewUp = function (element) {
  console.log('popup works');
  console.log(element.title);
  document.querySelector("#popUp").classList.remove("hidden", "loader"); //console.log(element);     
  //console.log(this.textContent);

  document.querySelector('#popUp').innerText = ``;
  document.querySelector('#popUp').innerHTML = `<a href="#" class="closePopUp">X</a>
           <div class="container">
              <h1>${element.title}</h1>
              <p>${element.selftext || "There is no description for this article."}</p>
            <a href="${element.url}" class="popUpAction" target="_blank">Read more from source</a>
          </div>`; ////  close PopUP

  document.querySelector(".closePopUp").addEventListener("click", function () {
    console.log('popup close');
    document.querySelector("#popUp").classList.add("loader", "hidden");
  });
}; /// Navbar function -----------------------------------------------


let urlChange = function (newUrl, news) {
  // load new url
  document.querySelector("#popUp").classList.remove("hidden");
  document.querySelector("#popUp").classList.add("loader"); //console.log('work url2');

  cleanAPIData = [];
  url = newUrl; // remove and refresh the page

  main.innerHTML = ``;
  load(news);
}; // First news


let urlNew1 = document.getElementById('url1');

urlNew1.onclick = function () {
  let url = 'https://www.reddit.com/r/LosAngeles/top.json';
  urlChange(url);
}; // Second news


let urlNew2 = document.getElementById('url2');

urlNew2.onclick = function () {
  let url = 'https://www.reddit.com/r/vancouver/top.json';
  urlChange(url);
}; // Third news


let urlNew3 = document.getElementById('url3');

urlNew3.onclick = function () {
  let url = 'https://www.reddit.com/r/Toronto/top.json';
  urlChange(url);
}; // Fourth news


let urlNew4 = document.getElementById('url4');

urlNew4.onclick = function () {
  //let url = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=214b0c558498448797163c59349a0165';
  let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${"214b0c558498448797163c59349a0165"}`;
  urlChange(url, "news"); //Sconsole.log(url);
}; // logo


let logo = document.getElementById('logo');

logo.onclick = function () {
  let url = 'https://www.reddit.com/r/LosAngeles/top.json';
  urlChange(url);
}; /// Search


document.querySelector('#search a').addEventListener('click', function () {
  console.log(cleanAPIData);
  document.querySelector('#search').classList.toggle('active');
  document.querySelector('#input').addEventListener('keypress', function (e) {
    main2.innerHTML = ``;

    if (e.key === 'Enter') {
      console.log('search works');
      let value = document.querySelector('#input').value.toLowerCase(); //console.log(value);

      cleanAPIData.forEach(el => {
        //console.log(el);
        if (el.title.toLowerCase().indexOf(value) != -1) {
          //console.log(el.title)
          // hide main 
          document.querySelector('#main').style.display = "none";
          searchFind(el);
        }
      }); ///////////////////////////////////////////////////////////////////////////
      ////Pouup main22222222222222222

      let artCont2 = document.querySelectorAll("#main2 .articleContent a"); //console.log(artCont2.length);

      for (let i = 0; i < artCont2.length; i++) {
        console.log('search popup workssssssssssssssssss');
        console.log(cleanAPIData[i]);
        artCont2[i].addEventListener("click", function () {
          popNewUp(cleanAPIData[i]);
          console.log(cleanAPIData[i]); //console.log(`data array: ${dataArray[i]}`);
        });
      }
    }
  });
  document.querySelector('#input').value = '';
  document.querySelector('#main').style.display = "block";
});

function searchFind(element) {
  //contentToDom(element);
  let article = document.createElement('article');

  if (element.thumbnail === "self" || element.thumbnail === "default") {
    element.thumbnail = "images/article_placeholder_1.jpg";
  }

  ;
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
  document.getElementById('main2').appendChild(article); /// Remove loader and add hidden classes for new url

  document.querySelector("#popUp").classList.remove("loader");
  document.querySelector("#popUp").classList.add("hidden");
}
},{"./keys.js":"js/keys.js"}],"../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55297" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/app.js"], null)
//# sourceMappingURL=/app.c3f9f951.js.map