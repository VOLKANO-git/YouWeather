### Timezone choice

I use `timezone=Africa/Casablanca` so the API picks the timezone from the coordinates. My first test returned `GMT`, which was not the local timezone. After fixing the URL, the response shows the expected timezone.

Tested on 09/11/2026.
