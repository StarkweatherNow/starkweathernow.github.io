//function to call NASA daily image API
function getDailyImage() {
    fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY')
    .then(function(resp) { return resp.json() }) // Convert data to json
    .then(function(data) {
        console.log(data);
        drawDailyImage(data);
    })
    .catch(function() {
        // catch any errors
    });
}

function drawDailyImage(data) {
    var image = data.url;
    var title = data.title;
    var explanation = data.explanation;
    document.getElementById('daily-image__image').style(background-image:url) = image;
    document.getElementById('daily-image__title').innerHTML = title;
    document.getElementById('daily-image__explanation').innerHTML = explanation;
}

