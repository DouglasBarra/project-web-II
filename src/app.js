const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./config/swagger.js');
const app = express();

const profissionaisRoute = require('./routes/profissionaisRoute');
const professoresRoute = require('./routes/professoresRoute');
const alunosRoute = require('./routes/alunosRoute');
const agendamentosRoute = require('./routes/agendamentosRoute');
const eventosRoute = require('./routes/eventosRoute');

app.use(express.json());
<<<<<<< HEAD
=======
app.use('/api', profissionaisRoute);
app.use('/api', professoresRoute)
app.use('/api', alunosRoute)
app.use('/api', agendamentosRoute)
app.use('/api', eventosRoute)
///////app.use('/api', usuariosRoute)
>>>>>>> 34e7feb19982817f7d5b55b5c4dfc5585b21348c

app.use('/api/profissionais', profissionaisRoute);
app.use('/api/professores', professoresRoute);
app.use('/api/alunos', alunosRoute);
app.use('/api/agendamentos', agendamentosRoute);
app.use('/api/eventos', eventosRoute);


app.use('/swagger-dark.css', express.static(__dirname + '/config/style.css'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
  customCssUrl: '/swagger-dark.css'
}));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Documentação disponível em http://localhost:${PORT}/api-docs`);
});
