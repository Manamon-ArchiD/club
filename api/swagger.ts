export const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Service Club API",
      version: "1.0.0",
      description:
        "API pour la gestion des clubs, invitations et demandes d'adhésion.",
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    paths: {
      "/club": {
        post: {
          summary: "Créer un club",
          description: "Seul le créateur peut créer un club.",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    name: { type: "string" },
                    level: { type: "integer" },
                    ownerId: { type: "integer" },
                  },
                  required: ["name", "level", "ownerId"],
                },
              },
            },
          },
          responses: {
            "201": {
              description: "Club créé avec succès",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      id: { type: "integer" },
                      name: { type: "string" },
                      level: { type: "integer" },
                      ownerId: { type: "integer" },
                      createdAt: { type: "string", format: "date-time" },
                      updatedAt: { type: "string", format: "date-time" },
                    },
                  },
                },
              },
            },
            "400": {
              description: "Demande incorrecte",
            },
          },
        },
      },
      "/club/{clubId}": {
        get: {
          summary: "Consulter les informations d'un club",
          parameters: [
            {
              name: "clubId",
              in: "path",
              required: true,
              description: "ID du club",
              schema: { type: "integer" },
            },
          ],
          responses: {
            "200": {
              description: "Informations du club récupérées avec succès",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      id: { type: "integer" },
                      name: { type: "string" },
                      level: { type: "integer" },
                      ownerId: { type: "integer" },
                      createdAt: { type: "string", format: "date-time" },
                      updatedAt: { type: "string", format: "date-time" },
                      ClubMembers: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            clubId: { type: "integer" },
                            userId: { type: "integer" },
                            createdAt: { type: "string", format: "date-time" },
                            updatedAt: { type: "string", format: "date-time" },
                          },
                        },
                      },
                      Invitations: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            id: { type: "integer" },
                            clubId: { type: "integer" },
                            inviterId: { type: "integer" },
                            userId: { type: "integer" },
                            createdAt: { type: "string", format: "date-time" },
                            updatedAt: { type: "string", format: "date-time" },
                          },
                        },
                      },
                      Requests: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            id: { type: "integer" },
                            clubId: { type: "integer" },
                            userId: { type: "integer" },
                            createdAt: { type: "string", format: "date-time" },
                            updatedAt: { type: "string", format: "date-time" },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            "404": {
              description: "Club non trouvé",
            },
          },
        },
        put: {
          summary: "Modifier les informations d'un club",
          parameters: [
            {
              name: "clubId",
              in: "path",
              required: true,
              description: "ID du club à modifier",
              schema: { type: "integer" },
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    name: { type: "string" },
                    level: { type: "integer" },
                    ownerId: { type: "integer" },
                  },
                  required: ["name", "level", "ownerId"],
                },
              },
            },
          },
          responses: {
            "200": {
              description: "Informations du club mises à jour avec succès",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      id: { type: "integer" },
                      name: { type: "string" },
                      level: { type: "integer" },
                      ownerId: { type: "integer" },
                      createdAt: { type: "string", format: "date-time" },
                      updatedAt: { type: "string", format: "date-time" },
                    },
                  },
                },
              },
            },
            "400": {
              description: "Demande incorrecte",
            },
            "404": {
              description: "Club non trouvé",
            },
          },
        },
      },
      "/club/{clubId}/invite": {
        post: {
          summary:
            "Envoyer une invitation à un utilisateur pour rejoindre le club",
          parameters: [
            {
              name: "clubId",
              in: "path",
              required: true,
              description: "ID du club",
              schema: { type: "integer" },
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    inviterId: { type: "integer" },
                    userId: { type: "integer" },
                  },
                  required: ["userId"],
                },
              },
            },
          },
          responses: {
            "201": {
              description: "Invitation envoyée avec succès",
            },
            "400": {
              description: "Demande incorrecte",
            },
          },
        },
      },
      "/club/{clubId}/request": {
        post: {
          summary: "Envoyer une demande d'adhésion au club",
          parameters: [
            {
              name: "clubId",
              in: "path",
              required: true,
              description: "ID du club",
              schema: { type: "integer" },
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    userId: { type: "integer" },
                  },
                  required: ["userId"],
                },
              },
            },
          },
          responses: {
            "201": {
              description: "Demande d'adhésion envoyée avec succès",
            },
            "400": {
              description: "Demande incorrecte",
            },
          },
        },
        get: {
          summary: "Récupérer toutes les demandes d'adhésion dans un club",
          parameters: [
            {
              name: "clubId",
              in: "path",
              required: true,
              description: "ID du club",
              schema: { type: "integer" },
            },
          ],
          responses: {
            "200": {
              description: "Liste des demandes d'adhésion",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      requests: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            id: { type: "integer" },
                            clubId: { type: "integer" },
                            userId: { type: "integer" },
                            createdAt: { type: "string", format: "date-time" },
                            updatedAt: { type: "string", format: "date-time" },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            "404": {
              description: "Club non trouvé",
            },
          },
        },
      },
    },
  },
  apis: [],
};
