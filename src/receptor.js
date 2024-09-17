const express = require('express')
const receptor = express()
const controllers = require('./controllers/roteador.js')

receptor.use(function(req, res, next){
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
   })

receptor.use('/', controllers)

receptor.listen(8080, function () { 
    console.log('Aplicação executando na porta 8080!');
    })
