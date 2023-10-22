//Set Year Slider Range based on current year
//Determine current year
var d = new Date();
var currentYear = d.getFullYear();
//Set yearRange max to current year
document.getElementById("yearRange").max = currentYear;
//Set yearRange min to current year - 10
document.getElementById("yearRange").min = currentYear - 10;
//Set yearRange default value to current year
document.getElementById("yearRange").value = currentYear;

//Output Slider value
var slider = document.getElementById("yearRange");
var output = document.getElementById("yearLabel");
output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  output.innerHTML = this.value;
}