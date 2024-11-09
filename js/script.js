const apiKey = "9244d142ba954fca875191713242810"; // Your API key
const baseUrl = "https://api.weatherapi.com/v1";

const stateCoords = {
    IN_AP: {
        lat: 15.9129,
        lon: 79.74,
    },
    IN_AR: {
        lat: 28.218,
        lon: 94.7278,
    },
    IN_AS: {
        lat: 26.2006,
        lon: 92.9376,
    },
    IN_BR: {
        lat: 25.0961,
        lon: 85.3131,
    },
    IN_CT: {
        lat: 21.2787,
        lon: 81.8661,
    },
    IN_GA: {
        lat: 15.2993,
        lon: 74.124,
    },
    IN_GJ: {
        lat: 22.2587,
        lon: 71.1924,
    },
    IN_HR: {
        lat: 29.0588,
        lon: 76.0856,
    },
    IN_HP: {
        lat: 31.1048,
        lon: 77.1734,
    },
    IN_JH: {
        lat: 23.6102,
        lon: 85.2799,
    },
    IN_KA: {
        lat: 15.3173,
        lon: 75.7139,
    },
    IN_KL: {
        lat: 10.8505,
        lon: 76.2711,
    },
    IN_MP: {
        lat: 22.9734,
        lon: 78.6569,
    },
    IN_MH: {
        lat: 19.7515,
        lon: 75.7139,
    },
    IN_MN: {
        lat: 24.6637,
        lon: 93.9063,
    },
    IN_ML: {
        lat: 25.467,
        lon: 91.3662,
    },
    IN_MZ: {
        lat: 23.1645,
        lon: 92.9376,
    },
    IN_NL: {
        lat: 26.1584,
        lon: 94.5624,
    },
    IN_OR: {
        lat: 20.9517,
        lon: 85.0985,
    },
    IN_PB: {
        lat: 31.1471,
        lon: 75.3412,
    },
    IN_RJ: {
        lat: 27.0238,
        lon: 74.2179,
    },
    IN_SK: {
        lat: 27.533,
        lon: 88.5122,
    },
    IN_TN: {
        lat: 11.1271,
        lon: 78.6569,
    },
    IN_TG: {
        lat: 18.1124,
        lon: 79.0193,
    },
    IN_TR: {
        lat: 23.9408,
        lon: 91.9882,
    },
    IN_UP: {
        lat: 26.8467,
        lon: 80.9462,
    },
    IN_UT: {
        lat: 30.0668,
        lon: 79.0193,
    },
    IN_WB: {
        lat: 22.9868,
        lon: 87.855,
    },
    IN_AN: {
        lat: 11.7401,
        lon: 92.6586,
    },
    IN_CH: {
        lat: 30.7333,
        lon: 76.7794,
    },
    IN_DD: {
        lat: 20.18,
        lon: 73.0169,
    },
    IN_DL: {
        lat: 28.7041,
        lon: 77.1025,
    },
    IN_LD: {
        lat: 10.5667,
        lon: 72.6417,
    },
    IN_PY: {
        lat: 11.9416,
        lon: 79.8083,
    },
    IN_JK: {
        lat: 33.7782,
        lon: 76.5762,
    },
};

let currentHourIndex = new Date().getHours();
let forecastData = [];
var stateName = "";
var data1 = [
    ["IN_UP"],
    ["IN_BR", "IN_MH"],
    ["IN_WB", "IN_MP", "IN_RJ", "IN_TN", "IN_GJ", "IN_KA", "IN_AP"],
    [
        "IN_OR",
        "IN_JH",
        "IN_TG",
        "IN_KL",
        "IN_AS",
        "IN_PB",
        "IN_HR",
        "IN_CT",
        "IN_UT",
        "IN_DL",
        "IN_JK",
    ],
    [
        "IN_HP",
        "IN_TR",
        "IN_ML",
        "IN_MN",
        "IN_NL",
        "IN_PY",
        "IN_GA",
        "IN_AR",
        "IN_DN",
        "IN_MZ",
        "IN_CH",
    ],
];

