const { v4: uuidv4 } = require('uuid');

class Evento {
    constructor(description, comments, date){
        this.id = uuidv4();
        this.description = description;
        this.comments = comments;
        this.date = date;
    }
}

module.exports = Evento