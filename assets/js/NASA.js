//JS Function to call NASA image of the day API

//Global variables
var API = "rV48bEw0tXfdbSMBLlgNXhLH6bFGsUQ5plvD0d50";

//Function to call NASA API
function getNASA() {
    //Call NASA API
    $.ajax({
        url: "https://api.nasa.gov/planetary/apod?api_key=" + API,
        method: "GET"
    }).then(function(response) {
        //console.log(response);
        //Print response to HTML
        $("#nasa-img").attr("src", response.url);
        $("#nasa-title").html(response.title);
        $("#nasa-desc").html(response.explanation);
    });
}

//On page load, call getNASA function
getNASA();