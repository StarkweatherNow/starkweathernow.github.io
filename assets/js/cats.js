//JS Function to call upon Cats API to get all cats

function getCats() {
    var APIkey = "live_OSEB4XhlaJ76pjKmPqHmNnr1v9ro8r6MSk3Sr1O8sE4tRA86NYfnM4kBD594K7wm";
    var queryURL = "https://api.thecatapi.com/v1/images/search?limit=10&api_key=" + APIkey;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        
    });
}