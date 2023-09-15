//JS Function to call upon Cats API to get all cats

var APIkey = "live_OSEB4XhlaJ76pjKmPqHmNnr1v9ro8r6MSk3Sr1O8sE4tRA86NYfnM4kBD594K7wm";
var queryURL = "https://api.thecatapi.com/v1/images/search?limit=10&api_key=" + APIkey;
    
function ajax_get(url, callback) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      console.log('responseText:' + xmlhttp.responseText);
      try {
        var data = JSON.parse(xmlhttp.responseText);
      } catch (err) {
        console.log(err.message + " in " + xmlhttp.responseText);
        return;
      }
      callback(data);
    }
  };

  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}

ajax_get(queryURL, function(data) {
    //Loop through the data array of objects
    for (var i = 0; i < data.length; i++) {
        //console.log(data[i]);
        //Pull URL from data array into a variable
        var img = data[i].url;
        var html = '<img src=/"' + img + '/">';
        //Append the image element to the div with the id of cats
        document.getElementById("cats_" + i).innerHTML = html;
    }
});
