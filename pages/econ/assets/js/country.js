//Working on calculating the strength of a country's economy
//https://www.investopedia.com/articles/personal-finance/020215/top-ten-us-economic-indicators.asp

//Global Variables
var countryName = "United States";
var countryGDP = 0;
var countryGDPGrowth = 0;
var countryInflation = 0;
var countryUnemployment = 0;
var countryDebt = 0;
var countryTradeBalance = 0;
var countryCurrency = "";
var countryCurrencyCode = "";
var countryCurrencySymbol = "";
var countryCurrencyRate = 0;
var countryCurrencyRateDate = "";
var countryCurrencyRateTime = "";
var countryCurrencyRateUTC = "";
var countryCurrencyRateUTCDate = "";
var countryCurrencyRateUTCTime = "";

//Function to get the country's currency
function getCountryCurrency(countryCode) {
    var queryURL = "https://restcountries.eu/rest/v2/alpha/" + countryCode;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        countryCurrency = response.currencies[0].name;
        countryCurrencyCode = response.currencies[0].code;
        countryCurrencySymbol = response.currencies[0].symbol;
        getCountryCurrencyRate(countryCurrencyCode);
    });
}

//Function to get the country's currency rate
function getCountryCurrencyRate(countryCurrencyCode) {
    var queryURL = "https://api.exchangeratesapi.io/latest?base=" + countryCurrencyCode;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        countryCurrencyRate = response.rates.USD;
        countryCurrencyRateDate = response.date;
        countryCurrencyRateTime = response.time_last_updated;
        countryCurrencyRateUTC = response.time_last_updated_utc;
        countryCurrencyRateUTCDate = response.time_last_updated_utc.substring(0, 10);
        countryCurrencyRateUTCTime = response.time_last_updated_utc.substring(11, 19);
        getCountryGDP(countryName);
    });
}

//Function to get the country's GDP
function getCountryGDP(countryName) {
    var queryURL = "https://api.worldbank.org/v2/country/" + countryName + "/indicator/NY.GDP.MKTP.CD?format=json";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        countryGDP = response[1][0].value;
        getCountryGDPGrowth(countryName);
    });
}

//Function to get the country's GDP growth
function getCountryGDPGrowth(countryName) {
    var queryURL = "https://api.worldbank.org/v2/country/" + countryName + "/indicator/NY.GDP.MKTP.KD.ZG?format=json";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        countryGDPGrowth = response[1][0].value;
        getCountryInflation(countryName);
    });
}

//Function to get the country's inflation
function getCountryInflation(countryName) {
    var queryURL = "https://api.worldbank.org/v2/country/" + countryName + "/indicator/FP.CPI.TOTL.ZG?format=json";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        countryInflation = response[1][0].value;
        getCountryUnemployment(countryName);
    });
}

//Function to get the country's unemployment
function getCountryUnemployment(countryName) {
    var queryURL = "https://api.worldbank.org/v2/country/" + countryName + "/indicator/SL.UEM.TOTL.ZS?format=json";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        countryUnemployment = response[1][0].value;
        getCountryDebt(countryName);
    });
}

//Function to get the country's debt
function getCountryDebt(countryName) {
    var queryURL = "https://api.worldbank.org/v2/country/" + countryName + "/indicator/GC.DOD.TOTL.GD.ZS?format=json";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        countryDebt = response[1][0].value;
        getCountryTradeBalance(countryName);
    });
}

//Function to get the country's trade balance
function getCountryTradeBalance(countryName) {
    var queryURL = "https://api.worldbank.org/v2/country/" + countryName + "/indicator/NE.TRD.GNFS.ZS?format=json";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        countryTradeBalance = response[1][0].value;
        displayCountryData();
    });
}

//Function to display the country's data
function displayCountryData() {
    $("#countryName").text(countryName);
    $("#countryCurrency").text(countryCurrency);
    $("#countryCurrencyCode").text(countryCurrencyCode);
    $("#countryCurrencySymbol").text(countryCurrencySymbol);
    $("#countryCurrencyRate").text(countryCurrencyRate);
    $("#countryCurrencyRateDate").text(countryCurrencyRateDate);
    $("#countryCurrencyRateTime").text(countryCurrencyRateTime);
    $("#countryCurrencyRateUTC").text(countryCurrencyRateUTC);
    $("#countryCurrencyRateUTCDate").text(countryCurrencyRateUTCDate);
    $("#countryCurrencyRateUTCTime").text(countryCurrencyRateUTCTime);
    $("#countryGDP").text(countryGDP);
    $("#countryGDPGrowth").text(countryGDPGrowth);
    $("#countryInflation").text(countryInflation);
    $("#countryUnemployment").text(countryUnemployment);
    $("#countryDebt").text(countryDebt);
    $("#countryTradeBalance").text(countryTradeBalance);
}

//Function to get the country's data
function getCountryData(countryCode) {
    getCountryCurrency(countryCode);
}

//Function to get the country's code
function getCountryCode(countryName) {
    var queryURL = "https://restcountries.eu/rest/v2/name/" + countryName;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        getCountryData(response[0].alpha3Code);
    });
}

//Function to get the country's name
function getCountryName() {
    countryName = $("#countryNameInput").val().trim();
    getCountryCode(countryName);
}

//Function to clear the country's data
function clearCountryData() {
    $("#countryName").text("");
    $("#countryCurrency").text("");
    $("#countryCurrencyCode").text("");
    $("#countryCurrencySymbol").text("");
    $("#countryCurrencyRate").text("");
    $("#countryCurrencyRateDate").text("");
    $("#countryCurrencyRateTime").text("");
    $("#countryCurrencyRateUTC").text("");
    $("#countryCurrencyRateUTCDate").text("");
    $("#countryCurrencyRateUTCTime").text("");
    $("#countryGDP").text("");
    $("#countryGDPGrowth").text("");
    $("#countryInflation").text("");
    $("#countryUnemployment").text("");
    $("#countryDebt").text("");
    $("#countryTradeBalance").text("");
}

//Function to clear the country's name
function clearCountryName() {
    $("#countryNameInput").val("");
}

