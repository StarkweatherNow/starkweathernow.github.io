//JavaScript Functions to call and draw NASA Image of the Day API

//Global Variables
var nasaAPI ="rV48bEw0tXfdbSMBLlgNXhLH6bFGsUQ5plvD0d50";
var nasaURL = "https://api.nasa.gov/planetary/apod?api_key=" + nasaAPI + "&hd=true";
var nasaImage = "";
var nasaTitle = "";
var nasaDate = "";
var nasaExplanation = "";
var nasaMediaType = "";
var nasaHDImage = "";
var nasaHDImageURL = "";
var nasaHDImageTitle = "";
var nasaHDImageDate = "";
var nasaHDImageExplanation = "";
var nasaHDImageMediaType = "";

//Function to call NASA API
function callNASA() {
    $.ajax({
        url: nasaURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        nasaImage = response.url;
        nasaTitle = response.title;
        nasaDate = response.date;
        nasaExplanation = response.explanation;
        nasaMediaType = response.media_type;
        nasaHDImage = response.hdurl;
        nasaHDImageTitle = response.title;
        nasaHDImageDate = response.date;
        nasaHDImageExplanation = response.explanation;
        nasaHDImageMediaType = response.media_type;
        drawNASA();
    });
}

//Function to draw NASA Image of the Day
function drawNASA() {
    //get document element by id and set src attribute
    document.getElementById("NASA-pic").setAttribute("src", nasaHDImage);
}

//Call drawNASA function on page load
callNASA();