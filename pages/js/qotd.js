//Data Source for Dashboard Widget - Quote of the Day
//import JSON file - qotd.json
import data from ('./quotes.json') assert { type: "json" };

//Get the data from the JSON file
var quote = data.quote;
var author = data.author;

//parse data into a string
quote = JSON.stringify(quote);
author = JSON.stringify(author);

//remove the quotation marks from the string
quote = quote.replace(/\"/g, "");
author = author.replace(/\"/g, "");

//append quote to ID qotdquote
document.getElementById("qotdQuote").innerHTML = quote;

//append author to ID qotdauthor
document.getElementById("qotdAuthor").innerHTML = author;

