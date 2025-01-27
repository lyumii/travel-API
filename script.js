const destinationInput = document.getElementById("destination");
const searchBtn = document.getElementById("search");
const clearBtn = document.getElementById("clear");

searchBtn.addEventListener("click", (event) => {
  let city = destinationInput.value;
  fetchWeather(city);
});

async function fetchWeather(city) {
  const apiKey = "3463a3654ba01dfc7b98e056105b25bd";
  const url = `https://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`;
  const weatherBox = document.getElementById("weather-box");

  weatherBox.innerHTML = "";

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch");
    }
    const data = await response.json();
    if (data.current) {
      const temperature = data.current.temperature;
      const weatherDescription = data.current.weather_descriptions;
      const weatherIcon = data.current.weather_icons;
      const feelsLike = data.current.feelslike;
      const humidity = data.current.humidity;

      const tempParagraph = document.createElement("p");
      tempParagraph.innerText = `Temperature: ${temperature}`;

      const weatherDescParagraph = document.createElement("p");
      weatherDescParagraph.innerText = `Weather desciption: ${weatherDescription}`;

      const weatherImg = document.createElement("img");
      weatherImg.src = weatherIcon;

      const feelsLikeParagraph = document.createElement("p");
      feelsLikeParagraph.innerText = `Feels like: ${feelsLike}`;

      const humidityParagraph = document.createElement("p");
      humidityParagraph.innerText = `Humidity: ${humidity}`;

      weatherBox.appendChild(tempParagraph);
      weatherBox.appendChild(weatherDescParagraph);
      weatherBox.appendChild(weatherImg);
      weatherBox.appendChild(feelsLikeParagraph);
      weatherBox.appendChild(humidityParagraph);
    } else {
      weatherBox.textContent = `Nope`;
    }
  } catch (err) {
    console.log(`Error`);
  } finally {
    console.log("complete");
  }
}

async function fetchForecast(city) {
  const apiKey = "3463a3654ba01dfc7b98e056105b25bd";
  const url = `https://api.weatherstack.com/forecast?access_key=${apiKey}&query=${city}&forecast_days=3`;
  const forecastBox = document.getElementById("forecast-box");

  forecastBox.innerHTML = "";

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch");
    }
    const data = await response.json();
    if (data.forecast) {
      const forecastData = [];
      data.forecast.forEach((day) => {
        forecastData.push({
          date: day.date,
          maxTemp: day.temperature_max,
          minTemp: day.temperature_min,
          percipitation: day.percipitation,
        });
      });
      forecastBox.innerHTML = forecastData
        .map((day) => {
          return `
        <h4>${day.date}</h4>
        <p>From ${day.temperature_min} to ${day.temperature_max}. </p>
        <p>Expected percipitation: ${day.percipitation}.
        `;
        })
        .join(" ");
    } else {
      forecastBox.textContent = `Nope`;
    }
  } catch (err) {
    console.log(`Error`);
  } finally {
    console.log("complete");
  }
}
