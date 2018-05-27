$(document).ready(function() {
  var usernames = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp"];
  var results = "";

  for (i = 0; i < usernames.length; i++) {
    // Send Ajax request
    $.ajax({
      url: "https://wind-bow.glitch.me/twitch-api/streams/" + usernames[i],
      data: {
        callback: ""
      },
      type: "GET",
      dataType: "jsonp",
      timeout: 10000,
      // Success handler
      success: function(data) {
        console.log(data);
        results = results + "<p>" + JSON.stringify(data) + "</p>";
        console.log(i + "回目：" + results);
        // $("#results").html(JSON.stringify(data));
      }, // end success handler
      error: function() {
        $("#results").html("An error has occured.");
      },
      xhrFields: {
        withCredentials: false
      }
    }); // end ajax
  } // end for

  // a handler to be called when all Ajax requests have completed
  $(document).ajaxStop(function() {
    $("#results").html(results);
    console.log("RESULTS::: " + results);
  });
});