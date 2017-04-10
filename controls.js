$( document ).ready(function() {
  $(".uMinor").click(function() {
    $(".desc").toggle();
    console.log("clicked");
  });

  $('[id*="cont"]').addClass( "container" );

  console.log("jQuery loaded");
});
