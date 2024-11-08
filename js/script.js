const apiKey = "9244d142ba954fca875191713242810"; // Your API key
const baseUrl = "https://api.weatherapi.com/v1";

const stateCoords = {
    andhraPradesh: { lat: 15.9129, lon: 79.7400 },
    arunachalPradesh: { lat: 28.2180, lon: 94.7278 },
    assam: { lat: 26.2006, lon: 92.9376 },
    bihar: { lat: 25.0961, lon: 85.3131 },
    chhattisgarh: { lat: 21.2787, lon: 81.8661 },
    goa: { lat: 15.2993, lon: 74.1240 },
    gujarat: { lat: 22.2587, lon: 71.1924 },
    haryana: { lat: 29.0588, lon: 76.0856 },
    himachalPradesh: { lat: 31.1048, lon: 77.1734 },
    jharkhand: { lat: 23.6102, lon: 85.2799 },
    karnataka: { lat: 15.3173, lon: 75.7139 },
    kerala: { lat: 10.8505, lon: 76.2711 },
    madhyaPradesh: { lat: 22.9734, lon: 78.6569 },
    maharashtra: { lat: 19.7515, lon: 75.7139 },
    manipur: { lat: 24.6637, lon: 93.9063 },
    meghalaya: { lat: 25.4670, lon: 91.3662 },
    mizoram: { lat: 23.1645, lon: 92.9376 },
    nagaland: { lat: 26.1584, lon: 94.5624 },
    odisha: { lat: 20.9517, lon: 85.0985 },
    punjab: { lat: 31.1471, lon: 75.3412 },
    rajasthan: { lat: 27.0238, lon: 74.2179 },
    sikkim: { lat: 27.5330, lon: 88.5122 },
    tamilNadu: { lat: 11.1271, lon: 78.6569 },
    telangana: { lat: 18.1124, lon: 79.0193 },
    tripura: { lat: 23.9408, lon: 91.9882 },
    uttarPradesh: { lat: 26.8467, lon: 80.9462 },
    uttarakhand: { lat: 30.0668, lon: 79.0193 },
    westBengal: { lat: 22.9868, lon: 87.8550 },
    andamanNicobar: { lat: 11.7401, lon: 92.6586 },
    chandigarh: { lat: 30.7333, lon: 76.7794 },
    dadraNagarHaveliDamanDiu: { lat: 20.1800, lon: 73.0169 },
    delhi: { lat: 28.7041, lon: 77.1025 },
    lakshadweep: { lat: 10.5667, lon: 72.6417 },
    puducherry: { lat: 11.9416, lon: 79.8083 },
    ladakh: { lat: 34.1526, lon: 77.5771 },
    jammuKashmir: { lat: 33.7782, lon: 76.5762 }
};


let currentHourIndex = new Date().getHours();
let forecastData = [];
var stateName="";
var data1 = [['IN-UP'],
         ['IN-BR', 'IN-MH'],
         ['IN-WB', 'IN-MP', 'IN-RJ', 'IN-TN', 'IN-GJ', 'IN-KA', 'IN-AP'],
         ['IN-OR', 'IN-JH', 'IN-TG', 'IN-KL', 'IN-AS', 'IN-PB', 'IN-HR', 'IN-CT', 'IN-UT', 'IN-DL', 'IN-JK'],
         ['IN-HP', 'IN-TR', 'IN-ML', 'IN-MN', 'IN-NL', 'IN-PY', 'IN-GA', 'IN-AR', 'IN-DN', 'IN-MZ', 'IN-CH']
        ];

var ids = ['IN-AN', 'IN-AP', 'IN-AR', 'IN-AS', 'IN-BR', 'IN-CH', 'IN-CT', 'IN-DD', 'IN-DL', 'IN-DN', 'IN-GA', 'IN-GJ', 
      'IN-HP', 'IN-HR', 'IN-JH', 'IN-JK', 'IN-KA', 'IN-KL', 'IN-LD', 'IN-MH', 'IN-ML', 'IN-MN', 'IN-MP',
      'IN-MZ', 'IN-NL', 'IN-OR', 'IN-PB', 'IN-PY', 'IN-RJ', 'IN-SK', 'IN-TG', 'IN-TN', 'IN-TR',
      'IN-UP', 'IN-UT', 'IN-WB'];
