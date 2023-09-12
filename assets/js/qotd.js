//Quote of the Day powered by Ninja API

var category = 'inspirational'
$.ajax({
    method: 'GET',
    url: 'https://api.api-ninjas.com/v1/quotes?category=' + category,
    headers: { 'X-Api-Key': 'HKbdvSJTDOWdxNPGQtd3wA==N9x9ZynA8zBsTFLA'},
    contentType: 'application/json',
    success: function(result) {
        //console.log(result);
        //parse result into array
        var quote = JSON.parse(result);
        console.log(quote);
        console.log(result.quote);
        console.log(result.author);

        document.getElementById('quote-content').innerHTML = quote.quote;
        document.getElementById('quote-author').innerHTML = quote.author;
        //$('#quote-content').html(result.quote);
        //$('#quote-author').html(result.author);
    },
    error: function ajaxError(jqXHR) {
        console.error('Error: ', jqXHR.responseText);
    }
});