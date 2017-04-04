'use strict'
const app = {
  api_URL: "http://ist.rit.edu/api/",
  apiValue: "",

  init() {
    console.log("app.main.init() called");
    // initialize properties

    this.getData("about");

    this.getData("degrees");
  },

  controls() {
    let thisRef = this;

    document.querySelector("#search").onclick = function() {
      thisRef.getData("degrees/undergraduate/degreeName=cit");
    }
  },

  getData(key) {
    let thisRef = this;

    let url = this.api_URL;
    url += key;

    if (url < 1) return;

    url = encodeURI(url);

    //console.log(url);

    $("#content").fadeOut(1000);

    $.ajax({
      dataType: "json",
      url: url,
      data: null,
      success: function(obj) {
          thisRef.jsonLoaded(obj, key);
      },
      error: function() {
            console.log('Error occured with ' + key);
        }
    });
  },

  //Parse data, call for recommendations, build content
  jsonLoaded(obj, key) {
    //return obj;
    console.log("obj stringified = " + JSON.stringify(obj));
    //console.log(obj.title);

    switch(key) {
      case "about":
        this.about(obj);
        break;
      case "degrees":
        this.degrees(obj);
        break;
    }

  },

//generate about section
  about(obj){
    let masterEl = document.createElement("div");
    masterEl.id = "about";

    //generate title
    let titleC = obj.title;
    let titleN = document.createTextNode(titleC);
    let titleE = document.createElement("h2");
    titleN.value = titleC;
    titleE.appendChild(titleN);

    masterEl.appendChild(titleE);

    //generate description
    let descriptionC = obj.description;
    let descriptionN = document.createTextNode(descriptionC);
    let descriptionE = document.createElement("p");
    descriptionN.value = descriptionC;
    descriptionE.appendChild(descriptionN);

    masterEl.appendChild(descriptionE);

    //generate quote
    let quoteC = obj.quote;
    let quoteN = document.createTextNode(quoteC);
    let quoteE = document.createElement("h4");
    quoteN.value = quoteC;
    quoteE.appendChild(quoteN);

    masterEl.appendChild(quoteE);

    //generate quoteAuthor
    let quoteAuthorC = obj.quoteAuthor;
    let quoteAuthorN = document.createTextNode(quoteAuthorC);
    let quoteAuthorE = document.createElement("h5");
    quoteAuthorN.value = quoteAuthorC;
    quoteAuthorE.appendChild(quoteAuthorN);

    masterEl.appendChild(quoteAuthorE);

    //append master to body
    document.body.appendChild(masterEl);
  },

  degrees(obj) {
    let masterEl = document.createElement("div");
    $(masterEl).attr('id', 'degrees');

    let undergradEl = document.createElement("div");
    $(undergradEl).attr('id', 'undergrad');

    let titleN = document.createTextNode("Our UnderGraduate Degrees");
    let titleE = document.createElement("h1");
    titleE.appendChild(titleN);
    undergradEl.appendChild(titleE);

    //generate undergrad boxes
    $.each(obj.undergraduate, function(key, value) {
      console.log(value.title);

      let uDegree = document.createElement("div");
      $(uDegree).addClass("uDegree");

      //get title
      let titleC = value.title;
      let titleN = document.createTextNode(titleC);
      let titleE = document.createElement("h2");
      titleN.value = titleC;
      titleE.appendChild(titleN);

      uDegree.appendChild(titleE);

      //get desc
      let descriptionC = value.description;
      let descriptionN = document.createTextNode(descriptionC);
      let descriptionE = document.createElement("p");
      descriptionN.value = descriptionC;
      descriptionE.appendChild(descriptionN);

      uDegree.appendChild(descriptionE);

      undergradEl.appendChild(uDegree);
    });

    masterEl.appendChild(undergradEl);

    let gradTitleN = document.createTextNode("Our Graduate Degrees");
    let gradTitleE = document.createElement("h1");
    gradTitleE.appendChild(gradTitleN);
    undergradEl.appendChild(gradTitleE);

    //generate undergrad boxes
    $.each(obj.graduate, function(key, value) {
      console.log(value.title);

      let uDegree = document.createElement("div");
      $(uDegree).addClass("uDegree");

      //get title
      let titleC = value.title;
      let titleN = document.createTextNode(titleC);
      let titleE = document.createElement("h2");
      titleN.value = titleC;
      titleE.appendChild(titleN);

      uDegree.appendChild(titleE);

      //get desc
      let descriptionC = value.description;
      let descriptionN = document.createTextNode(descriptionC);
      let descriptionE = document.createElement("p");
      descriptionN.value = descriptionC;
      descriptionE.appendChild(descriptionN);

      uDegree.appendChild(descriptionE);

      undergradEl.appendChild(uDegree);
    });

    masterEl.appendChild(undergradEl);



    document.body.appendChild(masterEl);
  },
}
module.exports = app;
