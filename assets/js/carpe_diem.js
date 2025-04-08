// Main JavaScript for Carpe Diem Dashboard
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initThemeToggle();
    initNASA();
    initQuote();
    initWeather();
    initMap();
    initCats();
    initPomodoro();
    initBackToTop();
    initModals();
});

// Theme Toggle
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const htmlElement = document.documentElement;
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme, themeIcon);
    }
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme, themeIcon);
        
        showToast(`${newTheme.charAt(0).toUpperCase() + newTheme.slice(1)} mode activated`, 'success');
    });
}

function updateThemeIcon(theme, iconElement) {
    if (theme === 'light') {
        iconElement.className = 'fas fa-moon';
    } else {
        iconElement.className = 'fas fa-sun';
    }
}

// NASA Image of the Day
function initNASA() {
    const nasaImg = document.getElementById('nasa-img');
    const nasaTitle = document.getElementById('nasa-title');
    const nasaDesc = document.getElementById('nasa-desc');
    const nasaLoading = document.getElementById('nasa-loading');
    const nasaExpand = document.getElementById('nasa-expand');
    const nasaModal = document.getElementById('nasa-modal');
    const nasaModalTitle = document.getElementById('nasa-modal-title');
    const nasaModalDesc = document.getElementById('nasa-modal-desc');
    const nasaModalClose = document.getElementById('nasa-modal-close');
    
    // NASA API - using DEMO_KEY as default
    const NASA_API_KEY = 'DEMO_KEY';
    
    async function fetchNASAImage() {
        try {
            const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`);
            const data = await response.json();
            
            nasaImg.src = data.url;
            nasaTitle.textContent = data.title;
            nasaDesc.textContent = data.explanation.substring(0, 150) + '...';
            
            nasaModalTitle.textContent = data.title;
            nasaModalDesc.textContent = data.explanation;
            
            nasaImg.onload = () => {
                nasaLoading.style.display = 'none';
                nasaImg.style.display = 'block';
            };
            
            nasaExpand.addEventListener('click', () => {
                nasaModal.classList.add('open');
            });
            
            nasaModalClose.addEventListener('click', () => {
                nasaModal.classList.remove('open');
            });
            
            return true;
        } catch (error) {
            console.error('Error fetching NASA image:', error);
            showToast('Failed to load NASA image', 'error');
            nasaLoading.style.display = 'none';
            return false;
        }
    }
    
    fetchNASAImage();
}

// Quote of the Day
function initQuote() {
    const quoteContent = document.getElementById('quote-content');
    const quoteAuthor = document.getElementById('quote-author');
    
    async function fetchQuote() {
        try {
            // Using a free quotes API
            const response = await fetch('https://api.quotable.io/random');
            const data = await response.json();
            
            quoteContent.textContent = data.content;
            quoteAuthor.textContent = data.author;
            
            return true;
        } catch (error) {
            console.error('Error fetching quote:', error);
            quoteContent.textContent = "Carpe diem, quam minimum credula postero.";
            quoteAuthor.textContent = "Horace";
            return false;
        }
    }
    
    fetchQuote();
}

// Weather
function initWeather() {
    const weatherIcon = document.getElementById('weather-icon');
    const weatherTemp = document.getElementById('weather-temp');
    const weatherDesc = document.getElementById('weather-desc');
    const weatherLocationDisplay = document.getElementById('weather-location-display');
    const weatherHumidity = document.getElementById('weather-humidity');
    const weatherPressure = document.getElementById('weather-pressure');
    const weatherWind = document.getElementById('weather-wind');
    const weatherUV = document.getElementById('weather-uv');
    const weatherLoading = document.getElementById('weather-loading');
    const weatherContent = document.getElementById('weather-content');
    const forecastContainer = document.getElementById('forecast-container');
    
    // OpenWeather API key - replace with your own
    const WEATHER_API_KEY = '9c1a13f35ad13294b0c4ed22bc9d7fb6';
    
    async function getLocation() {
        return new Promise((resolve, reject) => {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(
                    position => {
                        resolve({
                            lat: position.coords.latitude,
                            lon: position.coords.longitude
                        });
                    },
                    error => {
                        console.error('Error getting location:', error);
                        // Default to San Francisco if geolocation fails
                        resolve({ lat: 37.7749, lon: -122.4194 });
                    }
                );
            } else {
                console.error('Geolocation not supported');
                // Default to San Francisco if geolocation not supported
                resolve({ lat: 37.7749, lon: -122.4194 });
            }
        });
    }
    
    async function fetchWeather() {
        try {
            const location = await getLocation();
            
            // Using OpenWeatherMap API
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&units=imperial&appid=${WEATHER_API_KEY}`);
            const data = await response.json();
            
            // Get city name from coordinates
            const geoResponse = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${location.lat}&lon=${location.lon}&limit=1&appid=${WEATHER_API_KEY}`);
            const geoData = await geoResponse.json();
            
            // Get forecast data
            const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&units=imperial&appid=${WEATHER_API_KEY}`);
            const forecastData = await forecastResponse.json();
            
            // Update current weather
            weatherIcon.innerHTML = `<i class="wi wi-owm-${data.weather[0].id}"></i>`;
            weatherTemp.textContent = `${Math.round(data.main.temp)}°F`;
            weatherDesc.textContent = data.weather[0].description;
            weatherLocationDisplay.textContent = geoData[0] ? `${geoData[0].name}, ${geoData[0].country}` : 'Unknown Location';
            weatherHumidity.textContent = `${data.main.humidity}%`;
            weatherPressure.textContent = `${data.main.pressure} hPa`;
            weatherWind.textContent = `${Math.round(data.wind.speed)} mph`;
            weatherUV.textContent = `Low`; // UV data requires a separate API call in OpenWeatherMap
            
            // Update forecast
            forecastContainer.innerHTML = '';
            
            // Only show next 4 forecasts (12 hours)
            for (let i = 0; i < 4; i++) {
                const forecast = forecastData.list[i];
                const time = new Date(forecast.dt * 1000);
                const hours = time.getHours();
                const ampm = hours >= 12 ? 'PM' : 'AM';
                const hour12 = hours % 12 || 12;
                
                const forecastItem = document.createElement('div');
                forecastItem.className = 'forecast-item';
                forecastItem.innerHTML = `
                    <div class="forecast-time">${hour12} ${ampm}</div>
                    <div class="forecast-icon"><i class="wi wi-owm-${forecast.weather[0].id}"></i></div>
                    <div class="forecast-temp">${Math.round(forecast.main.temp)}°F</div>
                    <div class="forecast-humidity">${forecast.main.humidity}%</div>
                `;
                
                forecastContainer.appendChild(forecastItem);
            }
            
            weatherLoading.style.display = 'none';
            weatherContent.style.display = 'block';
            
            return true;
        } catch (error) {
            console.error('Error fetching weather:', error);
            showToast('Failed to load weather data', 'error');
            weatherLoading.style.display = 'none';
            return false;
        }
    }
    
    fetchWeather();
}

