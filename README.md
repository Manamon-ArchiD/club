### Participants
- LE NY Liam
- MALIVET Ervan
---

### Endpoints disponibles
- Création de 6 routes :
  - GET  /club
  - GET  /club/{clubId}
  - POST /club/{clubId}
  - GET  /club/{clubId}/invite
  - GET  /club/{clubId}/request
  - POST /club/{clubId}/invite
---

### Lancement de l'application
```shell
$ cd api
$ npm install
$ npx prisma migrate deploy # use DATABASE_URL variable in a .env file.
$ cd ..
$ docker-compose up
```

Le swagger est disponible à l'adresse `http://localhost:3000/api-docs/`.