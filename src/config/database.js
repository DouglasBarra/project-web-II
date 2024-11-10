const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://admin:bMoxOLdTL4KhtxjY@project2024.gmzv0.mongodb.net/';
const dbName = 'projeto_gee';
s
let client;
let database;

// Função para conectar ao banco de dados
async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
    database = client.db(dbName);
    console.log("Conectado ao MongoDB");
  }
  return database;
}

// Função para fechar a conexão
async function closeDatabaseConnection() {
  if (client) {
    await client.close();
    client = null;
    database = null;
    console.log("Conexão com MongoDB fechada");
  }
}

module.exports = {
  connectToDatabase,
  closeDatabaseConnection,
};