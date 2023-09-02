//JS script to call stock quote API and display results

//default stock symbol
var stock = "GME"   //GameStop;

//Function to call API and display results
function getStocks() {
    var stock = document.getElementById("stock").value;
    var url = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + stock + "&apikey=Z1E1XJ1WJ0K9ZG1O";
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onload = function () {
        var data = JSON.parse(this.response);
        var symbol = data["Meta Data"]["2. Symbol"];
        var date = data["Meta Data"]["3. Last Refreshed"];
        var open = data["Time Series (Daily)"][date]["1. open"];
        var high = data["Time Series (Daily)"][date]["2. high"];
        var low = data["Time Series (Daily)"][date]["3. low"];
        var close = data["Time Series (Daily)"][date]["4. close"];
        var volume = data["Time Series (Daily)"][date]["5. volume"];
        var output = "<h2>Stock Information</h2><br><table><tr><th>Symbol</th><th>Date</th><th>Open</th><th>High</th><th>Low</th><th>Close</th><th>Volume</th></tr><tr><td>" + symbol + "</td><td>" + date + "</td><td>" + open + "</td><td>" + high + "</td><td>" + low + "</td><td>" + close + "</td><td>" + volume + "</td></tr></table>";
        document.getElementById("stocks-widget").innerHTML = output;
    }
    request.send();
}



//Function to clear results
function clearResults() {
    document.getElementById("stock-widget").innerHTML = "";
}

//Function to clear form
function clearForm() {
    document.getElementById("stock").value = "";
}

//Function to clear form and results
function clearAll() {
    clearForm();
    clearResults();
}

//Function to validate form
function validateForm() {
    var stock = document.getElementById("stock").value;
    if (stock == "") {
        alert("Please enter a stock symbol");
        return false;
    }
    else {
        getStocks();
    }
}

//Function to validate form and clear results
function validateFormClear() {
    var stock = document.getElementById("stock").value;
    if (stock == "") {
        alert("Please enter a stock symbol");
        return false;
    }
    else {
        clearResults();
        getStocks();
    }
}

//Function to validate form and clear form
function validateFormClearForm() {
    var stock = document.getElementById("stock").value;
    if (stock == "") {
        alert("Please enter a stock symbol");
        return false;
    }
    else {
        clearForm();
        getStocks();
    }
}

//Function to validate form and clear form and results
function validateFormClearAll() {
    var stock = document.getElementById("stock").value;
    if (stock == "") {
        alert("Please enter a stock symbol");
        return false;
    }
    else {
        clearAll();
        getStocks();
    }
}

//attach function to button
document.getElementById("stocks-button").onclick = validateForm;

