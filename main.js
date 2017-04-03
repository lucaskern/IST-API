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
