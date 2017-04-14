$(document).ready(function () {
  
  //flowtype plugin init
    $('body').flowtype();
    $('body').flowtype({
      minimum: 500,
      maximum: 1200,
      minFont: 12,
      maxFont: 40,
      fontRatio: 60
    });

  nav();

 /* about();
  //degrees();
  minors();
  employment();
  people();
  map();
  researchArea();
  researchFaculty();
  resources();*/

  //footer();
});

function nav() {
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
      scrollToAnchor(spot);
    });

    about();
}

function about() {
  myXhr('get', {
    path: '/about/'
  }, '#about').done(function (obj) {
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
    $(masterEl).wrap("<div class='about-cont-wrapper'></div>");
    var $folded = $('#about-cont').oriDomi({
      speed: 1200
    });
    // when using jQuery, iterate OriDomi methods over multiple elements like this:
    $folded.oriDomi('accordion', 50, function (event, instance) {
      // arguments are the transition event and the OriDomi instance
      $folded.oriDomi('accordion', 0);
    });
    // to access the OriDomi instance at the top of the jQuery selection directly:
    var folded = $folded.oriDomi(true);

    degrees();
  });


}

function degrees() {
  myXhr('get', {path: '/degrees/'}, '#about').done(function (obj) {
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
      xStr += ' <a href="#" data-featherlight="#' + uniqueID + '" data-hover="' + value.title + '">' + value.title + '</a> ';
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
      xStr += ' <a href="#" data-featherlight="#' + uniqueID + '" data-hover="' + value.title + '">' + value.title + '</a> ';
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

    minors();
  });


}

function minors() {
  myXhr('get', {path: '/minors/'}, '#about').done(function (obj) {
     let masterEl = document.createElement("div");
    $(masterEl).attr('id', 'minor-cont');
    $(masterEl).addClass("container");

    let xStr = '';

    xStr += "<a name='minors'> </a> <h1> Our UnderGraduate Minors </h1>";

    //generate undergrad boxes
    $.each(obj.UgMinors, function(key, value) {
      let uniqueID = value.name.replace(/\s/g, '');

      xStr += '<div class="grid-box">';
      xStr += '<a href="#" data-featherlight="#' + uniqueID + '" data-hover="' + value.title + '">' + value.title + '</a>';
      xStr += '</div>';

      xStr += '<div class="lightbox" id="' + uniqueID + '">  <h2>' + value.title +  '</h2> <p>' + value.description + '</p> <h3> Course List </h3>';

      $.each(value.courses, function(key, value) {
        xStr += '<p> ' + value + '</p>';
      });

      xStr += '</div>'
    });

    document.body.appendChild(masterEl);

    $("#minor-cont").html(xStr);
    $(masterEl).wrap( "<div class='minor-cont-wrapper'></div>" );


    employment();
  });


}

function employment() {
  myXhr('get', {path: '/employment/'}, '#about').done(function (obj) {
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

      let stat = document.createElement("div");
      $(stat).addClass("grid-box");

      //get title
      let titleC = value.value;
      let titleN = document.createTextNode(titleC);
      let titleE = document.createElement("h2");
      titleN.value = titleC;      
      titleE.appendChild(titleN);

      stat.appendChild(titleE);

      //get desc
      let descriptionC = value.description;
      let descriptionN = document.createTextNode(descriptionC);
      let descriptionE = document.createElement("p");
      $(descriptionE).addClass("desc");

      descriptionN.value = descriptionC;
      descriptionE.appendChild(descriptionN);

      stat.appendChild(descriptionE);

      statsEl.appendChild(stat);
    });

    masterEl.appendChild(statsEl);

    document.body.appendChild(masterEl);

    $(masterEl).wrap( "<div class='employment-cont-wrapper'></div>" );

    let $empOrigami = $('#employment-cont').oriDomi({/* options object */});
    // when using jQuery, iterate OriDomi methods over multiple elements like this:
    $empOrigami.oriDomi('accordion', 11);
    // to access the OriDomi instance at the top of the jQuery selection directly:
    let empOrigami = $empOrigami.oriDomi(true);

    map();
  });


}

