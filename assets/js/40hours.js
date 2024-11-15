//JS function to calculate the "final punch" time based on the user's input to get exactly 40 hours

function calculateTotalHours(day) {
  const in1 = document.getElementById(`${day}-in1`).value;
  const out1 = document.getElementById(`${day}-out1`).value;
  const in2 = document.getElementById(`${day}-in2`).value;
  const out2 = document.getElementById(`${day}-out2`).value;
  const adjustment = parseFloat(document.getElementById(`${day}-adj`).value); // Get adjustment value

  if (in1 && out1 && in2 && out2) {
    const [in1Hours, in1Minutes] = in1.split(':').map(Number);
    const [out1Hours, out1Minutes] = out1.split(':').map(Number);
    const [in2Hours, in2Minutes] = in2.split(':').map(Number);
    const [out2Hours, out2Minutes] = out2.split(':').map(Number);

    let totalMinutes1 = (out1Hours * 60 + out1Minutes) - (in1Hours * 60 + in1Minutes);
    let totalMinutes2 = (out2Hours * 60 + out2Minutes) - (in2Hours * 60 + in2Minutes);

    // Adjust minutes based on adjustment value (in percentage format)
    const adjustmentMinutes = adjustment * 60; // 1.5 adjustment becomes 90 minutes
    let totalMinutes = totalMinutes1 + totalMinutes2 + adjustmentMinutes;

    // Format total time as HH:MM
    const totalHours = Math.floor(totalMinutes / 60);
    const totalMins = Math.floor(totalMinutes % 60);
    const formattedTotalTime = `${totalHours.toString().padStart(2, '0')}:${totalMins.toString().padStart(2, '0')}`;

    document.getElementById(`${day}-total`).textContent = formattedTotalTime;
  }
}

function calculateFinalPunchOut() {
    let totalMinutesWorked = 0;
  
   // Calculate total minutes worked from Friday to Wednesday
   for (const day of ['fri', 'mon', 'tue', 'wed']) {
    const in1 = document.getElementById(`${day}-in1`).value;
    const out1 = document.getElementById(`${day}-out1`).value;
    const in2 = document.getElementById(`${day}-in2`).value;
    const out2 = document.getElementById(`${day}-out2`).value;
    const adjustment = parseFloat(document.getElementById(`${day}-adj`).value);

    if (in1 && out1 && in2 && out2) {
      let [in1Hours, in1Minutes] = in1.split(':').map(Number);
      let [out1Hours, out1Minutes] = out1.split(':').map(Number);
      let [in2Hours, in2Minutes] = in2.split(':').map(Number);
      let [out2Hours, out2Minutes] = out2.split(':').map(Number);
  
      // Adjust for AM/PM 
      if (in1.includes('PM') && in1Hours !== 12) in1Hours += 12;
      if (out1.includes('AM') && out1Hours === 12) out1Hours = 0; // Midnight case
      if (in2.includes('AM') && in2Hours === 12) in2Hours = 0; // Midnight case 
      if (out2.includes('AM') && out2Hours === 12) out2Hours = 0; // Midnight case
  
      let totalMinutes1 = (out1Hours * 60 + out1Minutes) - (in1Hours * 60 + in1Minutes);
      let totalMinutes2 = (out2Hours * 60 + out2Minutes) - (in2Hours * 60 + in2Minutes);
  
      // Adjust for cases where out time is earlier than in time (e.g., crossing midnight)
      if (totalMinutes1 < 0) totalMinutes1 += 24 * 60;
      if (totalMinutes2 < 0) totalMinutes2 += 24 * 60;

        const adjustmentMinutes = adjustment * 60;
        totalMinutesWorked += totalMinutes1 + totalMinutes2 + adjustmentMinutes;
    }
}
  
    // Calculate remaining minutes needed to reach 40 hours
    const minutesNeeded = (40 * 60) - totalMinutesWorked;
  
    // Get Thursday's punch-in times and adjustment
    const thuIn1 = document.getElementById(`thu-in1`).value;
    const thuOut1 = document.getElementById(`thu-out1`).value;
    const thuIn2 = document.getElementById(`thu-in2`).value;
    const thuAdjustment = parseFloat(document.getElementById(`thu-adj`).value);
  
    if (thuIn1 && thuOut1 && thuIn2) {
      const [thuIn1Hours, thuIn1Minutes] = thuIn1.split(':').map(Number);
      const [thuOut1Hours, thuOut1Minutes] = thuOut1.split(':').map(Number);
      const [thuIn2Hours, thuIn2Minutes] = thuIn2.split(':').map(Number);
  
      let thuTotalMinutes1 = (thuOut1Hours * 60 + thuOut1Minutes) - (thuIn1Hours * 60 + thuIn1Minutes);
      //if (thuTotalMinutes1 < 0) thuTotalMinutes1 += 24 * 60; // Adjust for crossing midnight
  
      // Adjust Thursday's minutes based on adjustment value
      const thuAdjustmentMinutes = thuAdjustment * 60;
      thuTotalMinutes1 += thuAdjustmentMinutes;
  
      // Calculate total minutes needed on Thursday
      let totalMinutesNeededThursday = minutesNeeded - thuTotalMinutes1;

      // Calculate final punch-out time in minutes from Thursday's 2nd punch-in
      let finalPunchOutMinutes = (thuIn2Hours * 60 + thuIn2Minutes) + totalMinutesNeededThursday;

      // Ensure finalPunchOutMinutes is not negative
      //if (finalPunchOutMinutes < 0) {
      //  finalPunchOutMinutes = 0; // Set to 0 if negative to avoid issues
      //}
  
      // Convert final punch-out time to HH:MM format, ensuring it's within 24 hours
      let finalPunchOutHours = Math.floor(finalPunchOutMinutes / 60) % 24;
      let finalPunchOutMins = finalPunchOutMinutes % 60;
  
      // Format the time with leading zeros if necessary
      const finalPunchOutTime = `${finalPunchOutHours.toString().padStart(2, '0')}:${finalPunchOutMins.toString().padStart(2, '0')}`;
  
      // Display the final punch-out time
      document.getElementById(`thu-out2`).value = finalPunchOutTime;
      calculateTotalHours('thu'); // Update Thursday's total hours
    }
  }

