const express = require('express')
const receptor = express()
const controllers = require('./controllers/roteador.js')
const swaggerDocs = require('./swagger');

receptor.use(express.json())

receptor.listen(8080, function () { 
    console.log('Aplicação executando na porta 8080!');
})


swaggerDocs(app);
    
receptor.listen(8080, () => {
    console.log('Aplicação rodando na porta 8080');
});
    