// Traffic Map
function initMap() {
    const MAPQUEST_API_KEY = 'Gmjtd|lu612du7n9,7w=o5-l7t0h';
    const mapImg = document.getElementById('map-img');
    const mapLoading = document.getElementById('map-loading');
    
    async function getLocation() {
        return new Promise((resolve, reject) => {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(
                    position => {
                        resolve({
                            lat: position.coords.latitude,
                            lon: position.coords.longitude
                        });
                    },
                    error => {
                        console.error('Error getting location:', error);
                        // Default to San Francisco if geolocation fails
                        resolve({ lat: 37.7749, lon: -122.4194 });
                    }
                );
            } else {
                console.error('Geolocation not supported');
                // Default to San Francisco if geolocation not supported
                resolve({ lat: 37.7749, lon: -122.4194 });
            }
        });
    }
    
    async function fetchMap() {
        try {
            const location = await getLocation();
            
            // MapQuest API Key - replace with your own
            const MAPQUEST_API_KEY = 'Gmjtd|lu612du7n9';
            
            // Using MapQuest's static map API
            mapImg.src = `https://www.mapquestapi.com/staticmap/v5/map?key=${MAPQUEST_API_KEY}&center=${location.lat},${location.lon}&size=600,300&type=map&zoom=13&traffic=flow&scalebar=true`;
            
            mapImg.onload = () => {
                mapLoading.style.display = 'none';
                mapImg.style.display = 'block';
            };
            
            return true;
        } catch (error) {
            console.error('Error fetching map:', error);
            showToast('Failed to load traffic map', 'error');
            mapLoading.style.display = 'none';
            return false;
        }
    }
    
    fetchMap();
}

