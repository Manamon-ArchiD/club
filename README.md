## Participants

- LE NY Liam
- MALIVET Ervan

## Endpoints disponibles

### Club

- **Créer un club** : `POST /club`
- **Récupérer un club par ID** : `GET /club/{clubId}`
- **Mettre à jour un club** : `PUT /club/{clubId}`

### Invitations et demandes d'adhésion

- **Inviter un utilisateur à rejoindre un club** : `POST /club/{clubId}/invite`
- **Envoyer une demande d'adhésion à un club** : `POST /club/{clubId}/request`
- **Lister les demandes d'adhésion d'un club** : `GET /club/{clubId}/request`

## Lancement de l'application

### Configuration des variables d'environnement

Avant de démarrer, assurez-vous de configurer votre fichier `.env` :

```ini
# À UTILISER POUR L'EXÉCUTION EN PRODUCTION
# DATABASE_URL=postgresql://manamon:manamon@manamon-club-db:5432/manamon?schema=public

# À UTILISER POUR LE DÉVELOPPEMENT LOCAL (MIGRATIONS DE BASE DE DONNÉES)
DATABASE_URL=postgresql://manamon:manamon@localhost:5432/manamon?schema=public
```

### Installation et migration de la base de données

```shell
$ cd api
$ npm install
$ npx prisma migrate deploy
```

Avant de démarrer l'application avec Docker, modifiez votre fichier `.env` pour utiliser l'URL de production (manamon-club-db).
Puis lancez les services avec :

```shell
$ docker-compose up
```

Le swagger est disponible à l'adresse `http://localhost:3000/api-docs/`.

### Insertion de données factices

Pour remplir la base de données avec des données de test, exécutez :

```shell
$ npm run populate
```
