var data = 'https://api-ninjas.com';
var category = 'technology'
$.ajax({
    method: 'GET',
    url: 'https://api.api-ninjas.com/v1/randomimage?category=' + category,
    headers: { 'X-Api-Key': 'HKbdvSJTDOWdxNPGQtd3wA==N9x9ZynA8zBsTFLA', 'Accept': 'image/jpg'},
    success: function(result) {
        console.log(result);
        // Convert base64-encoded image in JPEG format to html
        result = '<img src="data:image/jpg;charset=utf-8;base64,' + result + '">';
        $('#image-content').html(result);
    },
    error: function ajaxError(jqXHR) {
        console.error('Error: ', jqXHR.responseText);
    }
});