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
        //console.log(response);
        //Convert Kelvin to Fahrenheit
        var tempF = Math.round(response.main.temp);
        //Print response to HTML
        $("#weather-status").html(success);
        document.getElementById("weather-location").innerHTML = response.name;
        //$("#weather-location").html(response.name);
        document.getElementById("weather-icon").innerHTML = "<img src='http://openweathermap.org/img/w/" + response.weather[0].icon + ".png'>";
        //$("#weather-icon").html("<img src='http://openweathermap.org/img/w/" + response.weather[0].icon + ".png'>");
        document.getElementById("weather-temp").innerHTML = tempF + "&deg;F";
        //$("#weather-temp").html(tempF + "&deg;F");
        document.getElementById("weather-humidity").innerHTML = response.main.humidity + "%" + " Humidity";
        //$("#weather-humidity").html(response.main.humidity + "%" + " Humidity");
        document.getElementById("weather-wind").innerHTML = response.wind.speed + " mph";
        //$("#weather-wind").html(response.wind.speed + " mph");
 
    });

}

//Function to call OpenWeather API Forecast
function getForecast(lat, lon) {
    //Call OpenWeather API
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&APPID=" + OpenWeatherAPI,
        method: "GET"
    }).then(function(response) {
        //console.log(response);
        //Parse response.list to Array
        var forecastArray = response.list;
        //Print array to console
        //console.log(forecastArray);
        //Loop through Array
        for (var i = 0; i <= 3; i++) {           
            //console.log(i);
            //Convert Unix Time to Current Time
            var forecastDate = moment.unix(forecastArray[i].dt).format("HH:MM");
            //Convert Kelvin to Fahrenheit
            var tempF = Math.round(forecastArray[i].main.temp);
            //Print response to HTML
            $("#forecast-time-" + i).html(forecastDate);
            $("#forecast-temp-" + i).html(tempF + "&deg;F");
            $("#forecast-humidity-" + i).html(forecastArray[i].main.humidity + "%");
            $("#forecast-wind-" + i).html(forecastArray[i].wind.speed + " mph");
        }

    });

}

//Function calls handled by geo.js//JS Function to call OpenWeather API and display weather data
var openWeatherAPI = "92282d7a9bd391d5a486ae5655c7c080";
var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=" + openWeatherAPI;

function getWeather() {
    $.ajax({
        url: weatherURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var tempF = (response.main.temp - 273.15) * 1.80 + 32;
        $("#weather").html("<h4>" + response.name + "</h4>");
        $("#weather").append("<p>Temperature: " + tempF.toFixed(2) + " &#8457</p>");
        $("#weather").append("<p>Humidity: " + response.main.humidity + "%</p>");
        $("#weather").append("<p>Wind Speed: " + response.wind.speed + " MPH</p>");
    });
}

//Display weather data