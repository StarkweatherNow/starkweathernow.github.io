//counter to verify if user has clicked button
var locationCounter = 0;
    
//Request current user GPS from browser with error handling
function getLocation() {
    
    if (navigator.geolocation) {
        if (locationCounter = 0)  {
            navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
            locationCounter = 1;
        } else {
            alert("You have already clicked the button.");
        }
    } else {
        alert("Geolocation is not supported by this browser.");
    }
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

//attach function to button
document.getElementById('get-location').onclick = getLocation