let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
let city = "New York";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
let humidityElement = document.querySelector("#humidity");
let windElement = document.querySelector("#wind");
let descriptionElement = document.querySelector("#description");
let dateElement = document.querySelector("#date");


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
    let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
    let day = days[date.getDay()];
    
return `${day} ${hours}:${minutes}`
}

function displayTemperature(response){
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    let cityELement = document.querySelector("#city");
    cityELement.innerHTML = response.data.name;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    descriptionElement.innerHTML = response.data.weather[0].main;
    dateElement.innerHTML = formatDate(response.data.dt*1000);

}
axios.get(apiUrl).then(displayTemperature);