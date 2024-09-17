const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Configurações para o swagger-jsdoc
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API de Professores',
    version: '1.0.0',
    description: 'Documentação da API de Professores',
  },
  servers: [
    {
      url: 'http://localhost:8080', // URL base da API
    },
  ],
};

const options = {
  swaggerDefinition,
  // Definindo os arquivos que contêm as rotas/documentação
  apis: ['./src/controllers/*.js'], // Caminho para os arquivos que contêm as rotas
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
