//Feature 1

function getCurrentDay(dayIn) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return `${days[dayIn.getDay()]}`;
}

function getCurrentTime(timeIn) {
  let hours = timeIn.getHours();
  let mins = timeIn.getMinutes();
  //hours = 0;
  // mins = 0;

  if (hours < 10) {
    hours = `0${hours}`;
  }

  if (mins < 10) {
    mins = `0${mins}`;
  }

  return `${hours}:${mins}`;
}

let today = new Date();
console.log(`${getCurrentDay(today)} ${getCurrentTime(today)}`);

let idTodayDate = document.querySelector("#today-date");
idTodayDate.innerHTML = `${getCurrentDay(today)} ${getCurrentTime(today)}`;

//Search City By Name
function searchCityByName(event) {
  event.preventDefault();

  let idSearchCity = document.querySelector("#search-city");
  //console.log("search city:" + idSearchCity.value);

  let place = idSearchCity.value;

  //console.log("place:" + place);
  let apiKey = "49d8c99dff260bd8e2a249b94e59247d";
  let units = "metric";
  let apiUrl = `https:api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=${units}`;

  if (place != "") {
    //console.log("city is not null");
    apiUrl = `${apiUrl}&q=${place}`;
    //console.log(apiUrl);
  } else {
    // console.log("city is null");
    console.log(apiUrl);
  }
  axios.get(apiUrl).then(displayWeather);
}

//Search City By Name: Get Coordinates
function getCoordinates(event) {
  //event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCityByCoordinates);
}

//Search City By Name
function searchCityByCoordinates(position) {
  // console.log(position.coords.latitude);
  // console.log(position.coords.longitude);

  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiKey = "49d8c99dff260bd8e2a249b94e59247d";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeather);
}

function displayWeather(response) {
  console.log(response.data);
  /*
  console.log(response.data.main.temp);
  console.log(response.data.main.humidity);
  console.log(response.data.name);
  console.log(response.data.weather[0].main);
  console.log(response.data.wind.speed);*/

  //get weather details
  let temperature = Math.round(response.data.main.temp);
  let humidity = response.data.main.humidity;
  let city = response.data.name;
  let weatherDescription = response.data.weather[0].main;
  let windSpeed = response.data.wind.speed;

  //get html elements
  let idTemperatureElement = document.querySelector("#temperature");
  let idHumidityElement = document.querySelector("#humidity");
  let idCityElement = document.querySelector("#city");
  let idWeatheDescriptionElement = document.querySelector(
    "#weather-description"
  );
  let idWindSpeedElement = document.querySelector("#wind-speed");

  //update html elements
  idCityElement.innerHTML = `${city}`;
  idTemperatureElement.innerHTML = `${temperature}`;
  idWeatheDescriptionElement.innerHTML = `${weatherDescription}`;
  idHumidityElement.innerHTML = `Humidity: ${humidity}%`;
  idWindSpeedElement.innerHTML = `Wind: ${windSpeed} km/h`;
}

getCoordinates();
let submitForm = document.querySelector("#search-city-form");
submitForm.addEventListener("submit", searchCityByName);

let currentCityButton = document.querySelector("#current-city-button");
currentCityButton.addEventListener("click", getCoordinates);
