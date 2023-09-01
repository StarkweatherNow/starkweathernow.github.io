//Data Source for Dashboard Widget - Quote of the Day
//import JSON file - qotd.json
import data from './quotes.json' assert { type: "json" };

//get the length of the JSON file
var length = data.length;

//generate a random number between 0 and the length of the JSON file
var random = Math.floor(Math.random() * length);

//get the quote and author from the JSON file
var quote = data[random].quote;
var author = data[random].author;

//remove the quotation marks from the string
quote = quote.replace(/\"/g, "");
author = author.replace(/\"/g, "");

//append quote to ID qotdquote
document.getElementById("qotdQuote").innerHTML = quote;

//append author to ID qotdauthor
document.getElementById("qotdAuthor").innerHTML = author;

