//JS Quote of the Day
//create array of quotes
var quotes = [
    "The best preparation for tomorrow is doing your best today. - H. Jackson Brown, Jr.",
    "Believe you can and you're halfway there. - Theodore Roosevelt",
    "It does not matter how slowly you go as long as you do not stop. - Confucius",
    "Our greatest weakness lies in giving up. The most certain way to succeed is always to try just one more time. - Thomas A. Edison",
    "Start by doing what's necessary; then do what's possible; and suddenly you are doing the impossible. - Francis of Assisi",
];

//parse quote and author from array
var quote = quotes[Math.floor(Math.random() * quotes.length)];
var author = quote.split(" - ")[1];
quote = quote.split(" - ")[0];

//append quote to ID qotdquote
document.getElementById("qotdQuote").innerHTML = quote;

//append author to ID qotdauthor
document.getElementById("qotdAuthor").innerHTML = author;

