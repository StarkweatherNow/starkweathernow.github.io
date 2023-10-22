//Bureau of Labor Statistics API - Employment Figures for the United States
//Grabs last 10 years of data on page load

//BLS API Key
var blsKey = "7d2fa3e98ca54810b0012b6a30958307";

//BLS API URL
var blsURL = "https://api.bls.gov/publicAPI/v2/timeseries/data/";

//BLS API Series ID
var blsSeriesID = "LNS12000000";

//BLS API End Year - Current Year
var endYear = new Date().getFullYear();

//BLS API Start Year - 10 Years Ago
var startYear = endYear - 10;

//Function to call API
function getEmployment(startYear, endYear) {
    //Set URL for API Call - BLS API
    //Example URL: https://api.bls.gov/publicAPI/v2/timeseries/data/LNS14000000?startyear=2010&endyear=2014&registrationkey=b2b3b4b5b6b7b8b9b0
    var blsURL = "https://api.bls.gov/publicAPI/v2/timeseries/data/" + blsSeriesID + "?startyear=" + startYear + "&endyear=" + endYear + "&registrationkey=" + blsKey;

    //Console Log URL
    console.log(blsURL);

    //Make API Call with URL
    fetch(blsURL)

    .then(function(response) {
        //Return response as JSON
        return response.json();
    })
    .then(function(data) {
        //Console Log Data
        console.log(data);
        blsValue(data);
    })
    .catch(function(error) {
        //Console Log Error
        console.log(error);
    });

}

//Function to Increment through Data array and return Value, Period and Year in new array
function blsValue(data) {
    //Create new array
    var blsData = [];

    //Console Log Data Array
    //console.log(data["Results"]["series"][0]["data"]);

    //Loop through data array
    for (var i = 0; i < data["Results"]["series"][0]["data"].length; i++) {
        //Create new object
        var blsObject = {};

        //Console Log Data Array
        //console.log(data);

        //Set Value, Period and Year
        blsObject.value = data["Results"]["series"][0]["data"][i]["value"];
        blsObject.period = data["Results"]["series"][0]["data"][i]["period"];
        blsObject.year = data["Results"]["series"][0]["data"][i]["year"];

        //Push object to array
        blsData.push(blsObject);
    }
    //Console Log Array
    //console.log(blsData);

    //Call displayEmployment function
    displayEmployment(blsData);   
}


//Function to display Employment Data
function displayEmployment(data) {
    //Console Log Data
    //console.log(data);

    //Format Data for HTML Table
    //Create HTML Table
    var table = "<table class='table table-striped table-hover table-bordered'><thead><tr><th>Year</th><th>Month</th><th>Value</th></tr></thead><tbody>";

    //Loop through data array
    for (var i = 0; i < data.length; i++) {
        //Add table row
        table += "<tr><td>" + data[i].year + "</td><td>" + data[i].period + "</td><td>" + data[i].value + "</td></tr>";
    }

    //Close table
    table += "</tbody></table>";

    //Console Log Table
    //console.log(table);

    //Display table in HTML
    document.getElementById("blsEmployment").innerHTML = table;
}

//On page load, call getEmployment function
getEmployment(startYear, endYear);