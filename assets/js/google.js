//Collection of JS functions for all Google API related functions

//Global variables

//Google Tasks API variables

//Function to call Google Tasks API
function callGoogleTasksAPI() {
    gapi.client.load('tasks', 'v1', function() {
        var request = gapi.client.tasks.tasks.list({

        });
        request.execute(function(resp) {
            //console.log(resp);
            //Parse response.items to Array
            var tasksArray = resp.items;
            //Print array to console
            //console.log(tasksArray);
            //Loop through Array
            for (var i = 0; i < tasksArray.length; i++) {
                //console.log(i);
                //Print response to HTML
                $("#google-task-" + i).html(tasksArray[i].title);
            }
        });
    });
}

//Google Calendar API variables

