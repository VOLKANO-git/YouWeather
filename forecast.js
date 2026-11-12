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