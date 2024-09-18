const express = require('express');
const app = express();
const controllers = require('./controllers/roteador.js');
const swaggerDocs = require('./swagger');

app.use(express.json());
app.use('/professores', controllers);  // Certifique-se de que a rota está correta

swaggerDocs(app);

app.listen(8080, () => {
    console.log('Aplicação rodando na porta 8080');
});
