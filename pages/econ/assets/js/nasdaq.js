//API Calls for NASDAQ Financial Data

//Variables
var nasdaqAPI = "iQT4cj9qm1Dsp9x29dk_";

//API Call to get GDP from NASDAQ
function getGDP(country, startDate, endDate) {
    //Set URL for API Call - World Bank Data via NASDAQ API
    //Example URL: https://data.nasdaq.com/api/v3/datatables/WB/DATA?series_id=VC.PKP.TOTL.UN&country_code=XKX&api_key=iQT4cj9qm1Dsp9x29dk_
    var nasdaqURL = "https://data.nasdaq.com/api/v3/datatables/WB/DATA?series_id=VC.PKP.TOTL.UN&country_code=" + country + "&start_date=" + startDate + "&end_date=" + endDate + "&api_key=" + nasdaqAPI;
    
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