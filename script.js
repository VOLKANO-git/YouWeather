const searchButton = document.querySelector("#search-button");
const cityInput = document.querySelector("#city");
const errorBox = document.querySelector("#error");
const loadingBox = document.querySelector("#loading");
const retryButton = document.querySelector("#retry");
let lastCity = "";

searchButton.addEventListener("click", async (event) => {
  event.preventDefault();

  const city = cityInput.value.trim();

  if (city === "") {
    errorBox.textContent = "Entrez un nom de ville.";
    errorBox.hidden = false;
    return;
  }
  lastCity = city;
  errorBox.hidden = true;
  retryButton.hidden = true;
  loadingBox.hidden = false;

  try {
    const place = await getCoordinates(city);
    const forecast = await getForecast(place.lat, place.lon);

    renderCurrent(place, forecast);
    renderForecast(forecast);
  } catch (error) {
    errorBox.textContent = error.message;
    errorBox.hidden = false;
    retryButton.hidden = false;
  } finally {
    loadingBox.hidden = true;
  }
});

async function getCoordinates(city) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`;
  const response = await fetch(url);
  checkResponse(response);

  const data = await response.json();

  if (!data.results) {
    throw new Error("Ville introuvable.");
  }
  const place = data.results[0];
  return { lat: place.latitude, lon: place.longitude, name: place.name };
}

async function getForecast(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=5`;
  const response = await fetch(url);
  checkResponse(response);
  return await response.json();
}

function checkResponse(response) {
  if (response.status === 404) {
    throw new Error("Recherche introuvable.");
  }
  if (!response.ok) {
    throw new Error("Service indisponsible, réessayez plus tard.");
  }
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

function getWeatherInfo(code) {
  return WEATHER_CODES[code] ?? { label: "Inconnu", icon: "❓" };
}

function formatValue(value, unit) {
  if (value === undefined || value === null) {
    return "Donnée indisponible";
  }
  return value + unit;
}

function renderCurrent(place, forecast) {
  const current = forecast.current;
  const units = forecast.current_units;
  const info = getWeatherInfo(current.weather_code);
  const container = document.querySelector("#current");
  container.textContent = "";
  const card = document.createElement("article");
  card.className = "card";
  const title = document.createElement("h2");
  title.textContent = place.name;
  const icon = document.createElement("p");
  icon.textContent = info.icon;
  const label = document.createElement("p");
  label.textContent = info.label;
  const temp = document.createElement("p");
  temp.textContent = formatValue(current.temperature_2m, units.temperature_2m);
  const humidity = document.createElement("p");
  humidity.textContent =  "Humidité : " 
    formatValue(current.relative_humidity_2m, units.relative_humidity_2m);
  const wind = document.createElement("p");
  wind.textContent =  "Vent : " + formatValue(current.wind_speed_10m, units.wind_speed_10m);
  card.append(title, icon, label, temp, humidity, wind);
  container.append(card);
}

function renderForecast(forecast) {
  const holder = document.querySelector("#forecast");
  holder.textContent = "";
  const daily = forecast.daily;
  for (let i = 0; i < daily.time.length; i++) {
    const card = document.createElement("article");
    card.className = "card";
    const dateTitle = document.createElement("h3");
    const dateObject = new Date(daily.time[i] + "T00:00:00");
    dateTitle.textContent = dateObject.toLocaleDateString("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });

    const info = getWeatherInfo(daily.weather_code[i]);
    const icon = document.createElement("p");
    icon.textContent = info.icon;
    const temps = document.createElement("p");
    temps.textContent =
      formatValue(daily.temperature_2m_min[i], "°C") +
      " / " +
      formatValue(daily.temperature_2m_max[i], "°C");

    card.append(dateTitle, icon, temps);
    holder.append(card);
  }
}
retryButton.addEventListener("click",()=>{
  cityInput.value = lastCity;
  searchButton.click();
});