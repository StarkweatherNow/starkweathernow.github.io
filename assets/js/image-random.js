var data = 'https://api-ninjas.com';
var category = 'technology'
$.ajax({
    method: 'GET',
    url: 'https://api.api-ninjas.com/v1/randomimage?category=' + category,
    headers: { 'X-Api-Key': 'HKbdvSJTDOWdxNPGQtd3wA==N9x9ZynA8zBsTFLA', 'Accept': 'image/jpg'},
    success: function(result) {
        console.log(result);
        $('#image-content').html(result.image);
    },
    error: function ajaxError(jqXHR) {
        console.error('Error: ', jqXHR.responseText);
    }
});