const { v4: uuidv4 } = require('uuid');

class Evento {
    constructor(name, description, comments, date){
        this.id = uuidv4();
        this.name = name;
        this.description = description;
        this.comments = comments;
        this.date = date;
    }
}

module.exports = Evento