function map() {
  let masterEl = document.createElement("div");
    masterEl.id = "map-cont";
    $(masterEl).addClass("container");

    let x = "<a name='map'> </a> <h1> Where Our Students Work </h1> <p> Click a marker to learn more about the jobs at that location </p>";
    x += "<iframe id='map-iframe' src='https://ist.rit.edu/api/map/' scrolling='no'> <p>Your browser does not showing this map. Obviously you are using an old browser. </p> </iframe>"

    //append master to body
    document.body.appendChild(masterEl);

    $('#map-cont').html(x);
    $(masterEl).wrap( "<div class='map-cont-wrapper'></div>" );

  people();
}

function people() {
  myXhr('get', {path: '/people/'}, '#about').done(function (obj) {
   //create master container with id degrees
    let masterEl = document.createElement("div");
    $(masterEl).attr('id', 'people-cont');
    $(masterEl).addClass("container");

    let xStr = '';

    xStr += "<a name='people'> </a><h1> " + obj.title + "</h1>";

    $.each(obj.faculty, function(key, value) {
      xStr += '<a href="#" onclick="getFac(this)" data-username="' + value.username + '" data-featherlight="#' + value.username + '">';
      xStr += '<div class="fac-indv" data-username="' + value.username + '">';
      xStr += '<h2>' + value.name + '</h2><p>' + value.title + '</p>';
      xStr += '<img class="fac-img" src="' + value.imagePath + ' "width=150px; height=150px;/></div></a>';
      xStr += '<div class="lightbox" id="' + value.username + '"> </div> ';
    });

    $.each(obj.staff, function(key, value) {
      xStr += '<a href="#" onclick="getStaff(this)" data-username="' + value.username + '" data-featherlight="#' + value.username + '">';
      xStr += '<div class="fac-indv" data-username="' + value.username + '">';
      xStr += '<h2>' + value.name + '</h2><p>' + value.title + '</p>';
      xStr += '<img class="fac-img" src="' + value.imagePath + ' "width=150px; height=150px;/></div></a>';
      xStr += '<div class="lightbox" id="' + value.username + '"> </div> ';
    });

    document.body.appendChild(masterEl);

    $('#people-cont').html(xStr); $(masterEl).wrap( "<div class='people-cont-wrapper'></div>" );


    researchArea();
  });


}

function researchArea() {
  myXhr('get', {path: '/research/byInterestArea/'}, '#about').done(function (obj) {
     //create master container with id degrees
    let masterEl = document.createElement("div");
    $(masterEl).attr('id', 'researchArea-cont');
    $(masterEl).addClass("container");

    let xStr = '';

    xStr += "<a name='research'> </a><h1> Research By Area </h1>";

    $.each(obj.byInterestArea, function(key, value) {

      let uniqueID = value.areaName.replace(/\s/g, '');

      xStr += '<div class="grid-box">';
      xStr += ' <a href="#" data-featherlight="#' + uniqueID + '" data-hover="' + value.areaName + '">' + value.areaName + '</a> ';
      xStr += '</div>';

      xStr += '<div class="lightbox" id="' + uniqueID + '">  <h2> Citations </h2> <p>' + value.citations + '</p> </div>';
    });

    document.body.appendChild(masterEl);

    $('#researchArea-cont').html(xStr); $(masterEl).wrap( "<div class='researchArea-cont-wrapper'></div>" );

    researchFaculty();
  });


}

function researchFaculty() {
  myXhr('get', {path: '/research/byFaculty/'}, '#about').done(function (obj) {
     //create master container with id degrees
    let masterEl = document.createElement("div");
    $(masterEl).attr('id', 'researchFaculty-cont');
    $(masterEl).addClass("container");

    let xStr = '';

    xStr += "<h1> Research By Faculty </h1>";

    $.each(obj.byFaculty, function(key, value) {

      let uniqueID = value.facultyName.replace(/\s/g, '');

      xStr += '<div class="grid-box">';
      xStr += ' <a href="#" data-featherlight="#' + uniqueID + '" data-hover="' + value.facultyName + '">' + value.facultyName + '</a> ';
      xStr += '</div>';

      xStr += '<div class="lightbox" id="' + uniqueID + '">  <h2> Citations </h2> <p>' + value.citations + '</p> </div>';
    });

    document.body.appendChild(masterEl);

    $('#researchFaculty-cont').html(xStr); $(masterEl).wrap( "<div class='researchFac-cont-wrapper'></div>" );

    resources();
  });


}