function init(evt) {
    const svgElement = document.getElementById("map_svg");
    const svgNamespace = "http://www.w3.org/2000/svg";
    const compass = document.createElementNS(svgNamespace, "image");
    compass.setAttribute("height", "200");
    compass.setAttribute("width", "300");
    compass.setAttribute("href", "image/compass.png");
    // Check the screen width
    if (window.innerWidth <= 980) {
        // For mobile devices, increase the viewBox size
        svgElement.setAttribute("viewBox", "110 0 400 900");
        
        compass.setAttribute("x", "240");
        compass.setAttribute("y", "-180");
    } else {
        // For larger screens, use the default viewBox size
        compass.setAttribute("x", "-250");
        compass.setAttribute("y", "50");
        svgElement.setAttribute("viewBox", "0 0 600 700");
    }
    svgElement.appendChild(compass);
    if ( window.svgDocument == null ) {
      svgDocument = evt.target.ownerDocument;
    }
    
    tooltip = svgDocument.getElementById('tooltip');
    tooltip_bg = svgDocument.getElementById('tooltip_bg');
    
    for (var i in ids) {
    const elt = document.getElementById(ids[i]);

        elt.onmouseover = function (e) {
            stateName = capitalizeFirstLetter(e.currentTarget.getAttribute("title"));
            showTooltip(e, capitalizeFirstLetter(e.currentTarget.getAttribute("title")));
        };
        
        elt.onmouseout = function (e) {
            hideTooltip(e);
        };
    }  
    colourCountries(data1);
}

function colourCountries(data) {
    for (var colour=0; colour<data.length; colour++) {    
        for (var country=0; country<data[colour].length; country++) {
        colourCountry(data[colour][country], colour);
        }
    }
}

function colourCountry(name, colour) {
    var country = svgDocument.getElementById(name);
    var oldClass = country.getAttributeNS(null, 'class');
    var newClass = oldClass + ' colour' + colour;
    country.setAttributeNS(null, 'class', newClass);
}

function showTooltip(evt, mouseovertext) {
    const mapRect = document.getElementById("map_svg").getBoundingClientRect();
    
    // Calculate position relative to the #india_map SVG
    const offsetX = evt.clientX - mapRect.left;
    const offsetY = evt.clientY - mapRect.top;
    if (window.innerWidth <= 980) {
        tooltip.setAttributeNS(null, "x", offsetX + 18); // Adjusted position based on SVG offset
        tooltip.setAttributeNS(null, "y", offsetY - 532);  // Adjusted vertical position
    }else{
        tooltip.setAttributeNS(null, "x", offsetX + 18); // Adjusted position based on SVG offset
        tooltip.setAttributeNS(null, "y", offsetY + 32);  // Adjusted vertical position
    }
    tooltip.firstChild.data = mouseovertext;
    tooltip.setAttributeNS(null, "visibility", "visible");

    const length = tooltip.getComputedTextLength();
    tooltip_bg.setAttributeNS(null, "width", length + 20);
    if (window.innerWidth <= 980) {
        tooltip_bg.setAttributeNS(null, "x", offsetX + 8); // Adjusted horizontal position based on SVG offset
        tooltip_bg.setAttributeNS(null, "y", offsetY - 550);
    }else{
        tooltip_bg.setAttributeNS(null, "x", offsetX + 8); // Adjusted horizontal position based on SVG offset
        tooltip_bg.setAttributeNS(null, "y", offsetY + 14);  // Adjusted vertical position based on SVG offset
    }
    tooltip_bg.setAttributeNS(null, "visibility", "visible");
}

function hideTooltip(evt) {
    tooltip.setAttributeNS(null,"visibility","hidden");
    tooltip_bg.setAttributeNS(null,"visibility","hidden");
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
} 
var count=1;
// Fetch weather data on clicking a region
async function showWeather(state) {
    count--;
    if (!stateCoords[state]) {
        alert("Coordinates for this state are not available.");
        return;
    }

    const { lat, lon } = stateCoords[state];
    const location = `${lat},${lon}`;
    const weatherInfo = document.getElementById("weatherInfo");
    weatherInfo.classList.remove("hidden");
    while (weatherInfo.firstChild) {
        weatherInfo.removeChild(weatherInfo.firstChild);
    }

    const stateNameElement = document.createElement('h2');
    stateNameElement.id = 'stateName';
    stateNameElement.textContent = `Weather Data for ${capitalizeFirstLetter(stateName)}`;
    weatherInfo.appendChild(stateNameElement);

    try {
        const response = await fetch(`${baseUrl}/forecast.json?key=${apiKey}&q=${location}&days=1&aqi=no&alerts=no`);
        const data = await response.json();

        // Display general weather info
        const weatherDateElement = document.createElement('h3');
    weatherDateElement.id = 'weatherDate';
    weatherDateElement.textContent = `Data recorded on: ${new Date(data.location.localtime).toLocaleString()}`;
    weatherInfo.appendChild(weatherDateElement);
    const temperatureDisplay = document.createElement('div');
    temperatureDisplay.id = 'temperatureDisplay';

    // Create and append the <img> for weather icon
    const weatherIcon = document.createElement('img');
    weatherIcon.id = 'weatherIcon';
    weatherIcon.src = `https:${data.current.condition.icon}`;  // Empty source initially
    weatherIcon.alt = 'Weather Icon';
    weatherIcon.classList.add('weather-icon');
    temperatureDisplay.appendChild(weatherIcon);

    // Create and append the <span> for temperature value
    const temperature = document.createElement('span');
    temperature.id = 'temperature';
    temperature.classList.add('temperature');
    temperature.textContent = `${data.current.temp_c}°C`;
    temperatureDisplay.appendChild(temperature);

    weatherInfo.appendChild(temperatureDisplay);

        const weatherLabel = `
            <p>Feels like:</p>
            <p>Humidity:</p>
            <p>Wind speed:</p>
            <p>Wind direction:</p>
            <p>Pressure:</p>
            <p>Cloudiness:</p>
        `;
        // Create and append the <div> for weather label
        const weatherLabelElement = document.createElement('div');
        weatherLabelElement.id = 'weatherLabel';
        weatherLabelElement.innerHTML = weatherLabel;
        weatherInfo.appendChild(weatherLabelElement);

        const weatherDetails = `
            <p>${data.current.feelslike_c} °C</p>
            <p>${data.current.humidity} %</p>
            <p>${data.current.wind_kph} kph</p>
            <p>${data.current.wind_degree}°</p>
            <p>${data.current.pressure_mb} hPa</p>
            <p>${data.current.cloud} %</p>
        `;
        // Create and append the <div> for weather details
    const weatherDetailsElement = document.createElement('div');
    weatherDetailsElement.id = 'weatherDetails';
    weatherDetailsElement.innerHTML = weatherDetails;
    weatherInfo.appendChild(weatherDetailsElement);

        forecastData = data.forecast.forecastday[0].hour.slice(currentHourIndex);
        displayHourlyForecast();
        if(count==0)
            showModel();

    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("Failed to fetch weather data.");
    }
}

