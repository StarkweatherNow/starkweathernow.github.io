//Gym Timer for High Intensity Interval Training
//Timer allows user to set duration and amount of Fast and Slow intervals

//Global Variables
var timer;
var timerInterval;
var timerRunning = false;
var timerPaused = false;
var timerStopped = false;
var timerFast = false;
var timerSlow = false;
var timerFastCount = 0;
var timerSlowCount = 0;
var timerFastDuration = 0;
var timerSlowDuration = 0;

//Function to start the timer
function startTimer() {
    //Check if timer is running
    if (timerRunning == false) {
        //Check if timer is paused
        if (timerPaused == false) {
            //Check if timer is stopped
            if (timerStopped == false) {
                //Set timer to running
                timerRunning = true;
                //Get the duration of the fast interval
                timerFastDuration = document.getElementById("fastDuration").value;
                //Get the duration of the slow interval
                timerSlowDuration = document.getElementById("slowDuration").value;
                //Get the amount of fast intervals
                timerFastCount = document.getElementById("fastCount").value;
                //Get the amount of slow intervals
                timerSlowCount = document.getElementById("slowCount").value;
                //Set the timer to the fast interval
                timerFast = true;
                //Set the timer to not slow interval
                timerSlow = false;
                //Start the timer
                timerInterval = setInterval(timerFunction, 1000);
            }
            else {
                //Set timer to running
                timerRunning = true;
                //Set timer to not stopped
                timerStopped = false;
                //Start the timer
                timerInterval = setInterval(timerFunction, 1000);
            }
        }
        else {
            //Set timer to running
            timerRunning = true;
            //Set timer to not paused
            timerPaused = false;
            //Start the timer
            timerInterval = setInterval(timerFunction, 1000);
        }
    }
}

//Function to pause the timer
function pauseTimer() {
    //Check if timer is running
    if (timerRunning == true) {
        //Set timer to paused
        timerPaused = true;
        //Stop the timer
        clearInterval(timerInterval);
    }
}

//Function to stop the timer
function stopTimer() {
    //Check if timer is running
    if (timerRunning == true) {
        //Set timer to stopped
        timerStopped = true;
        //Stop the timer
        clearInterval(timerInterval);
    }
}