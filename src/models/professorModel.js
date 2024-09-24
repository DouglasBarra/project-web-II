const { v4: uuidv4 } = require('uuid');

class Professor {
    constructor(name, schoolDisciplines, contact, phoneNumber, status = 'on') {
        this.id = uuidv4();
        this.name = name;
        this.schoolDisciplines = schoolDisciplines;
        this.contact = contact;
        this.phoneNumber = phoneNumber;
        this.status = status;
    }
}

module.exports = Professor