# Tests manuels

| Test           | Action                             | Résultat attendu                    | OK  |
| -------------- | ---------------------------------- | ----------------------------------- | --- |
| Champ vide     | Cliquer sur Rechercher sans écrire | Message « Entrez un nom de ville. » | ✅  |
| Ville valide   | Rechercher « Fès »                 | Météo actuelle et 7 jours affichés  | ✅  |
| Ville inconnue | Rechercher « zzzz »                | Message « Ville introuvable. »      | ✅  |
| Réessayer      | Débloquer, cliquer sur Réessayer   | Résultats affichés                  | ✅  |
