(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
$( document ).ready(function() {

  $('[id*="cont"]').addClass( "container" );
  
  
  
  if(ScrollReveal != null) {
    console.log("scroll reveal is here");
  }

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

    this.nav();
    this.getData("about");
    
    //flowtype plugin init
    $('body').flowtype();
    $('body').flowtype({
      minimum: 500,
      maximum: 1200,
      minFont: 12,
      maxFont: 40,
      fontRatio: 60
    });
    
    //scroll reveal plugin init
    window.sr = ScrollReveal();

    //this.getData("degrees");
    //
    // this.getData("minors");
    //
    // this.getData("employment");
    //
    // this.getData("people");
    //
    // this.getData("research/byInterestArea");
    //
    // this.getData("research/byFaculty");
    //
    // this.getData("resources");

    //this.getData("footer");

    //this.map();

    //$('[id="cont"]').addClass( "container" );
    //$(masterEl).wrap( "<div class='cont-wrapper'></div>" );
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
        //console.log("obj stringified = " + JSON.stringify(obj));
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
          case "footer":
            thisRef.footer(obj);
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

  nav() {
    let thisRef = this;
    let masterEl = document.createElement("nav");
    masterEl.id = "menu";
    
    let xStr = '<ul id="menu"><li><a href="#about">About</a></li><li><a href="#degrees">Degrees</a></li><li><a href="#minors">Minors</a></li><li><a href="#employment">Employment</a></li> <li><a href="#map">Map</a></li><li><a href="#people">People</a></li><li><a href="#research">Research</a></li><li><a href="#resources">Resources</a></li> </ul>'
    
    //append master to body
    document.body.appendChild(masterEl);
    
    $('#menu').html(xStr);
    
    $('nav').slicknav();
    
    $("nav li a").click(function(e) { 
      let spot = $(this).attr('href');
      spot = spot.replace('#', '');
      console.log(spot);
      thisRef.scrollToAnchor(spot);       
    });
  },
  
  //generate about section
  about(obj) {
    let masterEl = document.createElement("div");
    masterEl.id = "about-cont";
    $(masterEl).addClass("container");

    let x = "<a name='about'> </a> <h1>" + obj.title + "</h2>";
    x += "<p>" + obj.description + "</p>";
    x += "<p id='quote'>" + obj.quote + "</p>";
    x += "<h3> - " + obj.quoteAuthor + "</h3>";

    //append master to body
    document.body.appendChild(masterEl);

    $('#about-cont').html(x);
    $(masterEl).wrap( "<div class='about-cont-wrapper'></div>" );

    var $folded = $('#about-cont').oriDomi({speed: 1200});
    // when using jQuery, iterate OriDomi methods over multiple elements like this:
    $folded.oriDomi('accordion', 50, function(event, instance) {
    // arguments are the transition event and the OriDomi instance
      
     $folded.oriDomi('accordion', 0);
    });
    // to access the OriDomi instance at the top of the jQuery selection directly:
    var folded = $folded.oriDomi(true);
    
    this.getData("degrees");
  },

  degrees(obj) {
    //create master container with id degrees
    let masterEl = document.createElement("div");
    $(masterEl).attr('id', 'degree-cont');
    $(masterEl).addClass("container");

    let xStr = '';

    xStr += "<a name='degrees'> </a> <h1> Our UnderGraduate Degrees </h1>";

    //generate undergrad boxes
    $.each(obj.undergraduate, function(key, value) {
      let uniqueID = value.degreeName.replace(/\s/g, '');
      
      xStr += '<div class="grid-box">';
      xStr += '<span> <a href="#" data-featherlight="#' + uniqueID + '" data-hover="' + value.title + '">' + value.title + '</a> </span>';
      xStr += '</div>';
      
      xStr += '<div class="lightbox" id="' + uniqueID + '">  <h2>' + value.title +  '</h2> <p>' + value.description + '</p> <h3> Concentrations </h3>';

      $.each(value.concentrations, function(key, value) {
        xStr += '<p> ' + value + '</p>';
      });
      
      xStr += "</div>"
    });
    
    xStr += "</div>";

    document.body.appendChild(masterEl);

    $("#degree-cont").html(xStr); 
    $(masterEl).wrap( "<div class='degree-cont-wrapper'></div>" );
    
    //Now grad --------------------------
    
    //create master container with id degrees
    masterEl = document.createElement("div");
    $(masterEl).attr('id', 'gDegree-cont');
    $(masterEl).addClass("container");

    xStr = '';

    xStr += " <h1> Our Graduate Degrees </h1>";

    //generate undergrad boxes
    $.each(obj.graduate, function(key, value) {
      
      if (value.description != null) {
      let uniqueID = value.degreeName.replace(/\s/g, '');
      
      xStr += '<div class="grid-box">';
      xStr += '<span> <a href="#" data-featherlight="#' + uniqueID + '" data-hover="' + value.title + '">' + value.title + '</a> </span>';
      xStr += '</div>';
      
      xStr += '<div class="lightbox" id="' + uniqueID + '">  <h2>' + value.title +  '</h2> <p>' + value.description + '</p> <h3> Concentrations </h3>';

      $.each(value.concentrations, function(key, value) {
        xStr += '<p> ' + value + '</p>';
      });
      
      xStr += "</div>"
      } else {
        
      }
    });
    
    xStr += "</div>";

    document.body.appendChild(masterEl);

    $("#gDegree-cont").html(xStr); 
    $(masterEl).wrap( "<div class='gDegree-cont-wrapper'></div>" );

    this.getData("minors");
  },

  minors(obj) {
    let masterEl = document.createElement("div");
    $(masterEl).attr('id', 'minor-cont');
    $(masterEl).addClass("container");

    let xStr = '';

    xStr += "<a name='minors'> </a> <h1> Our UnderGraduate Minors </h1>";

    //generate undergrad boxes
    $.each(obj.UgMinors, function(key, value) {
      let uniqueID = value.name.replace(/\s/g, '');

      xStr += '<div class="grid-box"> <div class="grid-box-content"> ';
      xStr += '<span> <a href="#" data-featherlight="#' + uniqueID + '" data-hover="' + value.title + '">' + value.title + '</a> </span>';
      xStr += '</div>';

      xStr += '<div class="lightbox" id="' + uniqueID + '">  <h2>' + value.title +  '</h2> <p>' + value.description + '</p> <h3> Course List </h3>';

      $.each(value.courses, function(key, value) {
        xStr += '<p> ' + value + '</p>';
      });

      xStr += '</div> </div>'


    });

    document.body.appendChild(masterEl);

    $("#minor-cont").html(xStr);
    $(masterEl).wrap( "<div class='minor-cont-wrapper'></div>" );

    $(".uMinor").click(function() {
      $(".desc", this).toggle();
      console.log("clicked");
    });

    this.getData("employment");
  },

  employment(obj) {
    let masterEl = document.createElement("div");
    $(masterEl).attr('id', 'employment-cont');
    $(masterEl).addClass("container");

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

    $(masterEl).wrap( "<div class='employment-cont-wrapper'></div>" );
    
    let $empOrigami = $('#employment-cont').oriDomi({/* options object */});
    // when using jQuery, iterate OriDomi methods over multiple elements like this:
    $empOrigami.oriDomi('accordion', 11);
    // to access the OriDomi instance at the top of the jQuery selection directly:
    let empOrigami = $empOrigami.oriDomi(true);

    this.map();
  },

  map() {
    let masterEl = document.createElement("div");
    masterEl.id = "map-cont";
    $(masterEl).addClass("container");

    let x = "<a name='map'> </a> <h1> Where Our Students Work </h1> <p> Click a marker to learn more about the jobs at that location </p>";
    x += "<iframe id='map-iframe' src='https://ist.rit.edu/api/map/' scrolling='no'> <p>Your browser does not showing this map. Obviously you are using an old browser. </p> </iframe>"

    //append master to body
    document.body.appendChild(masterEl);

    $('#map-cont').html(x);
    $(masterEl).wrap( "<div class='map-cont-wrapper'></div>" );
    
    //sr.reveal('#map-cont',{ duration: 1000 });

    this.getData("people");
  },

  people(obj) {
    //create master container with id degrees
    let masterEl = document.createElement("div");
    $(masterEl).attr('id', 'people-cont');
    $(masterEl).addClass("container");

    let xStr = '';

    xStr += "<a name='people'> </a><h1> " + obj.title + "</h1>";

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

    $('#people-cont').html(xStr); $(masterEl).wrap( "<div class='people-cont-wrapper'></div>" );

    this.getData("research/byInterestArea");
  },

  researchArea(obj) {
    //create master container with id degrees
    let masterEl = document.createElement("div");
    $(masterEl).attr('id', 'researchArea-cont');
    $(masterEl).addClass("container");

    let xStr = '';

    xStr += "<a name='research'> </a><h1> Research By Area </h1>";

    $.each(obj.byInterestArea, function(key, value) {

      let uniqueID = value.areaName.replace(/\s/g, '');

      xStr += '<div class="grid-box">';
      xStr += '<span> <a href="#" data-featherlight="#' + uniqueID + '" data-hover="' + value.areaName + '">' + value.areaName + '</a> </span>';
      xStr += '</div>';

      xStr += '<div class="lightbox" id="' + uniqueID + '">  <h2> Citations </h2> <p>' + value.citations + '</p> </div>';
    });

    document.body.appendChild(masterEl);

    $('#researchArea-cont').html(xStr); $(masterEl).wrap( "<div class='researchArea-cont-wrapper'></div>" );

    this.getData("research/byFaculty");

  },

  researchFac(obj) {
    //create master container with id degrees
    let masterEl = document.createElement("div");
    $(masterEl).attr('id', 'researchFaculty-cont');
    $(masterEl).addClass("container");

    let xStr = '';

    xStr += "<h1> Research By Faculty </h1>";

    $.each(obj.byFaculty, function(key, value) {

      let uniqueID = value.facultyName.replace(/\s/g, '');

      xStr += '<div class="grid-box">';
      xStr += '<span> <a href="#" data-featherlight="#' + uniqueID + '" data-hover="' + value.facultyName + '">' + value.facultyName + '</a> </span>';
      xStr += '</div>';

      xStr += '<div class="lightbox" id="' + uniqueID + '">  <h2> Citations </h2> <p>' + value.citations + '</p> </div>';
    });

    document.body.appendChild(masterEl);

    $('#researchFaculty-cont').html(xStr); $(masterEl).wrap( "<div class='researchFac-cont-wrapper'></div>" );

    this.getData("resources");

  },

  resources(obj) {

    let thisRef = this;
    //create master container with id degrees
    let masterEl = document.createElement("div");
    $(masterEl).attr('id', 'resources-cont');
    $(masterEl).addClass("container");

    let xStr = '';

    xStr += "<a name='resources'> </a> <h1>" + obj.title + "</h1> <p> " + obj.subTitle + "</p>";

    $.each(obj, function(key, value) {

      console.log(key);

      switch (value.title) {
        case "Study Abroad":
          xStr += '<div class="grid-box">';
          xStr += '<span> <a href="#" data-featherlight="#resource-study-abroad" data-hover="' + value.title + '">' + value.title + '</a> </span>';
          xStr += '</div>';

          xStr += '<div class="lightbox" id="resource-study-abroad">  <h2> Study Abroad </h2> <p>' + value.description + '</p> </div>';
          break;
        case "Advising":
          xStr += '<div class="grid-box">';
          xStr += '<span> <a href="#" data-featherlight="#resource-advising" data-hover="' + value.title + '">' + value.title + '</a> </span>';
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
          xStr += '<span> <a href="#" data-featherlight="#resource-lab" data-hover="' + value.title + '">' + value.title + '</a> </span>';
          xStr += '</div>';

          xStr += '<div class="lightbox" id="resource-lab">  <h2> Tutors/Lab Information </h2> <p>' + value.description + '</p> <p> View schedule: <strong>' + value.tutoringLabHoursLink + '</strong> </p> </div>';
          break;
        case "Student Ambassador Information & Application":
          xStr += '<div class="grid-box">';
          xStr += '<span> <a href="#" data-featherlight="#resource-ambassador" data-hover="' + value.title + '">' + value.title + '</a> </span>';
          xStr += '</div>';

          xStr += '<div class="lightbox" tabindex="-1" id="resource-ambassadors">  <h2> Student Ambassadors </h2> <img src="' + value.ambassadorsImageSource + '" />';

          $.each(value.subSectionContent, function(key, value) {
            xStr += '<h3>' + value.title + '</h3>';
            xStr += '<p>' + value.description + '</p>';
          });

          xStr+= '<a href=""' + value.applicationFormLink + ' "> Application Link </a> <p>' + value.note +  '</p> </div>';
          break;
          case "Coop-Enrollment":
            xStr += '<div class="grid-box">';
            xStr += '<span> <a href="#" data-featherlight="#resource-coop" data-hover="' + value.title + '">' + value.title + '</a> </span>';
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
        xStr += '<span> <a href="#" data-featherlight="#resource-forms" data-hover="Forms">Forms</a> </span>';
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

    $('#resources-cont').html(xStr); $(masterEl).wrap( "<div class='resources-cont-wrapper'></div>" );

    this.getData("footer");
  },

  footer(obj) {
    let masterEl = document.createElement("footer");
    masterEl.id = "footer-cont";

    let xString = "<div class='column'> <h3> " + obj.social.title + " </h3> <ul>";
    xString += "<li> <a href='" + obj.social.twitter + "'> Twitter </a> </li>";
    xString += "<li> <a href='" + obj.social.facebook + "'> Facebook </a> </li> </div>";

    xString += "<div class='column'> <h3> Quick Links </h3> <ul>";

    $.each(obj.quickLinks, function(key, value) {
      xString += "<li> <a href='" + value.href + "'>" + value.title
       + "</a> </li>"
    });

    xString += "</ul> </div> <div class='column'> <h3> Copyright </h3> <ul> <li> " + obj.copyright.html + "</div>"

    document.body.appendChild(masterEl);

    $("footer").html(xString);
  },
  
 scrollToAnchor(aid){
    var aTag = $("a[name='"+ aid +"']");
    $('html,body').animate({scrollTop: aTag.offset().top},2000, 'easeInOutSine');
},

}
module.exports = app;

},{}]},{},[2]);
