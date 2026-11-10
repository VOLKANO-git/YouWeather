const form = document.querySelector("#search-form");
const cityInput = document.querySelector("#city");
const errorBox = document.querySelector("#error");
const loadingBox = document.querySelector("#loading");
const searchButton = document.querySelector("#search-button");

searchButton.addEventListener("click", async (event) => {
  event.preventDefault();

  const city = cityInput.value.trim();

  if (city === "") {
    errorBox.textContent = "Entrez un nom de ville.";
    errorBox.hidden = false;
    return;
  }

  errorBox.hidden = true;
  loadingBox.hidden = false;

  try {
    const place = await getCoordinates(city);
    const forecast = await getForecast(place.lat, place.lon);

    console.log(forecast.current);
    console.log(forecast.current_units);

    renderCurrent(place, forecast);
  } catch (error) {
    errorBox.textContent = error.message;
    errorBox.hidden = false;
  } finally {
    loadingBox.hidden = true;
  }
});
async function getCoordinates(city) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Service indisponible; réessayez plus tard.");
  }

  const data = await response.json();

  if (!data.results) {
    throw new Error("Ville introuvable.");
  }
  const place = data.results[0];
  return { lat: place.latitude, lon: place.longitude, name: place.name };
}
async function getForecast(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Impossible de charger la météo.");
  }
  return await response.json();
}

const WEATHER_CODES = {
  0: { label: "Ciel dégagé", icon: "☀️" },
  1: { label: "Plutôt dégagé", icon: "🌤️" },
  2: { label: "Partiellement nuageux", icon: "⛅" },
  3: { label: "Couvert", icon: "☁️" },
  45: { label: "Brouillard", icon: "🌫️" },
  48: { label: "Brouillard givrant", icon: "🌫️" },
  51: { label: "Bruine légère", icon: "🌦️" },
  53: { label: "Bruine", icon: "🌦️" },
  55: { label: "Bruine forte", icon: "🌦️" },
  56: { label: "Bruine verglaçante", icon: "🌧️" },
  57: { label: "Bruine verglaçante", icon: "🌧️" },
  61: { label: "Pluie légère", icon: "🌧️" },
  63: { label: "Pluie", icon: "🌧️" },
  65: { label: "Pluie forte", icon: "🌧️" },
  66: { label: "Pluie verglaçante", icon: "🌧️" },
  67: { label: "Pluie verglaçante", icon: "🌧️" },
  71: { label: "Neige légère", icon: "🌨️" },
  73: { label: "Neige", icon: "🌨️" },
  75: { label: "Neige forte", icon: "❄️" },
  77: { label: "Grains de neige", icon: "🌨️" },
  80: { label: "Averses légères", icon: "🌦️" },
  81: { label: "Averses", icon: "🌧️" },
  82: { label: "Averses violentes", icon: "⛈️" },
  85: { label: "Averses de neige", icon: "🌨️" },
  86: { label: "Fortes averses de neige", icon: "❄️" },
  95: { label: "Orage", icon: "⛈️" },
  96: { label: "Orage avec grêle", icon: "⛈️" },
  99: { label: "Orage avec forte grêle", icon: "⛈️" },
};
