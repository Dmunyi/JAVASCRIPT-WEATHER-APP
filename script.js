// script.js

// Selecting elements from the HTML
const cityInput = document.querySelector('.cityInput');
const weatherApp = document.querySelector('.weatherApp');
const cityDisplay = document.querySelector('.cityDisplay');
const temperatureDisplay = document.querySelector('.temperatureDisplay');
const humidityDisplay = document.querySelector('.humidityDisplay');
const descriptionDisplay = document.querySelector('.descriptionDisplay');
const weatherEmoji = document.querySelector('.weatherEmoji');
const errorDisplay = document.querySelector('.errorDisplay');

// Adding an event listener to the form
weatherApp.addEventListener('submit', (e) => {
  e.preventDefault();

  // Getting the city input value
  const city = cityInput.value.trim();

  // Checking if the city input is not empty
  if (city) {
    // Hiding the error display
    errorDisplay.style.display = 'none';

    // API endpoint for weather data (replace with your own API key)
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;



    // Fetching weather data from the API
    fetch(apiUrl)
     .then((response) => response.json())
     .then((data) => {
        // Updating the UI with the weather data
        cityDisplay.textContent = data.name;
        temperatureDisplay.textContent = `${data.main.temp}°C`;
        humidityDisplay.textContent = `Humidity: ${data.main.humidity}%`;
        descriptionDisplay.textContent = data.weather[0].description;
        weatherEmoji.textContent = getWeatherEmoji(data.weather[0].main);
      })
     .catch((error) => {
        console.error(error);
        errorDisplay.style.display = 'block';
        errorDisplay.textContent = 'Error: Unable to fetch weather data';
      });
  } else {
    // Showing the error display if the city input is empty
    errorDisplay.style.display = 'block';
    errorDisplay.textContent = 'Enter city';
  }
});

// Function to get the weather emoji based on the weather condition
function getWeatherEmoji(condition) {
  switch (condition) {
    case 'Clouds':
      return '☁️';
    case 'Rain':
      return '☔️';
    case 'Sunny':
      return '☀️';
    default:
      return '🌡️';
  }
}