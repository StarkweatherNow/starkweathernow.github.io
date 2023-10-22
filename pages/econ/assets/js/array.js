//Working array of 10 data points over 10 years

//Get current year and create an array of 10 years with an internal array of 10 data points
var d = new Date();
var currentYear = d.getFullYear();
var yearArray = [];
for (var i = 0; i < 10; i++) {
    yearArray.push([currentYear - i]);
}
console.log(yearArray);
