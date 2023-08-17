//Request current user GPS from browser with error handling
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
  } else {
    console.log("Geolocation is not supported by this browser.");
}
  
function successFunction(position) {
    console.log(position);
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    console.log(lat);
    console.log(long);
    //pass GPS to getWeather function
    getWeather(lat,long);
}
  
function errorFunction() {
    console.log("Unable to retrieve your location.");
}