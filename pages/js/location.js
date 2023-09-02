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


//manual button to provide geolocation
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
        //hide button after click
        document.getElementById("weather-button").style.display = "none";        
    }
    else {
        alert("Geolocation is not supported by this browser.");
    }
}

//if else to call for user location if they deny onload prompt
if lat && long > 0 {
    document.getElementById("weather-button").style.display = "none";
} else {
    getLocation();
}