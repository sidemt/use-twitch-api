$(document).ready(function() {
  // Send Ajax request
  $.ajax({
    url: "https://wind-bow.glitch.me/twitch-api/streams/freecodecamp",
    data: {
      callback: ""
    },
    type: "GET",
    dataType: "jsonp",
    timeout: 10000,
    // Success handler
    success: function(data) {
      console.log(data);
      $("#results").html(JSON.stringify(data));
    }, // end success handler
    error: function() {
      $("#results").html("An error has occured.");
    },
    xhrFields: {
      withCredentials: false
    }
  }); // end ajax
});