//Data Source for Dashboard Widget - Quote of the Day
//Data is imported via JSON file - qotd.json

//Create the HTML elements
var widget = document.createElement('div');
widget.className = 'widget';
var widgetHeader = document.createElement('div');
widgetHeader.className = 'widget-header';
var widgetBody = document.createElement('div');
widgetBody.className = 'widget-body';
var widgetTitle = document.createElement('div');
widgetTitle.className = 'widget-title';
var widgetButton = document.createElement('div');
widgetButton.className = 'widget-button';
var widgetContent = document.createElement('div');
widgetContent.className = 'widget-content';

//Populate the HTML elements with the data
widgetTitle.innerHTML = 'Quote of the Day';
widgetContent.innerHTML = quote + '<br><br>' + author;

//Append the HTML elements to the widget
widgetHeader.appendChild(widgetTitle);
widgetHeader.appendChild(widgetButton);
widgetBody.appendChild(widgetContent);
widget.appendChild(widgetHeader);
widget.appendChild(widgetBody);

//Append the widget to the dashboard
document.getElementById('dashboard').appendChild(widget);