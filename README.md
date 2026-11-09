### Chosen URL

https://api.open-meteo.com/v1/forecast?latitude=33.8935&longitude=-5.5473&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto

### Timezone choice

I use `timezone=Africa/Casablanca` so the API picks the timezone from the coordinates. My first test returned `GMT`, which was not the local timezone. After fixing the URL, the response shows the expected timezone.

Tested on 09/11/2026.