function calculateWeeklyTotal() {
  let totalWeeklyMinutes = 0;
  for (const day of ['fri', 'mon', 'tue', 'wed', 'thu']) {
    const totalHoursString = document.getElementById(`${day}-total`).textContent;
    if (totalHoursString) {
      const [hours, minutes] = totalHoursString.split(':').map(Number);
      totalWeeklyMinutes += hours * 60 + minutes;
    }
  }

  // Format total weekly time as HH:MM
  const totalWeeklyHours = Math.floor(totalWeeklyMinutes / 60);
  const totalWeeklyMins = totalWeeklyMinutes % 60;
  const formattedWeeklyTotal = `${totalWeeklyHours.toString().padStart(2, '0')}:${totalWeeklyMins.toString().padStart(2, '0')}`;

  document.getElementById('weekly-total').textContent = formattedWeeklyTotal;
}

function calculateLastDayPunchOut() {
  // Get total hours and minutes worked for the first four days
  const hours = parseInt(document.getElementById(`first-four-days-total-hours`).value) || 0;
  const minutes = parseInt(document.getElementById(`first-four-days-total-minutes`).value) || 0;
  const totalMinutesWorked = hours * 60 + minutes; 

  // Calculate remaining minutes needed to reach 40 hours
  const minutesNeeded = (40 * 60) - totalMinutesWorked;

  // Get Thursday's punch-in times and adjustment
  const thuIn1 = document.getElementById(`thu-last-in1`).value;
  const thuOut1 = document.getElementById(`thu-last-out1`).value;
  const thuIn2 = document.getElementById(`thu-last-in2`).value;
  const thuAdjustment = parseFloat(document.getElementById(`thu-last-adj`).value);

  if (thuIn1 && thuOut1 && thuIn2) {
    const [thuIn1Hours, thuIn1Minutes] = thuIn1.split(':').map(Number);
    const [thuOut1Hours, thuOut1Minutes] = thuOut1.split(':').map(Number);
    const [thuIn2Hours, thuIn2Minutes] = thuIn2.split(':').map(Number);

    let thuTotalMinutes1 = (thuOut1Hours * 60 + thuOut1Minutes) - (thuIn1Hours * 60 + thuIn1Minutes);
    //if (thuTotalMinutes1 < 0) thuTotalMinutes1 += 24 * 60; // Adjust for crossing midnight

    // Adjust Thursday's minutes based on adjustment value
    const thuAdjustmentMinutes = thuAdjustment * 60;
    thuTotalMinutes1 += thuAdjustmentMinutes;

    // Calculate total minutes needed on Thursday
    let totalMinutesNeededThursday = minutesNeeded - thuTotalMinutes1;

    // Calculate final punch-out time in minutes from Thursday's 2nd punch-in
    let finalPunchOutMinutes = (thuIn2Hours * 60 + thuIn2Minutes) + totalMinutesNeededThursday;

    // Ensure finalPunchOutMinutes is not negative
    //if (finalPunchOutMinutes < 0) {
    //  finalPunchOutMinutes = 0; // Set to 0 if negative to avoid issues
    //}

    // Convert final punch-out time to HH:MM format, ensuring it's within 24 hours
    let finalPunchOutHours = Math.floor(finalPunchOutMinutes / 60) % 24;
    let finalPunchOutMins = finalPunchOutMinutes % 60;

    // Format the time with leading zeros if necessary
    const finalPunchOutTime = `${finalPunchOutHours.toString().padStart(2, '0')}:${finalPunchOutMins.toString().padStart(2, '0')}`;

    // Display the final punch-out time
    document.getElementById(`thu-last-out2`).value = finalPunchOutTime;
    // You might want to add a function to calculate and display Thursday's total hours here, 
    // similar to calculateTotalHours(day) in your previous code.

    // Calculate and display the weekly total
    calculateWeeklyTotalLastDay(); 
  }
}