// Cat Gallery
function initCats() {
    const catsContainer = document.getElementById('cats-container');
    const catsLoading = document.getElementById('cats-loading');
    const galleryNav = document.getElementById('gallery-nav');
    const galleryPrev = document.getElementById('gallery-prev');
    const galleryNext = document.getElementById('gallery-next');
    
    const NUM_CATS = 10;
    let currentCat = 0;
    
    async function fetchCats() {
        try {
            catsContainer.innerHTML = '';
            galleryNav.innerHTML = '';
            
            // Using free cat API
            for (let i = 0; i < NUM_CATS; i++) {
                const response = await fetch('https://api.thecatapi.com/v1/images/search');
                const data = await response.json();
                
                const catUrl = data[0].url;
                
                const galleryItem = document.createElement('div');
                galleryItem.className = 'gallery-item';
                galleryItem.style.backgroundImage = `url('${catUrl}')`;
                catsContainer.appendChild(galleryItem);
                
                const dot = document.createElement('div');
                dot.className = 'gallery-dot';
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', () => {
                    goToSlide(i);
                });
                galleryNav.appendChild(dot);
            }
            
            catsLoading.style.display = 'none';
            
            galleryPrev.addEventListener('click', () => {
                goToSlide(currentCat - 1);
            });
            
            galleryNext.addEventListener('click', () => {
                goToSlide(currentCat + 1);
            });
            
            return true;
        } catch (error) {
            console.error('Error fetching cats:', error);
            showToast('Failed to load cat gallery', 'error');
            catsLoading.style.display = 'none';
            return false;
        }
    }
    
    function goToSlide(index) {
        if (index < 0) index = NUM_CATS - 1;
        if (index >= NUM_CATS) index = 0;
        
        currentCat = index;
        catsContainer.style.transform = `translateX(-${currentCat * 100}%)`;
        
        const dots = galleryNav.querySelectorAll('.gallery-dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentCat);
        });
    }
    
    fetchCats();
}

// Pomodoro Timer (NEW FEATURE)
function initPomodoro() {
    const timerDisplay = document.getElementById('timer-display');
    const startBtn = document.getElementById('timer-start');
    const pauseBtn = document.getElementById('timer-pause');
    const resetBtn = document.getElementById('timer-reset');
    const modeBtns = document.querySelectorAll('.mode-btn');
    const sessionsCount = document.getElementById('sessions-count');
    
    let timer;
    let timeLeft = 25 * 60; // 25 minutes in seconds
    let isRunning = false;
    let currentMode = 'pomodoro';
    let sessions = 0;
    let originalTitle = document.title;
    
    function updateDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // Update page title when timer is running
        if (isRunning) {
            document.title = `(${timerDisplay.textContent}) ${originalTitle}`;
        } else {
            document.title = originalTitle;
        }
    }
    
    function startTimer() {
        if (!isRunning) {
            isRunning = true;
            startBtn.disabled = true;
            pauseBtn.disabled = false;
            
            timer = setInterval(() => {
                timeLeft--;
                updateDisplay();
                
                if (timeLeft <= 0) {
                    clearInterval(timer);
                    isRunning = false;
                    
                    // Play notification sound
                    const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-alert-quick-chime-766.mp3');
                    audio.play();
                    
                    // Show notification
                    showToast(`${currentMode.replace('-', ' ')} completed!`, 'success');
                    
                    // If pomodoro completed, increment session count
                    if (currentMode === 'pomodoro') {
                        sessions++;
                        sessionsCount.textContent = sessions;
                        
                        // After 4 pomodoros, suggest a long break
                        if (sessions % 4 === 0) {
                            showToast('Take a long break!', 'info');
                            switchMode('long-break');
                        } else {
                            // Otherwise suggest a short break
                            showToast('Take a short break!', 'info');
                            switchMode('short-break');
                        }
                    } else {
                        // After break, go back to pomodoro
                        showToast('Break over! Time to focus again.', 'info');
                        switchMode('pomodoro');
                    }
                    
                    // Reset UI
                    startBtn.disabled = false;
                    pauseBtn.disabled = true;
                }
            }, 1000);
        }
    }
    
    function pauseTimer() {
        if (isRunning) {
            clearInterval(timer);
            isRunning = false;
            startBtn.disabled = false;
            pauseBtn.disabled = true;
        }
    }
    
    function resetTimer() {
        pauseTimer();
        timeLeft = parseInt(document.querySelector('.mode-btn.active').dataset.time) * 60;
        updateDisplay();
    }
    
    function switchMode(mode) {
        currentMode = mode;
        pauseTimer();
        
        modeBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.mode === mode);
            
            if (btn.dataset.mode === mode) {
                timeLeft = parseInt(btn.dataset.time) * 60;
            }
        });
        
        updateDisplay();
    }
    
    startBtn.addEventListener('click', startTimer);
    pauseBtn.addEventListener('click', pauseTimer);
    resetBtn.addEventListener('click', resetTimer);
    
    modeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            switchMode(btn.dataset.mode);
        });
    });
    
    // Initialize display
    updateDisplay();
}

