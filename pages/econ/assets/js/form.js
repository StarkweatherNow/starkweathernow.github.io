//Get Values from Form
function getValues() {
    //Get country from user input
    var country = document.getElementById("country").value;
    //Get start date from user input
    var startDate = document.getElementById("startDate").value;
    //Get end date from user input
    var endDate = document.getElementById("endDate").value;

    //Pass values to API Call
    getGDP(country,startDate,endDate);
}