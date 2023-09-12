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
        document.getElementById("weather-icon").innerHTML = "<img src='https://openweathermap.org/img/w/" + response.weather[0].icon + ".png'>";
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

//Functions to request current Air Quality Conditions via OpenWeather API
function getAirQuality(lat, lon) {
    //Call OpenWeather API
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/air_pollution?lat=" + lat + "&lon=" + lon + "&APPID=" + OpenWeatherAPI,
        method: "GET"
    }).then(function(response) {
        //Assign Air Quality Index to variable
        var airQualityIndex = response.list[0].main.aqi;
        //Switch function to assign AQI to color
        switch (airQualityIndex) {
            case 1:
                var airQualityColor = "green";
                break;
            case 2:
                var airQualityColor = "yellow";
                break;
            case 3:
                var airQualityColor = "orange";
                break;
            case 4:
                var airQualityColor = "red";
                break;
            case 5:
                var airQualityColor = "purple";
                break;
            default:
                var airQualityColor = "grey";
        }
        //Print response to HTML
        $("#weather-aq").html(response.list[0].main.aqi);
    });

}

//Functions to request current UV Index via OpenWeather API
function getUVIndex(lat, lon) {
    //Call OpenWeather API
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&APPID=" + OpenWeatherAPI,
        method: "GET"
    }).then(function(response) {
        //Assign UV Index to variable
        var uvIndex = response.value;
        //Switch function to assign UV Index to color
        switch (true) {
            case (uvIndex <= 2):
                var uvIndexColor = "green";
                break;
            case (uvIndex <= 5):
                var uvIndexColor = "yellow";
                break;
            case (uvIndex <= 7):
                var uvIndexColor = "orange";
                break;
            case (uvIndex <= 10):
                var uvIndexColor = "red";
                break;
            case (uvIndex >= 11):
                var uvIndexColor = "purple";
                break;
            default:
                var uvIndexColor = "grey";
        }
        //Print response to HTML
        $("#weather-uv").html(response.value);       
    });

}


//Function calls handled by geo.js - onpageload