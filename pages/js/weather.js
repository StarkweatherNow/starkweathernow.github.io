//Widget to display weather information
// - Uses OpenWeatherMap API
// - Displays the following info: Tempature, Weather Description, Air Quality, Humidity
// - Uses the following icons: https://openweathermap.org/weather-conditions
// - Uses the following API: https://openweathermap.org/api/air-pollution

//OpenWeather API Key  
const API_KEY = "92282d7a9bd391d5a486ae5655c7c080";

//Function to call for user location
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

//Function to display user location
function showPosition(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    var url = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + API_KEY;
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onload = function () {
        var data = JSON.parse(this.response);
        var temp = data["main"]["temp"];
        var weather = data["weather"][0]["description"];
        var humidity = data["main"]["humidity"];
        //convert variable humidity to string
        humidity = humidity.toString();
        //convert each word in humidity to uppercase
        humidity = humidity.split(" ").map(word => word[0].toUpperCase() + word.slice(1)).join(" ");
        var output = "<table class=\"table table-hover\"><tr><th scope=\"col\">Temp</th><th scope=\"col\">Condition</th><th scope=\"col\">Humidity</th></tr><tr><td>" + temp + "</td><td>" + weather + "</td><td>" + humidity + "</td></tr></table>";
        document.getElementById("weather-widget").innerHTML = output;
    }
    request.send();
}

//OnClick event to call getLocation function
document.getElementById("weather-button").onclick = getLocation;

//add event listener to support mobile
document.getElementById("weather-button").addEventListener("touchstart", getLocation, false);

