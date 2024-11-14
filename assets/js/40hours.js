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
        const [in1Hours, in1Minutes] = in1.split(':').map(Number);
        const [out1Hours, out1Minutes] = out1.split(':').map(Number);
        const [in2Hours, in2Minutes] = in2.split(':').map(Number);
        const [out2Hours, out2Minutes] = out2.split(':').map(Number);

        let totalMinutes1 = (out1Hours * 60 + out1Minutes) - (in1Hours * 60 + in1Minutes);
        let totalMinutes2 = (out2Hours * 60 + out2Minutes) - (in2Hours * 60 + in2Minutes);

        // Adjust for cases where out time is earlier than in time (e.g., crossing midnight)
        if (totalMinutes1 < 0) totalMinutes1 += 24 * 60;
        if (totalMinutes2 < 0) totalMinutes2 += 24 * 60;

        // Adjust minutes based on adjustment value
        const adjustmentMinutes = adjustment * 60;
        totalMinutes1 += adjustmentMinutes;
        totalMinutes2 += adjustmentMinutes;

        totalMinutesWorked += totalMinutes1 + totalMinutes2;
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
      if (thuTotalMinutes1 < 0) thuTotalMinutes1 += 24 * 60; // Adjust for crossing midnight
  
      // Adjust Thursday's minutes based on adjustment value
      const thuAdjustmentMinutes = thuAdjustment * 60;
      thuTotalMinutes1 += thuAdjustmentMinutes;
  
      // Calculate total minutes worked on Thursday so far
      let thuMinutesWorked = thuTotalMinutes1 + (thuIn2Hours * 60 + thuIn2Minutes);
  
      // Calculate final punch-out time in minutes
      let finalPunchOutMinutes = thuMinutesWorked + minutesNeeded;
  
      // Ensure finalPunchOutMinutes is not negative
      if (finalPunchOutMinutes < 0) {
        finalPunchOutMinutes = 0; // Set to 0 if negative to avoid issues
      }
  
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

// Add event listener to a button or trigger for calculating final punch-out
const calculateButton = document.createElement('button');
calculateButton.textContent = 'Calculate Final Punch-Out';
calculateButton.addEventListener('click', calculateFinalPunchOut);
// Style the button using JavaScript
calculateButton.style.display = 'block';
calculateButton.style.margin = '0 auto';
calculateButton.classList.add("btn", "btn-primary");
document.body.appendChild(calculateButton);

// Load timecard data when the page loads
loadTimecardData();