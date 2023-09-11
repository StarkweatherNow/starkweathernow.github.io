//JS Function to call OpenWeather API and display weather data
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