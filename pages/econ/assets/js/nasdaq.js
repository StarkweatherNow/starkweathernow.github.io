//API Calls for NASDAQ Financial Data

//Variables
var nasdaqAPI = "iQT4cj9qm1Dsp9x29dk_";

//API Call to get GDP from NASDAQ
function getGDP(country, startDate, endDate) {
    //Set URL for API Call
    var nasdaqURL = `https://api.nasdaq.com/api/quote/${country}/historical?assetclass=index&fromdate=${startDate}&todate=${endDate}`;
    //Console Log URL
    console.log(nasdaqURL);
    
    //Make API Call
    fetch(nasdaqURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            //Log API Data
            console.log(data);
            //Call Function to display GDP Data
            displayGDP(data);
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

//Attach Submit Button to getValues Function
document.getElementById("nasdaqSubmit").addEventListener("click", getValues);