function calculateWeeklyTotalLastDay() {
  let totalWeeklyMinutes = 0;

  // Get total hours and minutes worked for the first four days
  const hours = parseInt(document.getElementById(`first-four-days-total-hours`).value) || 0;
  const minutes = parseInt(document.getElementById(`first-four-days-total-minutes`).value) || 0;
  totalWeeklyMinutes += hours * 60 + minutes;

  // Get Thursday's punch-in times and adjustment from "Last Day Only" section
  const thuIn1 = document.getElementById(`thu-last-in1`).value;
  const thuOut1 = document.getElementById(`thu-last-out1`).value;
  const thuIn2 = document.getElementById(`thu-last-in2`).value;
  const thuOut2 = document.getElementById(`thu-last-out2`).value; // Get Thursday's punch-out 2
  const thuAdjustment = parseFloat(document.getElementById(`thu-last-adj`).value);

  if (thuIn1 && thuOut1 && thuIn2 && thuOut2) { // Make sure all Thursday inputs are filled
    const [thuIn1Hours, thuIn1Minutes] = thuIn1.split(':').map(Number);
    const [thuOut1Hours, thuOut1Minutes] = thuOut1.split(':').map(Number);
    const [thuIn2Hours, thuIn2Minutes] = thuIn2.split(':').map(Number);
    const [thuOut2Hours, thuOut2Minutes] = thuOut2.split(':').map(Number);

    let thuTotalMinutes1 = (thuOut1Hours * 60 + thuOut1Minutes) - (thuIn1Hours * 60 + thuIn1Minutes);
    let thuTotalMinutes2 = (thuOut2Hours * 60 + thuOut2Minutes) - (thuIn2Hours * 60 + thuIn2Minutes);

    // Adjust minutes based on adjustment value
    const thuAdjustmentMinutes = thuAdjustment * 60;
    let thursdayTotalMinutes = thuTotalMinutes1 + thuTotalMinutes2 + thuAdjustmentMinutes;

    totalWeeklyMinutes += thursdayTotalMinutes; // Add Thursday's total minutes
  }

  // Format total weekly time as HH:MM
  const totalWeeklyHours = Math.floor(totalWeeklyMinutes / 60);
  const totalWeeklyMins = totalWeeklyMinutes % 60;
  const formattedWeeklyTotal = `${totalWeeklyHours.toString().padStart(2, '0')}:${totalWeeklyMins.toString().padStart(2, '0')}`;

  document.getElementById('weekly-total-last-day').textContent = formattedWeeklyTotal; // Display the total
}

// Add event listeners to the new input fields
// ... (add event listeners for the new hours and minutes input fields) ...

// Create a button for the "Last Day Only" calculation
const calculateLastDayButton = document.createElement('button');
calculateLastDayButton.textContent = 'Calculate Last Day Punch-Out';
calculateLastDayButton.addEventListener('click', () => {
  calculateLastDayPunchOut();
});
// Style the button using JavaScript
calculateLastDayButton.style.display = 'block';
calculateLastDayButton.style.margin = '15px';
calculateLastDayButton.classList.add("btn", "btn-primary");
// Append the button to the "last-day-container" div
const lastDayContainer = document.getElementById('lastDayContainer');
lastDayContainer.appendChild(calculateLastDayButton);
// Apply flexbox properties to the container
lastDayContainer.style.display = 'flex';
lastDayContainer.style.justifyContent = 'flex-end';

// Function to clear input fields in "Last Day Only" section
function clearLastDayInputFields() {
  document.getElementById(`first-four-days-total-hours`).value = '';
  document.getElementById(`first-four-days-total-minutes`).value = '';
  document.getElementById(`thu-last-in1`).value = '';
  document.getElementById(`thu-last-out1`).value = '';
  document.getElementById(`thu-last-in2`).value = '';
  document.getElementById(`thu-last-out2`).value = '';
  document.getElementById(`thu-last-adj`).value = '0';
  // Clear the weekly total if it's displayed in this section
  const weeklyTotalLastDay = document.getElementById('weekly-total-last-day');
  if (weeklyTotalLastDay) {
    weeklyTotalLastDay.textContent = '00:00';
  }
}