var ids = [
    "IN_AN",
    "IN_AP",
    "IN_AR",
    "IN_AS",
    "IN_BR",
    "IN_CH",
    "IN_CT",
    "IN_DD",
    "IN_DL",
    "IN_DN",
    "IN_GA",
    "IN_GJ",
    "IN_HP",
    "IN_HR",
    "IN_JH",
    "IN_JK",
    "IN_KA",
    "IN_KL",
    "IN_LD",
    "IN_MH",
    "IN_ML",
    "IN_MN",
    "IN_MP",
    "IN_MZ",
    "IN_NL",
    "IN_OR",
    "IN_PB",
    "IN_PY",
    "IN_RJ",
    "IN_SK",
    "IN_TG",
    "IN_TN",
    "IN_TR",
    "IN_UP",
    "IN_UT",
    "IN_WB",
];

const legendData = [{
        color: "#800000",
        label: "More than 20Cr",
    },
    {
        color: "#d72f1f",
        label: "10Cr - 20Cr",
    },
    {
        color: "#ef6448",
        label: "5Cr - 10Cr",
    },
    {
        color: "#fc8e5a",
        label: "1Cr - 5Cr",
    },
    {
        color: "#fdd49d",
        label: "10L - 1Cr",
    },
    {
        color: "#fef7ec",
        label: "Below 10L",
    },
];

function init(evt) {
    const svgElement = document.getElementById("map_svg");
    const svgNamespace = "http://www.w3.org/2000/svg";
    const compass = document.createElementNS(svgNamespace, "image");
    compass.setAttribute("height", "200");
    compass.setAttribute("width", "300");
    compass.setAttribute("href", "image/compass.png");

    const legendGroup = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "g"
    );
    legendGroup.setAttribute("class", "label");
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    const borderRect = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "rect"
    );
    borderRect.setAttribute("id", "border");

    // Check the screen width
    if (window.innerWidth <= 980) {
        // For mobile devices, increase the viewBox size
        const titleText1 = createTextElement("Indian States by Population",300,760);
        const titleText2 = createTextElement("(2024)", 300, 780);
        legendGroup.appendChild(titleText1);
        legendGroup.appendChild(titleText2);
        let yOffset = 800;
        legendData.forEach((item, index) => {
            // Create color box
            const rect = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "rect"
            );
            rect.setAttribute("x", 300);
            rect.setAttribute("y", yOffset);
            rect.setAttribute("width", 20);
            rect.setAttribute("height", 20);
            rect.setAttribute("style", `fill: ${item.color};`);
            const label = createTextElement(item.label, 325, yOffset + 15);
            legendGroup.appendChild(rect);
            legendGroup.appendChild(label);
            yOffset += 25;
        });
        borderRect.setAttribute("x", 290);
        borderRect.setAttribute("y", 730);
        borderRect.setAttribute("rx", 3);
        borderRect.setAttribute("ry", 4);
        borderRect.setAttribute("width", 210);
        borderRect.setAttribute("height", 230);

        compass.setAttribute("x", "240");
        compass.setAttribute("y", "-180");
        svgElement.setAttribute("viewBox", "110 0 400 900");
    } else {
        // For larger screens, use the default viewBox size
        const titleText1 = createTextElement("Indian States by Population",700,360);
        const titleText2 = createTextElement("(2024)", 700, 380);
        legendGroup.appendChild(titleText1);
        legendGroup.appendChild(titleText2);
        let yOffset = 400;
        legendData.forEach((item, index) => {
            // Create color box
            const rect = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "rect"
            );
            rect.setAttribute("x", 700);
            rect.setAttribute("y", yOffset);
            rect.setAttribute("width", 20);
            rect.setAttribute("height", 20);
            rect.setAttribute("style", `fill: ${item.color};`);
            const label = createTextElement(item.label, 725, yOffset + 15);
            legendGroup.appendChild(rect);
            legendGroup.appendChild(label);
            yOffset += 25;
        });
        borderRect.setAttribute("x", 690);
        borderRect.setAttribute("y", 330);
        borderRect.setAttribute("rx", 3);
        borderRect.setAttribute("ry", 4);
        borderRect.setAttribute("width", 210);
        borderRect.setAttribute("height", 230);

        compass.setAttribute("x", "-250");
        compass.setAttribute("y", "50");
        svgElement.setAttribute("viewBox", "0 0 600 700");
    }
    legendGroup.appendChild(borderRect);

    svgElement.appendChild(legendGroup);

    svgElement.appendChild(compass);
    if (window.svgDocument == null) {
        svgDocument = evt.target.ownerDocument;
    }

    tooltip = svgDocument.getElementById("tooltip");
    tooltip_bg = svgDocument.getElementById("tooltip_bg");

    for (var i in ids) {
        const elt = document.getElementById(ids[i]);

        elt.onmouseover = function (e) {
            stateName = capitalizeFirstLetter(e.currentTarget.getAttribute("title"));
            showTooltip(
                e,
                capitalizeFirstLetter(e.currentTarget.getAttribute("title"))
            );
        };

        elt.onmouseout = function (e) {
            hideTooltip(e);
        };
    }
    colourCountries(data1);
    loadExcelFile();
}

