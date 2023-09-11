//Collection of JS Functions to handle all GeoLocation related functions

//Global variables
var lat;
var lon;

//Function to request user location
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
        console.log("Geolocation is supported by this browser.");
        //Assign Longitude and Latitude to variables
        function showPosition(position) {
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;
            //Intialize Mapquest API
            initMap(lat,lon);
            //Get Weather
            getWeather(lat, lon);
            console.log("geo.js loaded");
            console.log("Latitude: " + lat + " Longitude: " + lon);
            //Print Longitude and Latitude to HTML
            $("#location-status").html("Latitude: " + lat + " Longitude: " + lon);
        }
        
    } else {
        $("#location-status").html("Geolocation is not supported by this browser.");
    }
}

//On page load, call getLocation function from geo.js
getLocation();