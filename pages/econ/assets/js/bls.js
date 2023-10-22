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
        displayEmployment(data);
    })
    .catch(function(error) {
        //Console Log Error
        console.log(error);
    });

}

//Function to display Employment Data
function displayEmployment(data) {
    //Get Employment Data from API
    var blsData = data.Results.series[0].data;
    //Get Employment Value from API
    var blsValue = blsData[0].value;
    //Display Employment Value in HTML
    document.getElementById("blsEmployment").innerHTML = blsValue;
}

//On page load, call getEmployment function
getEmployment(startYear, endYear);