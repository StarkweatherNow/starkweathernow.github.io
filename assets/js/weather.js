//JS Functions to call and draw OpenWeather API

//Global variables
var OpenWeatherAPI = "92282d7a9bd391d5a486ae5655c7c080";
var success = "Weather Loaded";
var fail = "Weather Failed to Load";

//Function to call OpenWeather API
function getWeather(lat, lon) {
    //Call OpenWeather API
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=imperial&APPID=" + OpenWeatherAPI,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        //Convert Kelvin to Fahrenheit
        var tempF = Math.round(response.main.temp);
        //Print response to HTML
        $("#weather-status").html(success);
        $("#weather-location").html(response.name);
        $("#weather-icon").html("<img src='http://openweathermap.org/img/w/" + response.weather[0].icon + ".png'>");
        $("#weather-temp").html(tempF + "°F");
        $("#weather-humidity").html(response.main.humidity + "%" + " Humidity");
        $("#weather-wind").html(response.wind.speed + " mph");
    });

}

//Function call handled by geo.js