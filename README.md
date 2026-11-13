### Timezone choice

I use `timezone=Africa/Casablanca` so the API picks the timezone from the coordinates. My first test returned `GMT`, which was not the local timezone. After fixing the URL, the response shows the expected timezone.

Tested on 09/11/2026.

# Application météo multi-villes

Une page web où l'on tape le nom d'une ville pour voir sa météo actuelle et les prévisions des 5 prochains jours.

## Comment ça marche

1. L'utilisateur tape une ville et clique sur **Rechercher**.
2. L'application demande les coordonnées de la ville à l'API de géocodage d'Open-Meteo.
3. Avec ces coordonnées, elle demande la météo à l'API de prévisions.
4. Elle affiche une carte pour la météo actuelle et une carte par jour.

## API utilisée

[Open-Meteo](https://open-meteo.com/en/docs) : gratuite et sans clé d'API.

- **Géocodage** : `https://geocoding-api.open-meteo.com/v1/search?name=VILLE&count=1`
- **Prévisions** : `https://api.open-meteo.com/v1/forecast?latitude=...&longitude=...&current=...&daily=...&timezone=auto`

## Limites

- Pas de clé d'API, donc rien de secret dans le dépôt.
- Une recherche fait 2 appels, et l'application ne relance rien toute seule.
- Si le quota est atteint, l'application affiche un message au lieu de réessayer.

## Exemple de réponse JSON résumée

{
"current": {
"temperature_2m": 22.4,
"relative_humidity_2m": 58,
"wind_speed_10m": 12.1,
"weather_code": 2
},
"current_units": {
"temperature_2m": "°C",
"relative_humidity_2m": "%",
"wind_speed_10m": "km/h"
},
"daily": {
"time": ["2026-11-13", "2026-11-14", "2026-11-15", "2026-11-16", "2026-11-17"],
"weather_code": [2, 3, 61, 0, 1],
"temperature_2m_min": [16.2, 15.8, 14.9, 15.1, 16.0],
"temperature_2m_max": [24.1, 23.0, 20.4, 25.2, 26.0]
}
}



## Comment les valeurs s'affichent

- `current.temperature_2m` est affichée avec son unité prise dans `current_units.temperature_2m` (par exemple `22.4°C`).
- `current.relative_humidity_2m` est affichée après le libellé **Humidité :**, avec son unité (par exemple `58%`).
- `current.wind_speed_10m` est affichée après **Vent :**, avec son unité (par exemple `12.1km/h`).
- `current.weather_code` et chaque valeur de `daily.weather_code` sont convertis en icône et en description grâce à la table des codes météo ; le code `2` donne par exemple **⛅ Partiellement nuageux**. La carte actuelle montre l'icône et la description ; les cartes quotidiennes montrent l'icône.
- Chaque élément de `daily.time` devient le titre d'une carte, formaté en français (jour de la semaine, numéro et mois). Les valeurs à la même position dans les tableaux `daily` appartiennent à cette date.
- `daily.temperature_2m_min` et `daily.temperature_2m_max` sont affichées ensemble dans chaque carte, sous la forme température minimale / température maximale (par exemple `16.2°C / 24.1°C`).
- Si une valeur météo est absente ou `null`, l'application affiche **Donnée indisponible** pour les valeurs passées à `formatValue`.

```
## Lancer le projet

1. Télécharger ou cloner le dépôt.
2. Ouvrir `index.html` dans un navigateur.

Aucune installation n'est nécessaire.

## Gestion des erreurs

- **Champ vide** : message « Entrez un nom de ville. »
- **Ville introuvable** : message « Ville introuvable. »
- **Service indisponible ou quota atteint** : message correspondant.
- **Pas de connexion** : message « Connexion impossible » et bouton **Réessayer**.

## Tests

Voir le [journal de tests](tests.md).

## Auteur

Anas Laamim
```
