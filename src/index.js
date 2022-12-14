let apiKey = "a43564c91a6c605aeb564c9ed02e3858";

let humidityElement = document.querySelector("#humidity");
let windElement = document.querySelector("#wind");
let descriptionElement = document.querySelector("#description");
let dateElement = document.querySelector("#date");
let iconElement = document.querySelector("#icon");


function formatDate(timestamp){
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
  hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
  minutes = `0${minutes}`;
    }
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let day = days[date.getDay()];
    
return `${day} ${hours}:${minutes}`
}
function formatDay(timestamp){
    let date = new Date(timestamp*1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let day = days[date.getDay()];

    return day;
}

function displayForecast(response){
    let forecastElement = document.querySelector("#forecast");
    let forecast = response.data.daily;
    let forecastHTML = `<div class="row">`;
    
    forecast.forEach(function(forecastDay, index){
        if (index < 5){
        forecastHTML = forecastHTML + `
                    <div class="col">
                        <div class="weather-forecast-date">
                            ${formatDay(forecastDay.dt)}
                        </div>
                        <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" width="42px">
                        <div class="weather-forecast-temperatures">
                            <span class="weather-forecast-temperature-max">${Math.round(forecastDay.temp.max)}°</span>
                            <span class="weather-forecast-temperature-min">${Math.round(forecastDay.temp.min)}°</span>
                        </div>
                    </div>`;
        }
    })
   
                          
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates){
    let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    console.log(apiUrl);
    axios.get(apiUrl).then(displayForecast);
}
function displayTemperature(response){
    let temperatureElement = document.querySelector("#temperature");
    celciusTemperature = response.data.main.temp;
    temperatureElement.innerHTML = `${Math.round(celciusTemperature)}°C`;
    let cityELement = document.querySelector("#city");
    cityELement.innerHTML = response.data.name;
    humidityElement.innerHTML = `Humidity: ${response.data.main.humidity}%`;
    windElement.innerHTML = `Wind: ${Math.round(response.data.wind.speed)}km/h`;
    descriptionElement.innerHTML = response.data.weather[0].main;
    dateElement.innerHTML = formatDate(response.data.dt*1000);
    let iconName = response.data.weather[0].icon;
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${iconName}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].main);
    getForecast(response.data.coord);
}

function search(city){
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event){
event.preventDefault();
let cilyInputElement = document.querySelector("#city-input");
search(cilyInputElement.value);
} 


let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

// Current location

function showlocation(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showlocation);
}

let currentBtn = document.querySelector("#current");
currentBtn.addEventListener("click", currentLocation);


// Convert celcius to far

// function convertToFar(event){
// event.preventDefault();
// celc.classList.remove("active");
// farLink.classList.add("active");
// let temperatureElement = document.querySelector("#temperature");
// let far = Math.round((celciusTemperature * 9) / 5 + 32);
// temperatureElement.innerHTML = far;
// }

// function convertToCelc(event){
// event.preventDefault();
// celc.classList.add("active");
// farLink.classList.remove("active");
// let temperatureElement = document.querySelector("#temperature");
// temperatureElement.innerHTML = Math.round(celciusTemperature);
// }

// let celciusTemperature = null;

// let farLink = document.querySelector("#far-link");
// farLink.addEventListener("click", convertToFar)

// let celc = document.querySelector("#celc-link");
// celc.addEventListener("click", convertToCelc)