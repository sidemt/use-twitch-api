$(document).ready(function() {
  var usernames = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp"];
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
        //results = results + "<p>" + JSON.stringify(data) + "</p>";

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
                results + createPanel(data.display_name, data.logo, data.url, "Offline");
            }, // end success handler
            error: function() {
              results = results + "<p> Could not retreave channel data</p>";
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
        $("#results").html("An error has occured.");
      }
    }); // end ajax
  } // end for

  // a handler to be called when all Ajax requests have completed
  $(document).ajaxStop(function() {
    $("#results").html(results);
    console.log("Offline Users: " + offlineUsers);
    // $("#channels").html(channelResults);
  });

  // HTMLに成型して出力する関数
  function createPanel(displayName, logo, link, status) {
    var html =
      "<div>" +
      "<a href=\"" + link + "\" target=\"_blank\">" +
      displayName +
      "</a>" +
      '<img src="' +
      logo +
      '">' +
      "<p>" +
      status +
      "</p>" +
      "</div>";

    return html;
  }
});