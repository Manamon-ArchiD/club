export const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Service Club API',
      version: '1.0.0',
      description: 'API pour la gestion des clubs, invitations et demandes d\'adhésion.',
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    paths: {
      '/club': {
        post: {
          summary: 'Créer un club',
          description: 'Seul le créateur peut créer un club.',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    name: { type: 'string' },
                    creator: { type: 'string' },
                    members: {
                      type: 'array',
                      items: { type: 'string' },
                    },
                  },
                  required: ['name', 'creator'],
                },
              },
            },
          },
          responses: {
            '201': {
              description: 'Club créé avec succès',
            },
          },
        },
      },
      '/club/{clubId}': {
        get: {
          summary: 'Consulter les informations d\'un club',
          parameters: [
            {
              name: 'clubId',
              in: 'path',
              required: true,
              description: 'ID du club',
              schema: { type: 'string' },
            },
          ],
          responses: {
            '200': {
              description: 'Informations du club',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      clubId: { type: 'string' },
                      name: { type: 'string' },
                      creator: { type: 'string' },
                      members: {
                        type: 'array',
                        items: { type: 'string' },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        put: {
          summary: 'Modifier les informations du club',
          parameters: [
            {
              name: 'clubId',
              in: 'path',
              required: true,
              description: 'ID du club',
              schema: { type: 'string' },
            },
          ],
          responses: {
            '200': {
              description: 'Informations du club mises à jour',
            },
          },
        },
      },
      '/club/{clubId}/invite': {
        post: {
          summary: 'Envoyer une invitation à un utilisateur pour rejoindre le club',
          parameters: [
            {
              name: 'clubId',
              in: 'path',
              required: true,
              description: 'ID du club',
              schema: { type: 'string' },
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    userId: { type: 'string' },
                  },
                  required: ['userId'],
                },
              },
            },
          },
          responses: {
            '201': {
              description: 'Invitation envoyée',
            },
          },
        },
      },
      '/club/{clubId}/request': {
        post: {
          summary: 'Envoyer une demande d\'adhésion au club',
          parameters: [
            {
              name: 'clubId',
              in: 'path',
              required: true,
              description: 'ID du club',
              schema: { type: 'string' },
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    userId: { type: 'string' },
                  },
                  required: ['userId'],
                },
              },
            },
          },
          responses: {
            '201': {
              description: 'Demande envoyée',
            },
          },
        },
        get: {
          summary: 'Récupérer toutes les demandes d\'adhésion dans le club',
          parameters: [
            {
              name: 'clubId',
              in: 'path',
              required: true,
              description: 'ID du club',
              schema: { type: 'string' },
            },
          ],
          responses: {
            '200': {
              description: 'Liste des demandes',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { type: 'string' },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: [],
};