function displayHourlyForecast() {
    const forecastTable = document.getElementById("hourlyForecastData");
    forecastTable.innerHTML = "";

    forecastData.slice(0, 6).forEach(hour => {
        const time = new Date(hour.time).getHours();
        forecastTable.innerHTML += `
            <tr>
                <td>${time}:00</td>
                <td><img src="https:${hour.condition.icon}" alt="weather icon"></td>
                <td>${hour.temp_c} °C</td>
                <td>${hour.humidity} %</td>
                <td>${hour.wind_degree}°</td>
                <td>${hour.wind_kph} kph</td>
                <td>${hour.chance_of_rain} %</td>
            </tr>
        `;
    });
}

document.getElementById("seeMoreBtn").addEventListener("click", () => {
    currentHourIndex += 6;
    displayHourlyForecast();
});

const container = document.querySelector(".weather-info");
const indiaMap = document.getElementById("india_map");

let isDragging = false;
let initialX = 0, initialY = 0;
let offsetX = 0, offsetY = 0;

// Function for mouse and touch move
function onMove(e) {
    if (!isDragging) return;

    // Get the current mouse/touch position
    let clientX = e.clientX || (e.touches && e.touches[0].clientX);
    let clientY = e.clientY || (e.touches && e.touches[0].clientY);

    // Calculate the new position
    let newX = clientX - offsetX;
    let newY = clientY - offsetY;

    // Get the boundaries of #india_map
    const mapRect = indiaMap.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    // Calculate boundaries within #india_map
    const minX = mapRect.left - 100;
    const maxX = mapRect.right - containerRect.width + 170;
    const minY = mapRect.top + 100;
    const maxY = mapRect.bottom - containerRect.height + 100;

    // Apply boundaries to keep the container within the #india_map
    newX = Math.max(minX, Math.min(newX + mapRect.left, maxX)) - mapRect.left;
    newY = Math.max(minY, Math.min(newY + mapRect.top, maxY)) - mapRect.top;

    // Set the new position
    container.style.left = `${newX}px`;
    container.style.top = `${newY}px`;
}

// Function for mouse and touch start
function onStart(e) {
    isDragging = true;

    // Get the initial mouse/touch position
    initialX = e.clientX || (e.touches && e.touches[0].clientX);
    initialY = e.clientY || (e.touches && e.touches[0].clientY);

    // Calculate the offset from the container's current position
    offsetX = initialX - container.offsetLeft;
    offsetY = initialY - container.offsetTop;

    // Prevent default to avoid unwanted page scrolling on mobile
    e.preventDefault();
}

// Function for mouse and touch end
function onEnd() {
    isDragging = false;
}

// Desktop events
container.addEventListener("mousedown", onStart);
document.addEventListener("mousemove", onMove);
document.addEventListener("mouseup", onEnd);

// Mobile events
container.addEventListener("touchstart", onStart);
document.addEventListener("touchmove", onMove);
document.addEventListener("touchend", onEnd);

displayHourlyForecast();

function showModel() {
    const modal = document.getElementById("scrollModal");
    const closeBtn = document.querySelector(".close");
    const modalContent = document.querySelector(".modal-content");

    // Show the modal on page load
    modal.style.display = "flex";

    // Close the modal when the close button is clicked
    closeBtn.addEventListener("click", function () {
        modal.style.display = "none";
    });

    // Close the modal when clicking outside the content area
    window.addEventListener("click", function (event) {
        // Check if the click is outside the modal content
        if (event.target == modal|| event.target==modalContent) {
            modal.style.display = "none";
        }
    });
};
