require('dotenv').config();
const { MongoClient } = require('mongodb');

const { DB_URI, DB_NAME } = process.env

let client;
let database;

// Função para conectar ao banco de dados
async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(DB_URI);
    await client.connect();
    database = client.db(DB_NAME);
  }
  return database;
}

// Função para fechar a conexão
async function closeDatabaseConnection() {
  if (client) {
    await client.close();
    client = null;
    database = null;
  }
}

module.exports = {
  connectToDatabase,
  closeDatabaseConnection,
};