function resources() {
  myXhr('get', {path: '/resources/'}, '#about').done(function (obj) {
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
          xStr += ' <a href="#" data-featherlight="#resource-study-abroad" data-hover="' + value.title + '">' + value.title + '</a> ';
          xStr += '</div>';

          xStr += '<div class="lightbox" id="resource-study-abroad">  <h2> Study Abroad </h2> <p>' + value.description + '</p> </div>';
          break;
        case "Advising":
          xStr += '<div class="grid-box">';
          xStr += ' <a href="#" data-featherlight="#resource-advising" data-hover="' + value.title + '">' + value.title + '</a> ';
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
          xStr += ' <a href="#" data-featherlight="#resource-lab" data-hover="' + value.title + '">' + value.title + '</a> ';
          xStr += '</div>';

          xStr += '<div class="lightbox" id="resource-lab">  <h2> Tutors/Lab Information </h2> <p>' + value.description + '</p> <p> View schedule: <strong>' + value.tutoringLabHoursLink + '</strong> </p> </div>';
          break;
        case "Student Ambassador Information & Application":
          xStr += '<div class="grid-box">';
          xStr += ' <a href="#" data-featherlight="#resource-ambassador" data-hover="' + value.title + '">' + value.title + '</a> ';
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
            xStr += ' <a href="#" data-featherlight="#resource-coop" data-hover="' + value.title + '">' + value.title + '</a> ';
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
        xStr += ' <a href="#" data-featherlight="#resource-forms" data-hover="Forms">Forms</a> ';
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

    footer();
  });


}

function footer() {
  myXhr('get', {path: '/footer/'}, '#about').done(function (obj) {
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
  });
}

function scrollToAnchor(aid){
    var aTag = $("a[name='"+ aid +"']");
    $('html,body').animate({scrollTop: aTag.offset().top},2000, 'easeInOutSine');
}

function getStaff(dom) {
  myXhr('get', {
    path: '/people/staff/username=' + $(dom).attr('data-username')}, null).done(function (obj) {
    $("#" + obj.username).html("");
    $("#" + obj.username).append("<h2> " + obj.name + "</h2> <p>" + obj.tagline + "</p> <p> " + obj.title + "</p> <ul>" + "<li> Email: " + obj.email + "</li>" + "<li> Phone: " + obj.phone + "</li>" + "<li> Office: " + obj.office + "</li> </ul>");
    console.log(obj);
    console.log($(dom).attr('data-username'));
    console.log('/people/faculty/username=' + $(dom).attr('data-username'));
  });
}

function getFac(dom) {
  myXhr('get', {
    path: '/people/faculty/username=' + $(dom).attr('data-username')}, null).done(function (obj) {
    $("#" + obj.username).html("");
    $("#" + obj.username).append("<h2> " + obj.name + "</h2> <p>" + obj.tagline + "</p> <p> " + obj.title + "</p> <ul>" + "<li> Email: " + obj.email + "</li>" + "<li> Phone: " + obj.phone + "</li>" + "<li> Office: " + obj.office + "</li> </ul>");
    console.log(obj);
    console.log($(dom).attr('data-username'));
    console.log('/people/faculty/username=' + $(dom).attr('data-username'));
  });
}
///////////////////////////////////////////////////
//utilities...
//data - {path:'/about/'}
//(getOrPost, data, idForSpinner)
function myXhr(t, d, id) {
  return $.ajax({
    type: t
    , url: 'proxy.php'
    , dataType: 'json'
    , data: d
    , cache: false
    , async: true
    , beforeSend: function () {
      //PLEASE - get your own spinner that 'fits' your site.
      $(id).append('<img src="gears.gif" class="spin"/>');
    }
  }).always(function () {
    //kill spinner
    $(id).find('.spin').fadeOut(5000, function () {
      $(this).remove();
    });
  }).fail(function () {
    //handle failure
  });
}
