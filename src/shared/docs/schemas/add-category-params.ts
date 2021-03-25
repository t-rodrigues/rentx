export const addCategoryParams = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
  },
  example: {
    name: 'category name sample',
    description: 'category descripiton sample',
  },
  required: ['name', 'description'],
};
