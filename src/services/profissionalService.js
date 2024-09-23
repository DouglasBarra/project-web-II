const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, '../db/profissionais.json');
const Profissional = require('../models/profissionalModel');

const ProfissionalService = {
  getAll: () => {
    const data = fs.readFileSync(dbPath, 'utf-8');
    return JSON.parse(data);
  },

  create: (profissionalData) => {
    const data = fs.readFileSync(dbPath, 'utf-8');
    const profissionais = JSON.parse(data);

    const novoProfissional = new Profissional(
      profissionalData.name,
      profissionalData.specialty,
      profissionalData.contact,
      profissionalData.phone_number,
      profissionalData.status
    );
    
    profissionais.push(novoProfissional);

    fs.writeFileSync(dbPath, JSON.stringify(profissionais, null, 2));
    return novoProfissional;
  }
};

module.exports = ProfissionalService;