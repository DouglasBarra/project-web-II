const { v4: uuidv4 } = require('uuid');

class Agendamento {
  constructor(code_number, description, scheduled_date, profissional) {
    this.id = uuidv4(); 
    this.code_number = code_number;
    this.description = description;
    this.scheduled_date = scheduled_date;
    this.profissional = profissional;
  }
}

module.exports = Agendamento;