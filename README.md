### Timezone choice

I use `timezone=Africa/Casablanca` so the API picks the timezone from the coordinates. My first test returned `GMT`, which was not the local timezone. After fixing the URL, the response shows the expected timezone.

Tested on 09/11/2026.

# Application météo multi-villes

Une page web où l'on tape le nom d'une ville pour voir sa météo actuelle et les prévisions des 7 prochains jours.

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
