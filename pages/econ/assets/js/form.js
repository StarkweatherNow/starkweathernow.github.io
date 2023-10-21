//Get Values from Form
function getValues() {
    
    //Get start date from user input
    var startYear = document.getElementById("startYear").value;
    //Get end date from user input
    var endYear = document.getElementById("endYear").value;

    //Pass values to BLS API Call
    getUnemployment(startYear,endYear);

    //Convert Start Date to YYYY-MM-DD Format
    var startYear = startYear + "-01-01";

    //Convert End Date to YYYY-MM-DD Format
    var endYear = endYear + "-12-31";

    //Pass values to NASDAQ API Call
    getGDP(startYear,endYear);
}

//Attach Submit Button to getValues Function
document.getElementById("dateSubmit").addEventListener("click", getValues);