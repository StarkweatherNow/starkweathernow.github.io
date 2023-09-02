//JS Quote of the Day

//initial array of quotes
var quotes_01 = [
    "The best preparation for tomorrow is doing your best today. - H. Jackson Brown, Jr.",
    "Believe you can and you're halfway there. - Theodore Roosevelt",
    "It does not matter how slowly you go as long as you do not stop. - Confucius",
    "Our greatest weakness lies in giving up. The most certain way to succeed is always to try just one more time. - Thomas A. Edison",
    "Start by doing what's necessary; then do what's possible; and suddenly you are doing the impossible. - Francis of Assisi",
    "It's not whether you get knocked down, it's whether you get up. - Vince Lombardi",
];

//array of quotes from stoic philosophers
var quotes_02 = [
    "The happiness of your life depends upon the quality of your thoughts. - Marcus Aurelius",
    "You have power over your mind, not outside events. Realize this, and you will find strength. - Marcus Aurelius",
];

//array of quotes from famous people
var quotes_03 = [
    "The best and most beautiful things in the world cannot be seen or even touched, they must be felt with the heart. - Helen Keller",
    "Keep your face always toward the sunshine, and shadows will fall behind you. - Walt Whitman",
    "Happiness is not something you postpone for the future; it is something you design for the present. - Jim Rohn",
];

//array of quotes from buddhist teachings
var quotes_04 = [
    "The mind is everything. What you think you become. - Buddha",
    "Three things cannot be long hidden: the sun, the moon, and the truth. - Buddha",
    "Peace comes from within. Do not seek it without. - Buddha",
    "There are only two mistakes one can make along the road to truth; not going all the way, and not starting. - Buddha",

];

//array of quotes from scientists and great thinkers
var quotes_05 = [
    "The most beautiful thing we can experience is the mysterious. It is the source of all true art and science. - Albert Einstein",
    "Look deep into nature, and then you will understand everything better. - Albert Einstein",
    "The true sign of intelligence is not knowledge but imagination. - Albert Einstein",
    "The important thing is not to stop questioning. Curiosity has its own reason for existing. - Albert Einstein",
    
];

//array of quotes from plato and other greek philosophers
var quotes_06 = [
    "The greatest wealth is to live content with little. - Plato",
    "The beginning is the most important part of the work. - Plato",

];

//create master array from the above arrays
var quotes = quotes_01.concat(quotes_02, quotes_03, quotes_04, quotes_05, quotes_06);

//shuffle array
function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

//parse quote and author from array
var quote = quotes[Math.floor(Math.random() * quotes.length)];
var author = quote.split(" - ")[1];
quote = quote.split(" - ")[0];

//append quote to ID qotdquote
document.getElementById("qotdQuote").innerText = quote;

//append author to ID qotdauthor
document.getElementById("qotdAuthor").innerText = author;

