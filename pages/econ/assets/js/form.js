//Get Values from Form
function getValues() {
    
    //Get start date from user input
    var startYear = document.getElementById("startYear").value;
    //Get end date from user input
    var endYear = document.getElementById("endYear").value;

    //Convert Start Date to YYYY-MM-DD Format
    var startYear = startYear + "-01-01";

    //Convert End Date to YYYY-MM-DD Format
    var endYear = endYear + "-12-31";

    //Pass values to API Call
    getGDP(startYear,endYear);
}