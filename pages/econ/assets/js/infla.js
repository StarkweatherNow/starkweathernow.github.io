//JS Function to get the U.S. Inflation Rate
var country = 'United States'
var key = 'HKbdvSJTDOWdxNPGQtd3wA==N9x9ZynA8zBsTFLA'
$.ajax({
    method: 'GET',
    url: 'https://api.api-ninjas.com/v1/inflation?country=' + country,
    headers: { 'X-Api-Key':key},
    contentType: 'application/json',
    success: function(result) {
        //console.log(result);
        //Set the inflation rate to the result
        var inflationRate = result.data.inflation;
        //Print to ID inflationRate
        $('#inflationRate').text('Current U.S. Inflation Rate: ' + inflationRate);
    },
    error: function ajaxError(jqXHR) {
        console.error('Error: ', jqXHR.responseText);
    }
});

//Call on page load
getInflationRate();