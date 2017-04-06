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

    //this.getData("employment");

    //this.getData("people");

    this.getData("research/byInterestArea");
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
          default:
            return obj;
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

    let x="<h1>"+obj.title+"</h2>";
				x+="<p>"+obj.description+"</p>";
				x+="<p id='quote'>"+obj.quote+"</p>";
				x+="<h3>"+obj.quoteAuthor+"</h3>";

        //append master to body
        document.body.appendChild(masterEl);

				$('#about').html(x);
  },

  degrees(obj) {
    //create master container with id degrees
    let masterEl = document.createElement("div");
    $(masterEl).attr('id', 'degree-cont');

    let xStr = '';

    xStr+= " <h1> Our UnderGraduate Degrees </h1>";

    //generate undergrad boxes
    $.each(obj.undergraduate, function(key, value) {
      xStr+= "<div class='uDegree'> <h2> " + value.title + "</h2> <p> " + value.description + "</p> </div>";
    });

    //generate undergrad boxes
    $.each(obj.graduate, function(key, value) {
      if (value.description != null) {
        xStr+= "<div class='gDegree'> <h2> " + value.title + "</h2> <p> " + value.description + "</p> </div>";
      } else {
        xStr+= "<div class='certs overflow'> <h2> " + value.degreeName + "</h2> <p> " + value.availableCertificates + "</p> </div>";
      }
    });

    document.body.appendChild(masterEl);

    $("#degree-cont").html(xStr);
  },

  minorsF(obj) {
    let masterEl = document.createElement("div");
    $(masterEl).attr('id', 'minor');

    let minorEl = document.createElement("div");


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

    $(minorEl).attr('id', 'minors');
    masterEl.appendChild(minorEl);

    document.body.appendChild(masterEl);

    $(".uMinor").click(function() {
      $(".desc", this).toggle();
      console.log("clicked");
    });



  },

  minors(obj) {
    let masterEl = document.createElement("div");
    $(masterEl).attr('id', 'minor-cont');

    let xStr = '';

    xStr+= " <h1> Our UnderGraduate Minors </h1>";

    //generate undergrad boxes
    $.each(obj.UgMinors, function(key, value) {
      xStr+= "<div class='uMinor'> <h2> " + value.title + "</h2> <p class='desc'> " + value.description + "</p> </div>";
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

    xStr+= "<h1> " + obj.title + "</h1>"

			$.each(obj.faculty, function(key, value) {

				xStr+='<div class="fac-indv" onclick="getFac(this)" data-username="' + value.username + '">';
				xStr+='<h2>' + value.name + '</h2><p>' + value.title + '</p>';
				xStr+='<img class="fac-img" src="' + value.imagePath + ' "width=150px; height=150px;/></div>';
			});

      $.each(obj.staff, function(key, value) {

				xStr+='<div class="fac-indv" onclick="getFac(this)" data-username="' + value.username + '">';
				xStr+='<h2>' + value.name + '</h2><p>' + value.title + '</p>';
				xStr+='<img class="fac-img" src="' + value.imagePath + ' "width=150px; height=150px;/></div>';
			});

      document.body.appendChild(masterEl);

			$('#people-cont').html(xStr);
  },

  researchArea(obj) {
    //create master container with id degrees
    let masterEl = document.createElement("div");
    $(masterEl).attr('id', 'researchArea-cont');

    let xStr = '';

    xStr+= "<h1> Research By Area </h1>";

    $.each(obj.citations, function(key, value) {

      xStr+='<div class="research-area">';
      xStr+='<h2>' + value.areaName + '</h2>';
      xStr+='</div>';
    });

    document.body.appendChild(masterEl);

    $('#researchArea-cont').html(xStr);

  },
}
module.exports = app;
