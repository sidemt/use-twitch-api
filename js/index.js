$(document).ready(function() {
  var usernames = [
    "ESL_SC2",
    "OgamingSC2",
    "cretetion",
    "freecodecamp",
    "cosmoquestx",
    "starstryder"
  ];
  var offlineUsers = [];
  var results = "";
  var channelResults = "";

  // get stream information
  for (i = 0; i < usernames.length; i++) {
    // Send Ajax request
    $.get({
      url: "https://wind-bow.glitch.me/twitch-api/streams/" + usernames[i],
      data: {
        callback: ""
      },
      dataType: "jsonp",
      timeout: 10000,
      // Success handler
      success: function(data) {
        if (data.stream === null) {
          // When Offline
          $.get({
            url: data._links.channel.replace(
              "https://api.twitch.tv/kraken/channels/",
              "https://wind-bow.glitch.me/twitch-api/channels/"
            ),
            data: {
              callback: ""
            },
            dataType: "jsonp",
            timeout: 10000,
            // Success handler
            success: function(data) {
              results =
                results +
                createPanel(
                  data.display_name,
                  data.logo,
                  data.url,
                  "<em>Offline</em>"
                );
            }, // end success handler
            error: function() {
              results = results + "<p>An error has occured.</p>";
            }
          }); // end ajax
        } else {
          // When Online
          results =
            results +
            createPanel(
              data.stream.channel.display_name,
              data.stream.channel.logo,
              data.stream.channel.url,
              data.stream.channel.status
            );
        } // end if
      }, // end success handler
      error: function() {
        results = results + "<p>An error has occured.</p>";
      }
    }); // end ajax
  } // end for

  // a handler to be called when all Ajax requests have completed
  $(document).ajaxStop(function() {
    $("#results").html(results);
  });

  // HTMLに成型して出力する関数
  function createPanel(displayName, logo, link, status) {
    var html =
      '<a href="' +
      link +
      '" target="_blank">' +
      '<div class="card mb-2">' +
      '<div class="card-body row justify-content-center align-items-center">' +
      '<div class="col-lg-1 align-self-center logo"><img class="img-fluid rounded" src="' +
      logo +
      '"></div>' +
      '<div class="col-lg-2">' +
      "<strong>" +
      displayName +
      "</strong>" +
      "</div>" +
      '<div class="col-lg-9">' +
      status +
      "</div>" +
      "</div>" +
      "</div>" +
      "</a>";

    return html;
  }
});