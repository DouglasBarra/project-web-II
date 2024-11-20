const express = require('express');
const cors = require('cors');
const app = express();

const professoresRoute = require('./routes/professoresRoute')
const agendamentosRoute = require('./routes/agendamentosRoute')
const eventosRoute = require('./routes/eventosRoute')
const usuariosRoute = require('./routes/usuariosRoute')

app.use(cors());
app.use(express.json());

const connectToDatabase = require('./config/database');
connectToDatabase();

const routes = require("./routes/router");
app.use("/api", routes);

app.use('/api', professoresRoute)
app.use('/api', agendamentosRoute)
app.use('/api', eventosRoute)
app.use('/api', usuariosRoute)

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Documentação disponível em http://localhost:${PORT}/api-docs`);
});
