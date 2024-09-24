const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const profissionalRoute = require('./routes/profissionalRoute');
const professorRoute = require('./routes/professorRoute')
const alunosRoute = require('./routes/alunoRoute')

app.use(express.json());
app.use('/api', profissionalRoute);
app.use('/api', professorRoute)
app.use('/api', alunosRoute)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Documentação disponível em http://localhost:${PORT}/api-docs`);
});
