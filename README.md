## Approche du problème
Le controller pour les activités est dans "index.ts".

Le dossier "service" contient la business logic.

L'utils "Activity" permet de mapper toutes les activités des providers vers un type unique qu'on va utiliser dans notre backend.
* J'ai supposé que "distinct_id" correspondait au userId.
* J'ai supposé que SUUNTO ne gérait pas les "climb" et du coup je l'ai set à 0.

Le dossier repositories va gérer tout ce qui est call DB

## Difficultés
* Le setup de la connexion à la DB m'a pris trop de temps, et j'ai préféré abandonner et laisser en mode dummy, quitte à expliquer ici : le but était d'utiliser knex pour créer des fonctions specifiques grâce à son queryBuilder
* J'ai pris pas mal de temps a écrire les premiers tests : c'est pas un de mes points fort, on était pas très à cheval là dessus chez Gymlib

## Améliorations : 
* S'il y a de nouvelles routes, création de dossier propre pour les controller pour plus de modularité.
* Avoir une vraie connexion DB
* Meilleur system de log (avec genre winston)
* Meilleure gestion d'erreur : création de class d'erreurs spécifiques
* Regarder pour mettre les types au même endroit, pour le moment ils sont un quasi tous dans utils/activity.ts 