// Function to create text elements
function createTextElement(content, x, y) {
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("class", "label");
    text.setAttribute("x", x);
    text.setAttribute("y", y);
    text.textContent = content;
    return text;
}

let populationData = {};

// Function to fetch and read the Excel file
async function loadExcelFile() {
    try {
        const response = await fetch("https://luckytaorem.github.io/indiaMap/data/states_population.xlsx");
        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, {
            type: "array",
        });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);

        // Parse the Excel data into an object
        jsonData.forEach((row) => {
            const state = row["ID"];
            const population = row["Population"];
            populationData[state] = population;
        });

        // Update the SVG colors based on the population
        updateMapColors();
    } catch (error) {
        console.error("Error loading Excel file:", error);
    }
}

// Function to color SVG paths based on population
function updateMapColors() {
    const getColorByPopulation = (population) => {
        if (population > 200000000) return "#800000";
        if (population > 100000000 && population < 200000000) return "#d72f1f";
        if (population > 50000000 && population < 100000000) return "#ef6448";
        if (population > 10000000 && population < 50000000) return "#fc8e5a";
        if (population > 1000000 && population < 10000000) return "#fdd49d";
        if (population < 1000000) return "#fef7ec";
    };

    const paths = document.querySelectorAll("#map_svg path");
    paths.forEach((path) => {
        const stateId = path.getAttribute("id");
        const population = populationData[stateId];
        if (population) {
            const color = getColorByPopulation(population);
            path.style.fill = color;
        }
    });
}

function colourCountries(data) {
    for (var colour = 0; colour < data.length; colour++) {
        for (var country = 0; country < data[colour].length; country++) {
            colourCountry(data[colour][country], colour);
        }
    }
}

function colourCountry(name, colour) {
    var country = svgDocument.getElementById(name);
    var oldClass = country.getAttributeNS(null, "class");
    var newClass = oldClass + " colour" + colour;
    country.setAttributeNS(null, "class", newClass);
}

function showTooltip(evt, mouseovertext) {
    const mapRect = document.getElementById("map_svg").getBoundingClientRect();

    // Calculate position relative to the #india_map SVG
    const offsetX = evt.clientX - mapRect.left;
    const offsetY = evt.clientY - mapRect.top;
    if (window.innerWidth <= 980) {
        tooltip.setAttributeNS(null, "x", offsetX + 18); // Adjusted position based on SVG offset
        tooltip.setAttributeNS(null, "y", offsetY - 532); // Adjusted vertical position
    } else {
        tooltip.setAttributeNS(null, "x", offsetX + 18); // Adjusted position based on SVG offset
        tooltip.setAttributeNS(null, "y", offsetY + 32); // Adjusted vertical position
    }
    tooltip.firstChild.data = mouseovertext;
    tooltip.setAttributeNS(null, "visibility", "visible");

    const length = tooltip.getComputedTextLength();
    tooltip_bg.setAttributeNS(null, "width", length + 20);
    if (window.innerWidth <= 980) {
        tooltip_bg.setAttributeNS(null, "x", offsetX + 8); // Adjusted horizontal position based on SVG offset
        tooltip_bg.setAttributeNS(null, "y", offsetY - 550);
    } else {
        tooltip_bg.setAttributeNS(null, "x", offsetX + 8); // Adjusted horizontal position based on SVG offset
        tooltip_bg.setAttributeNS(null, "y", offsetY + 14); // Adjusted vertical position based on SVG offset
    }
    tooltip_bg.setAttributeNS(null, "visibility", "visible");
}

