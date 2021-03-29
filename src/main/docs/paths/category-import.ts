export const categoryImportPath = {
  post: {
    tags: ['Category'],
    summary: 'API to create a category',
    description: '**qualquer usuário**',
    requestBody: {
      required: true,
      content: {
        'multipart/form-data': {
          schema: {
            properties: {
              file: {
                type: 'string',
              },
            },
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Success',
      },
      400: {
        $ref: '#/components/badRequest',
      },
      401: {
        $ref: '#/components/unauthorized',
      },
      500: {
        $ref: '#/components/serverError',
      },
    },
  },
};
