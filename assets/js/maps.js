//JS Functions to call and draw Highway Traffic map using Mapquest API

//MapQuest Key
var MQkey = "9eMLOVWDfxa6jMxtNtimoG55ltAxFQui";

// Function to add the map
function initMap(lat,lon) {
    document.getElementById('map-img').src = "https://www.mapquestapi.com/staticmap/v5/map?key=" + MQkey + "&center=" + lat + "," + lon + "&zoom=12&traffic=flow|cons|inc";
    //update map status
    $("#map-status").html("Map Loaded");
}

//Map called via geo.js