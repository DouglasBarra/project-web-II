const { v4: uuidv4 } = require('uuid');

class Aluno {
    constructor(name, age, parents, phoneNumber, specialNeeds, status) {
        this.id = uuidv4();
        this.name = name;
        this.age = age;
        this.parents = parents;
        this.phoneNumber = phoneNumber;
        this.specialNeeds = specialNeeds;
        this.status = status;
    }
}

module.exports = Aluno