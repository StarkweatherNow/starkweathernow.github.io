var data = 'https://api-ninjas.com';
var category = 'technology'
$.ajax({
    method: 'GET',
    url: 'https://api.api-ninjas.com/v1/randomimage?category=' + category,
    headers: { 'X-Api-Key': 'HKbdvSJTDOWdxNPGQtd3wA==N9x9ZynA8zBsTFLA', 'Accept': 'image/jpg'},
    success: function(result) {
        console.log(result);
        // Convert base64-encoded image in JPEG format to html
        result = '<img src="data:image/jpg;base64,' + result + '">';
        document.getElementById('image-content').innerHTML = result;
    },
    error: function ajaxError(jqXHR) {
        console.error('Error: ', jqXHR.responseText);
    }
});