//Template for creating a widget that displays within the dashboard
//This JS file is used to create HTML that can be populated by other JS scripts which source the data

//create div with a class of widget
var widget = document.createElement('div');
widget.className = 'widget';

//The div has a header and a body
var widgetHeader = document.createElement('div');
widgetHeader.className = 'widget-header';
var widgetBody = document.createElement('div');
widgetBody.className = 'widget-body';

//The div header has a title and a button
var widgetTitle = document.createElement('div');
widgetTitle.className = 'widget-title';
var widgetButton = document.createElement('div');
widgetButton.className = 'widget-button';

//The body has a div with a class of widget-content
var widgetContent = document.createElement('div');
widgetContent.className = 'widget-content';

//The widget-content div is where the data is displayed
widgetBody.appendChild(widgetContent);

//The widget-content div is populated by other JS scripts