//JS Functions to call and draw OpenWeather API

//Global variables
var OpenWeatherAPI = "92282d7a9bd391d5a486ae5655c7c080";
var success = "Weather Loaded";
var fail = "Weather Failed to Load";
//Bootswatch - Assigning theme color to weather conditions
var blue = "list-group-item-primary";
var green = "list-group-item-success";
var yellow = "list-group-item-warning";
var orange = "list-group-item-warning";
var red = "list-group-item-danger";
var purple = "list-group-item-dark";
var grey = "list-group-item-secondary";


//Function to call OpenWeather API
function getWeather(lat, lon) {
    //Call OpenWeather API
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=imperial&APPID=" + OpenWeatherAPI,
        method: "GET"
    }).then(function(response) {
        console.log("Weather API Response");
        console.log(response);
        //Convert Kelvin to Fahrenheit
        var tempF = Math.round(response.main.temp);
        //Print response to HTML
        //$("#weather-status").html(success);
        $("#weather-location").html(response.name);
        $("#weather-icon").html("<img src='http://openweathermap.org/img/w/" + response.weather[0].icon + ".png'>");
        $("#weather-temp").html("Temp: " + tempF + "&deg;F");
        $("#weather-humidity").html("Humidity: " + response.main.humidity + "%");
        $("#weather-wind").html("Wind Speed: " + response.wind.speed + " mph");
        //print current time from response to html
        $("#weather-time").html(moment.unix(response.dt).format("HH:MM"));       

        //Switch to assign color to time based on sunrise and sunset
        switch (true) {
            case (response.dt <= response.sys.sunrise):
                var timeColor = blue;
                $("#class-time").addClass(timeColor);
                break;
            case (response.dt >= response.sys.sunset):
                var timeColor = blue;
                $("#class-time").addClass(timeColor);
                break;
            default:
                var timeColor = grey;
                $("#class-time").addClass(timeColor);
        }
 
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
            $("#forecast-rain-" + i).html(forecastArray[i].pop + "%");
            //Switch to assign color to temperature
            switch (true) {
                case (tempF <= 40):
                    var tempColor = blue;
                    $("#class-temp").addClass(tempColor);
                    break;
                case (tempF <= 60):
                    var tempColor = green;
                    $("#class-temp").addClass(tempColor);
                    break;
                case (tempF <= 80):
                    var tempColor = yellow;
                    $("#class-temp").addClass(tempColor);
                    break;
                case (tempF <= 90):
                    var tempColor = orange;
                    $("#class-temp").addClass(tempColor);
                    break;
                case (tempF >= 91):
                    var tempColor = red;
                    $("#class-temp").addClass(tempColor);
                    break;
                default:
                    var tempColor = grey;
                    $("#class-temp").addClass(tempColor);
            }
            //Switch to assign color to humidity
            switch (true) {
                case (forecastArray[i].main.humidity <= 40):
                    var humidityColor = blue;
                    $("#class-humidity").addClass(humidityColor);
                    break;
                case (forecastArray[i].main.humidity <= 60):
                    var humidityColor = green;
                    $("#class-humidity").addClass(humidityColor);
                    break;
                case (forecastArray[i].main.humidity <= 80):
                    var humidityColor = yellow;
                    $("#class-humidity").addClass(humidityColor);
                    break;
                case (forecastArray[i].main.humidity <= 90):
                    var humidityColor = orange;
                    $("#class-humidity").addClass(humidityColor);
                    break;
                case (forecastArray[i].main.humidity >= 91):
                    var humidityColor = red;
                    $("#class-humidity").addClass(humidityColor);
                    break;
                default:
                    var humidityColor = grey;
                    $("#class-humidity").addClass(humidityColor);
            }
            //Switch to assign color to rain
            switch (true) {
                case (forecastArray[i].pop <= 40):
                    var rainColor = blue;
                    $("#class-rain").addClass(rainColor);
                    break;
                case (forecastArray[i].pop <= 60):
                    var rainColor = green;
                    $("#class-rain").addClass(rainColor);
                    break;
                case (forecastArray[i].pop <= 80):
                    var rainColor = yellow;
                    $("#class-rain").addClass(rainColor);
                    break;
                case (forecastArray[i].pop <= 90):
                    var rainColor = orange;
                    $("#class-rain").addClass(rainColor);
                    break;
                case (forecastArray[i].pop >= 91):
                    var rainColor = red;
                    $("#class-rain").addClass(rainColor);
                    break;
                default:
                    var rainColor = grey;
                    $("#class-rain").addClass(rainColor);
            }

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
                var airQualityColor = green;
                $("#class-aq").addClass(airQualityColor);
                break;
            case 2:
                var airQualityColor = yellow;
                $("#class-aq").addClass(airQualityColor);
                break;
            case 3:
                var airQualityColor = orange;
                $("#class-aq").addClass(airQualityColor);
                break;
            case 4:
                var airQualityColor = red;
                $("#class-aq").addClass(airQualityColor);
                break;
            case 5:
                var airQualityColor = purple;
                $("#class-aq").addClass(airQualityColor);
                break;
            default:
                var airQualityColor = grey;
                $("#class-aq").addClass(airQualityColor);
        }
        //Print response to HTML
        $("#weather-aq").html("Air Quality: " + response.list[0].main.aqi);
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
                var uvIndexColor = green;
                $("#class-uv").addClass(uvIndexColor);
                break;
            case (uvIndex <= 5):
                var uvIndexColor = yellow;
                $("#class-uv").addClass(uvIndexColor);
                break;
            case (uvIndex <= 7):
                var uvIndexColor = orange;
                $("#class-uv").addClass(uvIndexColor);
                break;
            case (uvIndex <= 10):
                var uvIndexColor = red;
                $("#class-uv").addClass(uvIndexColor);
                break;
            case (uvIndex >= 11):
                var uvIndexColor = purple;
                $("#class-uv").addClass(uvIndexColor);
                break;
            default:
                var uvIndexColor = grey;
                $("#class-uv").addClass(uvIndexColor);
        }
        //Print response to HTML
        $("#weather-uv").html("UV Index: " + response.value);       
    });

}


//Function calls handled by geo.js - onpageload