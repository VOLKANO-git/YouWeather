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
    console.log(place);
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
    throw new Error("Service indisponible, réessayez plus tard.");
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
