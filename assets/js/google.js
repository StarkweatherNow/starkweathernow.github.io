//Collection of JS functions for Google Tasks + Calendar API

//gapiLoaded is a function that runs when the Google API is loaded
function gapiLoaded() {
    //Load the Google API Client Library for JavaScript
    gapi.load('client', initClient);
}

//gisLoaded is a function that runs when the Google API is loaded
function gisLoaded() {
    //Load the Google API Client Library for JavaScript
    gapi.load('client', initClient);
}

//Function for handleauthclick
function handleAuthClick(event) {
    //Sign in the user upon button click.
    gapi.auth2.getAuthInstance().signIn();
}

//Function for handlesignoutclick
function handleSignoutClick(event) {
    //Sign out the user upon button click.
    gapi.auth2.getAuthInstance().signOut();
}