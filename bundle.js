(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*
loader.js
variable 'app' is in global scope - i.e. a property of window.
app is our single global object literal - all other functions and properties of
the game will be properties of app.
*/

"use strict";

const main = require('./main.js');

window.addEventListener('load', function () {
  console.log("window.onload ran");
    let run = main.init();
})

},{"./main.js":2}],2:[function(require,module,exports){
'use strict'
const app = {
  api_URL: "http://ist.rit.edu/api/",
  apiValue: "",

  init() {
    console.log("app.main.init() called");
    // initialize properties

    this.getData("degrees/undergraduate/degreeName=cit");

    //this.controls();
  },

  controls() {
    let thisRef = this;

    document.querySelector("#search").onclick = function() {
      thisRef.getData("degrees/undergraduate/degreeName=cit");
    }
  },

  getData(key) {
    let url = this.api_URL;
    url += key;

    if (url < 1) return;

    //document.querySelector("#dynamicContent").innerHTML = "<b>Searching for " + tmdbValue + "</b>";
    url = encodeURI(url);

    console.log(url);

    //url += tmdbValue;

    $("#content").fadeOut(1000);

    $.ajax({
      dataType: "json",
      url: url,
      data: null,
      success: this.jsonLoaded
    });
  },

  //Parse data, call for recommendations, build content
  jsonLoaded(obj) {
    console.log("obj = " + obj);
    console.log("obj stringified = " + JSON.stringify(obj));
  },
}
module.exports = app;

},{}]},{},[1]);
