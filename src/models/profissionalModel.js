const { v4: uuidv4 } = require('uuid');

class Profissional {
  constructor(name, specialty, contact, phone_number, status = 'on') {
    this.id = uuidv4(); 
    this.name = name;
    this.specialty = specialty;
    this.contact = contact;
    this.phone_number = phone_number;
    this.status = status;
  }
}

module.exports = Profissional;