//API Calls for NASDAQ Financial Data

//Variables
var nasdaqAPI = "iQT4cj9qm1Dsp9x29dk_";

//End Year - Current Year and Month in yyyy-mm-dd format
var endYear = new Date().getFullYear();
var endMonth = new Date().getMonth() + 1;
var endDay = new Date().getDate();
var endDate = endYear + "-" + endMonth + "-" + endDay;

//Start Year - 10 Years Ago and Month in yyyy-mm-dd format
var startYear = endYear - 10;
var startMonth = endMonth;
var startDay = endDay;
var startDate = startYear + "-" + startMonth + "-" + startDay;

//API Call to get GDP from NASDAQ
function getGDP(startYear, endYear) {
    //Set URL for API Call - World Bank Data via NASDAQ API
    //Example URL: https://data.nasdaq.com/api/v3/datasets/FRED/GDP?start_date=2031-04-01&end_date=2031-10-01&api_key=iQT4cj9qm1Dsp9x29dk_
    var nasdaqURL = "https://data.nasdaq.com/api/v3/datasets/FRED/GDP?start_date=" + startYear + "&end_date=" + endYear + "&api_key=" + nasdaqAPI;

    //Console Log URL
    console.log(nasdaqURL);

    //Make API Call with URL
    fetch(nasdaqURL)

    .then(function(response) {
        //Return response as JSON
        return response.json();
    })
    .then(function(data) {
        //Console Log Data
        console.log(data);
        //Display Data
        displayGDP(data);
    })
    .catch(function(error) {
        //Console Log Error
        console.log(error);
    });

}

//Function to display GDP Data 
function displayGDP(data) {
    //Get GDP Data from API
    var nasdaqData = data.data;
    //Get GDP Value from API
    var nasdaqValue = nasdaqData[0].close;
    //Display GDP Value in HTML
    document.getElementById("nasdaqGDP").innerHTML = nasdaqValue;
}

//On page load, call getGDP function
getGDP(startDate, endDate);