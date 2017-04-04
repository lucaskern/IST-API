'use strict'
const app = {
  api_URL: "http://ist.rit.edu/api/",
  apiValue: "",

  init() {
    console.log("app.main.init() called");
    // initialize properties

    //this.getData("about");

    //this.getData("degrees");

    //this.getData("minors");

    this.getData("employment");
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

    switch (key) {
      case "about":
        this.about(obj);
        break;
      case "degrees":
        this.degrees(obj);
        break;
      case "minors":
        this.minors(obj);
        break;
      case "employment":
        this.employment(obj);
        break;
    }

  },

  //generate about section
  about(obj) {
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

    let gradEl = document.createElement("div");
    $(gradEl).attr('id', 'grad');

    let gradTitleN = document.createTextNode("Our Graduate Degrees");
    let gradTitleE = document.createElement("h1");
    gradTitleE.appendChild(gradTitleN);
    gradEl.appendChild(gradTitleE);

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

      gradEl.appendChild(uDegree);
    });

    masterEl.appendChild(gradEl);

    document.body.appendChild(masterEl);
  },

  minors(obj) {
    let masterEl = document.createElement("div");
    $(masterEl).attr('id', 'minor');

    let minorEl = document.createElement("div");
    $(minorEl).attr('id', 'minors');

    let titleN = document.createTextNode("Our UnderGraduate Minors");
    let titleE = document.createElement("h1");
    titleE.appendChild(titleN);
    minorEl.appendChild(titleE);

    //generate undergrad boxes
    $.each(obj.UgMinors, function(key, value) {
      //console.log(value.title);

      let uMinor = document.createElement("div");
      $(uMinor).addClass("uMinor");

      //get title
      let titleC = value.title;
      let titleN = document.createTextNode(titleC);
      let titleE = document.createElement("h2");
      titleN.value = titleC;
      titleE.appendChild(titleN);

      uMinor.appendChild(titleE);

      //get desc
      let descriptionC = value.description;
      let descriptionN = document.createTextNode(descriptionC);
      let descriptionE = document.createElement("p");
      $(descriptionE).addClass("desc");

      descriptionN.value = descriptionC;
      descriptionE.appendChild(descriptionN);

      uMinor.appendChild(descriptionE);

      minorEl.appendChild(uMinor);
    });

    masterEl.appendChild(minorEl);

    document.body.appendChild(masterEl);

    $(".uMinor").click(function() {
      $(".desc", this).toggle();
      console.log("clicked");
    });

  },

  employment(obj) {
    let masterEl = document.createElement("div");
    $(masterEl).attr('id', 'minor');

    let minorEl = document.createElement("div");
    $(minorEl).attr('id', 'minors');

    let titleN = document.createTextNode(obj.introduction.title);
    let titleE = document.createElement("h1");
    titleE.appendChild(titleN);
    minorEl.appendChild(titleE);

    masterEl.appendChild(minorEl);

    document.body.appendChild(masterEl);
  }
}
module.exports = app;