function hideTooltip(evt) {
    tooltip.setAttributeNS(null, "visibility", "hidden");
    tooltip_bg.setAttributeNS(null, "visibility", "hidden");
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
var count = 1;
// Fetch weather data on clicking a region
async function showWeather(element) {
    const state = element.id;
    count--;
    if (!stateCoords[state]) {
        alert("Coordinates for this state are not available.");
        return;
    }

    const {
        lat,
        lon
    } = stateCoords[state];
    const location = `${lat},${lon}`;
    const weatherInfo = document.getElementById("weatherInfo");
    weatherInfo.classList.remove("hidden");
    while (weatherInfo.firstChild) {
        weatherInfo.removeChild(weatherInfo.firstChild);
    }

    const stateNameElement = document.createElement("h2");
    stateNameElement.id = "stateName";
    stateNameElement.textContent = `Weather Data for ${capitalizeFirstLetter(
    stateName
  )}`;
    weatherInfo.appendChild(stateNameElement);

    try {
        const response = await fetch(
            `${baseUrl}/forecast.json?key=${apiKey}&q=${location}&days=1&aqi=no&alerts=no`
        );
        const data = await response.json();

        // Display general weather info
        const weatherDateElement = document.createElement("h3");
        weatherDateElement.id = "weatherDate";
        weatherDateElement.textContent = `Data recorded on: ${new Date(
      data.location.localtime
    ).toLocaleString()}`;
        weatherInfo.appendChild(weatherDateElement);
        const temperatureDisplay = document.createElement("div");
        temperatureDisplay.id = "temperatureDisplay";

        // Create and append the <img> for weather icon
        const weatherIcon = document.createElement("img");
        weatherIcon.id = "weatherIcon";
        weatherIcon.src = `https:${data.current.condition.icon}`; // Empty source initially
        weatherIcon.alt = "Weather Icon";
        weatherIcon.classList.add("weather-icon");
        temperatureDisplay.appendChild(weatherIcon);

        // Create and append the <span> for temperature value
        const temperature = document.createElement("span");
        temperature.id = "temperature";
        temperature.classList.add("temperature");
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
            <hr>
            <p>Population:</p>
        `;
        // Create and append the <div> for weather label
        const weatherLabelElement = document.createElement("div");
        weatherLabelElement.id = "weatherLabel";
        weatherLabelElement.innerHTML = weatherLabel;
        weatherInfo.appendChild(weatherLabelElement);
        var num = `${populationData[state]}`;
        if((num>=100000)&&(num<1000000))
            num=num.substring(0,1)+' L';
        else if((num>=1000000)&&(num<10000000))
            num=num.substring(0,2)+' L';
        else if((num>=10000000)&&(num<100000000))
            num=num.substring(0,1)+' Cr';
        else if((num>=100000000)&&(num<1000000000))
            num=num.substring(0,2)+' Cr';
        const weatherDetails = `
            <p>${data.current.feelslike_c} °C</p>
            <p>${data.current.humidity} %</p>
            <p>${data.current.wind_kph} kph</p>
            <p>${data.current.wind_degree}°</p>
            <p>${data.current.pressure_mb} hPa</p>
            <p>${data.current.cloud} %</p>
            <hr>
            <p>${num}</p>
        `;
        // Create and append the <div> for weather details
        const weatherDetailsElement = document.createElement("div");
        weatherDetailsElement.id = "weatherDetails";
        weatherDetailsElement.innerHTML = weatherDetails;
        weatherInfo.appendChild(weatherDetailsElement);

        forecastData = data.forecast.forecastday[0].hour.slice(currentHourIndex);
        displayHourlyForecast();
        if (count == 0) showModel();
    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("Failed to fetch weather data.");
    }
}

function displayHourlyForecast() {
    const forecastTable = document.getElementById("hourlyForecastData");
    forecastTable.innerHTML = "";

    forecastData.slice(0, 6).forEach((hour) => {
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
let initialX = 0,
    initialY = 0;
let offsetX = 0,
    offsetY = 0;

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
        if (event.target == modal || event.target == modalContent) {
            modal.style.display = "none";
        }
    });
}
