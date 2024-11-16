const mongoose = require('mongoose');
require('dotenv').config();

const DB_URI = process.env.DB_URI

async function connectToDatabase() {
    try {
      mongoose.set("strictQuery", true);
      await mongoose.connect(DB_URI);
      console.log("Conectado ao Banco!")
    } catch (error) {
      console.log(`Error: ${error}`)
    }
}

module.exports = connectToDatabase;