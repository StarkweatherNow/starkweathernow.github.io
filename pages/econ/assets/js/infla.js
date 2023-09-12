//JS Function to get the U.S. Inflation Rate
function getInflationRate() {
    var url = "https://api.bls.gov/publicAPI/v2/timeseries/data/CUUR0000SA0?registrationkey=6d8b0a4f5f6c4c6c9c6b9f2a5f1c7b2c&latest=true&output=json";
    $.getJSON(url, function (json) {
        var results = json.Results.series[0].data[0].value;
        var inflationRate = results;
        document.getElementById("inflationRate").innerHTML = inflationRate;
    });
}

//Call on page load
getInflationRate();