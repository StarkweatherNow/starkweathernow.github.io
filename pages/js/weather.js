//Widget to display weather information
// - Uses OpenWeatherMap API
// - Displays the following info: Tempature, Weather Description, Air Quality, Humidity
// - Uses the following icons: https://openweathermap.org/weather-conditions
// - Uses the following API: https://openweathermap.org/api/air-pollution

//OpenWeather API Key  
const API_KEY = "92282d7a9bd391d5a486ae5655c7c080";

//Get the weather information
function getWeather(lat,long) {
    
    //Get the weather information from OpenWeatherMap API
    fetch('https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+'&appid='+API_KEY)
    .then(function(resp) { return resp.json() }) // Convert data to json
    .then(function(data) {
        console.log(data);
        drawWeather(data);
    })
    .catch(function() {
        // catch any errors
    });

    //Get the forecast information from OpenWeatherMap API
    fetch('https://api.openweathermap.org/data/2.5/forecast?lat='+lat+'&lon='+long+'&appid='+API_KEY)
    .then(function(resp) { return resp.json() }) // Convert data to json
    .then(function(data) {
        console.log(data);
        drawForecast(data);
    })
    .catch(function() {
        // catch any errors
    });

    //Get the air quality information from OpenWeatherMap API
    fetch('https://api.openweathermap.org/data/2.5/air_pollution?lat='+lat+'&lon='+long+'&appid='+API_KEY)
    .then(function(resp) { return resp.json() }) // Convert data to json
    .then(function(data) {
        console.log(data);
        drawAirQuality(data);
    })
    .catch(function() {
        // catch any errors
    });
    
}

function drawWeather(data) {
    var fahrenheit = Math.round(((parseFloat(data.main.temp)-273.15)*1.8)+32);
    var description = data.weather[0].description;
    //Capitalizes the first letter of each word in the description
    const words = description.split(" ");
        for (let i = 0; i < words.length; i++) {
            words[i] = words[i][0].toUpperCase() + words[i].substr(1);
        }
    var description = words.join(" ");
    var humidity = data.main.humidity;
    var icon = data.weather[0].icon;
    var name = data.name;
    document.getElementById('weather-location').innerHTML = name;
    document.getElementById('weather-icon').src = "http://openweathermap.org/img/w/" + icon + ".png";
    document.getElementById('weather-description').innerHTML = description;
    document.getElementById('weather-temp').innerHTML = fahrenheit + '&deg;' + humidity + '%';
};

function drawForecast(data) {
    //for each item in the data.list array parse "dt" and "main.temp" and "main.humidity" and "wind.speed" to the table
    for (var i = 0; i < data.list.length; i++) {
        var unix_timestamp = data.list[i].dt;
        var date = new Date(unix_timestamp*1000);
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        var formattedTime = hours + ':' + minutes.substr(-2);
        document.getElementById('time-'+i).innerHTML = formattedTime;
        var fahrenheit = Math.round(((parseFloat(data.list[i].main.temp)-273.15)*1.8)+32);
        document.getElementById('temp-'+i).innerHTML = fahrenheit + '&deg;';
        document.getElementById('hum-'+i).innerHTML = data.list[i].main.humidity + '%';
        document.getElementById('wind-'+i).innerHTML = data.list[i].wind.speed + ' mph';
        //clear text from weather-widget
        document.getElementById('weather-widget').innerHTML = "";

    };

};
    
function drawAirQuality(data) {
    var aqi = data.list[0].main.aqi;
    //If Else statement to determine the AQI
    if (aqi == 1) {
        aqi = "Air Quality:<br><span class=\"badge bg-success\">Good</span>";
    } else if (aqi == 2) {
        aqi = "Air Quality:<br><span class=\"badge bg-warning\">Fair</span>";
    } else if (aqi == 3) {
        aqi = "Air Quality:<br><span class=\"badge bg-warning\">Moderate</span>";
    } else if (aqi == 4) {
        aqi = "Air Quality:<br><span class=\"badge bg-danger\">Poor</span>";
    } else if (aqi == 5) {
        aqi = "Air Quality:<br><span class=\"badge bg-danger\">Very Poor</span>";
    } else {
        aqi = "Unknown";
    };
    document.getElementById('weather-AQ').innerHTML = aqi;
};