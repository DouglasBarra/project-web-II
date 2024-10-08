const { v4: uuidv4 } = require('uuid');

class Usuários {
  constructor(name, email, user, password, level, status = 'on') {
    this.id = uuidv4(); 
    this.name = name;
    this.email = email;
    this.user = user;
    this.password = password;
    this.level = level;
    this.status = status;
  }
}

module.exports = Usuários;