// Create and style the "Clear Last Day" button
const clearLastDayButton = document.createElement('button');
clearLastDayButton.textContent = 'Clear';
clearLastDayButton.style.display = 'block';
clearLastDayButton.style.margin = '15px'; // Add some margin
clearLastDayButton.classList.add("btn", "btn-danger");

// Add event listener to the "Clear Last Day" button
clearLastDayButton.addEventListener('click', () => {
  clearLastDayInputFields();
});

// Append the button to the "last-day-container" div
lastDayContainer.appendChild(clearLastDayButton);

// Function to save timecard data to local storage
function saveTimecardData() {
  const timecardData = {};
  for (const day of ['fri', 'mon', 'tue', 'wed', 'thu']) {
    timecardData[`${day}-in1`] = document.getElementById(`${day}-in1`).value;
    timecardData[`${day}-out1`] = document.getElementById(`${day}-out1`).value;
    timecardData[`${day}-in2`] = document.getElementById(`${day}-in2`).value;
    timecardData[`${day}-out2`] = document.getElementById(`${day}-out2`).value;
    timecardData[`${day}-adj`] = document.getElementById(`${day}-adj`).value;
  }
  localStorage.setItem('timecardData', JSON.stringify(timecardData));
}

// Function to load timecard data from local storage
function loadTimecardData() {
  const timecardData = JSON.parse(localStorage.getItem('timecardData'));
  if (timecardData) {
    for (const day of ['fri', 'mon', 'tue', 'wed', 'thu']) {
      document.getElementById(`${day}-in1`).value = timecardData[`${day}-in1`] || '';
      document.getElementById(`${day}-out1`).value = timecardData[`${day}-out1`] || '';
      document.getElementById(`${day}-in2`).value = timecardData[`${day}-in2`] || '';
      document.getElementById(`${day}-out2`).value = timecardData[`${day}-out2`] || '';
      document.getElementById(`${day}-adj`).value = timecardData[`${day}-adj`] || '0';
      calculateTotalHours(day); // Recalculate total hours after loading data
    }
  }
}

// Function to clear all input fields
function clearInputFields() {
  for (const day of ['fri', 'mon', 'tue', 'wed', 'thu']) {
    document.getElementById(`${day}-in1`).value = '';
    document.getElementById(`${day}-out1`).value = '';
    document.getElementById(`${day}-in2`).value = '';
    document.getElementById(`${day}-out2`).value = '';
    document.getElementById(`${day}-adj`).value = '0'; 
    document.getElementById(`${day}-total`).textContent = '00:00'; 
  }
  document.getElementById('weekly-total').textContent = '00:00'; 
}

// Add event listeners to inputs
const timeInputs = document.querySelectorAll('input[type="time"]');
timeInputs.forEach(input => {
  input.addEventListener('change', () => {
    const day = input.id.split('-')[0];
    calculateTotalHours(day);
    calculateWeeklyTotal();
    saveTimecardData(); // Save data on time input change
  });
});

// Add event listeners to adjustment inputs
const adjustmentInputs = document.querySelectorAll('input[type="number"]');
adjustmentInputs.forEach(input => {
  input.addEventListener('change', () => {
    const day = input.id.split('-')[0];
    calculateTotalHours(day);
    calculateWeeklyTotal();
    saveTimecardData(); // Save data on adjustment change
  });
});

// Initial calculation of weekly total on page load
calculateWeeklyTotal();

// Select the div
const buttonContainer = document.getElementById('buttonContainer'); 

// Apply flexbox properties to the container
buttonContainer.style.display = 'flex';
buttonContainer.style.justifyContent = 'flex-end';

// Add event listener to a button or trigger for calculating final punch-out
const calculateButton = document.createElement('button');
calculateButton.textContent = 'Calculate Final Punch-Out';
calculateButton.addEventListener('click', () => {
  calculateFinalPunchOut();
  calculateWeeklyTotal(); // Add this line to update weekly total
});
// Style the button using JavaScript
calculateButton.style.display = 'block';
calculateButton.style.margin = '15px';
calculateButton.classList.add("btn", "btn-primary");
// Append the "Calculate" button to the div
buttonContainer.appendChild(calculateButton);

// Create and style the "Clear" button
const clearButton = document.createElement('button');
clearButton.textContent = 'Clear';
clearButton.style.display = 'block';
clearButton.style.margin = '15px';
clearButton.classList.add("btn", "btn-danger"); // Using a different Bootstrap class for visual distinction
// Append the "Clear" button to the div
buttonContainer.appendChild(clearButton);

// Add event listener to the "Clear" button
clearButton.addEventListener('click', () => {
  clearInputFields();
  saveTimecardData(); // Clear data from local storage as well
});

// Load timecard data when the page loads
loadTimecardData();