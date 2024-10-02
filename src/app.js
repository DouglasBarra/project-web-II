const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const profissionaisRoute = require('./routes/profissionaisRoute')
const professoresRoute = require('./routes/professoresRoute')
const alunosRoute = require('./routes/alunosRoute')
const agendamentosRoute = require('./routes/agendamentosRoute')

app.use(express.json());
app.use('/api', profissionaisRoute);
app.use('/api', professoresRoute)
app.use('/api', alunosRoute)
app.use('/api', agendamentosRoute)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Documentação disponível em http://localhost:${PORT}/api-docs`);
});