// Back to Top Button
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Modal Initialization
function initModals() {
    const infoModalBtn = document.querySelector('.theme-toggle');
    const infoModal = document.getElementById('info-modal');
    const infoModalClose = document.getElementById('info-modal-close');
    
    infoModalBtn.addEventListener('dblclick', () => {
        infoModal.classList.add('open');
    });
    
    infoModalClose.addEventListener('click', () => {
        infoModal.classList.remove('open');
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('open');
        }
    });
    
    // Close modals with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal.open').forEach(modal => {
                modal.classList.remove('open');
            });
        }
    });
}

// Toast Notifications
function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toast-container');
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    let icon = 'info-circle';
    if (type === 'success') icon = 'check-circle';
    if (type === 'warning') icon = 'exclamation-triangle';
    if (type === 'error') icon = 'times-circle';
    
    toast.innerHTML = `
        <i class="fas fa-${icon} toast-icon"></i>
        <div class="toast-message">${message}</div>
    `;
    
    toastContainer.appendChild(toast);
    
    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Google Calendar & Tasks Integration
// Google Calendar API Configuration
const CAL_CLIENT_ID = '821121065712-pn98t9b5p5dsobjl5lbg73l9auaabm33.apps.googleusercontent.com';
const CAL_API_KEY = 'AIzaSyCMsEWCT7HVaedHBid5YJ6ehFWJQZ4xf3U';
const DISCOVERY_DOC_CALENDAR = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
const SCOPES_CALENDAR = 'https://www.googleapis.com/auth/calendar.readonly';

let tokenClient;
let gapiInitedCal = false;
let gisInitedCal = false;

// Google Tasks API Configuration
const TASKS_CLIENT_ID = '821121065712-pn98t9b5p5dsobjl5lbg73l9auaabm33.apps.googleusercontent.com';
const TASKS_API_KEY = 'AIzaSyCMsEWCT7HVaedHBid5YJ6ehFWJQZ4xf3U';
const DISCOVERY_DOC_TASKS = 'https://www.googleapis.com/discovery/v1/apis/tasks/v1/rest';
const SCOPES_TASKS = 'https://www.googleapis.com/auth/tasks.readonly';

let tokenClientTasks;
let gapiInitedTasks = false;
let gisInitedTasks = false;

// Load Google API Client
function gapiLoaded() {
    gapi.load('client', initializeGapiClient);
}

async function initializeGapiClient() {
    await gapi.client.init({
        apiKey: CAL_API_KEY,
        discoveryDocs: [DISCOVERY_DOC_CALENDAR, DISCOVERY_DOC_TASKS],
    });
    gapiInitedCal = true;
    gapiInitedTasks = true;
    maybeEnableButtons();
}

function gisLoaded() {
    // Initialize both token clients
    tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: CAL_CLIENT_ID,
        scope: SCOPES_CALENDAR,
        callback: '', // defined later
    });
    
    tokenClientTasks = google.accounts.oauth2.initTokenClient({
        client_id: TASKS_CLIENT_ID,
        scope: SCOPES_TASKS,
        callback: '', // defined later
    });
    
    gisInitedCal = true;
    gisInitedTasks = true;
    maybeEnableButtons();
}

function maybeEnableButtons() {
    if (gapiInitedCal && gisInitedCal) {
        document.getElementById('cal_authorize_button').style.display = 'inline-block';
    }
    
    if (gapiInitedTasks && gisInitedTasks) {
        document.getElementById('tasks_authorize_button').style.display = 'inline-block';
    }
}

// Calendar Authentication
function handleAuthClickCal() {
    tokenClient.callback = async (resp) => {
        if (resp.error !== undefined) {
            throw resp;
        }
        document.getElementById('cal_signout_button').style.display = 'inline-block';
        document.getElementById('cal_authorize_button').textContent = 'Refresh';
        await listUpcomingEvents();
        showToast('Calendar authorized successfully', 'success');
    };

    if (gapi.client.getToken() === null) {
        tokenClient.requestAccessToken({prompt: 'consent'});
    } else {
        tokenClient.requestAccessToken({prompt: ''});
    }
}

function handleSignoutClickCal() {
    const token = gapi.client.getToken();
    if (token !== null) {
        google.accounts.oauth2.revoke(token.access_token);
        gapi.client.setToken('');
        document.getElementById('cal-content').innerHTML = '';
        document.getElementById('cal_authorize_button').textContent = 'Authorize Calendar';
        document.getElementById('cal_signout_button').style.display = 'none';
        showToast('Signed out of Calendar', 'info');
    }
}

