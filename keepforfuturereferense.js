// doesnt work on the free API plan sadly
async function fetchForecast(city) {
  const apiKey = process.env.WEATHERSTACK_API;
  const url = `https://api.weatherstack.com/forecast?access_key=${apiKey}&query=${city}&forecast_days=3`;
  const forecastBox = document.getElementById("forecast-box");

  forecastBox.innerHTML = "";

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch");
    }
    const data = await response.json();
    console.log(data);
    if (data.forecast) {
      const forecastData = [];
      Object.keys(data.forecast).forEach((date) => {
        const day = data.forecast[date];
        forecastData.push({
          date: day.date,
          maxTemp: day.maxTemp,
          minTemp: day.minTemp,
          precipitation: day.precip,
        });
      });

      forecastBox.innerHTML = forecastData
        .map((day) => {
          return `
        <h4>${day.date}</h4>
        <p>From ${day.minTemp}°C to ${day.maxTemp}°C.</p>
        <p>Expected precipitation: ${day.precip}.</p>
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
