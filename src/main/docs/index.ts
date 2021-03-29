import { paths } from './paths';
import { schemas } from './schemas';
import { components } from './components';

export const swaggerConfig = {
  openapi: '3.0.0',
  info: {
    title: 'RentalX Documentantion',
    description: 'This is an API Rent',
    version: '1.0.0',
    contact: {
      name: 'Thiago Rodrigues',
      email: 'thiagor_@live.com',
      url: 'https://www.linkedin.com/in/rodrigues-thiago',
    },
    license: {
      name: 'MIT',
      url: 'https://github.com/t-rodrigues/clean-ts-api/blob/main/LICENSE',
    },
  },
  servers: [
    {
      url: '/api',
      description: 'Servidor principal',
    },
  ],
  tags: [
    {
      name: 'Category',
      description: 'APIs related to a category',
    },
    {
      name: 'Specification',
      description: 'APIs related to a specification',
    },
  ],
  paths,
  schemas,
  components,
};