async function listUpcomingEvents() {
    let response;
    try {
        const request = {
            'calendarId': 'primary',
            'timeMin': (new Date()).toISOString(),
            'showDeleted': false,
            'singleEvents': true,
            'maxResults': 5,
            'orderBy': 'startTime',
        };
        
        response = await gapi.client.calendar.events.list(request);
        
        const events = response.result.items;
        const calContent = document.getElementById('cal-content');
        
        calContent.innerHTML = '';
        
        if (!events || events.length === 0) {
            calContent.innerHTML = '<p class="text-center">No upcoming events found.</p>';
            return;
        }
        
        const eventList = document.createElement('div');
        eventList.className = 'event-list';
        
        events.forEach(event => {
            const eventDate = new Date(event.start.dateTime || event.start.date);
            
            const formattedDate = new Intl.DateTimeFormat('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
            }).format(eventDate);
            
            const eventItem = document.createElement('div');
            eventItem.className = 'event-item';
            eventItem.innerHTML = `
                <div class="event-title">${event.summary}</div>
                <div class="event-time">${formattedDate}</div>
            `;
            
            eventList.appendChild(eventItem);
        });
        
        calContent.innerHTML = '';
        calContent.appendChild(eventList);
        
    } catch (err) {
        document.getElementById('cal-content').innerHTML = `<p class="text-center">Error: ${err.message}</p>`;
        showToast('Failed to load calendar events', 'error');
    }
}

// Tasks Authentication
function handleAuthClickTasks() {
    tokenClientTasks.callback = async (resp) => {
        if (resp.error !== undefined) {
            throw resp;
        }
        document.getElementById('tasks_signout_button').style.display = 'inline-block';
        document.getElementById('tasks_authorize_button').textContent = 'Refresh';
        await fetchTaskLists();
        showToast('Tasks authorized successfully', 'success');
    };

    if (gapi.client.getToken() === null) {
        tokenClientTasks.requestAccessToken({prompt: 'consent'});
    } else {
        tokenClientTasks.requestAccessToken({prompt: ''});
    }
}

function handleSignoutClickTasks() {
    const token = gapi.client.getToken();
    if (token !== null) {
        google.accounts.oauth2.revoke(token.access_token);
        gapi.client.setToken('');
        document.getElementById('tasks-content').innerHTML = '';
        document.getElementById('tasks_authorize_button').textContent = 'Authorize Tasks';
        document.getElementById('tasks_signout_button').style.display = 'none';
        showToast('Signed out of Tasks', 'info');
    }
}

async function fetchTaskLists() {
    try {
        const response = await gapi.client.tasks.tasklists.list({
            'maxResults': 10
        });
        
        const taskLists = response.result.items;
        
        if (!taskLists || taskLists.length === 0) {
            document.getElementById('tasks-content').innerHTML = '<p class="text-center">No task lists found.</p>';
            return;
        }
        
        // Use the first task list
        const primaryTaskList = taskLists[0];
        await fetchTasks(primaryTaskList.id);
        
    } catch (err) {
        document.getElementById('tasks-content').innerHTML = `<p class="text-center">Error: ${err.message}</p>`;
        showToast('Failed to load task lists', 'error');
    }
}

async function fetchTasks(taskListId) {
    try {
        const response = await gapi.client.tasks.tasks.list({
            'tasklist': taskListId,
            'showCompleted': true
        });
        
        const tasks = response.result.items;
        const tasksContent = document.getElementById('tasks-content');
        
        tasksContent.innerHTML = '';
        
        if (!tasks || tasks.length === 0) {
            tasksContent.innerHTML = '<p class="text-center">No tasks found.</p>';
            return;
        }
        
        const taskList = document.createElement('div');
        taskList.className = 'task-list';
        
        tasks.forEach(task => {
            if (!task.title) return; // Skip tasks without titles
            
            const taskItem = document.createElement('div');
            taskItem.className = 'task-item';
            
            const isCompleted = task.status === 'completed';
            
            taskItem.innerHTML = `
                <label class="task-checkbox-label">
                    <input type="checkbox" class="task-checkbox" ${isCompleted ? 'checked' : ''} disabled>
                    <span class="task-title" style="${isCompleted ? 'text-decoration: line-through; opacity: 0.7;' : ''}">${task.title}</span>
                </label>
            `;
            
            taskList.appendChild(taskItem);
        });
        
        tasksContent.innerHTML = '';
        tasksContent.appendChild(taskList);
        
    } catch (err) {
        document.getElementById('tasks-content').innerHTML = `<p class="text-center">Error: ${err.message}</p>`;
        showToast('Failed to load tasks', 'error');
    }
}