(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
$( document ).ready(function() {
  $(".uMinor").click(function() {
    $(".desc").toggle();
    console.log("clicked");
  });

  console.log("jQuery loaded");
});

},{}],2:[function(require,module,exports){
/*
loader.js
variable 'app' is in global scope - i.e. a property of window.
app is our single global object literal - all other functions and properties of
the game will be properties of app.
*/

"use strict";

const main = require('./main.js');
const controls = require('./controls.js');

window.addEventListener('load', function () {
  console.log("window.onload ran");
    let run = main.init();
    
})

},{"./controls.js":1,"./main.js":3}],3:[function(require,module,exports){
'use strict'
const app = {
  api_URL: "http://ist.rit.edu/api/",
  apiValue: "",
  autoBind: '[data-featherlight]',

  init() {
    console.log("app.main.init() called");
    // initialize properties

    this.getData("about");

    this.getData("degrees");

    this.getData("minors");

    this.getData("employment");

    this.getData("people");

    this.getData("research/byInterestArea");

    this.getData("research/byFaculty");

    this.getData("resources");
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
        console.log("obj stringified = " + JSON.stringify(obj));
        switch (key) {
          case "about":
            thisRef.about(obj);
            break;
          case "degrees":
            thisRef.degrees(obj);
            break;
          case "minors":
            thisRef.minors(obj);
            break;
          case "employment":
            thisRef.employment(obj);
            break;
          case "people":
            thisRef.people(obj);
            break;
          case "research/byInterestArea":
            thisRef.researchArea(obj);
            break;
          case "research/byFaculty":
            thisRef.researchFac(obj);
            break;
          case "resources":
            thisRef.resources(obj);
            break;
          default:
            return JSON.stringify(obj);
        }
      },
      error: function() {
        console.log('Error occured with ' + key);
      }
    });
  },

  //generate about section
  about(obj) {
    let masterEl = document.createElement("div");
    masterEl.id = "about";

    let x = "<h1>" + obj.title + "</h2>";
    x += "<p>" + obj.description + "</p>";
    x += "<p id='quote'>" + obj.quote + "</p>";
    x += "<h3>" + obj.quoteAuthor + "</h3>";

    //append master to body
    document.body.appendChild(masterEl);

    $('#about').html(x);
  },

  degrees(obj) {
    //create master container with id degrees
    let masterEl = document.createElement("div");
    $(masterEl).attr('id', 'degree-cont');

    let xStr = '';

    xStr += " <h1> Our UnderGraduate Degrees </h1>";

    //generate undergrad boxes
    $.each(obj.undergraduate, function(key, value) {
      xStr += "<div class='uDegree'> <h2> " + value.title + "</h2> <p> " + value.description + "</p> </div>";
    });

    //generate undergrad boxes
    $.each(obj.graduate, function(key, value) {
      if (value.description != null) {
        xStr += "<div class='gDegree'> <h2> " + value.title + "</h2> <p> " + value.description + "</p> </div>";
      } else {
        xStr += "<div class='certs overflow'> <h2> " + value.degreeName + "</h2> <p> " + value.availableCertificates + "</p> </div>";
      }
    });

    document.body.appendChild(masterEl);

    $("#degree-cont").html(xStr);
  },

  minors(obj) {
    let masterEl = document.createElement("div");
    $(masterEl).attr('id', 'minor-cont');

    let xStr = '';

    xStr += " <h1> Our UnderGraduate Minors </h1>";

    //generate undergrad boxes
    $.each(obj.UgMinors, function(key, value) {
      let uniqueID = value.name.replace(/\s/g, '');

      xStr += '<div class="grid-box">';
      xStr += '<span> <a href="#" data-featherlight="#' + uniqueID + '">' + value.title + '</a> </span>';
      xStr += '</div>';

      xStr += '<div class="lightbox" id="' + uniqueID + '">  <h2>' + value.title +  '</h2> <p>' + value.description + '</p> <h3> Course List </h3>';

      $.each(value.courses, function(key, value) {
        xStr += '<p> ' + value + '</p>';
      });

      xStr += '</div>'
    });

    document.body.appendChild(masterEl);

    $("#minor-cont").html(xStr);

    $(".uMinor").click(function() {
      $(".desc", this).toggle();
      console.log("clicked");
    });
  },

  employment(obj) {
    let masterEl = document.createElement("div");
    $(masterEl).attr('id', 'employment-container');

    let statsEl = document.createElement("div");
    $(statsEl).attr('id', 'employment');

    let titleN = document.createTextNode(obj.introduction.title);
    let titleE = document.createElement("h1");
    titleE.appendChild(titleN);
    statsEl.appendChild(titleE);

    //generate undergrad boxes
    $.each(obj.introduction.content, function(key, value) {
      //console.log(value.title);

      let uMinor = document.createElement("div");
      $(uMinor).addClass("emp-sec center");

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

      statsEl.appendChild(uMinor);
    });

    masterEl.appendChild(statsEl);

    //generate undergrad boxes
    $.each(obj.degreeStatistics.statistics, function(key, value) {
      //console.log(value.title);

      let uMinor = document.createElement("div");
      $(uMinor).addClass("emp-stat-sec");

      //get title
      let titleC = value.value;
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

      statsEl.appendChild(uMinor);
    });

    masterEl.appendChild(statsEl);

    document.body.appendChild(masterEl);
  },

  people(obj) {
    //create master container with id degrees
    let masterEl = document.createElement("div");
    $(masterEl).attr('id', 'people-cont');

    let xStr = '';

    xStr += "<h1> " + obj.title + "</h1>";

    $.each(obj.faculty, function(key, value) {

      xStr += '<div class="fac-indv" onclick="getFac(this)" data-username="' + value.username + '">';
      xStr += '<h2>' + value.name + '</h2><p>' + value.title + '</p>';
      xStr += '<img class="fac-img" src="' + value.imagePath + ' "width=150px; height=150px;/></div>';
    });

    $.each(obj.staff, function(key, value) {

      xStr += '<div class="fac-indv" onclick="getFac(this)" data-username="' + value.username + '">';
      xStr += '<h2>' + value.name + '</h2><p>' + value.title + '</p>';
      xStr += '<img class="fac-img" src="' + value.imagePath + ' "width=150px; height=150px;/></div>';
    });

    document.body.appendChild(masterEl);

    $('#people-cont').html(xStr);
  },

  researchArea(obj) {
    //create master container with id degrees
    let masterEl = document.createElement("div");
    $(masterEl).attr('id', 'researchArea-cont');

    let xStr = '';

    xStr += "<h1> Research By Area </h1>";

    $.each(obj.byInterestArea, function(key, value) {

      xStr += '<div class="research-area">';
      xStr += '<h2>' + value.areaName + '</h2> <p> ' + value.citations + '</p>';
      xStr += '</div>';
    });

    document.body.appendChild(masterEl);

    $('#researchArea-cont').html(xStr);

  },

  researchFac(obj) {
    //create master container with id degrees
    let masterEl = document.createElement("div");
    $(masterEl).attr('id', 'researchFaculty-cont');

    let xStr = '';

    xStr += "<h1> Research By Faculty </h1>";

    $.each(obj.byFaculty, function(key, value) {

      let uniqueID = value.facultyName.replace(/\s/g, '');

      xStr += '<div class="grid-box">';
      xStr += '<span> <a href="#" data-featherlight="#' + uniqueID + '">' + value.facultyName + '</a> </span>';
      xStr += '</div>';

      xStr += '<div class="lightbox" id="' + uniqueID + '">  <h2> Citations </h2> <p>' + value.citations + '</p> </div>';
    });

    document.body.appendChild(masterEl);

    $('#researchFaculty-cont').html(xStr);

  },

  resources(obj) {

    let thisRef = this;
    //create master container with id degrees
    let masterEl = document.createElement("div");
    $(masterEl).attr('id', 'resources-cont');

    let xStr = '';

    xStr += "<h1>" + obj.title + "</h1> <p> " + obj.subTitle + "</p>";

    $.each(obj, function(key, value) {

      console.log(key);

      switch (value.title) {
        case "Study Abroad":
          xStr += '<div class="grid-box">';
          xStr += '<a href="#" data-featherlight="#resource-study-abroad">' + value.title + '</a>';
          xStr += '</div>';

          xStr += '<div class="lightbox" id="resource-study-abroad">  <h2> Study Abroad </h2> <p>' + value.description + '</p> </div>';
          break;
        case "Advising":
          xStr += '<div class="grid-box">';
          xStr += '<a href="#" data-featherlight="#resource-advising">' + value.title + '</a>';
          xStr += '</div>';

          let academicAdv = value.academicAdvisors;
          let advisorList = value.professonalAdvisors;

          xStr += '<div class="lightbox" id="resource-advising"> <h2> ' + value.title + ' </h2> <h4>' + value.academicAdvisors.title + '</h4> <p>' + value.academicAdvisors.description + '</p> <h4> ' + value.professonalAdvisors.title + '</h4>';

          $.each(value.professonalAdvisors.advisorInformation, function(key, value) {
            xStr += '<p> <strong>' + value.name + '</strong> </p>';
            xStr += '<p> Department: ' + value.department + '</p>';
            xStr += '<p> E-mail: ' + value.email + '</p>';
          });

          xStr += "<h4> " + value.facultyAdvisors.title + '</h4> <p> ' + value.facultyAdvisors.description + '</p>';

          xStr += '</div>';
          break;
        case "Tutors / Lab Information":
          xStr += '<div class="grid-box">';
          xStr += '<a href="#" data-featherlight="#resource-lab">' + value.title + '</a>';
          xStr += '</div>';

          xStr += '<div class="lightbox" id="resource-lab">  <h2> Tutors/Lab Information </h2> <p>' + value.description + '</p> <p> View schedule: <strong>' + value.tutoringLabHoursLink + '</strong> </p> </div>';
          break;
        case "Student Ambassador Information & Application":
          xStr += '<div class="grid-box">';
          xStr += '<a href="#" data-featherlight="#resource-ambassadors">' + value.title + '</a>';
          xStr += '</div>';

          xStr += '<div class="lightbox" tabindex="-1" id="resource-ambassadors">  <h2> Student Ambassadors </h2> <img src="' + value.ambassadorsImageSource + '"/>';

          $.each(value.subSectionContent, function(key, value) {
            xStr += '<h3>' + value.title + '</h3>';
            xStr += '<p>' + value.description + '</p>';
          });

          xStr+= '<a href=""' + value.applicationFormLink + ' "> Application Link </a> <p>' + value.note +  '</p> </div>';
          break;
          case "Coop-Enrollment":
            xStr += '<div class="grid-box">';
            xStr += '<a href="#" data-featherlight="#resource-coop">' + value.title + '</a>';
            xStr += '</div>';

            xStr += '<div class="lightbox" id="resource-coop">  <h2> Co-op Information </h2>';

            $.each(value.enrollmentInformationContent, function(key, value) {
              xStr += '<h3>' + value.title + '</h3>';
              xStr += '<p>' + value.description + '</p>';
            });

            xStr+= '<a href="' + value.RITJobZoneGuidelink + ' "> Learn more here </a> </div>';
            break;
      }

      if (key == "forms") {
        xStr += '<div class="grid-box">';
        xStr += '<a href="#" data-featherlight="#resource-forms">' + key + '</a>';
        xStr += '</div>';

        xStr += '<div class="lightbox" id="resource-forms">  <h2> Forms </h2>';

        $.each(value.graduateForms, function(key, value) {
          xStr += '<h3>' + value.formName + '</h3>';
          xStr += '<a href="http://www.ist.rit.edu/' + value.href + '"> Link </a> </p>';
        });

        xStr+= "</div>";
      }

    });

    document.body.appendChild(masterEl);

    $('#resources-cont').html(xStr);
  },
}
module.exports = app;

},{}]},{},[2]);
