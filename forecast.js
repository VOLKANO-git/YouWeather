function renderForecast(forecast) {
  const holder = document.querySelector("#forecast");
  holder.textContent = "";
  const daily = forecast.daily;

  for (let i = 0; i < daily.time.length; i++) {
    console.log(
      daily.time[i],
      daily.weather_code[i],
      daily.temperature_2m_min[i],
      daily.temperature_2m_max[i],
    );

    const card = document.createElement("article");
    card.className = "card";
    const dateTitle = document.createElement("h3");
    dateTitle.textContent = daily.time[i];
    const info = getWeatherInfo(daily.weather_code[i]);
    const icon = document.createElement("p");
    icon.textContent = info.icon;
    const temps = document.createElement("p");
    temps.textContent =
      daily.temperature_2m_min[i] +
      "°C / " +
      daily.temperature_2m_max[i] +
      "°C";
    card.append(dateTitle, icon, temps);
    holder.append(card);
  }
}
