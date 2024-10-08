const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, '../db/profissionais.json');
const Profissional = require('../models/profissionaisModel');

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
  },

  update: (id, profissionalData) => {
    const data = fs.readFileSync(dbPath, 'utf-8');
    const profissionais = JSON.parse(data);

    const index = profissionais.findIndex(prof => prof.id === id);
    
    if (index === -1) {
      throw new Error('Profissional não encontrado');
    }

    profissionais[index] = { ...profissionais[index], ...profissionalData };

    fs.writeFileSync(dbPath, JSON.stringify(profissionais, null, 2));
    return profissionais[index];
  },

  delete: (id) => {
    const data = fs.readFileSync(dbPath, 'utf-8');
    const profissionais = JSON.parse(data);

    const index = profissionais.findIndex(prof => prof.id === id);

    if (index === -1) {
      throw new Error('Profissional não encontrado');
    }

    const [profissionalRemovido] = profissionais.splice(index, 1);

    fs.writeFileSync(dbPath, JSON.stringify(profissionais, null, 2));
    return profissionalRemovido;
  }
};

module.exports = ProfissionalService;