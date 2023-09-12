//Collection of JS functions for Google Tasks + Calendar API

//Google Tasks "Quick Start" code
/* exported gapiLoaded */
/* exported gisLoaded */
/* exported handleAuthClick */
/* exported handleSignoutClick */

// TODO(developer): Set to client ID and API key from the Developer Console
const CLIENT_ID = '821121065712-pn98t9b5p5dsobjl5lbg73l9auaabm33.apps.googleusercontent.com';
const API_KEY = 'AIzaSyCMsEWCT7HVaedHBid5YJ6ehFWJQZ4xf3U';

// Discovery doc URL for APIs used by the quickstart
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/tasks/v1/rest';

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = 'https://www.googleapis.com/auth/tasks.readonly';

let tokenClient;
let gapiInited = false;
let gisInited = false;

document.getElementById('authorize_button').style.visibility = 'hidden';
document.getElementById('signout_button').style.visibility = 'hidden';

/**
 * Callback after api.js is loaded.
 */
    function gapiLoaded() {
        gapi.load('client', initializeGapiClient);
    }

/**
 * Callback after the API client is loaded. Loads the
 * discovery doc to initialize the API.
 */
    async function initializeGapiClient() {
        await gapi.client.init({
            apiKey: API_KEY,
            discoveryDocs: [DISCOVERY_DOC],
        });
        gapiInited = true;
        maybeEnableButtons();
    }

/**
 * Callback after Google Identity Services are loaded.
 */
    function gisLoaded() {
        tokenClient = google.accounts.oauth2.initTokenClient({
            client_id: CLIENT_ID,
            scope: SCOPES,
            callback: '', // defined later
        });
        gisInited = true;
        maybeEnableButtons();
    }

/**
 * Enables user interaction after all libraries are loaded.
 */
    function maybeEnableButtons() {
        if (gapiInited && gisInited) {
            document.getElementById('authorize_button').style.visibility = 'visible';
        }
    }

/**
 *  Sign in the user upon button click.
 */
    function handleAuthClick() {
        tokenClient.callback = async (resp) => {
            if (resp.error !== undefined) {
            throw (resp);
            }
            document.getElementById('signout_button').style.visibility = 'visible';
            document.getElementById('authorize_button').innerText = 'Refresh';
            await fetchTaskLists();
        };

        if (gapi.client.getToken() === null) {
            // Prompt the user to select a Google Account and ask for consent to share their data
            // when establishing a new session.
            tokenClient.requestAccessToken({prompt: 'consent'});
        } else {
            // Skip display of account chooser and consent dialog for an existing session.
            tokenClient.requestAccessToken({prompt: ''});
        }
    }

/**
 *  Sign out the user upon button click.
 */
    function handleSignoutClick() {
        const token = gapi.client.getToken();
        if (token !== null) {
            google.accounts.oauth2.revoke(token.access_token);
            gapi.client.setToken('');
            document.getElementById('google_tasks_content').innerText = '';
            document.getElementById('authorize_button').innerText = 'Authorize';
            document.getElementById('signout_button').style.visibility = 'hidden';
        }
    }

/**
 * Print task lists.
 */
async function fetchTaskLists() {
    let response;
    try {
        response = await gapi.client.tasks.tasklists.list({
        'maxResults': 10,
        });
    } catch (err) {
        document.getElementById('google_tasks_content').innerText = err.message;
        return;
    }
    const taskLists = response.result.items;
    if (!taskLists || taskLists.length == 0) {
        document.getElementById('google_tasks_content').innerText = 'No task lists found.';
        return;
    }

    // Parse taskList to Console
    console.log(taskLists);
    
    // Flatten to string to display
    const output = taskLists.reduce(
        (str, taskList) => `${str}${taskList.title} (${taskList.id})\n`,
        'Task lists:\n');
    document.getElementById('google_tasks_content').innerText = output;
}

//Google Calendar "Quick Start" code

/**
       * Print the summary and start datetime/date of the next ten events in
       * the authorized user's calendar. If no events are found an
       * appropriate message is printed.
       */

async function listUpcomingEvents() {
    let response;
    try {
      const request = {
        'calendarId': 'primary',
        'timeMin': (new Date()).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 10,
        'orderBy': 'startTime',
      };
      response = await gapi.client.calendar.events.list(request);
      console.log(response);
    } catch (err) {
      document.getElementById('google_calendar_content').innerText = err.message;
      return;
    }

    const events = response.result.items;
    if (!events || events.length == 0) {
      document.getElementById('google_calendar_content').innerText = 'No events found.';
      return;
    }
    // Flatten to string to display
    const output = events.reduce(
        (str, event) => `${str}${event.summary} (${event.start.dateTime || event.start.date})\n`,
        'Events:\n');
    document.getElementById('google_calendar_content').innerText = output;
  }